import './App.css'
import {createBrowserRouter, RouterProvider, type RouteObject} from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import SearchPage from './pages/SearchPage';
import LpListPage from './pages/LpListPage';
import { AuthProvider } from './context/AuthContext';
import { ProtectedLayout } from './layouts/ProtectedLayout';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';

// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

//puclicRoutes: 인증 없이 접근 가능한 라우트
const publicRoutes:RouteObject[] = [
  {
    path:"/",
    element: <HomeLayout />,
    errorElement:<NotFoundPage/>,
    children: [
      {index: true, element:<HomePage/>},
      {path: 'login', element:<LoginPage/> },
      {path: 'signup', element:<SignupPage/>},
      {path: 'search', element:<SearchPage/>},
      {path: 'lp-list', element:<LpListPage/>},
      {
        path:"v1/auth/google/callback",
        element: <GoogleLoginRedirectPage />
      },
    ],
  },
];

//prptectedRoutes: 인증 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path:"/",
    element: <ProtectedLayout/>,
    errorElement: <NotFoundPage/>,
    children:[
      {
        path:"my",
        element:<MyPage/>,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes,...protectedRoutes]);

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;