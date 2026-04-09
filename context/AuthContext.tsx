"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = localStorage.getItem("uc_auth");
    setIsLoggedIn(auth === "true");
    setChecked(true);
  }, []);

  useEffect(() => {
    if (!checked) return;
    if (!isLoggedIn && pathname !== "/") {
      router.replace("/");
    }
    if (isLoggedIn && pathname === "/") {
      router.replace("/home");
    }
  }, [isLoggedIn, checked, pathname, router]);

  function login() {
    localStorage.setItem("uc_auth", "true");
    setIsLoggedIn(true);
    router.push("/home");
  }

  function logout() {
    localStorage.removeItem("uc_auth");
    setIsLoggedIn(false);
    router.push("/");
  }

  if (!checked) return null;

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
