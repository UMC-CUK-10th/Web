import { useNavigate, useParams } from "react-router-dom";

import useGetLPDetail from "../hooks/queries/useGetLPDetail";

const LPDetailPage = () => {
  const { lpid } = useParams();

  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetLPDetail(lpid!);

  // 로딩 상태
  if (isLoading) {
    return (
      <div
        className="
          flex
          justify-center
          items-center
          h-[500px]
        "
      >
        <div
          className="
            animate-spin
            rounded-full
            h-20
            w-20
            border-b-2
            border-pink-500
          "
        />
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    return (
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          gap-5
          h-[500px]
          text-white
        "
      >
        <p className="text-2xl">
          에러가 발생했습니다.
        </p>

        <button
          onClick={() =>
            refetch()
          }
          className="
            px-5
            py-3
            bg-pink-500
            rounded-md
          "
        >
          다시 시도
        </button>
      </div>
    );
  }

  const lp = data?.data;

  return (
    <div
      className="
        text-white
        max-w-[1200px]
        mx-auto
      "
    >
      <div
        className="
          grid
          md:grid-cols-2
          gap-10
        "
      >
        {/* 썸네일 */}
        <div>
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="
              w-full
              rounded-2xl
              shadow-lg
            "
          />
        </div>

        {/* 정보 */}
        <div
          className="
            flex
            flex-col
            justify-center
          "
        >
          {/* 제목 */}
          <h1
            className="
              text-5xl
              font-bold
              mb-5
            "
          >
            {lp.title}
          </h1>

          {/* 업로드일 */}
          <p
            className="
              text-gray-400
              mb-3
            "
          >
            업로드일 :
            {" "}
            {new Date(
              lp.createdAt
            ).toLocaleDateString()}
          </p>

          {/* 좋아요 */}
          <p
            className="
              text-pink-400
              text-xl
              mb-8
            "
          >
            ❤️
            {" "}
            {lp.likes?.length}
          </p>

          {/* 본문 */}
          <div
            className="
              bg-[#222]
              p-5
              rounded-xl
              leading-8
              text-gray-200
            "
          >
            {lp.content}
          </div>

          {/* 버튼 */}
          <div
            className="
              flex
              gap-4
              mt-8
            "
          >
            <button
              className="
                px-5
                py-3
                bg-blue-500
                rounded-md
                hover:scale-105
                transition
              "
            >
              수정
            </button>

            <button
              className="
                px-5
                py-3
                bg-red-500
                rounded-md
                hover:scale-105
                transition
              "
            >
              삭제
            </button>

            <button
              className="
                px-5
                py-3
                bg-pink-500
                rounded-md
                hover:scale-105
                transition
              "
            >
              좋아요
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LPDetailPage;