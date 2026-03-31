"use client";

import { useAuth } from "@/context/AuthContext";
import Navbar from "./navbar";

export default function NavbarWrapper() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return null;
  return <Navbar />;
}
