import React, { useState, useEffect, useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import axios from "axios";

import { baseUrl } from "../constants/url";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = localStorage.getItem("access-token");

  useEffect(()=>{
    axios({
      method: "get",
      url: `${baseUrl}/auth`,
      headers: {
        access_token: accessToken
      }
    }).then(()=>{
      setIsLoading(false);
      setIsLogin(true);
    }).catch(()=>{
      localStorage.clear();
      setIsLoading(false);
      setIsLogin(false);
    });
  }, [accessToken]);


  return <AuthContext.Provider value={{ isLogin, setIsLogin, isLoading, setIsLoading }}>{children}</AuthContext.Provider>;
}

function ProtectedRoute() {
  const { isLogin, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <h1 style={{ 
      height: "100vh",
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center" }}
    >
        Fetching...
    </h1>;
  } else {
    if (!isLogin && location.pathname === "/dashboard") {
      return <Navigate to="/login" replace />; 
    }
  
    if (isLogin && (location.pathname === "/" || location.pathname === "/login")) {
      return <Navigate to="/dashboard" replace />; 
    }
  }

  return <Outlet/>;
}

export { AuthProvider, AuthContext, ProtectedRoute };