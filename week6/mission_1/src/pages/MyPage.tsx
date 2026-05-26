import { useAuth } from "../contexts/AuthContext";

const MyPage = () => {
  const { user } = useAuth();

  return (
    <div className="text-white">
      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        마이페이지
      </h1>

      <div
        className="
          bg-[#222]
          p-6
          rounded-xl
          max-w-[500px]
        "
      >
        <p className="text-2xl mb-3">
          {user?.name}님
          반갑습니다 👋
        </p>

        <p className="text-gray-400">
          이메일:
          {" "}
          {user?.email}
        </p>
      </div>
    </div>
  );
};

export default MyPage;