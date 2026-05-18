import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import './App.css'
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './layouts/ProtectedLayout';

//1.홈페이지
//2.로그인 페이지
//3.회원가입 페이지


//publicRoutes: 인증없이 접근 가능한 페이지들 /login, /signup
const publicRoutes:RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage/> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
    ],
  },
];

//protectedRoutes: 인증이 필요한 페이지들 /my
const protectedRoutes:RouteObject[] = [
  {
    path: '/',
    element: <ProtectedLayout />, //인증이 필요한 페이지들을 감싸주는 레이아웃
    errorElement: <NotFoundPage />,
    children: [
      { 
        path: 'my',
        element: <MyPage />
      },
    ],
  },
]; 

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return (
    //authProvider로 감싸줘야 로그인 상태를 앱 전체에서 사용할 수 있음. 로그인 상태는 context로 관리할거임. 로그인 했는지 안했는지, 토큰이 있는지 없는지 이런 정보들
    <AuthProvider> 
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App
