'use client';

import { useEffect } from 'react';

// Extend the Window interface to include chatbase
declare global {
  interface Window {
    chatbase?: {
      (action: string, data?: Record<string, unknown>): void;
    };
    embeddedChatbotConfig?: {
      chatbotId: string;
      domain: string;
    };
  }
}

export default function ChatbaseWidget() {
  useEffect(() => {
    const chatId = process.env.NEXT_PUBLIC_CHATBASE_CHAT_ID;
    
    if (!chatId) {
      console.warn('Chatbase: NEXT_PUBLIC_CHATBASE_CHAT_ID is not configured. Widget will not load.');
      return;
    }

    // Set chatbot configuration
    window.embeddedChatbotConfig = {
      chatbotId: chatId,
      domain: "www.chatbase.co"
    };

    // Load the Chatbase script
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;
    script.setAttribute('chatbotId', chatId);
    script.setAttribute('domain', 'www.chatbase.co');

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      // Remove script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Remove chatbase config
      delete window.embeddedChatbotConfig;
    };
  }, []);

  return null; // This component doesn't render anything visible itself
}
