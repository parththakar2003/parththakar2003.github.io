"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaShieldAlt, FaGraduationCap, FaBriefcase, FaTrophy, FaCertificate, FaAward, FaChevronRight } from "react-icons/fa";
import { SiPython } from "react-icons/si";

export default function Journey() {
  const { darkMode } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Journey timeline data - Parth's Cybersecurity Journey
  const journeyStages = [
    {
      id: 1,
      title: "Early Interest in Technology",
      subtitle: "Childhood - 2020",
      icon: <FaShieldAlt />,
      color: "blue",
      content: "Developed an early interest in computers and technology. Explored various aspects of computing, laying the foundation for a career in cybersecurity and digital forensics.",
      achievement: "Foundation in computer basics"
    },
    {
      id: 2,
      title: "Higher Secondary Education",
      subtitle: "May 2021",
      icon: <FaGraduationCap />,
      color: "indigo",
      content: "Completed HSC from St. Mary's English Medium School, Gota, Ahmedabad with 57.60%. This marked the beginning of formal education in the technology domain.",
      achievement: "Completed HSC with focus on science"
    },
    {
      id: 3,
      title: "Bachelor of Science - IT",
      subtitle: "April-June 2024",
      icon: <FaGraduationCap />,
      color: "purple",
      content: "Graduated with B.Sc. IT from Ganpat University, Ahmedabad with 7.20 CGPA. Developed strong foundation in IT concepts and programming.",
      achievement: "Graduated with 7.20 CGPA",
      featured: true
    },
    {
      id: 4,
      title: "First Cybersecurity Internship",
      subtitle: "The Red User - 1 Month",
      icon: <FaBriefcase />,
      color: "pink",
      content: "Completed one-month internship at The Red User in Cyber Security. Gained hands-on experience with security tools and practices, marking the official start of cybersecurity career.",
      achievement: "First professional cybersecurity experience"
    },
    {
      id: 5,
      title: "Full-Stack Development Experience",
      subtitle: "Jan 2024 - Feb 2024",
      icon: <SiPython />,
      color: "amber",
      content: "Completed two-month on-site internship at Brainy Beam Technologies Pvt Ltd as Full-Stack Developer and Python Programmer. Developed comprehensive web applications and enhanced programming skills.",
      achievement: "Full-stack development proficiency"
    },
    {
      id: 6,
      title: "Shadow Fox Cyber Security",
      subtitle: "March 2025 - 1 Month",
      icon: <FaShieldAlt />,
      color: "red",
      content: "Completed one-month internship at Shadow Fox specializing in Cyber Security. Enhanced practical knowledge of security tools and methodologies.",
      achievement: "Advanced security tools expertise"
    },
    {
      id: 7,
      title: "Cyber Secured India",
      subtitle: "3 Months Program",
      icon: <FaBriefcase />,
      color: "green",
      content: "Completed comprehensive 3-month Digital Forensics and Cyber Security internship at Cyber Secured India. Gained in-depth knowledge of forensic investigation techniques and incident response procedures.",
      achievement: "Digital forensics specialization"
    },
    {
      id: 8,
      title: "Corporate Experience - Adani Wilmar",
      subtitle: "2 Months On-site",
      icon: <FaBriefcase />,
      color: "cyan",
      content: "Completed 2-month on-site internship in Digital Forensic and Cyber Security at Awl Agri Business Ltd (Formerly ADANI WILMAR LTD.). Worked in corporate environment handling real-world security challenges and forensic investigations.",
      achievement: "Corporate security experience",
      featured: true
    },
    {
      id: 9,
      title: "CTF Competition Success",
      subtitle: "Multiple Platforms",
      icon: <FaTrophy />,
      color: "purple",
      content: "Participated in IIT-Roorkee CTF securing 16th position out of 100 teams. Secured 144th rank in Bugcrowd CTF. Participated in TryHackme Hackfinity Battle and AWS × SANS CTF gaining 200th rank. Competed in University CTF 2025: Tinsel Trouble achieving 417th rank out of 1050 universities with team NFSU. These competitions sharpened penetration testing and problem-solving skills.",
      achievement: "Multiple CTF achievements",
      featured: true
    },
    {
      id: 10,
      title: "Master's in Digital Forensics",
      subtitle: "Pursuing Semester III - 2024-25",
      icon: <FaGraduationCap />,
      color: "blue",
      content: "Currently pursuing Master of Digital Forensic and Information Security (DFIS) at Narnarayan Shastri Institute of Technology, Jetalpur, Ahmedabad (affiliated with NSFU National Forensic Science University, Gandhinagar). Deepening expertise in forensic analysis, incident response, and information security. Completed major project on 'Advanced Billing System with QR using Full Stack with Python' and minor project on 'Cryptography & Steganography Tool Using Python'.",
      achievement: "Advanced forensics education in progress",
      featured: true
    },
    {
      id: 11,
      title: "Professional Certifications",
      subtitle: "Ongoing Development",
      icon: <FaCertificate />,
      color: "indigo",
      content: "Earned 15+ professional certifications including SysTools Digital Forensic Essentials (SDFE), SysTools Incident Response Essentials (SIRE), Digital Forensics Masterclass (DFMC + DIFR), Belkasoft Windows Forensics, OS Forensics Triage (OSFT), CNSP from SecOps, and Harvard CS50's Introduction to Cybersecurity. Completed job simulations with Tata Group and Mastercard.",
      achievement: "15+ industry certifications"
    }
  ];

  // Theme styles
  const theme = {
    bg: darkMode ? 'bg-gray-900' : 'bg-slate-50',
    text: darkMode ? 'text-gray-100' : 'text-gray-800',
    muted: darkMode ? 'text-gray-400' : 'text-gray-600',
    accent: darkMode ? 'text-cyan-400' : 'text-cyan-600',
    card: darkMode ? 'bg-gray-800/70' : 'bg-white/80',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
  };

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: darkMode ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-300',
      indigo: darkMode ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-indigo-100 text-indigo-700 border-indigo-300',
      purple: darkMode ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-300',
      pink: darkMode ? 'bg-pink-500/20 text-pink-400 border-pink-500/30' : 'bg-pink-100 text-pink-700 border-pink-300',
      red: darkMode ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-300',
      amber: darkMode ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-amber-100 text-amber-700 border-amber-300',
      green: darkMode ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300',
      cyan: darkMode ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-cyan-100 text-cyan-700 border-cyan-300',
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
      <main className="max-w-5xl mx-auto px-4 py-8" ref={containerRef}>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            My <span className={theme.accent}>Cybersecurity Journey</span>
          </h1>
          <p className={`${theme.muted} text-base sm:text-lg max-w-2xl mx-auto`}>
            From curious beginner to Digital Forensics & InfoSec specialist - a timeline of growth, learning, and achievements in cybersecurity.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} transform md:-translate-x-1/2`}></div>

          {/* Timeline items */}
          <div className="space-y-8">
            {journeyStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row`}
              >
                {/* Icon */}
                <div className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center ${getColorClasses(stage.color)} ${stage.featured ? 'w-10 h-10 md:w-12 md:h-12' : ''}`}>
                  <span className={stage.featured ? 'text-lg' : 'text-sm'}>{stage.icon}</span>
                </div>

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'} md:w-1/2`}>
                  <div className={`${theme.card} rounded-lg p-4 sm:p-6 border ${theme.border} backdrop-blur-sm ${stage.featured ? 'ring-2 ring-cyan-500/50' : ''}`}>
                    {stage.featured && (
                      <div className="flex items-center gap-2 mb-2">
                        <FaAward className="text-yellow-500" />
                        <span className="text-xs font-semibold uppercase tracking-wide text-yellow-500">Featured Milestone</span>
                      </div>
                    )}
                    <h3 className="text-lg sm:text-xl font-bold mb-1">{stage.title}</h3>
                    <p className={`text-xs sm:text-sm ${theme.accent} mb-3 font-medium`}>{stage.subtitle}</p>
                    <p className={`${theme.muted} text-sm sm:text-base mb-4`}>{stage.content}</p>
                    <div className={`inline-flex items-center gap-2 text-xs sm:text-sm px-3 py-1.5 rounded-full ${getColorClasses(stage.color)}`}>
                      <FaTrophy className="text-xs" />
                      <span>{stage.achievement}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className={`${theme.card} rounded-lg p-6 sm:p-8 border ${theme.border} backdrop-blur-sm`}>
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Interested in collaboration?</h2>
            <p className={`${theme.muted} mb-6 text-sm sm:text-base`}>
              I&apos;m always open to discussing cybersecurity projects, forensic investigations, or security research opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contact"
                className={`px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium flex items-center justify-center gap-2 hover:from-cyan-500 hover:to-blue-500 transition-all`}
              >
                <span>Get in Touch</span>
                <FaChevronRight className="text-xs" />
              </a>
              <a
                href="/skills"
                className={`px-6 py-3 rounded-lg border ${theme.border} ${theme.text} font-medium flex items-center justify-center gap-2 hover:bg-gray-700/10 transition-all`}
              >
                <span>View Skills</span>
                <FaChevronRight className="text-xs" />
              </a>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
