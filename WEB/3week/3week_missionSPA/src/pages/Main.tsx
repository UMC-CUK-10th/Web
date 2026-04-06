// Main.tsx
import Product from "../components/Product";

export default function Main() {
  const items = [
    { id: 1, name: "꿀범 Catholic 후드", price: 59000 },
    { id: 2, name: "꿀범 머그컵", price: 15000 },
  ];
  return (
    <div className="p-10 grid grid-cols-2 gap-6">
      {items.map(item => <Product key={item.id} {...item} />)}
    </div>
  );
}
