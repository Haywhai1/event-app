"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

/* ✅ TYPE */
type UserType = {
  name: string;
  email: string;
  gender?: "male" | "female" | null;
  bio?: string;
  location?: string;
};

/* ✅ CONTEXT TYPE */
type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

/* ✅ PROVIDER */
export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!session) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/user/me");
        const data = await res.json();
        setUser(data);
      } catch {
        console.log("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [session]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

/* ✅ HOOK */
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}