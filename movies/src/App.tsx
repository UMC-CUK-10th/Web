import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home"
import Movies from "./pages/Movies"
import MovieDetail from './pages/MovieDetail';
import RootLayout from './layout/root-layout';

// 2. 경로(path)와 보여줄 화면(element)를 정의
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: 'movies',
        element: <Movies/>
      },
      {
        path: "movies/:movieId",
        element: <MovieDetail/>
      }
    ]
  }
]);

// 3. RouterProvider로 router 전달
function App() {
  return <RouterProvider router={router} />
}

export default App;