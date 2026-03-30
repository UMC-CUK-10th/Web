import { navigate } from "../router/navigate";

export default function Product({ id, name, price }: { id: number; name: string; price: number }) {
  return (
    <div className="p-4 border rounded-2xl shadow-sm bg-white">
      <div className="w-full h-32 bg-gray-100 rounded-xl mb-3" />
      <h3 className="font-bold">{name}</h3>
      <p className="text-blue-500 mb-3">₩{price.toLocaleString()}</p>
      <button 
        onClick={() => navigate(`/product/${id}`)}
        className="w-full py-2 bg-gray-800 text-white rounded-lg text-sm"
      >
        상세보기
      </button>
    </div>
  );
}