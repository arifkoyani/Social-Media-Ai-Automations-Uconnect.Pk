"use client";

import Link from "next/link";
import { FileText, Share2, Users, BarChart2 } from "lucide-react";

const cards = [
  {
    label: "Gilgit Blog",
    description: "Generate and publish SEO-optimised blog posts to the GilgitApp site.",
    href: "/gilgitapp-blog",
    icon: FileText,
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.35)",
  },
  {
    label: "Gilgit Social",
    description: "Create and schedule social media posts for GilgitApp channels.",
    href: "/gilgitapp-social-media",
    icon: Share2,
    color: "#2563eb",
    glow: "rgba(37,99,235,0.35)",
  },
  {
    label: "QuoHR Feed",
    description: "Automate HR-focused social content and push to Buffer for QuoHR.",
    href: "/quohr-social-media",
    icon: Users,
    color: "#1d4ed8",
    glow: "rgba(29,78,216,0.35)",
  },
  {
    label: "IndexPos Feed",
    description: "Build and publish POS-focused social posts across multiple channels.",
    href: "/indexpos-social-media",
    icon: BarChart2,
    color: "#60a5fa",
    glow: "rgba(96,165,250,0.35)",
  },
  {
    label: "GilgitApp Web To FB",
    description: "Push GilgitApp marketplace listings directly to Facebook audiences.",
    href: "/gilgitapp-to-facebook",
    icon: Share2,
    color: "#1e40af",
    glow: "rgba(30,64,175,0.35)",
  },
];

export default function AllCards() {
  return (
    <div
      className="min-h-screen flex flex-col items-start justify-center px-2 py-4"
      style={{ backgroundColor: "#0b141d" }}
    >
      {/* Heading */}
      <div className="text-center mb-2 max-w-2xl">
        <h1 className="text-4xl font-bold text-white leading-tight tracking-tight">
          Create, Manage &amp; Automate Posts from One Place
        </h1>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
          Create blog, social, and marketplace posts from structured data and automate publishing across multiple channels.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-4xl">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group relative rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300"
              style={{
                backgroundColor: "#111827",
                border: `1px solid ${card.color}30`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = `1px solid ${card.color}80`;
                e.currentTarget.style.boxShadow = `0 0 32px ${card.glow}`;
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = `1px solid ${card.color}30`;
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${card.color}18`, border: `1px solid ${card.color}40` }}
              >
                <Icon size={18} style={{ color: card.color }} />
              </div>

              {/* Text */}
              <div>
                <p className="text-base font-semibold text-white">{card.label}</p>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: "#64748b" }}>
                  {card.description}
                </p>
              </div>

              {/* Arrow */}
              <div
                className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: card.color }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
