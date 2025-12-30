"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const pathname = usePathname();
  const { darkMode } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      // Only update state if the value is different to prevent unnecessary re-renders
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]); // Add scrolled as a dependency

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = () => {
      setIsOpen(false);
    };
    
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // Menu toggle handler
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Navigation links
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Journey", path: "/journey" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" }
  ];

  if (!mounted) return null;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      darkMode
        ? (scrolled 
            ? 'bg-gradient-to-r from-gray-900 via-red-950 to-black shadow-lg shadow-red-900/20' 
            : 'bg-gradient-to-r from-gray-900/90 via-red-950/90 to-black/90')
        : (scrolled 
            ? 'bg-gradient-to-r from-red-900 via-red-800 to-red-950 shadow-lg backdrop-blur-sm' 
            : 'bg-gradient-to-r from-red-800/90 via-red-700/90 to-red-900/90 backdrop-blur-sm')
    } red-scanline-overlay`}>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link href="/" className="text-xl text-white font-bold relative group">
          <span className="relative z-10 red-gradient-text">Parth Thakar</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300 shadow-[0_0_10px_rgba(255,0,0,0.5)]"></span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <ul className="flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path || 
                              (pathname.startsWith(item.path) && item.path !== "/");
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`relative px-1 py-2 font-medium transition-colors group ${
                      isActive 
                        ? 'text-red-400 red-glow-text' 
                        : 'text-gray-100 hover:text-red-300'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive ? (
                      <motion.span
                        layoutId="navbar-underline"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 shadow-[0_0_10px_rgba(255,0,0,0.8)]"
                      />
                    ) : (
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(255,0,0,0.6)]"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        
        {/* Mobile Navigation Controls */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Theme Toggle for Mobile - Positioned beside hamburger */}
          <div className="scale-90">
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-white transform transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}></span>
              <span className={`h-0.5 bg-white transition-all duration-300 ${
                isOpen ? 'opacity-0' : 'w-full'
              }`}></span>
              <span className={`h-0.5 w-full bg-white transform transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}></span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden ${
              darkMode 
                ? 'bg-gradient-to-r from-gray-900 via-red-950 to-black' 
                : 'bg-gradient-to-r from-red-900 via-red-800 to-red-950'
            } backdrop-blur-sm red-cyber-lines`}
          >
            <ul className="px-4 py-3 space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.path || 
                              (pathname.startsWith(item.path) && item.path !== "/");
                
                return (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={item.path}
                      className={`block py-2 px-3 rounded relative group transition-all duration-300 ${
                        isActive 
                          ? 'bg-red-900/40 text-red-300 red-neon-border' 
                          : 'text-gray-100 hover:bg-red-950/40 hover:text-red-200'
                      }`}
                    >
                      <span className="relative z-10">{item.name}</span>
                      {!isActive && (
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(255,0,0,0.6)]"></span>
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}