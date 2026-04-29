import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import MovieDetailPage from './pages/MovieDetailPage';
import './index.css';

const router = createBrowserRouter([
  { path: "/", element: <MoviePage /> },
  { path: "/movie/:movieId", element: <MovieDetailPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);