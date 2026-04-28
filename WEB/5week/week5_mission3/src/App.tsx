import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import RootLayout from './layout/RootLayout';
import ProtectedLayout from './layout/ProtectedLayout';

const HomePage = lazy(() => import('./pages/Homepage'));
const MyPage = lazy(() => import('./pages/MyPage'));
const LoginPage = lazy(() => import('./pages/Loginpage'));
const SignupPage = lazy(() => import('./pages/SignUpPage'));
const GoogleLoginRedirectPage = lazy(() => import('./pages/GoogleLoginRedirectPage'));


const LoadingSpinner = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm z-[9999]">
    <div className="relative flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
      <div className="absolute text-3xl animate-bounce">🍯</div>
    </div>
    <div className="mt-8 text-center">
      <h2 className="text-xl font-bold text-slate-800 animate-pulse">달콤한 로딩 중...</h2>
      <p className="mt-2 text-slate-400 text-sm font-medium">잠시만 기다려주세요, 사용자님! 🐾</p>
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl -z-10"></div>
  </div>
);

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
    ],
  }
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "my",
        element: <MyPage />
      }
    ]
  }
];

const browserRouter = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={browserRouter} />
      </Suspense>
    </AuthProvider>
  );
}

export default App;