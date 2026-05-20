import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useUser } from "../hooks/useUser";
import type { User } from "../types/User";

interface UserContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const { user, loading, logout } = useUser();

  return (
    <UserContext.Provider value={{ user, loading, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) throw new Error("UserProvider 안에서 사용해야 합니다");
  return context;
}