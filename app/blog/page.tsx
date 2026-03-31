"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaClock, FaUser, FaShieldAlt, FaSearch, FaChevronRight } from "react-icons/fa";

export default function Blog() {
  const { darkMode } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Theme styles
  const theme = {
    bg: 'bg-transparent',
    text: darkMode ? 'text-gray-100' : 'text-gray-800',
    muted: darkMode ? 'text-gray-400' : 'text-gray-600',
    accent: darkMode ? 'text-cyan-400' : 'text-cyan-600',
    card: darkMode ? 'bg-gray-800/70' : 'bg-white/80',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
  };

  // Blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Introduction to Digital Forensics: A Comprehensive Guide",
      excerpt: "Digital forensics has become an essential field in cybersecurity. Learn about the fundamentals, tools, and methodologies used by forensic investigators.",
      author: "Parth Thakar",
      date: "December 2024",
      readTime: "15 min read",
      category: "Digital Forensics",
      tags: ["DFIR", "Forensics", "Incident Response", "Cybersecurity"],
      imageUrl: "/images/code_pattern.svg",
      featured: true,
      content: {
        introduction: "Digital forensics is the practice of collecting, analyzing, and reporting on digital data in a way that is legally admissible. It's a crucial component of incident response and criminal investigations in our increasingly digital world. In this comprehensive guide, we'll explore the fundamentals of digital forensics, the tools used, and best practices for conducting forensic investigations.",
        
        sections: [
          {
            title: "What is Digital Forensics?",
            content: "Digital forensics, also known as computer forensics, is a branch of forensic science that focuses on the recovery and investigation of material found in digital devices. It encompasses the identification, preservation, analysis, and presentation of digital evidence in a manner that maintains its integrity and admissibility in legal proceedings."
          },
          {
            title: "Key Principles of Digital Forensics",
            bullets: [
              "**Identification**: Recognizing potential evidence and determining its relevance to the investigation",
              "**Preservation**: Ensuring that evidence is protected from tampering, contamination, or loss",
              "**Analysis**: Examining the evidence using forensic tools and techniques to extract relevant information",
              "**Documentation**: Maintaining detailed records of all forensic processes and findings",
              "**Presentation**: Clearly communicating findings in a format suitable for legal proceedings"
            ]
          },
          {
            title: "Essential Forensic Tools",
            content: "Modern digital forensics relies on a variety of specialized tools:",
            bullets: [
              "**FTK Imager**: Industry-standard tool for creating forensic images and previewing data",
              "**Autopsy**: Open-source digital forensics platform for analyzing disk images and recovering files",
              "**Wireshark**: Network protocol analyzer for capturing and analyzing network traffic",
              "**Volatility**: Memory forensics framework for analyzing RAM dumps",
              "**Sleuth Kit**: Collection of command-line tools for investigating disk images",
              "**EnCase**: Comprehensive forensic suite for enterprise-level investigations"
            ]
          },
          {
            title: "The Forensic Investigation Process",
            bullets: [
              "**1. Preparation**: Set up forensic workstation, gather necessary tools, and review case requirements",
              "**2. Identification & Seizure**: Locate and secure digital devices while maintaining chain of custody",
              "**3. Acquisition**: Create forensically sound copies of data using write-blocking techniques",
              "**4. Analysis**: Examine data for evidence, recover deleted files, and analyze system artifacts",
              "**5. Reporting**: Document findings in a clear, concise manner suitable for stakeholders",
              "**6. Presentation**: Present findings in court or to management, explaining technical concepts clearly"
            ]
          },
          {
            title: "Types of Digital Evidence",
            content: "Forensic investigators work with various types of digital evidence:",
            bullets: [
              "**File System Evidence**: Documents, images, videos, and other files stored on devices",
              "**System Artifacts**: Registry entries, event logs, temporary files, and system metadata",
              "**Network Evidence**: Packet captures, firewall logs, and network connection records",
              "**Memory Evidence**: RAM contents, running processes, and volatile system information",
              "**Mobile Device Evidence**: Call logs, messages, app data, and location information",
              "**Cloud Evidence**: SaaS applications, cloud storage, and web-based services"
            ]
          },
          {
            title: "Best Practices in Digital Forensics",
            bullets: [
              "Always use write-blockers when acquiring evidence to prevent data modification",
              "Maintain detailed documentation throughout the entire investigation process",
              "Follow proper chain of custody procedures to ensure evidence admissibility",
              "Use hash values (MD5, SHA-256) to verify data integrity",
              "Work on copies of evidence, never on original data",
              "Stay updated with the latest forensic tools and techniques",
              "Understand legal requirements and regulations in your jurisdiction",
              "Practice ethical conduct and maintain professional standards"
            ]
          },
          {
            title: "Challenges in Modern Digital Forensics",
            content: "Today's forensic investigators face several challenges:",
            bullets: [
              "**Encryption**: Widespread use of encryption can hinder data access",
              "**Cloud Computing**: Evidence scattered across multiple jurisdictions and providers",
              "**Anti-Forensics**: Techniques designed to obstruct forensic investigations",
              "**Mobile Devices**: Diverse platforms and constantly evolving security features",
              "**Data Volume**: Massive amounts of data requiring efficient processing",
              "**IoT Devices**: New categories of connected devices with unique forensic challenges"
            ]
          },
          {
            title: "Career Opportunities in Digital Forensics",
            content: "The field offers numerous career paths:",
            bullets: [
              "**Digital Forensic Analyst**: Conduct forensic examinations and analyze digital evidence",
              "**Incident Responder**: Handle cybersecurity incidents and perform forensic analysis",
              "**Malware Analyst**: Reverse engineer malicious software and analyze threats",
              "**Mobile Forensics Specialist**: Focus on smartphones and mobile device investigations",
              "**Network Forensics Analyst**: Analyze network traffic and investigate security incidents",
              "**Forensic Consultant**: Provide expert testimony and consulting services"
            ]
          },
          {
            title: "Getting Started in Digital Forensics",
            bullets: [
              "Pursue relevant education: Computer Science, Cybersecurity, or Information Security",
              "Obtain certifications: SDFE, DIFR, GCFE, EnCE, or CHFI",
              "Gain hands-on experience with forensic tools and techniques",
              "Practice on CTF challenges and forensic scenarios",
              "Join professional organizations like HTCIA or IACIS",
              "Stay current with industry trends and emerging technologies",
              "Build a home lab for practicing forensic techniques"
            ]
          }
        ],
        
        conclusion: "Digital forensics is a dynamic and essential field in today's cybersecurity landscape. As technology continues to evolve, so do the techniques and tools used by forensic investigators. Whether you're interested in law enforcement, corporate security, or incident response, digital forensics offers rewarding career opportunities. The key to success lies in continuous learning, hands-on practice, and maintaining the highest ethical standards. Remember, every investigation is unique, and the ability to adapt your approach while maintaining forensic integrity is what separates good investigators from great ones.",
        
        resources: [
          "NIST Computer Forensics Tool Testing (CFTT) Program",
          "SANS Digital Forensics and Incident Response",
          "International Journal of Digital Evidence (IJDE)",
          "Forensic Focus Community",
          "Digital Forensics Association (DFA)"
        ]
      }
    }
  ];

  const getColorClasses = () => {
    return darkMode 
      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' 
      : 'bg-cyan-100 text-cyan-700 border-cyan-300';
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
            Cybersecurity <span className={theme.accent}>Blog</span>
          </h1>
          <p className={`${theme.muted} text-base sm:text-lg max-w-2xl mx-auto`}>
            Insights, tutorials, and thoughts on digital forensics, incident response, and cybersecurity.
          </p>
        </motion.div>

        {/* Featured Post */}
        {selectedPost === null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            {blogPosts.filter(post => post.featured).map((post) => (
              <div
                key={post.id}
                className={`${theme.card} rounded-lg overflow-hidden border ${theme.border} backdrop-blur-sm`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-semibold">
                        Featured Post
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs ${getColorClasses()}`}>
                        {post.category}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">{post.title}</h2>
                    <p className={`${theme.muted} mb-6 text-sm sm:text-base`}>{post.excerpt}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                      <div className="flex items-center gap-2">
                        <FaUser className={theme.accent} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className={theme.accent} />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaSearch className={theme.accent} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedPost(post.id)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium hover:from-cyan-500 hover:to-blue-500 transition-all w-fit"
                    >
                      <span>Read Full Article</span>
                      <FaChevronRight className="text-xs" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className={`w-full h-64 lg:h-full rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                      <FaShieldAlt className="text-6xl text-cyan-500 opacity-50" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Full Article View */}
        {selectedPost !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`${theme.card} rounded-lg p-6 sm:p-8 lg:p-12 border ${theme.border} backdrop-blur-sm`}
          >
            {blogPosts.filter(post => post.id === selectedPost).map((post) => (
              <article key={post.id}>
                {/* Article Header */}
                <div className="mb-8">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className={`mb-6 flex items-center gap-2 ${theme.accent} hover:underline`}
                  >
                    ← Back to Blog
                  </button>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getColorClasses()}`}>
                      {post.category}
                    </span>
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FaUser className={theme.accent} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className={theme.accent} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaSearch className={theme.accent} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  {/* Introduction */}
                  <p className={`text-lg ${theme.muted} mb-8 leading-relaxed`}>
                    {post.content.introduction}
                  </p>

                  {/* Main Sections */}
                  {post.content.sections.map((section, index) => (
                    <div key={index} className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                      {section.content && (
                        <p className={`${theme.muted} mb-4 leading-relaxed`}>{section.content}</p>
                      )}
                      {section.bullets && (
                        <ul className="space-y-3">
                          {section.bullets.map((bullet, i) => (
                            <li key={i} className={`${theme.muted} leading-relaxed flex items-start gap-3`}>
                              <span className={`${theme.accent} mt-1`}>•</span>
                              <span dangerouslySetInnerHTML={{ __html: bullet }} />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  {/* Conclusion */}
                  <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
                    <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                    <p className={`${theme.muted} leading-relaxed`}>{post.content.conclusion}</p>
                  </div>

                  {/* Resources */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
                    <ul className="space-y-2">
                      {post.content.resources.map((resource, i) => (
                        <li key={i} className={`${theme.muted} flex items-start gap-3`}>
                          <span className={theme.accent}>→</span>
                          <span>{resource}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Article Footer */}
                <div className="mt-12 pt-6 border-t border-gray-700">
                  <p className={`${theme.muted} text-sm mb-4`}>
                    Written by <span className={theme.accent}>{post.author}</span> • {post.date}
                  </p>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border ${theme.border} hover:bg-gray-700/20 transition-all"
                  >
                    ← Back to Blog
                  </button>
                </div>
              </article>
            ))}
          </motion.div>
        )}

        {/* Call to Action */}
        {selectedPost === null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className={`${theme.card} rounded-lg p-6 sm:p-8 border ${theme.border} backdrop-blur-sm`}>
              <h2 className="text-xl sm:text-2xl font-bold mb-3">Stay Updated</h2>
              <p className={`${theme.muted} mb-6 text-sm sm:text-base`}>
                More articles on digital forensics and cybersecurity coming soon. Follow me for updates!
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium hover:from-cyan-500 hover:to-blue-500 transition-all"
              >
                <span>Get in Touch</span>
                <FaChevronRight className="text-xs" />
              </a>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
