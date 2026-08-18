"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaFlag, FaTrophy, FaUsers, FaExternalLinkAlt, FaShieldAlt, FaBug, FaLock, FaServer } from "react-icons/fa";
import { CHALLENGES, CATEGORIES, TOTAL_POINTS } from "@/data/ctfChallenges";
import ChallengeCard from "@/components/ctf/ChallengeCard";

const PROGRESS_KEY = "portfolio_ctf_progress_v1";

export default function CTF() {
  const { darkMode } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [solved, setSolved] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsLoaded(true);
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      if (raw) setSolved(new Set(JSON.parse(raw)));
    } catch {}
  }, []);

  const markSolved = (id: string) => {
    setSolved((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  const theme = {
    bg: darkMode ? 'bg-gray-900' : 'bg-slate-50',
    text: darkMode ? 'text-gray-100' : 'text-gray-800',
    muted: darkMode ? 'text-gray-400' : 'text-gray-600',
    accent: darkMode ? 'text-cyan-400' : 'text-cyan-600',
    card: darkMode ? 'bg-gray-800/70' : 'bg-white/80',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    darkMode,
  };

  const competitions = [
    { event: "IIT-Roorkee CTF", rank: "16th / 100 teams", color: "blue", icon: <FaFlag /> },
    { event: "Bugcrowd CTF", rank: "144th rank", color: "purple", icon: <FaBug /> },
    { event: "TryHackMe Hackfinity Battle", rank: "Participant", color: "green", icon: <FaShieldAlt /> },
    { event: "AWS x SANS CTF", rank: "200th rank", color: "orange", icon: <FaServer /> },
    { event: "University CTF 2025: Tinsel Trouble", rank: "417th / 1050 universities - Team NFSU", color: "blue", icon: <FaUsers /> },
  ];

  const categories = [
    { name: "Web Exploitation", desc: "SQLi, XSS, IDOR, auth bypass, SSRF, deserialization", icon: <FaBug /> },
    { name: "Cryptography", desc: "Classical + modern ciphers, hash attacks, RSA/AES weaknesses", icon: <FaLock /> },
    { name: "Network / Forensics", desc: "PCAP analysis, steganography, memory/disk forensics", icon: <FaServer /> },
    { name: "Binary / Reversing", desc: "Basic pwn, static/dynamic RE with Ghidra & radare2", icon: <FaShieldAlt /> },
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: darkMode ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-300',
      purple: darkMode ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-300',
      green: darkMode ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300',
      orange: darkMode ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-300',
    };
    return colors[color] || colors.blue;
  };

  const filterList = ["All", ...CATEGORIES];
  const visibleChallenges = useMemo(
    () => (activeCategory === "All" ? CHALLENGES : CHALLENGES.filter((c) => c.category === activeCategory)),
    [activeCategory]
  );
  const earnedPoints = useMemo(
    () => CHALLENGES.filter((c) => solved.has(c.id)).reduce((sum, c) => sum + c.points, 0),
    [solved]
  );

  if (!isLoaded) {
    return (
      <div className={`h-screen ${theme.bg} flex justify-center items-center`}>
        <div className={`h-8 w-8 rounded-full border-2 border-t-transparent ${darkMode ? 'border-cyan-400' : 'border-cyan-600'} animate-spin`}></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} pt-20`}>
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Capture The <span className={theme.accent}>Flag</span>
          </h1>
          <p className={`${theme.muted} text-base sm:text-lg max-w-2xl mx-auto`}>
            Competitive cybersecurity - offensive challenges across web, crypto, forensics, and binary exploitation.
          </p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: "Competitions", value: `${competitions.length}+` },
            { label: "Best Rank", value: "16th" },
            { label: "Challenges Solved", value: `${solved.size}/${CHALLENGES.length}` },
            { label: "Points Earned", value: `${earnedPoints}/${TOTAL_POINTS}` },
          ].map((s, i) => (
            <div key={i} className={`${theme.card} rounded-lg p-4 border ${theme.border} text-center backdrop-blur-sm`}>
              <p className={`text-2xl font-bold ${theme.accent}`}>{s.value}</p>
              <p className={`text-xs ${theme.muted} uppercase tracking-wide`}>{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Competitions */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-6 flex items-center gap-2"
          >
            <FaTrophy className={theme.accent} />
            Competitions
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {competitions.map((ctf, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`${theme.card} rounded-lg p-5 border ${theme.border} backdrop-blur-sm flex items-start gap-4 hover:scale-[1.02] transition-transform`}
              >
                <div className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center ${getColorClasses(ctf.color)}`}>
                  {ctf.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{ctf.event}</h3>
                  <p className={`text-sm ${theme.muted}`}>{ctf.rank}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-6 flex items-center gap-2"
          >
            <FaShieldAlt className={theme.accent} />
            Skill Areas
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`${theme.card} rounded-lg p-5 border ${theme.border} backdrop-blur-sm`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className={theme.accent}>{cat.icon}</span>
                  <h3 className="font-semibold">{cat.name}</h3>
                </div>
                <p className={`text-sm ${theme.muted}`}>{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Live Challenges */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-4 flex items-center gap-2"
          >
            <FaFlag className={theme.accent} />
            Live Challenges ({CHALLENGES.length})
          </motion.h2>
          <p className={`${theme.muted} text-sm mb-6`}>
            Every flag below is hidden somewhere real - the DOM, a cookie, a response header&apos;s cousin, this
            page&apos;s own JS bundle, a sibling file on this domain. Nothing is sent to a server; every submission
            is SHA-256 hashed and checked entirely in your browser. Progress is saved locally so you can come back.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {filterList.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-transparent"
                    : `${theme.border} ${theme.muted} ${darkMode ? 'hover:text-gray-100' : 'hover:text-gray-800'}`
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                theme={theme}
                solved={solved.has(challenge.id)}
                onSolved={markSolved}
              />
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className={`${theme.card} rounded-lg p-6 sm:p-8 border ${theme.border} backdrop-blur-sm`}>
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Team up for the next CTF?</h2>
            <p className={`${theme.muted} mb-6 text-sm sm:text-base`}>
              Open to CTF teams, bug bounty collabs, and security research.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium hover:from-cyan-500 hover:to-blue-500 transition-all"
            >
              <span>Get in Touch</span>
              <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
