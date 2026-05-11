import './App.css'
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import LpDetailPage from './pages/LpDetailPage'; 
import { AuthProvider, useAuth } from './context/AuthContext'; // ✅ useAuth 추가
import ProtectedLayout from './layouts/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';

const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },

      {
        element: <ProtectedLayout />, 
        children: [
          {
            path: "my",
            element: <MyPage />,
          },
          {
            path: "lp/:lpid",
            element: <LpDetailPage />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export const queryClient = new QueryClient();

// ✅ [핵심] RouterProvider를 감싸서 인증 상태를 기다리는 컴포넌트
const AppContent = () => {
  const { isInitialized } = useAuth();

  // 1. 아직 토큰을 확인 중이라면 아무것도 렌더링하지 않거나 로딩 스피너를 보여줌
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-gray-400 font-bold animate-pulse">인증 정보 확인 중...</div>
      </div>
    );
  }

  // 2. 초기화가 완료된 후에만 라우터를 실행함
  return <RouterProvider router={router} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* ✅ RouterProvider를 직접 넣지 않고 AppContent로 감싸서 상태를 제어합니다. */}
        <AppContent />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;