"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, FileText, Lightbulb, Tag, ExternalLink, ShoppingBag } from "lucide-react";

function generateId(length = 10): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function GilgitApp() {
  const [blogTitle, setBlogTitle] = useState("");
  const [mainIdea, setMainIdea] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [blogLink, setBlogLink] = useState<string | null>(null);

  const isReady =
    blogTitle.trim() !== "" &&
    mainIdea.trim() !== "" &&
    seoKeywords.trim() !== "";

  async function handleSubmit() {
    if (!isReady || status === "loading") return;

    const keywords = seoKeywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    const id = generateId(10);
    setStatus("loading");
    setBlogLink(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 180000);

    try {
      const res = await fetch(
        "https://automation.uconnect.work/webhook/c63f130e-974f-4590-9234-d2d540d833b4",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            blog_title: blogTitle.trim(),
            main_idea: mainIdea.trim(),
            seo_keywords: keywords,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);
      const data = await res.json();
      const link = Array.isArray(data) ? data[0]?.link : data?.link;

      setStatus("sent");
      if (link) setBlogLink(link);
    } catch {
      clearTimeout(timeoutId);
      setStatus("idle");
    }
  }

  function handleReset() {
    setStatus("idle");
    setBlogTitle("");
    setMainIdea("");
    setSeoKeywords("");
    setBlogLink(null);
  }

  return (
    <div className="min-h-screen flex items-start justify-center p-6" style={{ backgroundColor: "#0b141d" }}>
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
            style={{ backgroundColor: "#3b82f618", border: "1px solid #3b82f640" }}>
            <ShoppingBag size={11} style={{ color: "#3b82f6" }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#3b82f6" }}>GilgitApp</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight" style={{ color: "#ffffff" }}>Create Blog Post</h1>
          <p className="mt-2 text-sm" style={{ color: "#94a3b8" }}>
            Fill in the details and publish instantly.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6 space-y-5" style={{ backgroundColor: "#111827", border: "1px solid #1e293b" }}>

          {/* Blog Title */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
              <FileText size={12} style={{ color: "#3b82f6" }} />
              Blog Title
            </label>
            <input
              type="text"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              disabled={status === "sent"}
              placeholder="Enter your blog title..."
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#0f172a", border: "1.5px solid #1e293b", color: "#ffffff" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
            />
          </div>

          {/* Main Idea */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
              <Lightbulb size={12} style={{ color: "#3b82f6" }} />
              Main Idea / Topic
            </label>
            <input
              type="text"
              value={mainIdea}
              onChange={(e) => setMainIdea(e.target.value)}
              disabled={status === "sent"}
              placeholder="Enter the main idea or topic..."
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#0f172a", border: "1.5px solid #1e293b", color: "#ffffff" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
            />
          </div>

          {/* SEO Keywords */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
              <Tag size={12} style={{ color: "#3b82f6" }} />
              SEO Keywords
            </label>
            <input
              type="text"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              disabled={status === "sent"}
              placeholder="keyword1, keyword2, keyword3..."
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#0f172a", border: "1.5px solid #1e293b", color: "#ffffff" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
            />
            <p className="text-xs pl-1" style={{ color: "#475569" }}>Separate keywords with commas</p>
          </div>

          {/* Submit Button */}
          <button
            onClick={status === "sent" ? handleReset : handleSubmit}
            disabled={(!isReady && status === "idle") || status === "loading"}
            className="w-full mt-2 flex items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold transition-all duration-300"
            style={
              status === "sent"
                ? { backgroundColor: "#16a34a18", border: "1.5px solid #16a34a50", color: "#4ade80", cursor: "pointer" }
                : isReady
                ? { backgroundColor: "#3b82f6", color: "#ffffff", cursor: "pointer" }
                : { backgroundColor: "#1e293b", border: "1.5px solid #1e293b", color: "#475569", cursor: "not-allowed" }
            }
          >
            {status === "loading" && (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>Creating Blog...</span>
              </>
            )}
            {status === "sent" && (
              <>
                <CheckCircle2 size={15} />
                <span>Blog Created! Create Another</span>
              </>
            )}
            {status === "idle" && (
              <>
                <Send size={15} />
                <span>Create GilgitApp Blog</span>
              </>
            )}
          </button>

          {/* Blog Link */}
          {blogLink && (
            <a
              href={blogLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold transition-all duration-200"
              style={{ backgroundColor: "#0f172a", border: "1.5px solid #1e293b", color: "#94a3b8" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1e293b";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#0f172a";
                e.currentTarget.style.color = "#94a3b8";
              }}
            >
              <ExternalLink size={15} />
              <span>View Published Blog</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
