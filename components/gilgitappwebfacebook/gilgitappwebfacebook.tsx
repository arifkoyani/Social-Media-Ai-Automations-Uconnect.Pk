"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle, Hash, Link2, Search, MapPin, ChevronDown, Clipboard, X } from "lucide-react";

const WEBHOOK = "https://automation.uconnect.work/webhook/725d4a81-af65-4ad7-82f3-a220f9190326";

const CITIES = [
  "Karachi", "Gilgit", "Lahore", "Multan", "Quetta",
  "Rawalpindi", "Faisalabad", "Peshawar", "Gujranwala",
  "Hyderabad-city", "Islamabad", "Bahawalpur",
];

type Tab = "id" | "url" | "search";
type Status = "idle" | "loading" | "success" | "error";

const inputClass = "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed";
const inputStyle = { backgroundColor: "#0f172a", border: "1.5px solid #1e293b", color: "#ffffff" };

async function callWebhook(body: Record<string, unknown>): Promise<{ code: string; message: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 180000);
  try {
    const res = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    const data = await res.json();
    const item = Array.isArray(data) ? data[0] : data;
    return { code: item?.code ?? "201", message: item?.message ?? "Unknown error" };
  } catch {
    clearTimeout(timeoutId);
    return { code: "201", message: "Request failed. Please try again." };
  }
}

export default function GilgitAppWebFacebook() {
  const [tab, setTab] = useState<Tab>("id");

  // Post by ID
  const [itemId, setItemId] = useState("");
  const [idStatus, setIdStatus] = useState<Status>("idle");
  const [idMsg, setIdMsg] = useState("");

  // Post by URL
  const [itemUrl, setItemUrl] = useState("");
  const [urlStatus, setUrlStatus] = useState<Status>("idle");
  const [urlMsg, setUrlMsg] = useState("");

  // Search
  const [days, setDays] = useState("");
  const [term, setTerm] = useState("");
  const [city, setCity] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [searchStatus, setSearchStatus] = useState<Status>("idle");
  const [searchMsg, setSearchMsg] = useState("");

  async function handleIdSubmit() {
    if (!itemId.trim() || idStatus === "loading") return;
    setIdStatus("loading");
    setIdMsg("");
    const { code, message } = await callWebhook({
      query: "ID",
      item_id: itemId.trim(),
    });
    setIdStatus(code === "200" ? "success" : "error");
    setIdMsg(message);
  }

  async function handleUrlSubmit() {
    if (!itemUrl.trim() || urlStatus === "loading") return;
    setUrlStatus("loading");
    setUrlMsg("");
    const { code, message } = await callWebhook({
      query: "url",
      item_url: itemUrl.trim(),
    });
    setUrlStatus(code === "200" ? "success" : "error");
    setUrlMsg(message);
  }

  async function handleSearchSubmit() {
    if (!term.trim() || !city || searchStatus === "loading") return;
    setSearchStatus("loading");
    setSearchMsg("");
    const { code, message } = await callWebhook({
      query: "search",
      number_of_days: days.trim() || undefined,
      type: term.trim().charAt(0).toUpperCase() + term.trim().slice(1),
      term: term.trim(),
      city,
    });
    setSearchStatus(code === "200" ? "success" : "error");
    setSearchMsg(message);
  }

  function resetId() { setIdStatus("idle"); setItemId(""); setIdMsg(""); }
  function resetUrl() { setUrlStatus("idle"); setItemUrl(""); setUrlMsg(""); }
  function resetSearch() { setSearchStatus("idle"); setDays(""); setTerm(""); setCity(""); setSearchMsg(""); }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "id",     label: "Post by ID",  icon: <Hash   size={13} /> },
    { key: "url",    label: "Post by URL", icon: <Link2  size={13} /> },
    { key: "search", label: "Search",      icon: <Search size={13} /> },
  ];

  // ── Shared button renderer ──────────────────────────────────────────────────
  function SubmitButton({
    status, msg, ready,
    onSubmit, onReset,
    idleLabel, loadingLabel,
  }: {
    status: Status; msg: string; ready: boolean;
    onSubmit: () => void; onReset: () => void;
    idleLabel: string; loadingLabel: string;
  }) {
    const isSuccess = status === "success";
    const isError   = status === "error";
    const isLoading = status === "loading";

    const btnStyle =
      isSuccess ? { backgroundColor: "#16a34a18", border: "1.5px solid #16a34a50", color: "#4ade80", cursor: "pointer" } :
      isError   ? { backgroundColor: "#ef444415", border: "1.5px solid #ef444430", color: "#f87171", cursor: "pointer" } :
      ready     ? { backgroundColor: "#3b82f6",   color: "#ffffff",                                  cursor: "pointer" } :
                  { backgroundColor: "#1e293b",   color: "#475569",                                  cursor: "not-allowed" };

    function handleClick() {
      if (isSuccess || isError) { onReset(); return; }
      onSubmit();
    }

    return (
      <button
        onClick={handleClick}
        disabled={isLoading || (!ready && status === "idle")}
        className="w-full flex items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold transition-all duration-300"
        style={btnStyle}
      >
        {isLoading && <><Loader2 size={15} className="animate-spin" /><span>{loadingLabel}</span></>}
        {isSuccess && <><CheckCircle2 size={15} /><span>{msg}</span></>}
        {isError   && <><AlertCircle  size={15} /><span>{msg}</span></>}
        {(status === "idle") && <><Send size={15} /><span>{idleLabel}</span></>}
      </button>
    );
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
          <h1 className="text-3xl font-bold leading-tight" style={{ color: "#ffffff" }}>Post to Facebook</h1>
          <p className="mt-2 text-sm" style={{ color: "#94a3b8" }}>
            Push GilgitApp listings directly to Facebook audiences.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#111827", border: "1px solid #1e293b" }}>

          {/* Tabs */}
          <div className="flex" style={{ borderBottom: "1px solid #1e293b" }}>
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all duration-200"
                style={{
                  cursor: "pointer",
                  color: tab === t.key ? "#3b82f6" : "#475569",
                  backgroundColor: tab === t.key ? "#3b82f608" : "transparent",
                  borderBottom: tab === t.key ? "2px solid #3b82f6" : "2px solid transparent",
                }}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-5">

            {/* ── Post by ID ── */}
            {tab === "id" && (
              <>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
                    <Hash size={12} style={{ color: "#3b82f6" }} />
                    Item ID
                  </label>
                  <div className="relative flex items-center">
                    <button
                      type="button"
                      onClick={async () => { const t = await navigator.clipboard.readText(); setItemId(t); if (idStatus !== "idle") resetId(); }}
                      disabled={idStatus === "success"}
                      title="Paste from clipboard"
                      className="absolute left-3 flex items-center justify-center rounded-lg p-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ cursor: "pointer", color: "#475569", backgroundColor: "#1e293b" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#3b82f6"; e.currentTarget.style.backgroundColor = "#3b82f620"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.backgroundColor = "#1e293b"; }}
                    >
                      <Clipboard size={15} />
                    </button>
                    <input
                      type="text"
                      value={itemId}
                      onChange={(e) => { setItemId(e.target.value); if (idStatus !== "idle") resetId(); }}
                      disabled={idStatus === "success"}
                      placeholder="Enter item ID (e.g. 144251)"
                      className={inputClass}
                      style={{ ...inputStyle, paddingLeft: "3rem", paddingRight: itemId ? "3rem" : "1rem" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
                    />
                    {itemId && (
                      <button
                        type="button"
                        onClick={() => { setItemId(""); if (idStatus !== "idle") resetId(); }}
                        disabled={idStatus === "success"}
                        title="Clear"
                        className="absolute right-3 flex items-center justify-center rounded-lg p-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ cursor: "pointer", color: "#475569", backgroundColor: "#1e293b" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.backgroundColor = "#ef444420"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.backgroundColor = "#1e293b"; }}
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>
                </div>
                <SubmitButton
                  status={idStatus} msg={idMsg} ready={!!itemId.trim()}
                  onSubmit={handleIdSubmit} onReset={resetId}
                  idleLabel="Create Post Instantly" loadingLabel="Creating Post..."
                />
              </>
            )}

            {/* ── Post by URL ── */}
            {tab === "url" && (
              <>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
                    <Link2 size={12} style={{ color: "#3b82f6" }} />
                    Item Link
                  </label>
                  <div className="relative flex items-center">
                    <button
                      type="button"
                      onClick={async () => { const t = await navigator.clipboard.readText(); setItemUrl(t); if (urlStatus !== "idle") resetUrl(); }}
                      disabled={urlStatus === "success"}
                      title="Paste from clipboard"
                      className="absolute left-3 flex items-center justify-center rounded-lg p-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ cursor: "pointer", color: "#475569", backgroundColor: "#1e293b" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#3b82f6"; e.currentTarget.style.backgroundColor = "#3b82f620"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.backgroundColor = "#1e293b"; }}
                    >
                      <Clipboard size={15} />
                    </button>
                    <input
                      type="url"
                      value={itemUrl}
                      onChange={(e) => { setItemUrl(e.target.value); if (urlStatus !== "idle") resetUrl(); }}
                      disabled={urlStatus === "success"}
                      placeholder="Paste item URL"
                      className={inputClass}
                      style={{ ...inputStyle, paddingLeft: "3rem", paddingRight: itemUrl ? "3rem" : "1rem" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
                    />
                    {itemUrl && (
                      <button
                        type="button"
                        onClick={() => { setItemUrl(""); if (urlStatus !== "idle") resetUrl(); }}
                        disabled={urlStatus === "success"}
                        title="Clear"
                        className="absolute right-3 flex items-center justify-center rounded-lg p-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ cursor: "pointer", color: "#475569", backgroundColor: "#1e293b" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.backgroundColor = "#ef444420"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.backgroundColor = "#1e293b"; }}
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>
                </div>
                <SubmitButton
                  status={urlStatus} msg={urlMsg} ready={!!itemUrl.trim()}
                  onSubmit={handleUrlSubmit} onReset={resetUrl}
                  idleLabel="Create Post Instantly" loadingLabel="Creating Post..."
                />
              </>
            )}

            {/* ── Search ── */}
            {tab === "search" && (
              <>
                {/* Days */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
                    <span style={{ color: "#3b82f6", fontSize: "11px", fontWeight: 700 }}>DAYS</span>
                  </label>
                  <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    disabled={searchStatus === "success"}
                    placeholder="e.g. 45"
                    min={1}
                    className={inputClass}
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
                  />
                </div>

                {/* Term */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
                    <Search size={12} style={{ color: "#3b82f6" }} />
                    Search Term
                  </label>
                  <input
                    type="text"
                    value={term}
                    onChange={(e) => { setTerm(e.target.value); if (searchStatus !== "idle") resetSearch(); }}
                    disabled={searchStatus === "success"}
                    placeholder="Search items (e.g. mobile)"
                    className={inputClass}
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#94a3b8" }}>
                    <MapPin size={12} style={{ color: "#3b82f6" }} />
                    Location
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      disabled={searchStatus === "success"}
                      onClick={() => setCityOpen((o) => !o)}
                      className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        ...inputStyle,
                        cursor: "pointer",
                        borderColor: cityOpen ? "#3b82f6" : "#1e293b",
                        color: city ? "#ffffff" : "#475569",
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <MapPin size={13} style={{ color: "#3b82f6" }} />
                        {city || "Select city"}
                      </span>
                      <ChevronDown
                        size={14}
                        style={{
                          color: "#94a3b8",
                          transform: cityOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                        }}
                      />
                    </button>

                    {cityOpen && (
                      <div
                        className="absolute top-full left-0 right-0 mt-1 rounded-xl z-30"
                        style={{ backgroundColor: "#0f172a", border: "1.5px solid #1e293b", maxHeight: "220px", overflowY: "auto" }}
                      >
                        {CITIES.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => { setCity(c); setCityOpen(false); }}
                            className="w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all duration-150"
                            style={{ cursor: "pointer", color: city === c ? "#3b82f6" : "#94a3b8" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e293b")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                          >
                            <span className="flex items-center gap-2">
                              <MapPin size={12} style={{ color: "#3b82f6", opacity: 0.6 }} />
                              {c}
                            </span>
                            {city === c && <CheckCircle2 size={13} style={{ color: "#3b82f6" }} />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <SubmitButton
                  status={searchStatus} msg={searchMsg} ready={!!term.trim() && !!city}
                  onSubmit={handleSearchSubmit} onReset={resetSearch}
                  idleLabel="Search & Create Posts" loadingLabel="Creating Posts..."
                />
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
