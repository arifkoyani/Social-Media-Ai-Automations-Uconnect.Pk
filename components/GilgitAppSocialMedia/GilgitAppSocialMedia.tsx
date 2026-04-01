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

    try {
      const res = await fetch(
        "https://automation.uconnect.work/webhook/278776cb-a9ae-48c3-817e-9fb75a02be8d",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      await res.json();
      setStatus("sent");
    } catch {
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
    <div className="min-h-screen bg-white flex items-start justify-center p-6">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4" style={{ backgroundColor: "#e97d2615", border: "1px solid #e97d2640" }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#e97d26" }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#e97d26" }}>GilgitApp</span>
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

          {/* Type Toggle */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#454545" }}>
              <Layers size={12} style={{ color: "#e97d26" }} />
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
                      ? { backgroundColor: "#e97d26", color: "#ffffff", border: "1.5px solid #e97d26" }
                      : { backgroundColor: "#ffffff", color: "#454545", border: "1.5px solid #e5e5e5" }
                  }
                >
                  {t === "twitter" ? "Twitter" : "Static Post"}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#454545" }}>
              <FileText size={12} style={{ color: "#e97d26" }} />
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={status === "sent"}
              placeholder="Enter post title..."
              className="w-full rounded-xl px-4 py-3 text-sm text-black outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#ffffff", border: "1.5px solid #e5e5e5" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#e97d26")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
            />
          </div>

          {/* Main Idea */}
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

          {/* Hashtags */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#454545" }}>
              <Hash size={12} style={{ color: "#e97d26" }} />
              Hashtags
            </label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              disabled={status === "sent"}
              placeholder="#tag1, #tag2, #tag3..."
              className="w-full rounded-xl px-4 py-3 text-sm text-black outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#ffffff", border: "1.5px solid #e5e5e5" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#e97d26")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
            />
            <p className="text-xs pl-1" style={{ color: "#45454580" }}>Separate hashtags with commas</p>
          </div>

          {/* Text on Image — only for Twitter */}
          {type === "twitter" && (
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
                placeholder="Text to display on image..."
                className="w-full rounded-xl px-4 py-3 text-sm text-black outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#ffffff", border: "1.5px solid #e5e5e5" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#e97d26")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e5e5")}
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
            <p className="text-center text-sm font-medium" style={{ color: "#454545" }}>
              Check your{" "}
              <span style={{ color: "#e97d26" }}>GilgitApp Social Media Buffer</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
