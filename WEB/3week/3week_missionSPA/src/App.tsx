import { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./pages/Main";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import './App.css';

type CartItem = {
  id: number;
  name: string;
  price: number;
};

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const handleLocationChange = () => setPath(window.location.pathname);
    
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    alert("장바구니에 담겼습니다! 🍯");
  };

  let Page;
  if (path === "/") {
    Page = <Main />;
  } else if (path.startsWith("/product/")) {
    const id = path.split("/")[2]; 
    Page = <ProductDetail id={id} addToCart={addToCart} />;
  } else if (path === "/cart") {
    Page = <Cart cart={cart} />;
  } else {
    Page = <div className="p-20 text-center text-3xl font-bold">404 - 찾을 수 없는 페이지 🚨</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-screen-md mx-auto">
        {Page}
      </main>
    </div>
  );
}