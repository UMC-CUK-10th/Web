import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout"; // 1. 레이아웃 임포트 추가
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 2. 모든 페이지를 HomeLayout으로 감쌉니다 */}
        <Route element={<HomeLayout />}>
          {/* 3. path를 소문자로 통일 (브라우저 주소창에도 소문자로 입력하세요!) */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/my" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;