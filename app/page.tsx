"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import {
  FaArrowRight, FaGithub, FaLinkedin, FaEnvelope,
  FaShieldAlt, FaTrophy, FaExternalLinkAlt
} from "react-icons/fa";
import { SiKalilinux, SiWireshark, SiPython } from "react-icons/si";
import { TbTerminal2 } from "react-icons/tb";
import { FiVolume2, FiVolumeX, FiPlay, FiPause } from 'react-icons/fi';
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io';
import { RiEqualizerLine } from 'react-icons/ri';
import { HiOutlineLocationMarker } from 'react-icons/hi';

export default function Home() {
  const { darkMode } = useTheme();
  const [age, setAge] = useState({ years: 0, days: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [typewriterLine, setTypewriterLine] = useState(0);
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const codeSnippet = useMemo(() => [
    "class <span class='text-purple-400'>CybersecurityProfessional</span> {",
    "  <span class='text-blue-400'>constructor</span>() {",
    "    this.<span class='text-green-400'>name</span> = <span class='text-yellow-400'>'Parth Thakar'</span>;",
    "    this.<span class='text-green-400'>company</span> = <span class='text-cyan-300'>'Founder, Thakar\\'s Security'</span>;",
    "    this.<span class='text-green-400'>role</span> = <span class='text-yellow-400'>'VAPT Expert | Digital Forensics | Red Teaming'</span>;",
    "    this.<span class='text-green-400'>specializations</span> = [<span class='text-yellow-400'>'VAPT'</span>, <span class='text-yellow-400'>'DFIR'</span>, <span class='text-yellow-400'>'SOC Ops'</span>, <span class='text-yellow-400'>'Red Teaming'</span>];",
    "  }",
    "}",
  ], []);

  const calculateAge = () => {
    const birthDate = new Date(Date.UTC(2003, 7, 2));
    const now = new Date();
    let years = now.getUTCFullYear() - birthDate.getUTCFullYear();
    const cm = now.getUTCMonth(), bm = birthDate.getUTCMonth();
    if (cm < bm || (cm === bm && now.getUTCDate() < birthDate.getUTCDate())) years--;
    const bdy = new Date(Date.UTC(now.getUTCFullYear(), bm, birthDate.getUTCDate()));
    if (now < bdy) bdy.setUTCFullYear(now.getUTCFullYear() - 1);
    const days = Math.floor((now.getTime() - bdy.getTime()) / 86400000);
    return { years, days };
  };

  useEffect(() => {
    setAge(calculateAge());
    setIsLoaded(true);
    const c = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(c);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    let t: NodeJS.Timeout;
    const run = () => {
      if (typewriterLine < codeSnippet.length) {
        const plain = codeSnippet[typewriterLine].replace(/<[^>]*>/g, '');
        if (typewriterIndex < plain.length) {
          let pi = 0, hi = 0;
          while (pi <= typewriterIndex && hi < codeSnippet[typewriterLine].length) {
            if (codeSnippet[typewriterLine][hi] === '<') {
              while (hi < codeSnippet[typewriterLine].length && codeSnippet[typewriterLine][hi] !== '>') hi++;
              hi++;
            } else { pi++; hi++; }
          }
          t = setTimeout(() => {
            setTypewriterIndex(typewriterIndex + 1);
            setTypewriterText(codeSnippet[typewriterLine].substring(0, hi));
          }, Math.random() * 40 + 20);
        } else {
          t = setTimeout(() => { setTypewriterLine(typewriterLine + 1); setTypewriterIndex(0); setTypewriterText(""); }, 80);
        }
      } else if (!typewriterComplete) setTypewriterComplete(true);
    };
    run();
    return () => clearTimeout(t);
  }, [isLoaded, typewriterIndex, typewriterLine, typewriterComplete, codeSnippet]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.preload = "metadata";
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => { if (!isNaN(audio.duration)) setDuration(audio.duration); };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.load();
    return () => { audio.removeEventListener('timeupdate', onTime); audio.removeEventListener('loadedmetadata', onMeta); };
  }, [isPlaying]);

  useEffect(() => {
    let raf: number;
    const update = () => {
      if (audioRef.current && isPlaying) { setCurrentTime(audioRef.current.currentTime); raf = requestAnimationFrame(update); }
    };
    if (isPlaying) raf = requestAnimationFrame(update);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [isPlaying]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) { a.pause(); setIsPlaying(false); }
    else { a.volume = volume; a.play().catch(() => {}); setIsPlaying(true); }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const formatTime = (t: number) => {
    if (isNaN(t)) return "0:00";
    const m = Math.floor(t / 60), s = Math.floor(t % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;
    const r = progressRef.current.getBoundingClientRect();
    const pct = (e.clientX - r.left) / r.width;
    if (pct >= 0 && pct <= 1 && audioRef.current.duration) {
      audioRef.current.currentTime = pct * audioRef.current.duration;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const cardBase = darkMode
    ? "bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl"
    : "bg-white/80 backdrop-blur-xl border border-gray-200/80 rounded-2xl shadow-sm";

  const cardHover = "hover:border-cyan-500/30 transition-all duration-300 bento-card";

  if (!isLoaded) return (
    <div className={`h-screen ${darkMode ? 'bg-gray-950' : 'bg-slate-50'} flex justify-center items-center`}>
      <div className={`h-8 w-8 rounded-full border-2 border-t-transparent ${darkMode ? 'border-cyan-400' : 'border-cyan-600'} animate-spin`} />
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-slate-50 text-gray-900'} font-inter`}>

      {/* ── HERO ── */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center max-w-6xl mx-auto px-4 pt-24 pb-12">
        <h1 className="sr-only">Parth Thakar - Cybersecurity Professional & VAPT Expert</h1>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-6"
        >
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border ${darkMode ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-green-50 border-green-300 text-green-700'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-dot inline-block" />
            Available for security engagements
          </div>
          <div className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <HiOutlineLocationMarker className="text-sm" />
            Ahmedabad, India
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 leading-none ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            PARTH<br />
            <span className="gradient-text text-glow">THAKAR</span>
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className={`text-base sm:text-lg md:text-xl font-mono mb-2 ${darkMode ? 'text-cyan-400' : 'text-cyan-700'}`}
        >
          VAPT Expert · Digital Forensics · Red Teaming
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className={`text-sm sm:text-base mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          Founder, <span className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Thakar&apos;s Security</span> · Currently at <span className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>TechDefence Labs</span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          <a href="/services" className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg ${darkMode ? 'bg-cyan-500 hover:bg-cyan-400 text-gray-950 shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:-translate-y-0.5' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/25'}`}>
            <FaShieldAlt />
            Thakar&apos;s Security
          </a>
          <a href="/contact" className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 border ${darkMode ? 'border-gray-600 text-gray-300 hover:border-cyan-500/50 hover:text-white hover:bg-cyan-500/5 hover:-translate-y-0.5' : 'border-gray-300 text-gray-700 hover:border-cyan-500 hover:bg-cyan-50'}`}>
            <FaEnvelope />
            Get in Touch
          </a>
          <a href="/assets/documents/Parth_Thakar_Resume.pdf" download className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 border ${darkMode ? 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 hover:-translate-y-0.5' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}>
            Resume ↓
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className={`flex items-center gap-2 text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}
        >
          <div className={`h-8 w-px ${darkMode ? 'bg-gradient-to-b from-gray-600 to-transparent' : 'bg-gradient-to-b from-gray-300 to-transparent'}`} />
          <span className="font-mono tracking-widest uppercase">scroll</span>
        </motion.div>
      </section>

      {/* ── BENTO GRID ── */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto">

          {/* Profile card — col 1-4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`md:col-span-4 ${cardBase} ${cardHover} p-6 relative overflow-hidden`}
          >
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="relative cursor-pointer group"
                  onClick={() => setShowProfileModal(true)}
                >
                  <div className={`w-16 h-16 rounded-2xl overflow-hidden border-2 ${darkMode ? 'border-cyan-500/40' : 'border-cyan-400/60'} group-hover:border-cyan-400 transition-colors`}>
                    <Image
                      src="/images/profile.jpg"
                      alt="Parth Thakar"
                      width={64} height={64}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${darkMode ? 'border-gray-900 bg-green-500' : 'border-white bg-green-500'}`} />
                </div>
                <div>
                  <h3 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>Parth Thakar</h3>
                  <p className={`text-xs ${darkMode ? 'text-cyan-400' : 'text-cyan-600'} font-mono`}>VAPT Intern @ TechDefence</p>
                  <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Founder, Thakar&apos;s Security</p>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-2 mb-5">
                {[
                  { href: "https://github.com/parththakar2003", icon: <FaGithub />, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/parthmehulkumarthakar/", icon: <FaLinkedin />, label: "LinkedIn" },
                  { href: "mailto:Parththakar39@gmail.com", icon: <FaEnvelope />, label: "Email" },
                ].map((s, i) => (
                  <a key={i} href={s.href} target={s.href.startsWith('mailto') ? undefined : "_blank"} rel="noopener noreferrer"
                    className={`p-2 rounded-lg text-sm transition-all duration-200 ${darkMode ? 'bg-gray-800 hover:bg-cyan-500/20 hover:text-cyan-400 text-gray-400' : 'bg-gray-100 hover:bg-cyan-50 hover:text-cyan-600 text-gray-500'}`}
                    aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Age stats */}
              <div className={`grid grid-cols-2 gap-3 p-3 rounded-xl ${darkMode ? 'bg-gray-800/60' : 'bg-gray-50/80'}`}>
                <div className="text-center">
                  <div className={`text-2xl font-black font-mono ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>{age.years}</div>
                  <div className={`text-[10px] uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Years</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-black font-mono ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>{age.days}</div>
                  <div className={`text-[10px] uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Days</div>
                </div>
              </div>

              {/* TryHackMe */}
              <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-700/50' : 'border-gray-100'}`}>
                <a href="https://tryhackme.com/p/parth2003" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity flex justify-center">
                  <div style={{ width: '260px', height: '60px', overflow: 'hidden' }}>
                    <iframe
                      src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=4110160"
                      title="TryHackMe Badge"
                      loading="lazy" scrolling="no"
                      sandbox="allow-scripts allow-same-origin"
                      style={{ width: '300px', height: '70px', border: 'none', overflow: 'hidden', transform: 'scale(0.85)', transformOrigin: 'top left' }}
                    />
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Terminal — col 5-12 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`md:col-span-8 ${cardBase} ${cardHover} overflow-hidden`}
          >
            {/* Terminal header bar */}
            <div className={`flex items-center justify-between px-4 py-3 border-b ${darkMode ? 'bg-gray-800/80 border-gray-700/50' : 'bg-gray-100/80 border-gray-200'}`}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className={`text-xs font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>terminal@parth-thakar ~ %</span>
              <div className={`text-[10px] font-mono px-2 py-0.5 rounded ${darkMode ? 'bg-cyan-500/10 text-cyan-400' : 'bg-cyan-50 text-cyan-600'}`}>M.Sc. DFIS</div>
            </div>
            {/* Terminal body */}
            <div className={`p-5 font-mono text-sm ${darkMode ? 'bg-gray-950/60 text-green-400' : 'bg-gray-800/95 text-green-300'} min-h-48`}>
              <div className="flex items-start gap-2 mb-3">
                <span className="text-pink-400">$</span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-200'}><span className="text-blue-400">cat</span> <span className="text-yellow-400">welcome.txt</span></span>
              </div>
              <div className={`pl-4 mb-4 text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-300'}`}>
                <p className="mb-1">👋 Hello! I&apos;m <span className="text-cyan-400 font-bold">Parth Thakar</span>, a Cybersecurity Professional from Ahmedabad, India</p>
                <p>Specializing in VAPT, Digital Forensics, SOC Operations, and Incident Response.</p>
              </div>
              <div className="flex items-start gap-2 mb-3">
                <span className="text-pink-400">$</span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-200'}><span className="text-blue-400">python3</span> <span className="text-yellow-400">about.py</span></span>
              </div>
              <div className="pl-4 text-xs sm:text-sm whitespace-pre-wrap break-words">
                {codeSnippet.slice(0, typewriterLine).map((line, i) => (
                  <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
                ))}
                {typewriterLine < codeSnippet.length && (
                  <div className="flex items-start">
                    <span dangerouslySetInnerHTML={{ __html: typewriterText }} />
                    <span className={`inline-block w-2 h-4 ml-0.5 ${darkMode ? 'bg-green-400' : 'bg-green-300'} ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                )}
                {typewriterComplete && (
                  <p className="text-cyan-400 mt-2">✓ Initialized successfully</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* CTF Achievements — col 1-5 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`md:col-span-5 ${cardBase} ${cardHover} p-6`}
          >
            <div className="flex items-center gap-2 mb-4">
              <FaTrophy className={`text-base ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
              <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>CTF Track Record</h3>
            </div>
            <div className="space-y-2.5">
              {[
                { rank: "Top 1%", platform: "TryHackMe", detail: "Global ranking" },
                { rank: "#16", platform: "IIT Roorkee CTF", detail: "Out of 100+ teams" },
                { rank: "#144", platform: "Bugcrowd CTF", detail: "Global" },
                { rank: "#200", platform: "AWS × SANS CTF", detail: "Global" },
              ].map((a, i) => (
                <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-xl ${darkMode ? 'bg-gray-800/60' : 'bg-gray-50/80'}`}>
                  <div>
                    <span className={`text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{a.platform}</span>
                    <span className={`text-[10px] ml-1.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{a.detail}</span>
                  </div>
                  <span className={`text-sm font-black font-mono ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>{a.rank}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Current focus — col 6-12 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className={`md:col-span-7 ${cardBase} ${cardHover} p-6`}
          >
            <div className="flex items-center gap-2 mb-4">
              <TbTerminal2 className={`text-base ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Current Focus</h3>
            </div>
            <div className={`rounded-xl p-4 font-mono text-xs ${darkMode ? 'bg-gray-950/70 text-gray-300' : 'bg-gray-800/90 text-gray-200'} overflow-x-auto`}>
              <pre className="whitespace-pre-wrap break-words">
                <code>
                  <span className="text-purple-400">function</span> <span className="text-blue-400">getCurrentFocus</span>(){'{'}
                  {'\n'}  <span className="text-gray-500">{'// Securing digital infrastructure'}</span>
                  {'\n'}  <span className="text-purple-400">const</span> <span className="text-cyan-300">focus</span> = {'{'}
                  {'\n'}    <span className="text-green-400">primary</span>: <span className="text-orange-300">&apos;Web App VAPT&apos;</span>,
                  {'\n'}    <span className="text-green-400">secondary</span>: <span className="text-orange-300">&apos;DFIR + Memory Forensics&apos;</span>,
                  {'\n'}    <span className="text-green-400">studying</span>: <span className="text-orange-300">&apos;M.Sc. DFIS @ NFSU&apos;</span>,
                  {'\n'}    <span className="text-green-400">building</span>: <span className="text-orange-300">&apos;Thakar&apos;</span>+<span className="text-orange-300">&apos;s Security&apos;</span>
                  {'\n'}  {'}'};
                  {'\n'}  <span className="text-purple-400">return</span> focus;
                  {'\n'}{'}'}
                </code>
              </pre>
            </div>
          </motion.div>

          {/* Featured Projects — full width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-12"
          >
            <div className={`${cardBase} p-6`}>
              <div className="flex justify-between items-center mb-5">
                <h3 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>Featured Projects</h3>
                <a href="/projects" className={`text-xs flex items-center gap-1 font-mono ${darkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-500'} transition-colors`}>
                  view all <FaArrowRight className="text-[10px]" />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    name: "Secure CipherStegno Tool",
                    desc: "Python GUI toolkit — AES-256, RSA-2048, ChaCha20 + LSB steganography. Academic dissertation.",
                    tags: ["Python", "Cryptography", "Steganography"],
                    link: "https://github.com/parththakar2003/Secure-CipherStegno-Tool",
                    color: "from-purple-500/20 to-indigo-500/10",
                    border: darkMode ? "border-purple-500/20 hover:border-purple-500/50" : "border-purple-200 hover:border-purple-400"
                  },
                  {
                    name: "Advanced Billing System + QR",
                    desc: "Full-stack billing with QR code integration, automated invoicing & payment tracking.",
                    tags: ["Python", "Full-Stack", "SQLite"],
                    link: "#",
                    color: "from-blue-500/20 to-cyan-500/10",
                    border: darkMode ? "border-blue-500/20 hover:border-blue-500/50" : "border-blue-200 hover:border-blue-400"
                  },
                  {
                    name: "Portfolio — parth2003.in",
                    desc: "Next.js 15 + TypeScript portfolio with canvas particle background & Thakar's Security section.",
                    tags: ["Next.js", "TypeScript", "Tailwind"],
                    link: "https://parth2003.in/",
                    color: "from-cyan-500/20 to-teal-500/10",
                    border: darkMode ? "border-cyan-500/20 hover:border-cyan-500/50" : "border-cyan-200 hover:border-cyan-400"
                  },
                ].map((p, i) => (
                  <a key={i} href={p.link} target="_blank" rel="noopener noreferrer"
                    className={`group relative rounded-xl p-4 border ${p.border} transition-all duration-300 overflow-hidden hover:-translate-y-0.5 block`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-50 rounded-xl`} />
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className={`font-semibold text-sm leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>{p.name}</h4>
                        <FaExternalLinkAlt className={`text-[10px] flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
                      <p className={`text-xs mb-3 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{p.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tags.map((t, j) => (
                          <span key={j} className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${darkMode ? 'bg-gray-800/80 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Security Tools — col 1-7 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className={`md:col-span-7 ${cardBase} ${cardHover} p-6`}
          >
            <h3 className={`font-bold text-sm mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Security Toolkit</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {[
                { icon: <FaShieldAlt />, label: "Burp Suite", color: "text-orange-400" },
                { icon: <SiPython />, label: "Python", color: "text-blue-400" },
                { icon: <SiKalilinux />, label: "Kali Linux", color: "text-blue-500" },
                { icon: <SiWireshark />, label: "Wireshark", color: "text-blue-300" },
                { icon: <FaShieldAlt />, label: "Metasploit", color: "text-red-400" },
                { icon: <FaShieldAlt />, label: "Nmap", color: "text-green-400" },
                { icon: <FaShieldAlt />, label: "Nessus", color: "text-cyan-400" },
                { icon: <FaShieldAlt />, label: "Autopsy", color: "text-purple-400" },
                { icon: <FaShieldAlt />, label: "FTK Imager", color: "text-yellow-400" },
                { icon: <FaShieldAlt />, label: "SQLmap", color: "text-orange-300" },
                { icon: <FaShieldAlt />, label: "Gobuster", color: "text-green-300" },
                { icon: <FaShieldAlt />, label: "Volatility", color: "text-indigo-400" },
              ].map((t, i) => (
                <div key={i} className={`flex flex-col items-center py-3 px-1 rounded-xl transition-all duration-200 ${darkMode ? 'bg-gray-800/60 hover:bg-gray-700/80' : 'bg-gray-50/80 hover:bg-gray-100'}`}>
                  <div className={`text-lg sm:text-xl ${t.color}`}>{t.icon}</div>
                  <span className={`text-[9px] sm:text-[10px] mt-1 text-center font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Music Player — col 8-12 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`md:col-span-5 ${cardBase} ${cardHover} p-6 relative overflow-hidden`}
          >
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isPlaying ? (darkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-600') : (darkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400')}`}>
                    <RiEqualizerLine size={18} className={isPlaying ? 'animate-pulse' : ''} />
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Ambient Music</p>
                    <p className={`text-[11px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Calm Space</p>
                  </div>
                </div>
                <span className={`text-[10px] font-mono px-2 py-1 rounded-lg border ${isPlaying ? (darkMode ? 'bg-indigo-900/30 border-indigo-700/40 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-600') : (darkMode ? 'bg-gray-800 border-gray-700 text-gray-500' : 'bg-gray-100 border-gray-200 text-gray-400')}`}>
                  {isPlaying ? '▶ LIVE' : '⏸ PAUSED'}
                </span>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className={`w-full h-1.5 rounded-full cursor-pointer overflow-hidden ${darkMode ? 'bg-gray-700/60' : 'bg-gray-200'}`} ref={progressRef} onClick={handleProgressClick}>
                  <div className={`h-full rounded-full transition-all ${isPlaying ? 'bg-gradient-to-r from-indigo-500 to-cyan-400' : (darkMode ? 'bg-gray-600' : 'bg-gray-400')}`}
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }} />
                </div>
                <div className={`flex justify-between mt-1 text-[10px] font-mono ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <button className={`transition-colors ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                  onClick={() => audioRef.current && (audioRef.current.currentTime = Math.max(0, currentTime - 10))}>
                  <IoMdSkipBackward size={18} />
                </button>
                <button onClick={togglePlay}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${isPlaying ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700' : 'bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500'} shadow-indigo-500/20`}>
                  {isPlaying ? <FiPause size={16} className="text-white" /> : <FiPlay size={16} className="text-white ml-0.5" />}
                </button>
                <button className={`transition-colors ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                  onClick={() => audioRef.current && (audioRef.current.currentTime = Math.min(duration, currentTime + 10))}>
                  <IoMdSkipForward size={18} />
                </button>
              </div>

              {/* Volume */}
              <div className="hidden sm:flex items-center gap-2">
                <button className={`${darkMode ? 'text-gray-500 hover:text-indigo-400' : 'text-gray-400 hover:text-indigo-500'} transition-colors`}
                  onClick={() => setIsVolumeVisible(!isVolumeVisible)}>
                  {volume === 0 ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
                </button>
                <div className={`flex-1 overflow-hidden transition-all ${isVolumeVisible ? 'max-w-xs opacity-100' : 'max-w-0 opacity-0'}`}>
                  <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange}
                    className={`w-full h-1 rounded-full appearance-none cursor-pointer ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500`}
                  />
                </div>
                <span className={`text-[10px] font-mono min-w-[28px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{Math.round(volume * 100)}%</span>
              </div>
            </div>
            <audio ref={audioRef} src="/audio/background-music.mp3" loop />
          </motion.div>

        </div>
      </section>

      {/* ── THAKAR'S SECURITY BAND ── */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`relative rounded-2xl overflow-hidden border ${darkMode ? 'border-cyan-500/20 bg-gray-900/70' : 'border-cyan-200/60 bg-white/90'} backdrop-blur-xl p-7 sm:p-9`}
        >
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-7">
            <div>
              <div className={`inline-flex items-center gap-2 text-[11px] font-mono px-3 py-1.5 rounded-full border mb-3 ${darkMode ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-cyan-50 border-cyan-200 text-cyan-700'}`}>
                <FaShieldAlt className="text-[10px]" /> Security Services
              </div>
              <h2 className={`text-2xl sm:text-3xl font-black mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <span className="gradient-text">Thakar</span><span className={darkMode ? 'text-white' : 'text-gray-900'}>&apos;s Security</span>
              </h2>
              <p className={`text-sm max-w-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Professional VAPT & digital forensics services for businesses that take security seriously.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/services" className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${darkMode ? 'bg-cyan-500 hover:bg-cyan-400 text-gray-950 shadow-lg shadow-cyan-500/20 hover:-translate-y-0.5' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/20'}`}>
                <FaShieldAlt className="text-xs" /> All Services
              </a>
              <a href="/contact" className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border ${darkMode ? 'border-gray-600 text-gray-300 hover:border-cyan-500/50 hover:text-white hover:-translate-y-0.5' : 'border-gray-300 text-gray-700 hover:border-cyan-400'}`}>
                <FaEnvelope className="text-xs" /> Get Assessment
              </a>
            </div>
          </div>

          {/* Services grid */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { icon: "🌐", title: "Web App", tag: "OWASP" },
              { icon: "🔌", title: "API", tag: "REST/GraphQL" },
              { icon: "🖧", title: "Network", tag: "Internal/Ext" },
              { icon: "🤖", title: "Android", tag: "Mobile" },
              { icon: "🍎", title: "iOS", tag: "Mobile" },
              { icon: "🖥️", title: "Thick Client", tag: "Desktop" },
              { icon: "🎯", title: "Red Team", tag: "ATT&CK" },
              { icon: "🔍", title: "Forensics", tag: "DFIR" },
            ].map((s, i) => (
              <div key={i} className={`text-center py-3 px-2 rounded-xl ${darkMode ? 'bg-gray-800/60 hover:bg-gray-700/80' : 'bg-gray-50/80 hover:bg-gray-100'} transition-all duration-200 hover:-translate-y-0.5 cursor-default`}>
                <div className="text-xl mb-1">{s.icon}</div>
                <div className={`text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{s.title}</div>
                <div className={`text-[9px] font-mono mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{s.tag}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`relative rounded-2xl overflow-hidden p-7 sm:p-9 text-white ${darkMode ? 'bg-gradient-to-br from-cyan-900/80 via-blue-900/80 to-indigo-900/80 border border-cyan-500/20' : 'bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-700'}`}
        >
          <div className="absolute inset-0 shimmer pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1">Ready to explore my cybersecurity journey?</h2>
              <p className="text-cyan-100/80 text-sm max-w-md">Forensics expertise, CTF wins, certifications, and the full professional story.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/journey" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-cyan-900 font-semibold text-sm hover:bg-cyan-50 transition-colors">
                My Journey <FaArrowRight className="text-xs" />
              </a>
              <a href="/projects" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-colors">
                Projects <FaArrowRight className="text-xs" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowProfileModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className={`relative max-w-sm w-full rounded-2xl overflow-hidden shadow-2xl ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
              onClick={e => e.stopPropagation()}
            >
              <div className="w-full h-80 relative">
                <Image src="/images/profile.jpg" alt="Parth Thakar" fill className="object-cover" sizes="400px" />
              </div>
              <button className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                onClick={() => setShowProfileModal(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className={`px-5 py-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                <p className="font-bold">Parth Thakar</p>
                <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Cybersecurity Professional & DFIR Specialist</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
