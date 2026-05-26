import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./App.css";

import HomePage from "./pages/HomePage";

import NotFound from "./pages/NotFound";

import LoginPage from "./pages/LoginPage";

import SignupPage from "./pages/SignupPage";

import Homelayout from "./layouts/Homelayout";

import ProtectedRoute from "./routes/ProtectedRoute";

import MyPage from "./pages/MyPage";

import GoogleCallback from "./pages/GoogleCallback";

import LPDetailPage from "./pages/LPDetailPage";
import CreateLPPage from "./pages/CreateLPPage";

const router = createBrowserRouter([
  {
    path: "/",

    element: <Homelayout />,

    children: [
      {
        index: true,

        element: <HomePage />,
      },

      {
        path: "login",

        element: <LoginPage />,
      },

      {
        path: "signup",

        element: <SignupPage />,
      },

      {
        path: "mypage",

        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "lp/:lpid",

        element: (
          <ProtectedRoute>
            <LPDetailPage />
          </ProtectedRoute>
        ),
      },

      {
        path:
          "v1/auth/google/callback",

        element: <GoogleCallback />,
      },

      {
        path: "*",

        element: <NotFound />,
      },
      {
  path: "lp/new",

  element: (
    <ProtectedRoute>
      <CreateLPPage />
    </ProtectedRoute>
  ),
},
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;