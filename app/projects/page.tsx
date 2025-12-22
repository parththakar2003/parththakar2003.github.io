"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaCode, FaLock, FaShieldAlt, FaExternalLinkAlt, FaDatabase } from "react-icons/fa";

export default function Projects() {
  const { darkMode } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

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

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Advanced Billing System with QR",
      description: "A comprehensive full-stack billing system featuring QR code integration for efficient payment processing and invoice management. Built with Python, this system streamlines business transactions with automated billing, receipt generation, and secure payment tracking.",
      type: "Major Project",
      technologies: ["Python", "Full-Stack", "QR Integration", "SQLite/MySQL", "Flask/Django"],
      features: [
        "QR code generation for invoices",
        "Automated billing calculations",
        "Customer management system",
        "Payment tracking and reports",
        "Receipt generation and printing"
      ],
      icon: <FaCode />,
      color: "blue",
      status: "Completed",
      year: "2024"
    },
    {
      id: 2,
      title: "Cryptography & Steganography Tool",
      description: "A security-focused Python application implementing various encryption algorithms and steganography techniques. This tool enables secure data hiding within images and provides multiple cryptographic methods for data protection and secure communication.",
      type: "Minor Project",
      technologies: ["Python", "Cryptography", "Steganography", "PIL/Pillow", "Security Algorithms"],
      features: [
        "Multiple encryption algorithms (AES, RSA, DES)",
        "Image-based steganography",
        "Text encryption/decryption",
        "Secure key management",
        "Hidden message extraction"
      ],
      icon: <FaLock />,
      color: "purple",
      status: "Completed",
      year: "2025"
    }
  ];

  // Internship Projects
  const internshipProjects = [
    {
      title: "Digital Forensics Investigation",
      company: "Awl Agri Business Ltd (ADANI WILMAR)",
      description: "Conducted digital forensic investigations on corporate systems, analyzing digital evidence and preparing forensic reports for security incidents.",
      skills: ["FTK Imager", "Autopsy", "Evidence Collection", "Report Writing"],
      duration: "2 months"
    },
    {
      title: "Cyber Security Assessment",
      company: "Cyber Secured India",
      description: "Performed vulnerability assessments and penetration testing on client systems. Implemented security best practices and documented findings.",
      skills: ["Vulnerability Assessment", "Penetration Testing", "Security Auditing", "DFIR"],
      duration: "3 months"
    },
    {
      title: "Full-Stack Web Development",
      company: "Brainy Beam Technologies",
      description: "Developed and deployed full-stack web applications using Python frameworks. Implemented RESTful APIs and database management systems.",
      skills: ["Python", "Django/Flask", "RESTful APIs", "MySQL", "Frontend Development"],
      duration: "2 months"
    }
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
            My <span className={theme.accent}>Projects</span>
          </h1>
          <p className={`${theme.muted} text-base sm:text-lg max-w-2xl mx-auto`}>
            Academic projects and professional work showcasing expertise in cybersecurity, digital forensics, and software development.
          </p>
        </motion.div>

        {/* Academic Projects */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-6 flex items-center gap-2"
          >
            <FaShieldAlt className={theme.accent} />
            Academic Projects
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${theme.card} rounded-lg p-6 border ${theme.border} backdrop-blur-sm hover:scale-[1.02] transition-transform`}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(project.color)}`}>
                    <span className="text-2xl">{project.icon}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${getColorClasses(project.color)}`}>
                      {project.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${getColorClasses('green')}`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Title & Description */}
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className={`${theme.muted} text-sm mb-4`}>{project.description}</p>

                {/* Technologies */}
                <div className="mb-4">
                  <p className="text-xs font-semibold mb-2 uppercase tracking-wide">Technologies Used:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <p className="text-xs font-semibold mb-2 uppercase tracking-wide">Key Features:</p>
                  <ul className={`text-sm ${theme.muted} space-y-1`}>
                    {project.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={theme.accent}>•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-500">Completed in {project.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Internship Projects */}
        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-6 flex items-center gap-2"
          >
            <FaDatabase className={theme.accent} />
            Professional Experience Projects
          </motion.h2>

          <div className="space-y-4">
            {internshipProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${theme.card} rounded-lg p-6 border ${theme.border} backdrop-blur-sm`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                    <p className={`text-sm ${theme.accent}`}>{project.company}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded ${getColorClasses('orange')} mt-2 md:mt-0 inline-block`}>
                    {project.duration}
                  </span>
                </div>
                <p className={`${theme.muted} text-sm mb-4`}>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTF Achievements Section */}
        <section>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-6 flex items-center gap-2"
          >
            <FaShieldAlt className={theme.accent} />
            Capture The Flag (CTF) Competitions
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`${theme.card} rounded-lg p-6 border ${theme.border} backdrop-blur-sm`}
          >
            <p className={`${theme.muted} mb-6`}>
              Active participant in various Capture The Flag competitions, demonstrating practical cybersecurity skills in real-world scenarios.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { event: "IIT-Roorkee CTF", rank: "16th/100 teams", color: "blue" },
                { event: "Bugcrowd CTF", rank: "144th rank", color: "purple" },
                { event: "TryHackme Hackfinity Battle", rank: "Participant", color: "green" },
                { event: "AWS × SANS CTF", rank: "200th rank", color: "orange" }
              ].map((ctf, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getColorClasses(ctf.color)}`}
                >
                  <h4 className="font-semibold mb-1">{ctf.event}</h4>
                  <p className="text-sm">{ctf.rank}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className={`${theme.card} rounded-lg p-6 sm:p-8 border ${theme.border} backdrop-blur-sm`}>
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Interested in my work?</h2>
            <p className={`${theme.muted} mb-6 text-sm sm:text-base`}>
              Let&apos;s discuss collaboration opportunities or cybersecurity projects.
            </p>
            <a
              href="/contact"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium hover:from-cyan-500 hover:to-blue-500 transition-all`}
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
