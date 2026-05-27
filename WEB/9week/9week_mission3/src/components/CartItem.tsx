import { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import type { CartItemType } from "../types";

interface Particle {
  id: number;
  x: number;
  y: number;
}

const CartItem = ({ id, img, title, singer, price, amount }: CartItemType) => {
  const { increase, decrease } = useCartStore();
  const [particles, setParticles] = useState<Particle[]>([]);

  const createParticles = () => {
    const newParticles = Array.from({ length: 6 }).map((_, i) => {
      const angle = (i * 60 + Math.random() * 20) * (Math.PI / 180);
      const distance = 30 + Math.random() * 20;
      return {
        id: Date.now() + i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      };
    });
    
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.slice(6));
    }, 400);
  };

  return (
    <article className="flex items-center justify-between py-6 border-b border-emerald-950/20 backdrop-blur-sm bg-white/5 px-6 rounded-2xl mb-4 border border-white/5 shadow-lg">
      <div className="flex items-center gap-6">
        <img src={img} alt={title} className="w-20 h-20 object-cover rounded-xl shadow-md border border-white/10" />
        <div>
          <h4 className="font-bold text-lg text-white tracking-tight">{title}</h4>
          <h5 className="text-sm text-emerald-300/70 mb-2">{singer}</h5>
          <h4 className="font-extrabold text-emerald-400">${price}</h4>
        </div>
      </div>

      <div className="relative flex items-center border border-white/10 rounded-xl bg-[#05140f] p-1 gap-1">
        {particles.map((p) => (
          <span
            key={p.id}
            style={{ "--tw-particle-x": `${p.x}px`, "--tw-particle-y": `${p.y}px` } as React.CSSProperties}
            className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full pointer-events-none animate-sparkle"
          />
        ))}

        <button
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-emerald-500/20 text-emerald-400 font-bold transition-all text-base active:scale-75 active:bg-emerald-500/40 select-none cursor-pointer z-10"
          onClick={() => {
            decrease(id);
            createParticles();
          }}
        >
          -
        </button>
        <div 
          key={amount}
          className="px-2 font-black text-center min-w-[2.2rem] text-white text-lg inline-block animate-pop select-none z-10"
        >
          {amount}
        </div>
        <button
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-emerald-500/20 text-emerald-400 font-bold transition-all text-base active:scale-75 active:bg-emerald-500/40 select-none cursor-pointer z-10"
          onClick={() => {
            increase(id);
            createParticles();
          }}
        >
          +
        </button>
      </div>
    </article>
  );
};

export default CartItem;