"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane } from "react-icons/fa";

// Web3Forms API Configuration
// NOTE: This API key is safe to expose in client-side code. Web3Forms keys are designed
// to be public-facing and are rate-limited and CORS-protected by Web3Forms service.
// See: https://docs.web3forms.com/getting-started/security
const WEB3FORMS_API_KEY = 'c8b5ae36-c601-41af-950f-a9adac3dcbb9';
const PLACEHOLDER_KEY = 'your_web3forms_access_key_here';

export default function Contact() {
  const { darkMode } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const successTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timers on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  // Theme styles
  const theme = {
    bg: darkMode ? 'bg-gray-900' : 'bg-slate-50',
    text: darkMode ? 'text-gray-100' : 'text-gray-800',
    muted: darkMode ? 'text-gray-400' : 'text-gray-600',
    accent: darkMode ? 'text-cyan-400' : 'text-cyan-600',
    card: darkMode ? 'bg-gray-800/70' : 'bg-white/80',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    input: darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300',
  };

  // Contact information
  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: "Parththakar39@gmail.com",
      link: "mailto:Parththakar39@gmail.com"
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      value: "linkedin.com/in/parthmehulkumarthakar",
      link: "https://www.linkedin.com/in/parthmehulkumarthakar/"
    },
    {
      icon: <FaGithub />,
      label: "GitHub",
      value: "github.com/parththakar2003",
      link: "https://github.com/parththakar2003"
    }
  ];

  // Sanitize input to prevent XSS attacks (OWASP A03:2021 - Injection)
  const sanitizeInput = (input: string): string => {
    // Remove HTML tags and dangerous characters
    let sanitized = input
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/data:/gi, '') // Remove data: protocol
      .replace(/vbscript:/gi, '') // Remove vbscript: protocol
      .replace(/file:/gi, '') // Remove file: protocol
      .replace(/about:/gi, '') // Remove about: protocol
      .replace(/['"\\]/g, '') // Remove quotes and backslashes
      .replace(/&lt;/gi, '') // Remove HTML encoded less than
      .replace(/&gt;/gi, '') // Remove HTML encoded greater than
      .replace(/&quot;/gi, '') // Remove HTML encoded quotes
      .replace(/&#x3C;/gi, '') // Remove hex encoded less than
      .replace(/&#60;/gi, '') // Remove decimal encoded less than
      .replace(/&#x3E;/gi, '') // Remove hex encoded greater than
      .replace(/&#62;/gi, '') // Remove decimal encoded greater than
      .trim();
    
    // Remove event handlers (repeatedly to handle nested cases)
    let prevLength = 0;
    while (sanitized.length !== prevLength) {
      prevLength = sanitized.length;
      sanitized = sanitized
        .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
        .replace(/on\w+\s*\(/gi, ''); // Remove event handlers like onclick(
    }
    
    // Additional protection: Remove dangerous patterns at start of strings
    // Only remove if at beginning to avoid breaking legitimate content like "JavaScript developer"
    sanitized = sanitized
      .replace(/^<script>/gi, '')
      .replace(/^<iframe>/gi, '')
      .replace(/^<object>/gi, '')
      .replace(/^<embed>/gi, '')
      .replace(/^<applet>/gi, '');
    
    return sanitized;
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Sanitize input before setting state
    const sanitizedValue = sanitizeInput(value);
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Name validation - allow letters, numbers, spaces, hyphens, apostrophes
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    } else if (!/^[a-zA-Z0-9\s'-]+$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters, numbers, spaces, hyphens, and apostrophes";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    } else if (formData.email.length > 254) {
      newErrors.email = "Email is too long";
    }
    
    // Subject validation - min 3 chars, max 200 chars
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    } else if (formData.subject.length > 200) {
      newErrors.subject = "Subject must be less than 200 characters";
    }
    
    // Message validation - min 10 chars, max 2000 chars
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.length > 2000) {
      newErrors.message = "Message must be less than 2000 characters";
    }
    
    return newErrors;
  };

  // Handle form submission using Web3Forms API
  // This sends emails directly without requiring a backend server
  // Form data is sent to Web3Forms API which forwards it to the configured email
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    // Get Web3Forms access key from environment variable or use default
    // Web3Forms API keys are safe to expose in client-side code as they are
    // designed for public use and protected by CORS and rate limiting
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || WEB3FORMS_API_KEY;
    
    // Fallback to mailto if access key is placeholder
    if (accessKey === PLACEHOLDER_KEY) {
      // Use mailto as fallback
      const mailtoLink = `mailto:Parththakar39@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      
      try {
        window.location.href = mailtoLink;
        setShowSuccess(true);
        
        // Clear any existing timer first
        if (successTimerRef.current) {
          clearTimeout(successTimerRef.current);
        }
        successTimerRef.current = setTimeout(() => {
          setFormData({ name: "", email: "", subject: "", message: "" });
          setIsSubmitting(false);
          setShowSuccess(false);
          successTimerRef.current = null;
        }, 3000);
      } catch (error) {
        console.error("Error opening email client:", error);
        setIsSubmitting(false);
        setErrors({ submit: "Unable to send message. Please try emailing directly to Parththakar39@gmail.com" });
      }
      return;
    }
    
    try {
      // Web3Forms API endpoint
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: formData.name,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        // Show success message
        setShowSuccess(true);
        
        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Auto-hide success message after 5 seconds
        // Clear any existing timer first
        if (successTimerRef.current) {
          clearTimeout(successTimerRef.current);
        }
        successTimerRef.current = setTimeout(() => {
          setShowSuccess(false);
          successTimerRef.current = null;
        }, 5000);
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setErrors({ 
        submit: "Failed to send message. Please try emailing directly to Parththakar39@gmail.com or try again later." 
      });
    } finally {
      setIsSubmitting(false);
    }
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
            Get in <span className={theme.accent}>Touch</span>
          </h1>
          <p className={`${theme.muted} text-base sm:text-lg max-w-2xl mx-auto`}>
            Interested in collaboration or have questions about cybersecurity? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className={`${theme.card} rounded-lg p-6 border ${theme.border} backdrop-blur-sm`}>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-600'}`}>
                      <span className="text-xl">{info.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold mb-1">{info.label}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm ${theme.muted} hover:${theme.accent} transition-colors break-all`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className={`text-sm ${theme.muted}`}>{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Objective */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`${theme.card} rounded-lg p-6 border ${theme.border} backdrop-blur-sm`}
            >
              <h3 className="text-lg font-bold mb-3">Objective</h3>
              <p className={theme.muted}>
                Want to succeed in a stimulating and challenging environment that will provide advancement opportunities in the field of cybersecurity and digital forensics.
              </p>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`${theme.card} rounded-lg p-6 border ${theme.border} backdrop-blur-sm`}
            >
              <h3 className="text-lg font-bold mb-3">Currently</h3>
              <p className={theme.muted}>
                Pursuing Master of Digital Forensic and Information Security (DFIS) - Semester III at Narnarayan Shastri Institute of Technology, Ahmedabad.
              </p>
              <p className={`${theme.muted} mt-2`}>
                Open to internships, collaborations, and cybersecurity research opportunities.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`${theme.card} rounded-lg p-6 border ${theme.border} backdrop-blur-sm`}
          >
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            
            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400"
              >
                <p className="text-sm">
                  ✓ Message sent successfully! I&apos;ll get back to you soon.
                </p>
              </motion.div>
            )}

            {/* Error Message */}
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400"
              >
                <p className="text-sm">{errors.submit}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${theme.input} focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${theme.input} focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Subject Input */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${theme.input} focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all`}
                  placeholder="What's this about?"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border ${theme.input} focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none`}
                  placeholder="Your message..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium flex items-center justify-center gap-2 hover:from-cyan-500 hover:to-blue-500 transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <FaPaperPlane className="text-sm" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
              
              {/* Info Text */}
              <p className={`text-xs ${theme.muted} text-center mt-2`}>
                Your message will be sent directly to my email
              </p>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
