import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/auth/Signup";
import GoogleCallback from "./pages/auth/GoogleCallback";
import Login from "./pages/auth/Login";
// ✅ After
import UseReducerCompany from "./pages/UseReducerCompany";

import ProtectedRoute from "./components/ProtectedRoute";
import LpDetail from "./pages/home/LpDetailView";
import Mypage from "./pages/Mypage";

function AppContent() {

  return (
    <BrowserRouter>
      <Navbar /> 
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/v1/auth/google/callback" element={<GoogleCallback />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/UseReducerCompany" element={<UseReducerCompany />} />
          
          <Route 
              path="/lps/:id" 
              element={
                  <ProtectedRoute>
                      <LpDetail />
                  </ProtectedRoute>
              } 
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AppContent/>
  )
}