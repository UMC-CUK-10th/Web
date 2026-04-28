import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { UserProvider, useUser } from "./context/UserContext";
import API from "./lib/axios";
import { useAxiosInterceptor } from "./hooks/useAxiosInterceptor";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import GoogleCallback from "./pages/GoogleCallback";

import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

function AppContent() {
  const { user, setUser } = useUser();

  useAxiosInterceptor();

  const isLogin = () => {
    if (user) {
      return true
    } else {
      return false
    }
  }

  const checkLoginStatus = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const response = await API.get("/users/me");
      setUser(response.data.data);
    } catch (error) {
      console.log("로그인 되어 있지 않음");
      setUser(null);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/v1/auth/google/callback" element={<GoogleCallback />} />
        <Route element={<ProtectedRoute isLogin={isLogin()} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent/>
    </UserProvider>
  )
}