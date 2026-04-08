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
    const timeoutId = setTimeout(() => controller.abort(), 180000); // 3 minutes

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
    <div className="min-h-screen flex items-start justify-center p-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #fff8f3 0%, #ffffff 50%, #f5f9ff 100%)" }}
    >
      {/* Background decorative blobs */}
      <div className="pointer-events-none select-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #e97d2630 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #e97d2625 0%, transparent 70%)" }} />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #e97d2620 0%, transparent 70%)" }} />

        {/* Grid pattern overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#000" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="w-full max-w-lg relative z-10">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
            style={{ backgroundColor: "#e97d2615", border: "1px solid #e97d2640" }}>
            <ShoppingBag size={11} style={{ color: "#e97d26" }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#e97d26" }}>GilgitApp</span>
          </div>
          <h1 className="text-3xl font-bold text-black leading-tight">Create Blog Post</h1>
          <p className="mt-2 text-sm" style={{ color: "#454545" }}>
            Fill in the details and publish instantly.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6 space-y-5"
          style={{ backgroundColor: "rgba(255,255,255,0.85)", border: "1px solid #e5e5e5", backdropFilter: "blur(12px)" }}>

          {/* Blog Title */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#454545" }}>
              <FileText size={12} style={{ color: "#e97d26" }} />
              Blog Title
            </label>
            <input
              type="text"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              disabled={status === "sent"}
              placeholder="Enter your blog title..."
              className="w-full rounded-xl px-4 py-3 text-sm text-black outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#ffffff", border: "1.5px solid #e5e5e5" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#e97d26")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
            />
          </div>

          {/* Main Idea / Topic */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#454545" }}>
              <Lightbulb size={12} style={{ color: "#e97d26" }} />
              Main Idea / Topic
            </label>
            <input
              type="text"
              value={mainIdea}
              onChange={(e) => setMainIdea(e.target.value)}
              disabled={status === "sent"}
              placeholder="Enter the main idea or topic..."
              className="w-full rounded-xl px-4 py-3 text-sm text-black outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#ffffff", border: "1.5px solid #e5e5e5" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#e97d26")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
            />
          </div>

          {/* SEO Keywords */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#454545" }}>
              <Tag size={12} style={{ color: "#e97d26" }} />
              SEO Keywords
            </label>
            <input
              type="text"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              disabled={status === "sent"}
              placeholder="keyword1, keyword2, keyword3..."
              className="w-full rounded-xl px-4 py-3 text-sm text-black outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#ffffff", border: "1.5px solid #e5e5e5" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#e97d26")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
            />
            <p className="text-xs pl-1" style={{ color: "#45454580" }}>Separate keywords with commas</p>
          </div>

          {/* Submit Button */}
          <button
            onClick={status === "sent" ? handleReset : handleSubmit}
            disabled={(!isReady && status === "idle") || status === "loading"}
            className="w-full mt-2 flex items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold transition-all duration-300"
            style={
              status === "sent"
                ? { backgroundColor: "#e97d2618", border: "1.5px solid #e97d2650", color: "#e97d26", cursor: "pointer" }
                : isReady
                ? { backgroundColor: "#e97d26", color: "#ffffff", cursor: "pointer" }
                : { backgroundColor: "#f0f0f0", border: "1.5px solid #e5e5e5", color: "#45454560", cursor: "not-allowed" }
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
              style={{ backgroundColor: "#ffffff", border: "1.5px solid #454545", color: "#454545" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#454545";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#454545";
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
