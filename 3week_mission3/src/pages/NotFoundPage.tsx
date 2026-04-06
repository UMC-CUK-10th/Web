import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">페이지를 찾을 수 없습니다.</p>
      <button 
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-[#D8B4FE] text-white rounded-lg font-bold"
      >
        홈으로 이동
      </button>
    </div>
  );
};

export default NotFoundPage;