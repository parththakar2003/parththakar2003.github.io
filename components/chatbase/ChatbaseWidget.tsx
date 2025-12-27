'use client';

import { useEffect } from 'react';

// Type definitions for Chatbase
interface ChatbaseFunction {
  (command: string, ...args: unknown[]): unknown;
  q?: unknown[][];
}

export default function ChatbaseWidget() {
  useEffect(() => {
    // Get the chat ID from environment variable
    const chatId = process.env.NEXT_PUBLIC_CHATBASE_CHAT_ID;
    
    // Only load the widget if the chat ID is configured
    if (!chatId) {
      console.warn('Chatbase widget: NEXT_PUBLIC_CHATBASE_CHAT_ID is not configured');
      return;
    }

    // Initialize Chatbase widget
    const initChatbase = () => {
      // Check if Chatbase is already initialized
      if (window.chatbase && window.chatbase('getState') === 'initialized') {
        return;
      }

      // Setup Chatbase function with queue
      const chatbaseFunc: ChatbaseFunction = (...args: unknown[]) => {
        if (!chatbaseFunc.q) {
          chatbaseFunc.q = [];
        }
        chatbaseFunc.q.push(args);
      };

      // Wrap with Proxy for method-style calls
      window.chatbase = new Proxy(chatbaseFunc, {
        get(target, prop) {
          if (prop === 'q') {
            return target.q;
          }
          return (...args: unknown[]) => target(prop as string, ...args);
        }
      });

      // Load the Chatbase script
      const loadScript = () => {
        const script = document.createElement('script');
        script.src = 'https://www.chatbase.co/embed.min.js';
        script.id = chatId;
        script.setAttribute('domain', 'www.chatbase.co');
        script.async = true;
        document.body.appendChild(script);
      };

      if (document.readyState === 'complete') {
        loadScript();
      } else {
        window.addEventListener('load', loadScript);
      }
    };

    initChatbase();

    // NOTE: Identity verification is disabled for static site exports
    // This is a static site (GitHub Pages), so server-side API routes are not available
    // 
    // To enable identity verification:
    // 1. Deploy to a platform that supports server-side rendering (Vercel, Netlify, etc.)
    // 2. Remove 'output: export' from next.config.ts
    // 3. Create API route at /app/api/chatbase/token/route.ts (see CHATBASE_SETUP.md)
    // 4. Uncomment the code below:
    //
    // const identifyUser = async () => {
    //   try {
    //     const response = await fetch('/api/chatbase/token');
    //     if (response.ok) {
    //       const { token } = await response.json();
    //       if (token && window.chatbase) {
    //         window.chatbase('identify', { token });
    //       }
    //     }
    //   } catch (error) {
    //     console.debug('Chatbase identity verification not available:', error);
    //   }
    // };
    // 
    // const timer = setTimeout(identifyUser, 1000);
    // return () => clearTimeout(timer);

  }, []);

  return null; // This component doesn't render anything
}

// Extend the Window interface globally
declare global {
  interface Window {
    chatbase: ChatbaseFunction;
  }
}

