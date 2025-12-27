'use client';

import { useState, useEffect } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const chatId = process.env.NEXT_PUBLIC_CHATBASE_CHAT_ID;

  useEffect(() => {
    if (!chatId) {
      console.warn('Chatbase: NEXT_PUBLIC_CHATBASE_CHAT_ID is not configured.');
      return;
    }

    // Validate chatId format (alphanumeric, hyphens, underscores only)
    const validChatIdPattern = /^[a-zA-Z0-9_-]+$/;
    if (!validChatIdPattern.test(chatId)) {
      console.error('Chatbase: Invalid chat ID format. Must contain only alphanumeric characters, hyphens, and underscores.');
      return;
    }

    // Mark as loaded to show the floating button
    setIsLoaded(true);
  }, [chatId]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  if (!isLoaded || !chatId) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <button
          onClick={toggleChat}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full p-4 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          aria-label="Open chat"
        >
          <FaComments className="text-2xl" />
        </button>
      </div>

      {/* Expanded Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        }`}
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden w-[380px] h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 rounded-full p-2">
                <FaComments className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Chat Assistant</h3>
                <p className="text-xs text-blue-100">Ask me anything!</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
              aria-label="Close chat"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Chat Content (iframe) */}
          <div className="flex-1 overflow-hidden">
            <iframe
              src={`https://www.chatbase.co/chatbot-iframe/${encodeURIComponent(chatId)}`}
              title="Chatbase chat support"
              className="w-full h-full border-0"
              allow="clipboard-write"
              sandbox="allow-scripts allow-same-origin allow-forms"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </>
  );
}
