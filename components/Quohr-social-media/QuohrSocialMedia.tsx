"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, Target, MessageSquare, ImageIcon, ExternalLink } from "lucide-react";

function generateId(length = 10): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function QuohrSocialMedia() {
  const [postGoal, setPostGoal] = useState("");
  const [coreMessage, setCoreMessage] = useState("");
  const [textOnImage, setTextOnImage] = useState("");
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

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 180000);

    try {
      const res = await fetch(
        "https://automation.uconnect.work/webhook/34dacf19-082e-4264-b50b-258d4d84653d",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            post_goal: postGoal.trim(),
            core_message: coreMessage.trim(),
            text_on_image: textOnImage.trim(),
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);
      const data = await res.json();
      const link = Array.isArray(data) ? data[0]?.Link : data?.Link;

      setStatus("sent");
      if (link) setBufferLink(link);
    } catch {
      clearTimeout(timeoutId);
      setStatus("idle");
    }
  }

  function handleReset() {
    setStatus("idle");
    setPostGoal("");
    setCoreMessage("");
    setTextOnImage("");
    setBufferLink(null);
  }

  return (
    <div className="min-h-screen flex items-start justify-center p-6" style={{ backgroundColor: "#0b141d" }}>
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
            style={{ backgroundColor: "#3b82f618", border: "1px solid #3b82f640" }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#3b82f6" }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#3b82f6" }}>QuoHR</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight" style={{ color: "#ffffff" }}>Social Media Post</h1>
          <p className="mt-2 text-sm" style={{ color: "#94a3b8" }}>
            Fill in the details and publish instantly.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6 space-y-5" style={{ backgroundColor: "#111827", border: "1px solid #1e293b" }}>

          {/* Post Goal */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
              <Target size={12} style={{ color: "#3b82f6" }} />
              Post Goal
            </label>
            <input
              type="text"
              value={postGoal}
              onChange={(e) => setPostGoal(e.target.value)}
              disabled={status === "sent"}
              placeholder="What is the goal of this post?"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#0f172a", border: "1.5px solid #1e293b", color: "#ffffff" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
            />
          </div>

          {/* Core Message */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
              <MessageSquare size={12} style={{ color: "#3b82f6" }} />
              Core Message
            </label>
            <input
              type="text"
              value={coreMessage}
              onChange={(e) => setCoreMessage(e.target.value)}
              disabled={status === "sent"}
              placeholder="Enter the core message..."
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#0f172a", border: "1.5px solid #1e293b", color: "#ffffff" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
            />
          </div>

          {/* Text on Image */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
              <ImageIcon size={12} style={{ color: "#3b82f6" }} />
              Text on Image
            </label>
            <input
              type="text"
              value={textOnImage}
              onChange={(e) => setTextOnImage(e.target.value)}
              disabled={status === "sent"}
              placeholder="Text to display on the image..."
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#0f172a", border: "1.5px solid #1e293b", color: "#ffffff" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
            />
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
                <span>Publishing...</span>
              </>
            )}
            {status === "sent" && (
              <>
                <CheckCircle2 size={15} />
                <span>Post Created! Create Another</span>
              </>
            )}
            {status === "idle" && (
              <>
                <Send size={15} />
                <span>Publish Social Media Post</span>
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
              <span>Open Buffer Account</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
