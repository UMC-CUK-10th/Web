import { useEffect } from "react";
import Navbar from "./components/Navbar";
import CartList from "./components/CartList";
import TotalPrice from "./components/TotalPrice";
import { useCartStore } from "./store/useCartStore";

function App() {
  const cartItems = useCartStore((state) => state.cartItems);
  const calculateTotals = useCartStore((state) => state.calculateTotals);

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />

      <main className="w-full">
        <CartList />
        <TotalPrice />
      </main>
    </div>
  );
}

export default App;