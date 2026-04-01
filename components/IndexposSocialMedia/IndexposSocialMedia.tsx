"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, Target, MessageSquare, ImageIcon, Layers, Globe, ExternalLink } from "lucide-react";

function generateId(length = 10): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

type PostType = "poster" | "twitter";
type Language = "english" | "urdu";

export default function IndexposSocialMedia() {
  const [postGoal, setPostGoal] = useState("");
  const [coreMessage, setCoreMessage] = useState("");
  const [textOnImage, setTextOnImage] = useState("");
  const [type, setType] = useState<PostType>("poster");
  const [language, setLanguage] = useState<Language>("english");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [bufferLink, setBufferLink] = useState<string | null>(null);

  const isReady =
    postGoal.trim() !== "" &&
    coreMessage.trim() !== "" &&
    textOnImage.trim() !== "";

  async function handleSubmit() {
    if (!isReady || status === "loading") return;

    const id = generateId(10);
    setStatus("loading");
    setBufferLink(null);

    try {
      const res = await fetch(
        "https://automation.uconnect.work/webhook/7092a879-8ad5-4cbe-bac7-5a62fbcae4ef",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            post_goal: postGoal.trim(),
            core_message: coreMessage.trim(),
            text_on_image: textOnImage.trim(),
            type,
            language,
          }),
        }
      );

      const data = await res.json();
      const link = Array.isArray(data)
        ? (data[0]?.link ?? data[0]?.Link)
        : (data?.link ?? data?.Link);

      setStatus("sent");
      if (link) setBufferLink(link);
    } catch {
      setStatus("idle");
    }
  }

  function handleReset() {
    setStatus("idle");
    setPostGoal("");
    setCoreMessage("");
    setTextOnImage("");
    setType("poster");
    setLanguage("english");
    setBufferLink(null);
  }

  const selectClass = "w-full rounded-xl px-4 py-3 text-sm text-black outline-none transition-all duration-200 appearance-none disabled:opacity-40 disabled:cursor-not-allowed";
  const selectStyle = { backgroundColor: "#ffffff", border: "1.5px solid #e5e5e5" };

  return (
    <div className="min-h-screen bg-white flex items-start justify-center p-6">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4" style={{ backgroundColor: "#e97d2615", border: "1px solid #e97d2640" }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#e97d26" }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#e97d26" }}>IndexPos</span>
          </div>
          <h1 className="text-3xl font-bold text-black leading-tight">
            Social Media Post
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#454545" }}>
            Fill in the details and publish instantly.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6 space-y-5" style={{ backgroundColor: "#f9f9f9", border: "1px solid #e5e5e5" }}>

          {/* Post Goal */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#454545" }}>
              <Target size={12} style={{ color: "#e97d26" }} />
              Post Goal
            </label>
            <input
              type="text"
              value={postGoal}
              onChange={(e) => setPostGoal(e.target.value)}
              disabled={status === "sent"}
              placeholder="What is the goal of this post?"
              className="w-full rounded-xl px-4 py-3 text-sm text-black outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#ffffff", border: "1.5px solid #e5e5e5" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#e97d26")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
            />
          </div>

          {/* Core Message */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#454545" }}>
              <MessageSquare size={12} style={{ color: "#e97d26" }} />
              Core Message
            </label>
            <input
              type="text"
              value={coreMessage}
              onChange={(e) => setCoreMessage(e.target.value)}
              disabled={status === "sent"}
              placeholder="Enter the core message..."
              className="w-full rounded-xl px-4 py-3 text-sm text-black outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#ffffff", border: "1.5px solid #e5e5e5" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#e97d26")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
            />
          </div>

          {/* Text on Image */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#454545" }}>
              <ImageIcon size={12} style={{ color: "#e97d26" }} />
              Text on Image
            </label>
            <input
              type="text"
              value={textOnImage}
              onChange={(e) => setTextOnImage(e.target.value)}
              disabled={status === "sent"}
              placeholder="Text to display on the image..."
              className="w-full rounded-xl px-4 py-3 text-sm text-black outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#ffffff", border: "1.5px solid #e5e5e5" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#e97d26")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
            />
          </div>

          {/* Type & Language row */}
          <div className="grid grid-cols-2 gap-4">

            {/* Type */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#454545" }}>
                <Layers size={12} style={{ color: "#e97d26" }} />
                Type
              </label>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as PostType)}
                  disabled={status === "sent"}
                  className={selectClass}
                  style={selectStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#e97d26")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
                >
                  <option value="poster">Poster</option>
                  <option value="twitter">Twitter</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#e97d26" }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#454545" }}>
                <Globe size={12} style={{ color: "#e97d26" }} />
                Language
              </label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  disabled={status === "sent"}
                  className={selectClass}
                  style={selectStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#e97d26")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
                >
                  <option value="english">English</option>
                  <option value="urdu">Urdu</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#e97d26" }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
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
                <span>Publishing...</span>
              </>
            )}
            {status === "sent" && (
              <>
                <CheckCircle2 size={15} />
                <span>Draft Created! Create Another</span>
              </>
            )}
            {status === "idle" && (
              <>
                <Send size={15} />
                <span>Create IndexPos Social Media Post</span>
              </>
            )}
          </button>

          {/* Buffer Link */}
          {bufferLink && (
            <a
              href={bufferLink}
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
              <span>Open Buffer Draft Post</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
