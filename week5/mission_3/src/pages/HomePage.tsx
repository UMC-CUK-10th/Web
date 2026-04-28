import { useAuth } from "../contexts/AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="text-center mt-20 text-2xl">
      {user ? `${user.name}님, 환영합니다!` : "홈페이지"}
    </div>
  );
};

export default HomePage;