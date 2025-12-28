'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';
import Link from 'next/link';

// OWASP A10:2025 - Mishandling of Exceptional Conditions
// This component handles runtime errors gracefully without exposing sensitive information
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { darkMode } = useTheme();

  useEffect(() => {
    // Log error for monitoring (OWASP A09:2025 - Security Logging)
    // Only log generic error info, not sensitive details
    console.error('Application error occurred:', {
      message: error.message,
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  const theme = {
    bg: darkMode ? 'bg-gray-900' : 'bg-slate-50',
    text: darkMode ? 'text-gray-100' : 'text-gray-800',
    muted: darkMode ? 'text-gray-400' : 'text-gray-600',
    card: darkMode ? 'bg-gray-800/70' : 'bg-white/80',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme.bg} ${theme.text} p-4`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${theme.card} rounded-lg p-8 max-w-2xl w-full border ${theme.border} backdrop-blur-sm`}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
              darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
            }`}
          >
            <FaExclamationTriangle className="text-4xl" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">Something went wrong!</h1>
          
          <p className={`${theme.muted} mb-6 max-w-md`}>
            We encountered an unexpected error. Don&apos;t worry, your data is safe. 
            Please try again or return to the home page.
          </p>

          {/* Only show error digest (safe to expose), not the full error message */}
          {error.digest && (
            <p className={`${theme.muted} text-sm mb-6 font-mono`}>
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-500 hover:to-blue-500 transition-all"
            >
              <FaRedo className="text-sm" />
              Try Again
            </motion.button>

            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all w-full ${
                  darkMode
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                <FaHome className="text-sm" />
                Go Home
              </motion.button>
            </Link>
          </div>

          <div className={`${theme.muted} text-sm mt-8 max-w-md`}>
            <p>
              If this problem persists, please{' '}
              <Link href="/contact" className="text-cyan-500 hover:text-cyan-400 underline">
                contact me
              </Link>{' '}
              with the error ID above.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
