import { useEffect } from "react";
import Navbar from "./components/Navbar";
import CartList from "./components/CartList";
import PriceBox from "./components/PriceBox";
import Modal from "./components/Modal";
import { useCartStore } from "./store/useCartStore";

function App() {
  const { cartItems, calculateTotals } = useCartStore();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#051510] via-[#0a2119] to-[#030d0a] text-slate-100 relative selection:bg-emerald-500/30">
      <Navbar />
      <CartList />
      <PriceBox />
      <Modal />
    </main>
  );
}

export default App;