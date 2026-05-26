import {
  Navigate,
  useLocation,
} from "react-router-dom";

import type { ReactNode } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const token =
    localStorage.getItem(
      "accessToken"
    );

  const location =
    useLocation();

  if (!token) {
    alert("로그인이 필요합니다.");

    return (
      <Navigate
        to="/login"
        state={{
          from: location,
        }}
        replace
      />
    );
  }

  return <>{children}</>;
}