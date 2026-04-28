import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedLayout } from "./layout/ProtectedLayout";
// 기존에 있던 RootLayout, HomePage, LoginPage, SignupPage, MyPage 임포트

const publicRoutes = [
    {
        path: "/",
        element: <RootLayout />, // 공유하는 Navbar 등이 포함된 레이아웃
        // errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "signup", element: <SignupPage /> },
        ]
    }
];

const protectedRoutes = [
    {
        path: "/my",
        element: <ProtectedLayout />, 
        children: [
            { index: true, element: <MyPage /> },
        ]
    }
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;