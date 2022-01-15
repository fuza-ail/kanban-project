import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import NotFound from "./pages/404/NotFound";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/login" exact element={<Login/>} />
        <Route path="/dashboard" exact element={<Dashboard/>} />
        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}