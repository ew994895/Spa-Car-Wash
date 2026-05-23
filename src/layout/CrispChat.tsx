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
    if (!window.$crisp) {
      window.$crisp = [];
    }
    window.CRISP_WEBSITE_ID = "9ad0b13f-c4a2-4189-a644-5233bbbcf561";

    const existingLoader = document.querySelector<HTMLScriptElement>('script[data-crisp-loader="true"]');
    if (!existingLoader) {
      const script = document.createElement('script');
      script.src = 'https://client.crisp.chat/l.js';
      script.async = true;
      script.setAttribute('data-crisp-loader', 'true');
      script.onload = () => {
        window.$crisp?.push(["safe", true]);
      };
      script.onerror = () => {
        console.error('Crisp chat failed to load. Live chat will be unavailable until the network issue is resolved.');
      };
      document.head.appendChild(script);
    }

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
