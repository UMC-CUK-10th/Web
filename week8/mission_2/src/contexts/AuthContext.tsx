import {
  createContext,
  useState,
  useContext,
} from "react";

import type {
  ReactNode,
} from "react";

interface User {
  id: number;
  name: string;
  email: string;

  // 추가
  bio?: string | null;
  avatar?: string | null;
}

interface AuthContextType {
  user: User | null;

  setUser: (
    user: User | null
  ) => void;
}

const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [
    user,
    setUserState,
  ] = useState<User | null>(
    () => {
      const saved =
        localStorage.getItem(
          "user"
        );

      return saved
        ? JSON.parse(saved)
        : null;
    }
  );

  const setUser = (
    user: User | null
  ) => {
    setUserState(user);

    if (user) {
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(
        "user"
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth =
  () => {
    const context =
      useContext(
        AuthContext
      );

    if (!context) {
      throw new Error(
        "useAuth must be used within AuthProvider"
      );
    }

    return context;
  };