import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LoginPage } from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./layouts/ProtectedLayout";
import GooglePage from "./pages/GooglrPage";
import { QueryClientProvider } from "@tanstack/react-query";
import LpDetailPage from "./pages/LpDetailPage";
import { queryClient } from "./lib/queryClient";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GooglePage /> },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/mypage",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [{ index: true, element: <MyPage /> }],
  },
  {
    path: "/lp/:lpid",
    element: <ProtectedLayout />,
    children: [{ index: true, element: <LpDetailPage /> }],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
