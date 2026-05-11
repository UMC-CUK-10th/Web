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
import { AuthProvider, useAuth } from './context/AuthContext';
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

const AppContent = () => {
  const { isInitialized } = useAuth();

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-gray-400 font-bold animate-pulse">인증 정보 확인 중...</div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;