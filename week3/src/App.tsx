import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import MoviePage from "./pages/MoviePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route
            index
            element={<div className="p-10 text-lg">홈에서 영화 카테고리를 선택하세요.</div>}
          />
          <Route path="movies/:category" element={<MoviePage />} />
          <Route path="movies/:category/:movieId" element={<MovieDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
