// Header.tsx
import { navigate } from "../router/navigate";

export default function Header() {
  return (
    <nav className="flex justify-between p-5 bg-slate-900 text-white shadow-lg">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}> JB SHOP 😎 </h1>
      <div className="flex gap-5">
        <span className="cursor-pointer hover:text-yellow-400" onClick={() => navigate("/")}>Home</span>
        <span className="cursor-pointer hover:text-yellow-400" onClick={() => navigate("/cart")}>Cart</span>
      </div>
    </nav>
  );
}

