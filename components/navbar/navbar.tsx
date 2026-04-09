"use client";

import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav
      className="w-full flex items-center justify-between px-6 sticky top-0 z-50"
      style={{
        backgroundColor: "#0b141d",
        borderBottom: "1px solid #1e293b",
        height: "64px",
      }}
    >
      {/* Logo */}
      <Link href="/home" className="flex items-center shrink-0">
        <Image
          src="https://uconnect.pk/wp-content/uploads/2021/10/uConnect-logo.png"
          alt="uConnect Logo"
          width={140}
          height={38}
          style={{ objectFit: "contain" }}
          unoptimized
        />
      </Link>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
        style={{ color: "#94a3b8" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#1e293b";
          e.currentTarget.style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#94a3b8";
        }}
      >
        <LogOut size={15} />
        <span>Logout</span>
      </button>
    </nav>
  );
}
