import { useEffect } from 'react';

// Declare Crisp on window object for TypeScript
declare global {
  interface Window {
    $crisp?: any;
    CRISP_WEBSITE_ID?: string;
  }
}

export function CrispChat() {
  useEffect(() => {
    // Crisp Chat Integration
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "9ad0b13f-c4a2-4189-a644-5233bbbcf561";
    
    // Load Crisp script
    const script = document.createElement('script');
    script.src = 'https://client.crisp.chat/l.js';
    script.async = true;
    document.getElementsByTagName('head')[0].appendChild(script);

    // Configure Crisp settings after load
    script.onload = () => {
      if (window.$crisp) {
        // Only use safe, documented Crisp API calls
        window.$crisp.push(["safe", true]);
      }
    };

    // Cleanup on unmount
    return () => {
      if (window.$crisp) {
        window.$crisp.push(["do", "chat:hide"]);
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}

// Helper function to open chat programmatically (used in Help.tsx)
export const openCrispChat = () => {
  if (window.$crisp) {
    window.$crisp.push(["do", "chat:open"]);
  }
};