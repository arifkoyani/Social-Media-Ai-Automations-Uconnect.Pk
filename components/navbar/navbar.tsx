"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "WordPress", href: "/wordpress" },
  { label: "GilgitApp Blog", href: "/gilgitapp-blog" },
  { label: "GilgitApp Social Media", href: "/gilgitapp-social-media" },
  { label: "QuoHR Social Media", href: "/quohr-social-media" },
  { label: "IndexPos Social Media", href: "/indexpos-social-media" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <nav
      className="w-full flex items-center px-6 sticky top-0 z-50"
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1.5px solid #e5e5e5",
        height: "64px",
      }}
    >
      {/* Logo */}
      <Link href="/wordpress" className="flex items-center shrink-0 mr-10">
        <Image
          src="https://uconnect.pk/wp-content/uploads/2021/10/uConnect-logo.png"
          alt="uConnect Logo"
          width={140}
          height={38}
          style={{ objectFit: "contain" }}
          unoptimized
        />
      </Link>

      {/* Nav Items */}
      <div className="flex items-center gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                color: isActive ? "#e97d26" : "#454545",
                backgroundColor: isActive ? "#e97d2612" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "#f5f5f5";
                  e.currentTarget.style.color = "#000000";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#454545";
                }
              }}
            >
              {item.label}
              {isActive && (
                <span
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                  style={{ backgroundColor: "#e97d26" }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
        style={{ color: "#454545" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#e97d2612";
          e.currentTarget.style.color = "#e97d26";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#454545";
        }}
      >
        <LogOut size={15} />
        <span>Logout</span>
      </button>
    </nav>
  );
}
