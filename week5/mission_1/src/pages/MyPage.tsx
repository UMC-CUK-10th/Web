import { useAuth } from "../contexts/AuthContext";

const MyPage = () => {
  const { user } = useAuth();

  return (
    <div className="text-center mt-20 text-xl">
      {user?.name}님의 마이페이지입니다.
    </div>
  );
};

export default MyPage;