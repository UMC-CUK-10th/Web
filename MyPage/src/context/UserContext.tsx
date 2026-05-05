import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// 유저 데이터 타입 정의
interface User {
  name: string;
  email: string;
  id: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isInitialized: boolean;
  setIsInitialized: (val: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// context/UserContext.tsx
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, isInitialized, setIsInitialized }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};