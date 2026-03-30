export default function Cart({ cart }: { cart: any[] }) {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-5">장바구니 🛒</h2>
      {cart.length === 0 ? <p>비어있습니다.</p> : cart.map((item, i) => (
        <div key={i} className="p-3 border-b">{item.name} - ₩{item.price}</div>
      ))}
    </div>
  );
}