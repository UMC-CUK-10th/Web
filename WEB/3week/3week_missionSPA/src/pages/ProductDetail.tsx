export default function ProductDetail({ id, addToCart }: { id: string; addToCart: any }) {

  const products = [
    { id: 1, name: "꿀범 Catholic 후드", price: 59000 },
    { id: 2, name: "꿀범 머그컵", price: 15000 },
  ];

  const product = products.find(p => p.id === Number(id));

  if (!product) return <div className="p-10">상품을 찾을 수 없습니다. 😢</div>;

  return (
    <div className="p-10 text-center">
      <div className="w-48 h-48 bg-gray-200 mx-auto rounded-2xl mb-6" />
      <h2 className="text-3xl font-bold mb-2">{product.name} 😎</h2>
      <p className="text-xl text-blue-600 mb-8">₩{product.price.toLocaleString()}</p>
      
      <button 
        onClick={() => addToCart(product)} 
        className="px-10 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700"
      >
        장바구니 담기
      </button>
    </div>
  );
}