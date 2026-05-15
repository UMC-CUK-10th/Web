import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { deleteMyAccount, getMyInfo, postLogout } from "../apis/auth";
import LpCreateModal from "../components/LpCreateModal";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

const HomeLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getItem: getAccessToken, removeItem: removeAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { getItem: getUserName, setItem: setUserName, removeItem: removeUserName } =
    useLocalStorage(LOCAL_STORAGE_KEY.userName);
  const { removeItem: removeRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!getAccessToken());
  const [userName, setCurrentUserName] = useState<string>(() => getUserName() ?? "");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLpCreateModalOpen, setIsLpCreateModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [authActionError, setAuthActionError] = useState("");

  useEffect(() => {
    const accessToken = getAccessToken();
    const storedUserName = getUserName();

    setIsLoggedIn(!!accessToken);
    setCurrentUserName(storedUserName ?? "");

    if (!accessToken || storedUserName) {
      return;
    }

    const syncUserName = async () => {
      try {
        const response = await getMyInfo();
        setUserName(response.data.name);
        setCurrentUserName(response.data.name);
      } catch (error) {
        console.error(error);
      }
    };

    syncUserName();
  }, [getAccessToken, getUserName, location.pathname, setUserName]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const clearAuthState = () => {
    removeAccessToken();
    removeRefreshToken();
    removeUserName();
    setIsLoggedIn(false);
    setCurrentUserName("");
  };

  const logoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      clearAuthState();
      setAuthActionError("");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.error(error);
      clearAuthState();
      navigate("/", { replace: true });
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: deleteMyAccount,
    onSuccess: () => {
      clearAuthState();
      setIsWithdrawModalOpen(false);
      setAuthActionError("");
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      console.error(error);
      setAuthActionError("회원 탈퇴에 실패했습니다.");
    },
  });

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-rose-600" : "text-rose-900/70 hover:text-rose-700"
    }`;

  const sidebarLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
      isActive
        ? "bg-rose-100 text-rose-700"
        : "text-rose-900/70 hover:bg-rose-50 hover:text-rose-700"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100 text-gray-900">
      <header className="border-b border-rose-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-black tracking-tight text-rose-900">
              히히
            </Link>

            <button
              type="button"
              aria-label="사이드바 열기"
              aria-expanded={isSidebarOpen}
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="rounded-2xl border border-rose-200 bg-white/80 p-2 text-rose-700 transition-colors hover:border-rose-400 hover:text-rose-600 lg:hidden"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M7.95 11.95h32m-32 12h32m-32 12h32"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:gap-8">
            <nav className="hidden flex-wrap items-center gap-4 md:gap-6 lg:flex">
              <NavLink to="/" end className={navLinkClass}>
                홈
              </NavLink>
              {isLoggedIn ? (
                <NavLink to="/mypage" className={navLinkClass}>
                  마이페이지
                </NavLink>
              ) : (
                <>
                  <NavLink to="/login" className={navLinkClass}>
                    로그인
                  </NavLink>
                  <NavLink to="/signup" className={navLinkClass}>
                    회원가입
                  </NavLink>
                </>
              )}
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              {isLoggedIn ? (
                <>
                  <p className="text-sm font-semibold text-rose-900">
                    {userName}님 반갑습니다.
                  </p>
                  <button
                    type="button"
                    onClick={async () => {
                      setAuthActionError("");
                      try {
                        await logoutMutation.mutateAsync();
                      } catch {
                        return;
                      }
                    }}
                    disabled={logoutMutation.isPending}
                    className="rounded-full border border-rose-300 bg-white/80 px-4 py-2 text-sm font-semibold text-rose-700 transition-colors hover:border-rose-500 hover:text-rose-600"
                  >
                    {logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-full border border-rose-300 bg-white/80 px-4 py-2 text-sm font-semibold text-rose-700 transition-colors hover:border-rose-500 hover:text-rose-600"
                  >
                    로그인
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-pink-600"
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="사이드바 닫기"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-rose-950/30 lg:hidden"
        />
      )}

      <div className="mx-auto flex min-h-[calc(100vh-89px)] w-full max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:py-10">
        <aside
          className={`fixed top-0 left-0 z-50 flex h-full w-72 flex-col rounded-r-[32px] bg-white/95 p-6 shadow-2xl ring-1 ring-rose-200 backdrop-blur transition-transform duration-300 lg:static lg:h-auto lg:w-64 lg:translate-x-0 lg:rounded-[32px] lg:bg-white/70 lg:p-5 lg:shadow-lg ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-400">
              Navigation
            </p>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-full p-2 text-rose-600 transition-colors hover:bg-rose-100"
              aria-label="메뉴 닫기"
            >
              X
            </button>
          </div>

          <div className="space-y-2">
            <p className="hidden text-xs font-bold uppercase tracking-[0.3em] text-rose-400 lg:block">
              Navigation
            </p>
            <nav className="flex flex-col gap-2">
              <NavLink to="/" end className={sidebarLinkClass}>
                홈
              </NavLink>
              {isLoggedIn ? (
                <>
                  <NavLink to="/mypage" className={sidebarLinkClass}>
                    마이페이지
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => {
                      setIsWithdrawModalOpen(true);
                      setAuthActionError("");
                    }}
                    className="rounded-2xl px-4 py-3 text-left text-sm font-semibold text-red-500 transition-colors hover:bg-rose-50"
                  >
                    탈퇴하기
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={sidebarLinkClass}>
                    로그인
                  </NavLink>
                  <NavLink to="/signup" className={sidebarLinkClass}>
                    회원가입
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>

      <button
        type="button"
        aria-label={isLoggedIn ? "LP 글 작성 모달 열기" : "회원가입 페이지로 이동"}
        onClick={() => {
          if (isLoggedIn) {
            setIsLpCreateModalOpen(true);
            return;
          }

          navigate("/signup");
        }}
        className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 text-3xl font-light text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
      >
        +
      </button>

      <LpCreateModal
        isOpen={isLpCreateModalOpen}
        onClose={() => setIsLpCreateModalOpen(false)}
      />

      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-rose-950/45 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[28px] bg-white p-6 shadow-2xl ring-1 ring-rose-100">
            <h2 className="text-xl font-black text-rose-950">정말 탈퇴하시겠습니까?</h2>
            <p className="mt-3 text-sm text-rose-900/70">
              탈퇴하면 계정 정보와 작성한 데이터가 삭제됩니다.
            </p>
            {authActionError && (
              <p className="mt-3 text-sm text-red-500">{authActionError}</p>
            )}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsWithdrawModalOpen(false);
                  setAuthActionError("");
                }}
                className="flex-1 rounded-2xl border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-50"
              >
                아니오
              </button>
              <button
                type="button"
                onClick={async () => {
                  setAuthActionError("");
                  try {
                    await withdrawMutation.mutateAsync();
                  } catch {
                    return;
                  }
                }}
                disabled={withdrawMutation.isPending}
                className="flex-1 rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {withdrawMutation.isPending ? "탈퇴 중..." : "예"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeLayout;
