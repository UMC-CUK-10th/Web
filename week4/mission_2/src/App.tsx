import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import Homelayout from './layouts/Homelayout';
import SignupPage from './pages/SignupPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout/>,
    errorElement: <NotFound/>,
    children:[
      {index: true, element:<HomePage/>},
      {path: "login", element:<LoginPage/>},
      {path: "Sinup", element:<SignupPage/>}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;