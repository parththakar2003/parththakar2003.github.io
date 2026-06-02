"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaShieldAlt, FaEnvelope, FaArrowRight, FaCheckCircle } from "react-icons/fa";

const services = [
  {
    icon: "🌐",
    title: "Web Application VAPT",
    shortDesc: "End-to-end web app penetration testing following OWASP Top 10",
    description: "Comprehensive black-box, grey-box, and white-box testing of web applications. Covers OWASP Top 10:2025, business logic flaws, authentication bypass, session management, and client-side vulnerabilities.",
    deliverables: [
      "Executive summary + technical report",
      "CVSS 3.1 scored findings",
      "Proof-of-concept for each vulnerability",
      "Remediation roadmap with priority",
      "Post-fix re-test (one round)"
    ],
    tag: "Most Popular",
    tagColor: "cyan",
    color: "blue"
  },
  {
    icon: "🔌",
    title: "API Security Testing",
    shortDesc: "REST, GraphQL, and SOAP API security assessment",
    description: "Thorough API security assessment covering authentication flaws, IDOR, mass assignment, rate limiting bypass, injection attacks, and improper data exposure — aligned with OWASP API Security Top 10.",
    deliverables: [
      "API endpoint enumeration",
      "Auth & authorization testing",
      "Input validation & injection testing",
      "Rate limit & abuse scenario testing",
      "Structured findings with PoC"
    ],
    tag: "High Demand",
    tagColor: "purple",
    color: "purple"
  },
  {
    icon: "🖧",
    title: "Network VAPT",
    shortDesc: "Internal & external network penetration testing",
    description: "Full-scope network penetration testing covering external attack surface, internal network segmentation, firewall rule analysis, lateral movement paths, and Active Directory security assessment.",
    deliverables: [
      "External & internal recon report",
      "Network topology analysis",
      "Active Directory attack paths",
      "Lateral movement path analysis",
      "Remediation with NIST alignment"
    ],
    tag: null,
    tagColor: "green",
    color: "green"
  },
  {
    icon: "🤖",
    title: "Android App VAPT",
    shortDesc: "Android application security testing — OWASP Mobile Top 10",
    description: "Static and dynamic analysis of Android applications — reverse engineering, insecure data storage, improper platform usage, network traffic interception, and backend API security testing.",
    deliverables: [
      "Static analysis (JADX/APKTool)",
      "Dynamic analysis (Frida/Objection)",
      "Network traffic interception",
      "Insecure storage & data leakage",
      "OWASP Mobile Top 10 coverage"
    ],
    tag: null,
    tagColor: "orange",
    color: "orange"
  },
  {
    icon: "🍎",
    title: "iOS App VAPT",
    shortDesc: "iOS application security assessment",
    description: "Security testing of iOS applications covering insecure data storage, Keychain misuse, weak encryption, network security, binary analysis, and runtime manipulation using Frida and Objection.",
    deliverables: [
      "IPA extraction & binary analysis",
      "Keychain & storage inspection",
      "Runtime manipulation (Frida)",
      "Network traffic interception",
      "OWASP Mobile Top 10 coverage"
    ],
    tag: null,
    tagColor: "cyan",
    color: "cyan"
  },
  {
    icon: "🖥️",
    title: "Thick Client VAPT",
    shortDesc: "Desktop application penetration testing",
    description: "Security assessment of thick client (desktop) applications — traffic interception, memory analysis, binary reversing, insecure local storage, DLL hijacking, and improper certificate validation.",
    deliverables: [
      "Traffic interception & analysis",
      "Memory & process inspection",
      "Binary reverse engineering",
      "Local storage & config analysis",
      "DLL hijacking & privilege escalation"
    ],
    tag: "Specialized",
    tagColor: "purple",
    color: "purple"
  },
  {
    icon: "🎯",
    title: "Red Team Operations",
    shortDesc: "Full-scope adversary simulation",
    description: "Goal-based red team engagement simulating real-world threat actors. Covers phishing, social engineering, physical access attempts, initial access, persistence, privilege escalation, and lateral movement.",
    deliverables: [
      "Attack narrative timeline",
      "TTPs mapped to MITRE ATT&CK",
      "Detection gap analysis",
      "Executive & technical report",
      "Blue team improvement recommendations"
    ],
    tag: "Advanced",
    tagColor: "red",
    color: "red"
  },
  {
    icon: "🔍",
    title: "Digital Forensics & IR",
    shortDesc: "Incident response and forensic investigation",
    description: "Rapid incident response and forensic investigation covering disk imaging, memory forensics, malware analysis, timeline reconstruction, and chain-of-custody evidence handling using industry-standard toolsets.",
    deliverables: [
      "Forensic disk & memory images",
      "Malware behaviour analysis",
      "Attack timeline reconstruction",
      "IOC extraction & threat hunting",
      "Legal-grade forensic report"
    ],
    tag: "DFIR",
    tagColor: "cyan",
    color: "cyan"
  }
];

const process = [
  { step: "01", title: "Scoping", desc: "Define engagement scope, rules of engagement, and objectives. NDA signed before any work begins." },
  { step: "02", title: "Reconnaissance", desc: "Passive and active information gathering — OSINT, enumeration, and attack surface mapping." },
  { step: "03", title: "Testing", desc: "Systematic exploitation attempts, vulnerability validation, and privilege escalation chains." },
  { step: "04", title: "Reporting", desc: "CVSS-scored findings with PoC evidence, root cause analysis, and prioritized remediation roadmap." },
  { step: "05", title: "Remediation Support", desc: "Developer-friendly fix guidance, re-test after patches applied, and post-engagement debrief call." }
];

const credentials = [
  { label: "CNSP", full: "Certified Network Security Practitioner", issuer: "SecOps Group" },
  { label: "CS50", full: "Introduction to Cybersecurity", issuer: "Harvard Online" },
  { label: "CAPIE", full: "Certified API Hacking Expert", issuer: "CAPIE" },
  { label: "CSEDP", full: "Certified Social Engineering Defense Practitioner", issuer: "SecOps Group" },
  { label: "DFMC", full: "Digital Forensics Masterclass", issuer: "Udemy" },
  { label: "OSFT", full: "OS Forensics Triage Certification", issuer: "OS Forensics" },
];

const achievements = [
  { rank: "#16", platform: "IIT Roorkee CTF", detail: "Out of 100+ teams" },
  { rank: "#144", platform: "Bugcrowd CTF", detail: "Global ranking" },
  { rank: "#200", platform: "AWS × SANS CTF", detail: "Global ranking" },
  { rank: "Top 1%", platform: "TryHackMe", detail: "Global ranking" },
];

export default function Services() {
  const { darkMode } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { setIsLoaded(true); }, []);

  const theme = {
    bg: darkMode ? "bg-gray-900" : "bg-slate-50",
    text: darkMode ? "text-gray-100" : "text-gray-800",
    muted: darkMode ? "text-gray-400" : "text-gray-600",
    accent: darkMode ? "text-cyan-400" : "text-cyan-600",
    card: darkMode ? "bg-gray-800/70" : "bg-white/80",
    border: darkMode ? "border-gray-700/60" : "border-gray-200",
    subtleBg: darkMode ? "bg-gray-800/40" : "bg-gray-50/80",
  };

  const colorMap: Record<string, string> = {
    blue: darkMode ? "border-blue-500/30 hover:border-blue-400/60 group-hover:text-blue-400" : "border-blue-200 hover:border-blue-400 group-hover:text-blue-600",
    purple: darkMode ? "border-purple-500/30 hover:border-purple-400/60 group-hover:text-purple-400" : "border-purple-200 hover:border-purple-400 group-hover:text-purple-600",
    green: darkMode ? "border-green-500/30 hover:border-green-400/60 group-hover:text-green-400" : "border-green-200 hover:border-green-400 group-hover:text-green-600",
    orange: darkMode ? "border-orange-500/30 hover:border-orange-400/60 group-hover:text-orange-400" : "border-orange-200 hover:border-orange-400 group-hover:text-orange-600",
    red: darkMode ? "border-red-500/30 hover:border-red-400/60 group-hover:text-red-400" : "border-red-200 hover:border-red-400 group-hover:text-red-600",
    cyan: darkMode ? "border-cyan-500/30 hover:border-cyan-400/60 group-hover:text-cyan-400" : "border-cyan-200 hover:border-cyan-400 group-hover:text-cyan-600",
  };

  const tagColorMap: Record<string, string> = {
    cyan: darkMode ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" : "bg-cyan-50 text-cyan-700 border-cyan-200",
    purple: darkMode ? "bg-purple-500/10 text-purple-400 border-purple-500/30" : "bg-purple-50 text-purple-700 border-purple-200",
    red: darkMode ? "bg-red-500/10 text-red-400 border-red-500/30" : "bg-red-50 text-red-700 border-red-200",
  };

  if (!isLoaded) return (
    <div className={`h-screen ${theme.bg} flex justify-center items-center`}>
      <div className={`h-8 w-8 rounded-full border-2 border-t-transparent ${darkMode ? "border-cyan-400" : "border-cyan-600"} animate-spin`}></div>
    </div>
  );

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-inter pt-20`}>
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center relative"
        >
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono border mb-6 ${darkMode ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" : "bg-cyan-50 border-cyan-200 text-cyan-700"}`}>
            <FaShieldAlt />
            <span>Professional Cybersecurity Services</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 relative z-10`}>
            <span className={darkMode ? "text-cyan-400" : "text-cyan-600"}>Thakar</span>
            <span className={darkMode ? "text-white" : "text-gray-900"}>&apos;s Security</span>
          </h1>

          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 relative z-10 ${theme.muted}`}>
            Protecting businesses from real-world threats through rigorous vulnerability assessments, penetration testing, and red team operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <a
              href="/contact"
              className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg shadow-cyan-500/20 ${darkMode ? "bg-cyan-500 hover:bg-cyan-400 text-gray-900" : "bg-cyan-600 hover:bg-cyan-500 text-white"}`}
            >
              <FaEnvelope />
              <span>Request Assessment</span>
            </a>
            <a
              href="#services"
              className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-300 border ${darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
            >
              <span>View Services</span>
              <FaArrowRight className="text-xs" />
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 p-6 rounded-xl border ${theme.border} ${theme.card} backdrop-blur-sm`}
        >
          {[
            { value: "5+", label: "Clients Served", sub: "Fintech, Banking, Enterprise" },
            { value: "CVSS 3.1", label: "Scoring Standard", sub: "Industry-grade reporting" },
            { value: "48h", label: "Report Turnaround", sub: "After engagement close" },
            { value: "Top 1%", label: "TryHackMe Rank", sub: "Globally verified skill" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-lg sm:text-xl md:text-2xl font-bold font-mono ${theme.accent}`}>{stat.value}</div>
              <div className={`text-xs sm:text-sm font-medium mt-0.5 ${theme.text}`}>{stat.label}</div>
              <div className={`text-[10px] sm:text-xs mt-0.5 ${theme.muted}`}>{stat.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <section id="services" className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className={`text-xl sm:text-2xl font-bold ${theme.text}`}>Services Offered</h2>
            <div className={`h-px flex-1 ${darkMode ? "bg-gradient-to-r from-gray-700 to-transparent" : "bg-gradient-to-r from-gray-200 to-transparent"}`}></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className={`group relative rounded-xl p-5 sm:p-6 border ${colorMap[service.color]} ${theme.card} backdrop-blur-sm transition-all duration-300 flex flex-col`}
              >
                {service.tag && (
                  <div className={`absolute top-4 right-4 text-[10px] font-mono px-2 py-0.5 rounded-full border ${tagColorMap[service.tagColor]}`}>
                    {service.tag}
                  </div>
                )}

                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className={`font-bold text-base sm:text-lg mb-2 ${theme.text}`}>{service.title}</h3>
                <p className={`text-xs sm:text-sm mb-4 ${theme.muted}`}>{service.description}</p>

                <div className="mt-auto">
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${theme.accent}`}>Deliverables</p>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((d, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <FaCheckCircle className={`text-xs mt-0.5 flex-shrink-0 ${theme.accent}`} />
                        <span className={`text-xs ${theme.muted}`}>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className={`text-xl sm:text-2xl font-bold ${theme.text}`}>How It Works</h2>
            <div className={`h-px flex-1 ${darkMode ? "bg-gradient-to-r from-gray-700 to-transparent" : "bg-gradient-to-r from-gray-200 to-transparent"}`}></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {process.map((step, i) => (
              <div key={i} className={`relative rounded-xl p-4 border ${theme.border} ${theme.subtleBg}`}>
                {i < process.length - 1 && (
                  <div className={`hidden lg:block absolute top-8 -right-2 w-4 h-px ${darkMode ? "bg-cyan-500/40" : "bg-cyan-300/60"}`}></div>
                )}
                <div className={`text-2xl font-bold font-mono mb-2 ${theme.accent}`}>{step.step}</div>
                <div className={`font-semibold text-sm mb-1 ${theme.text}`}>{step.title}</div>
                <div className={`text-xs ${theme.muted}`}>{step.desc}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Why Trust Us — CTF + Certs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* CTF Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`rounded-xl p-6 border ${theme.border} ${theme.card} backdrop-blur-sm`}
          >
            <h3 className={`font-bold text-base sm:text-lg mb-4 ${theme.text}`}>Verified Skills — CTF Track Record</h3>
            <div className="space-y-3">
              {achievements.map((a, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${theme.subtleBg} border ${theme.border}`}>
                  <div>
                    <div className={`font-semibold text-sm ${theme.text}`}>{a.platform}</div>
                    <div className={`text-xs ${theme.muted}`}>{a.detail}</div>
                  </div>
                  <div className={`text-lg font-bold font-mono ${theme.accent}`}>{a.rank}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`rounded-xl p-6 border ${theme.border} ${theme.card} backdrop-blur-sm`}
          >
            <h3 className={`font-bold text-base sm:text-lg mb-4 ${theme.text}`}>Key Certifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {credentials.map((cert, i) => (
                <div key={i} className={`p-3 rounded-lg border ${theme.border} ${theme.subtleBg}`}>
                  <div className={`text-xs font-bold font-mono ${theme.accent} mb-0.5`}>{cert.label}</div>
                  <div className={`text-xs font-medium ${theme.text}`}>{cert.full}</div>
                  <div className={`text-[10px] ${theme.muted}`}>{cert.issuer}</div>
                </div>
              ))}
            </div>
            <p className={`text-xs mt-3 ${theme.muted}`}>+ 15 more certifications across DFIR, SOC, cloud, and offensive security.</p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={`relative rounded-xl overflow-hidden p-8 sm:p-10 text-center border ${darkMode ? "border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900" : "border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-blue-50"}`}
        >
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <FaShieldAlt className={`text-4xl mx-auto mb-4 relative z-10 ${theme.accent}`} />
          <h2 className={`text-2xl sm:text-3xl font-bold mb-3 relative z-10 ${theme.text}`}>Ready to secure your business?</h2>
          <p className={`text-sm sm:text-base max-w-xl mx-auto mb-6 relative z-10 ${theme.muted}`}>
            Get a scoped security assessment from Thakar&apos;s Security. Fast turnaround, professional reports, real-world results.
          </p>
          <a
            href="/contact"
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-300 relative z-10 shadow-lg shadow-cyan-500/20 ${darkMode ? "bg-cyan-500 hover:bg-cyan-400 text-gray-900" : "bg-cyan-600 hover:bg-cyan-500 text-white"}`}
          >
            <FaEnvelope />
            <span>Get in Touch</span>
          </a>
        </motion.div>

      </main>
    </div>
  );
}
