import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { UserProvider, useUser } from "./context/UserContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Premium from "./pages/Premium";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";
import Profile from "./pages/Profile";

function AppContent() {
  const { user, setUser } = useUser();
  const isPremium = false;

  const isLogin = () => {
    if (user) {
      return true
    } else {
      return false
    }
  }

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("http://localhost:8000/v1/users/me", {
        withCredentials: true
      });

      const user = response.data.data;
      console.log("현재 로그인 유저:", user.name);
      
      // 전역 상태에 유저 정보 저장
      setUser(user);
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