import { Routes, Route } from "react-router-dom";
import { ProtectedRoute, AuthProvider } from "./auth/auth";
import { Provider } from "react-redux";

import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import NotFound from "./pages/404/NotFound";
import Board from "./pages/board/Board";

import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedRoute/>}>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/login" exact element={<Login/>} />
            <Route path="/dashboard" exact element={<Dashboard/>} />
            <Route path='/dashboard/:boardId' element={<Board/>} />
          </Route>
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </AuthProvider>
    </Provider>
  );
}