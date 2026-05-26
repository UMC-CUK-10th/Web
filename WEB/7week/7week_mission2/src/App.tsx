import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import LoadingSpinner from "./components/LoadingSpinner"; // 💡 스피너 임포트

// 💡 [수정] 페이지 컴포넌트를 lazy 로딩으로 변경
const HomeLayout = lazy(() => import("./layouts/HomeLayout"));
const ProtectedLayout = lazy(() => import("./layouts/ProtectedLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const MyPage = lazy(() => import("./pages/MyPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const GoogleLoginRedirectPage = lazy(() => import("./pages/GoogleLoginRedirectPage"));
const LpDetailPage = lazy(() => import("./pages/LpDetailPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "my", element: <MyPage /> },
      { path: "lp/:lpid", element: <LpDetailPage /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* 💡 [핵심] 모든 라우팅 환경을 Suspense로 감싸 전역 로딩 처리 */}
        <Suspense fallback={<LoadingSpinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;