"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaShieldAlt, FaPython, FaCertificate, FaTrophy, FaAward, FaChevronRight } from "react-icons/fa";
import { SiKalilinux, SiWireshark } from "react-icons/si";

export default function Skills() {
  const { darkMode } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("tools");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Theme styles
  const theme = {
    bg: darkMode ? 'bg-gray-900' : 'bg-slate-50',
    text: darkMode ? 'text-gray-100' : 'text-gray-800',
    muted: darkMode ? 'text-gray-400' : 'text-gray-600',
    accent: darkMode ? 'text-cyan-400' : 'text-cyan-600',
    card: darkMode ? 'bg-gray-800/70' : 'bg-white/80',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
  };

  // Computer Skills & Tools
  const computerSkills = [
    { name: "Burp Suite", category: "Web Application Security", icon: <FaShieldAlt />, color: "orange" },
    { name: "Nessus", category: "Vulnerability Scanner", icon: <FaShieldAlt />, color: "red" },
    { name: "FTK Imager", category: "Forensic Imaging", icon: <FaShieldAlt />, color: "blue" },
    { name: "OS Forensic Tool", category: "Digital Forensics", icon: <FaShieldAlt />, color: "purple" },
    { name: "OSINT Tools", category: "Intelligence Gathering", icon: <FaShieldAlt />, color: "cyan" },
    { name: "Autopsy", category: "Digital Forensics", icon: <FaShieldAlt />, color: "indigo" },
    { name: "Wireshark", category: "Network Analysis", icon: <SiWireshark />, color: "blue" },
    { name: "Kali Linux", category: "Security OS", icon: <SiKalilinux />, color: "purple" },
    { name: "Python", category: "Programming & Automation", icon: <FaPython />, color: "green" },
  ];

  // Professional Skills
  const professionalSkills = [
    { name: "Communication", level: 90, color: "blue" },
    { name: "Teamwork", level: 85, color: "green" },
    { name: "Time Management", level: 88, color: "purple" },
    { name: "Problem Solving", level: 92, color: "orange" },
    { name: "Analytical Thinking", level: 90, color: "red" },
  ];

  // Certifications
  const certifications = [
    {
      name: "SysTools Digital Forensic Essentials (SDFE)",
      issuer: "SysTools",
      category: "Digital Forensics",
      featured: true
    },
    {
      name: "SysTools Incident Response Essentials (SIRE)",
      issuer: "SysTools",
      category: "Incident Response",
      featured: true
    },
    {
      name: "Digital Forensics Masterclass (DFMC + DIFR)",
      issuer: "Udemy",
      category: "Digital Forensics",
      featured: true
    },
    {
      name: "Windows Forensics with Belkasoft",
      issuer: "Belkasoft",
      category: "Windows Forensics"
    },
    {
      name: "OS Forensics Triage Certification (OSFT)",
      issuer: "OSForensics",
      category: "Forensic Triage"
    },
    {
      name: "Introduction to Digital Forensics",
      issuer: "Security Blue Team",
      category: "Digital Forensics"
    },
    {
      name: "Introduction to OSINT",
      issuer: "Security Blue Team",
      category: "OSINT"
    },
    {
      name: "Student SOC Program Foundation Training",
      issuer: "Microsoft",
      category: "SOC Operations"
    },
    {
      name: "Security Analyst Certificate",
      issuer: "Skill India & Reliance Foundation",
      category: "Security Analysis",
      featured: true
    },
    {
      name: "CS50's Introduction to Cybersecurity",
      issuer: "Harvard Online",
      category: "Cybersecurity",
      featured: true
    },
    {
      name: "Cyber Security Analyst Job Simulation",
      issuer: "Tata Group",
      category: "Job Simulation"
    },
    {
      name: "Cyber Security Job Simulation",
      issuer: "Mastercard",
      category: "Job Simulation"
    },
    {
      name: "Certified Network Security Practitioner (CNSP)",
      issuer: "SecOps",
      category: "Network Security",
      featured: true
    },
    {
      name: "BelkaGPT: Effective AI in DFIR",
      issuer: "Belkasoft",
      category: "AI in Forensics"
    },
    {
      name: "Getting Started with Belkasoft",
      issuer: "Belkasoft",
      category: "Digital Forensics"
    },
    {
      name: "Certified AI/ML PENTESTER",
      issuer: "SecOps Group",
      category: "Penetration Testing",
      featured: true
    },
    {
      name: "Certified APPSEC PRACTITIONER",
      issuer: "SecOps Group",
      category: "Application Security",
      featured: true
    },
    {
      name: "Google Cloud Fundamentals Core Infrastructure",
      issuer: "Coursera/Google",
      category: "Cloud Security"
    },
    {
      name: "Google SOAR Fundamentals",
      issuer: "Google",
      category: "Security Orchestration"
    },
    {
      name: "Google Security Practice with Google Security operations-SIEM",
      issuer: "Google",
      category: "SIEM"
    },
    {
      name: "CAPIE Certified API Hacking Expert",
      issuer: "CAPIE",
      category: "API Security",
      featured: true
    },
    {
      name: "Fortinet Certified Associate Cybersecurity",
      issuer: "Fortinet",
      category: "Network Security"
    },
    {
      name: "Ethical Hacker Certificate",
      issuer: "CISCO",
      category: "Ethical Hacking"
    },
    {
      name: "Online Course 210W-09 Attack Methodologies IT & ICS",
      issuer: "CISA",
      category: "Attack Methodologies"
    },
    {
      name: "Introduction to IoT",
      issuer: "CISCO",
      category: "IoT Security"
    },
  ];

  // Languages
  const languages = [
    { name: "English", proficiency: "Professional" },
    { name: "Hindi", proficiency: "Native" },
    { name: "Gujarati", proficiency: "Native" },
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: darkMode ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-300',
      purple: darkMode ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-300',
      green: darkMode ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300',
      orange: darkMode ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-300',
      red: darkMode ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-300',
      cyan: darkMode ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-cyan-100 text-cyan-700 border-cyan-300',
      indigo: darkMode ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-indigo-100 text-indigo-700 border-indigo-300',
    };
    return colors[color] || colors.blue;
  };

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
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className={theme.accent}>Certifications</span>
          </h1>
          <p className={`${theme.muted} text-base sm:text-lg max-w-2xl mx-auto`}>
            Comprehensive expertise in cybersecurity tools, digital forensics, and incident response with 15+ professional certifications.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {[
            { id: "tools", label: "Security Tools" },
            { id: "certs", label: "Certifications" },
            { id: "skills", label: "Professional Skills" },
            { id: "lang", label: "Languages" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                  : `${theme.card} border ${theme.border}`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Computer Skills & Tools */}
        {activeTab === "tools" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {computerSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`${theme.card} rounded-lg p-6 border ${theme.border} backdrop-blur-sm hover:scale-105 transition-transform`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getColorClasses(skill.color)}`}>
                  <span className="text-2xl">{skill.icon}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                <p className={`${theme.muted} text-sm`}>{skill.category}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Certifications */}
        {activeTab === "certs" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`${theme.card} rounded-lg p-6 border ${theme.border} backdrop-blur-sm ${cert.featured ? 'ring-2 ring-cyan-500/50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {cert.featured && (
                      <div className="flex items-center gap-2 mb-2">
                        <FaAward className="text-yellow-500" />
                        <span className="text-xs font-semibold uppercase tracking-wide text-yellow-500">Featured</span>
                      </div>
                    )}
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <FaCertificate className={theme.accent} />
                      {cert.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${getColorClasses('blue')}`}>
                        {cert.issuer}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${getColorClasses('purple')}`}>
                        {cert.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Professional Skills */}
        {activeTab === "skills" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {professionalSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`${theme.card} rounded-lg p-6 border ${theme.border} backdrop-blur-sm`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                  <span className={`text-sm font-medium ${theme.accent}`}>{skill.level}%</span>
                </div>
                <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                    className={`h-full rounded-full ${
                      skill.color === 'blue' ? 'bg-blue-500' :
                      skill.color === 'green' ? 'bg-green-500' :
                      skill.color === 'purple' ? 'bg-purple-500' :
                      skill.color === 'orange' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Languages */}
        {activeTab === "lang" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {languages.map((lang, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`${theme.card} rounded-lg p-6 border ${theme.border} backdrop-blur-sm text-center`}
              >
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${getColorClasses('blue')}`}>
                  <span className="text-2xl font-bold">{lang.name[0]}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{lang.name}</h3>
                <p className={`${theme.muted}`}>{lang.proficiency}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTF Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <div className={`${theme.card} rounded-lg p-6 sm:p-8 border ${theme.border} backdrop-blur-sm`}>
            <div className="flex items-center gap-3 mb-6">
              <FaTrophy className="text-3xl text-yellow-500" />
              <h2 className="text-2xl font-bold">CTF Competition Achievements</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30">
                <h4 className="font-semibold mb-2">IIT-Roorkee CTF</h4>
                <p className={theme.muted}>16th position out of 100 teams</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30">
                <h4 className="font-semibold mb-2">Bugcrowd CTF</h4>
                <p className={theme.muted}>144th rank</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30">
                <h4 className="font-semibold mb-2">TryHackme Hackfinity Battle</h4>
                <p className={theme.muted}>Active participant</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30">
                <h4 className="font-semibold mb-2">AWS × SANS CTF</h4>
                <p className={theme.muted}>200th rank</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
                <h4 className="font-semibold mb-2">University CTF 2025: Tinsel Trouble</h4>
                <p className={theme.muted}>417th out of 1050 universities - Team NFSU</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className={`${theme.card} rounded-lg p-6 sm:p-8 border ${theme.border} backdrop-blur-sm`}>
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Want to collaborate?</h2>
            <p className={`${theme.muted} mb-6 text-sm sm:text-base`}>
              Let&apos;s work together on cybersecurity projects or forensic investigations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contact"
                className={`px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium flex items-center justify-center gap-2 hover:from-cyan-500 hover:to-blue-500 transition-all`}
              >
                <span>Contact Me</span>
                <FaChevronRight className="text-xs" />
              </a>
              <a
                href="/projects"
                className={`px-6 py-3 rounded-lg border ${theme.border} ${theme.text} font-medium flex items-center justify-center gap-2 hover:bg-gray-700/10 transition-all`}
              >
                <span>View Projects</span>
                <FaChevronRight className="text-xs" />
              </a>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
