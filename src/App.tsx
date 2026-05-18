import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';

//1.홈페이지
//2.로그인 페이지
//3.회원가입 페이지

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage/> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'my', element: <MyPage /> },
    ],
  },
])

function App() {
  return (
    //authProvider로 감싸줘야 로그인 상태를 앱 전체에서 사용할 수 있음. 로그인 상태는 context로 관리할거임. 로그인 했는지 안했는지, 토큰이 있는지 없는지 이런 정보들
    <AuthProvider> 
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App
