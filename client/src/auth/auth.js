import React, { useState, useEffect, useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import axios from "axios";

import { baseUrl } from "../constants/url";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const accessToken = localStorage.getItem("access-token");

  useEffect(()=>{
    axios({
      method: "get",
      url: `${baseUrl}/auth`,
      headers: {
        access_token: accessToken
      }
    }).then(()=>{
      setIsLogin(true);
    }).catch(()=>{
      localStorage.clear();
      setIsLogin(false);
    });
  }, [accessToken]);


  return <AuthContext.Provider value={{ isLogin, setIsLogin }}>{children}</AuthContext.Provider>;
}

function ProtectedRoute() {
  const { isLogin } = useContext(AuthContext);
  const location = useLocation();

  if (!isLogin && location.pathname === "/dashboard") {
    return <Navigate to="/login" replace />; 
  }

  if (isLogin && location.pathname !== "/dashboard") {
    return <Navigate to="/dashboard" replace />; 
  }

  return <Outlet/>;
}

export { AuthProvider, AuthContext, ProtectedRoute };