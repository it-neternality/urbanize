// Type definitions for Cloudflare Turnstile
declare global {
  interface Window {
    turnstile?: {
      getResponse: (widgetId: string) => string;
      reset: (widgetId: string) => void;
    };
  }
}
