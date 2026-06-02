import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout"; 
import Homepage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "movies/popular",
        element: <MoviePage category="popular" />,
      },
      {
        path: "movies/now_playing",
        element: <MoviePage category="now_playing" />,
      },
      {
        path: "movies/top_rated",
        element: <MoviePage category="top_rated" />,
      },
      {
        path: "movies/upcoming",
        element: <MoviePage category="upcoming" />,
      },
      {
        path: "movies/:movieId",
        element: <MovieDetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
