"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaLock, FaRedo } from "react-icons/fa";
import { Challenge } from "@/data/ctfChallenges";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

interface Theme {
  card: string;
  border: string;
  muted: string;
  accent: string;
  darkMode: boolean;
}

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: "bg-green-500/20 text-green-500 border-green-500/30",
  Medium: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  Hard: "bg-red-500/20 text-red-500 border-red-500/30",
};

export default function ChallengeCard({
  challenge,
  theme,
  solved,
  onSolved,
}: {
  challenge: Challenge;
  theme: Theme;
  solved: boolean;
  onSolved: (id: string) => void;
}) {
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<"idle" | "correct" | "wrong" | "checking">(solved ? "correct" : "idle");
  const [showHint, setShowHint] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [flashKey, setFlashKey] = useState(0);

  // Side effects that plant this challenge's payload where it's meant to be found.
  useEffect(() => {
    if (!challenge.payload) return;
    switch (challenge.type) {
      case "cookie":
        document.cookie = `debug_session=${challenge.payload}; path=/; max-age=3600`;
        break;
      case "localstorage":
        try {
          localStorage.setItem("debug_token", challenge.payload);
        } catch {}
        break;
      case "sessionstorage":
        try {
          sessionStorage.setItem("session_debug", challenge.payload);
        } catch {}
        break;
      case "console":
        // eslint-disable-next-line no-console
        console.log("%c[intel] " + challenge.payload, "color:#22d3ee");
        break;
      case "urlparam":
        if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search);
          setUnlocked(params.get(challenge.id.replace("ctf-", "ctf")) === "reveal");
        }
        break;
      default:
        break;
    }
  }, [challenge]);

  useEffect(() => {
    if (challenge.type === "network") {
      fetch("/ctf-data/intel.json").catch(() => {});
    }
  }, [challenge.type]);

  const runTitleFlash = () => {
    if (!challenge.payload || typeof document === "undefined") return;
    const original = document.title;
    document.title = `payload:${challenge.payload}`;
    window.setTimeout(() => {
      document.title = original;
    }, 2500);
    setFlashKey((k) => k + 1);
  };

  useEffect(() => {
    if (challenge.type === "title-flash") {
      runTitleFlash();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenge.type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const attempt = guess.trim();
    if (!attempt) return;
    setResult("checking");
    const hash = await sha256Hex(attempt);
    if (hash === challenge.flagHash) {
      setResult("correct");
      onSolved(challenge.id);
    } else {
      setResult("wrong");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`${theme.card} rounded-lg p-5 border ${solved ? "border-green-500/50" : theme.border} backdrop-blur-sm relative`}
    >
      {solved && (
        <span className="absolute top-3 right-3 text-green-500">
          <FaCheckCircle size={18} />
        </span>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className={`text-[10px] px-2 py-0.5 rounded border ${theme.border} ${theme.muted} uppercase tracking-wide`}>
          {challenge.category}
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded border ${DIFFICULTY_COLOR[challenge.difficulty]}`}>
          {challenge.difficulty}
        </span>
        <span className={`text-[10px] ${theme.muted} ml-auto font-mono`}>{challenge.points} pts</span>
      </div>

      <h3 className="font-semibold mb-1">{challenge.title}</h3>
      <p className={`text-sm ${theme.muted} mb-3`}>{challenge.description}</p>

      {/* Type-specific reveal surface */}
      {challenge.type === "dom-hidden" && challenge.payload && (
        <p className={`text-xs ${theme.muted} mb-3 italic`}>
          A quiet card holds more than it shows.
          <span className="sr-only">{challenge.payload}</span>
        </p>
      )}

      {challenge.type === "attribute" && challenge.payload && (
        <div
          data-flag={challenge.payload}
          data-widget="status"
          className={`mb-3 p-3 rounded border ${theme.border} ${theme.darkMode ? "bg-black/30" : "bg-gray-100"} text-xs font-mono flex justify-between`}
        >
          <span>uptime: 41d 06h</span>
          <span className="text-green-500">● online</span>
        </div>
      )}

      {(challenge.type === "code" || challenge.type === "zerowidth") && challenge.payload && (
        <div className={`mb-3 p-3 rounded border ${theme.border} ${theme.darkMode ? "bg-black/40" : "bg-gray-100"} overflow-x-auto`}>
          <code className="text-xs break-all whitespace-pre-wrap">{challenge.payload}</code>
        </div>
      )}

      {challenge.type === "css-ghost" && challenge.payload && (
        <div className={`mb-3 p-3 rounded border ${theme.border} ${theme.darkMode ? "bg-black/30" : "bg-gray-100"} text-xs font-mono`}>
          <style>{`.css-ghost-${challenge.id}::after { content: "${challenge.payload}"; font-size: 0; }`}</style>
          empty element: <span className={`css-ghost-${challenge.id}`}></span>
        </div>
      )}

      {challenge.type === "title-flash" && (
        <button
          type="button"
          onClick={runTitleFlash}
          className={`mb-3 text-xs px-3 py-1.5 rounded border ${theme.border} flex items-center gap-2 ${theme.muted} ${theme.darkMode ? "hover:text-cyan-400" : "hover:text-cyan-600"}`}
        >
          <FaRedo size={10} /> Replay flash {flashKey > 0 ? `(${flashKey})` : ""}
        </button>
      )}

      {challenge.type === "urlparam" && (
        <div className={`mb-3 p-3 rounded border ${theme.border} ${theme.darkMode ? "bg-black/30" : "bg-gray-100"} text-xs font-mono`}>
          {unlocked && challenge.payload ? (
            <code className="break-all">{challenge.payload}</code>
          ) : (
            <span className={`flex items-center gap-2 ${theme.muted}`}>
              <FaLock size={10} /> locked - wrong query, or none supplied
            </span>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowHint((v) => !v)}
        className={`text-xs mb-3 underline ${theme.accent}`}
      >
        {showHint ? "Hide hint" : "Show hint"}
      </button>
      {showHint && <p className={`text-xs ${theme.muted} mb-3 font-mono`}>{challenge.hint}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={guess}
          onChange={(e) => {
            setGuess(e.target.value);
            if (result !== "correct") setResult("idle");
          }}
          placeholder="FLAG{...}"
          spellCheck={false}
          autoComplete="off"
          disabled={result === "correct"}
          className={`flex-1 px-3 py-1.5 rounded-lg border ${theme.border} ${theme.darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"} font-mono text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-60`}
        />
        <button
          type="submit"
          disabled={result === "checking" || result === "correct"}
          className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-medium hover:from-cyan-500 hover:to-blue-500 transition-all disabled:opacity-50"
        >
          {result === "correct" ? "Solved" : "Submit"}
        </button>
      </form>

      {result === "correct" && (
        <p className="mt-2 flex items-center gap-2 text-green-500 text-xs font-medium">
          <FaCheckCircle /> Correct.
        </p>
      )}
      {result === "wrong" && (
        <p className="mt-2 flex items-center gap-2 text-red-500 text-xs font-medium">
          <FaTimesCircle /> Not quite.
        </p>
      )}
    </motion.div>
  );
}
