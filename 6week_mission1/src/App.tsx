import "./App.css";
import {
  createBrowserRouter,
  type RouteObject,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import MyPage from "./pages/MyPage.tsx";
// --- 새로 만든 페이지 임포트 ---
import LpListPage from "./pages/LpListPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
// ----------------------------
import { AuthProvider } from "./context/AuthContext.tsx";
import { ProtectedLayout} from "./layouts/ProtectedLayout.tsx";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      // --- LP 관련 경로 추가 ---
      { path: 'lps', element: <LpListPage /> },    // /lps 접속 시 전체 목록
      { path: 'search', element: <SearchPage /> }, // /search 접속 시 검색 페이지
      // -----------------------
    ],
  },
  {
    path: "/v1/auth/google/callback", 
    element: <GoogleLoginRedirectPage />,
    errorElement: <NotFoundPage />,
  }
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "my",
        element: <MyPage />,
      },
    ],
  },
];

// 라우터 병합
const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export const queryClient : QueryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
} 

export default App;