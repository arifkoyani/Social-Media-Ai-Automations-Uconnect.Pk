"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, FileText, Lightbulb, Hash, ImageIcon, Layers } from "lucide-react";

function generateId(length = 10): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

type PostType = "twitter" | "static_post";

export default function GilgitAppSocialMedia() {
  const [title, setTitle] = useState("");
  const [mainIdea, setMainIdea] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [textOnImage, setTextOnImage] = useState("");
  const [type, setType] = useState<PostType>("twitter");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  const isReady =
    title.trim() !== "" &&
    mainIdea.trim() !== "" &&
    hashtags.trim() !== "" &&
    (type === "static_post" || textOnImage.trim() !== "");

  async function handleSubmit() {
    if (!isReady || status === "loading") return;

    const hashtagArray = hashtags
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean);

    const id = generateId(10);
    setStatus("loading");

    const payload: Record<string, unknown> = {
      id,
      title: title.trim(),
      main_idea: mainIdea.trim(),
      hashtags: hashtagArray,
      type,
    };

    if (type === "twitter") {
      payload.text_on_image = textOnImage.trim();
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 180000);

    try {
      const res = await fetch(
        "https://automation.uconnect.work/webhook/278776cb-a9ae-48c3-817e-9fb75a02be8d",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);
      await res.json();
      setStatus("sent");
    } catch {
      clearTimeout(timeoutId);
      setStatus("idle");
    }
  }

  function handleReset() {
    setStatus("idle");
    setTitle("");
    setMainIdea("");
    setHashtags("");
    setTextOnImage("");
    setType("twitter");
  }

  return (
    <div className="min-h-screen flex items-start justify-center p-6" style={{ backgroundColor: "#0b141d" }}>
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
            style={{ backgroundColor: "#3b82f618", border: "1px solid #3b82f640" }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#3b82f6" }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#3b82f6" }}>GilgitApp</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight" style={{ color: "#ffffff" }}>Social Media Post</h1>
          <p className="mt-2 text-sm" style={{ color: "#94a3b8" }}>
            Fill in the details and publish instantly.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6 space-y-5" style={{ backgroundColor: "#111827", border: "1px solid #1e293b" }}>

          {/* Type Toggle */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
              <Layers size={12} style={{ color: "#3b82f6" }} />
              Type
            </label>
            <div className="flex gap-2">
              {(["twitter", "static_post"] as PostType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setType(t); setTextOnImage(""); }}
                  disabled={status === "sent"}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={
                    type === t
                      ? { backgroundColor: "#3b82f6", color: "#ffffff", border: "1.5px solid #3b82f6" }
                      : { backgroundColor: "#0f172a", color: "#94a3b8", border: "1.5px solid #1e293b" }
                  }
                >
                  {t === "twitter" ? "Twitter" : "Static Post"}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
              <FileText size={12} style={{ color: "#3b82f6" }} />
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={status === "sent"}
              placeholder="Enter post title..."
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

          {/* Hashtags */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
              <Hash size={12} style={{ color: "#3b82f6" }} />
              Hashtags
            </label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              disabled={status === "sent"}
              placeholder="#tag1, #tag2, #tag3..."
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#0f172a", border: "1.5px solid #1e293b", color: "#ffffff" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
            />
            <p className="text-xs pl-1" style={{ color: "#475569" }}>Separate hashtags with commas</p>
          </div>

          {/* Text on Image — only for Twitter */}
          {type === "twitter" && (
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
                placeholder="Text to display on image..."
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#0f172a", border: "1.5px solid #1e293b", color: "#ffffff" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
              />
            </div>
          )}

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
                <span>Published! Create Another</span>
              </>
            )}
            {status === "idle" && (
              <>
                <Send size={15} />
                <span>Publish Social Media Post</span>
              </>
            )}
          </button>

          {/* Published confirmation message */}
          {status === "sent" && (
            <p className="text-center text-sm font-medium" style={{ color: "#94a3b8" }}>
              Check your{" "}
              <span style={{ color: "#3b82f6" }}>GilgitApp Social Media Buffer</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
