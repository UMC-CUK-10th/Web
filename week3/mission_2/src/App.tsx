import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage";
import PopularPage from "./pages/PopularPage";
import UpcomingPage from "./pages/UpcomingPage";
import TopRatedPage from "./pages/TopRatedPage";
import NowPlayingPage from "./pages/NowPlayingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "popular", element: <PopularPage /> },
      { path: "upcoming", element: <UpcomingPage /> },
      { path: "top-rated", element: <TopRatedPage /> },
      { path: "now-playing", element: <NowPlayingPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;