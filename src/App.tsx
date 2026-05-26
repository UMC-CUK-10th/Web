<<<<<<< HEAD
import "./App.css";
import {
  createBrowserRouter,
  type RouteObject,
  RouterProvider,
} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import MyPage from "./pages/MyPage.tsx";
import LpListPage from "./pages/LpListPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import LpDetailPage from "./pages/LpDetailPage.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ProtectedLayout } from "./layouts/ProtectedLayout.tsx";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <LpListPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'lps/:lpId', element: <LpDetailPage /> },
    ],
  },
  {
    path: "/v1/auth/google/callback", 
    element: <GoogleLoginRedirectPage />,
    errorElement: <NotFoundPage />,
  }
=======
import './App.css'
import {createBrowserRouter, RouterProvider, type RouteObject} from "react-router-dom"
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import { ProtectedLayout } from './layouts/ProtectedLayout';

const publicRoutes:RouteObject[] = [
  {
    path:"/",
    element: <HomeLayout />,
    errorElement:<NotFoundPage/>,
    children: [
      {index: true, element:<HomePage/>},
      {path: 'login', element:<LoginPage/> },
      {path: 'signup', element:<SignupPage/>},
    ],
  },
>>>>>>> upstream/체컵/고원준
];

const protectedRoutes: RouteObject[] = [
  {
<<<<<<< HEAD
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "my",
        element: <MyPage />,
=======
    path:"/",
    element: <ProtectedLayout/>,
    errorElement: <NotFoundPage/>,
    children:[
      {
        path:"my",
        element:<MyPage/>,
>>>>>>> upstream/체컵/고원준
      },
    ],
  },
];

<<<<<<< HEAD
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
=======
const router = createBrowserRouter([...publicRoutes,...protectedRoutes]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}
>>>>>>> upstream/체컵/고원준

export default App;