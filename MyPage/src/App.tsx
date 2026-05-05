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
import JsonPlaceholder from "./pages/JsonPlaceholder";
import LpDetail from "./pages/LpDetail";

import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

function AppContent() {
  const { user, setUser, isInitialized, setIsInitialized } = useUser();

  useAxiosInterceptor();

  const checkLoginStatus = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setUser(null);
      setIsInitialized(true);
      return;
    }

    try {
      const response = await API.get("/users/me");
      setUser(response.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (!isInitialized) return <div>로그인 확인 중...</div>;

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/v1/auth/google/callback" element={<GoogleCallback />} />
        <Route element={<ProtectedRoute isLogin={!!user} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/lp/:id" element={<LpDetail />} />
        </Route>
        <Route path="/jsonPlaceholder" element={<JsonPlaceholder />}></Route>
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