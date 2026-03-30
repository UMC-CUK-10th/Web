import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/home';
import NotFound from './pages/not-found';
import HelloPage from './pages/hello';
import ByePage from './pages/bye';
import RootLayout from './layout/root-layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'hello',
        element: <HelloPage />, 
      },
      {
        path: 'bye',
        element: <ByePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;