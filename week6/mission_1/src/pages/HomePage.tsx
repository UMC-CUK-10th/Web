import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import useGetLPList from "../hooks/queries/useGetLPList";

const HomePage = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [order, setOrder] =
    useState("desc");

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetLPList(order);

  if (isLoading) {
    return (
      <div className="text-white">
        로딩중...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-white">
        <p>
          에러가 발생했습니다.
        </p>

        <button onClick={() => refetch()}>
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="text-white">
      {/* 상단 */}
      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >
        <h1 className="text-3xl font-bold">
          {user
            ? `${user.name}님 환영합니다`
            : "LP 목록"}
        </h1>

        {/* 정렬 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={() =>
              setOrder("desc")
            }
            className="
              px-4
              py-2
              bg-pink-500
              rounded-md
            "
          >
            최신순
          </button>

          <button
            onClick={() =>
              setOrder("asc")
            }
            className="
              px-4
              py-2
              border
              border-white
              rounded-md
            "
          >
            오래된순
          </button>
        </div>
      </div>

      {/* 카드 목록 */}
      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          lg:grid-cols-5
          gap-5
        "
      >
        {data?.data?.data?.map(
          (lp: any) => (
            <div
              key={lp.id}
              onClick={() =>
                navigate(
                  `/lp/${lp.id}`
                )
              }
              className="
                relative
                cursor-pointer
                overflow-hidden
                group
              "
            >
              {/* 이미지 */}
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="
                  w-full
                  aspect-square
                  object-cover
                  transition
                  duration-300
                  group-hover:scale-105
                "
              />

              {/* hover overlay */}
              <div
                className="
                  absolute
                  inset-0
                  bg-black/70
                  opacity-0
                  group-hover:opacity-100
                  transition
                  flex
                  flex-col
                  justify-end
                  p-3
                "
              >
                <h2 className="font-bold">
                  {lp.title}
                </h2>

                <p>
                  ❤️{" "}
                  {
                    lp.likes
                      ?.length
                  }
                </p>

                <p>
                  {new Date(
                    lp.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;