import { Toaster } from "@/components/ui/toaster";
import { DrawingProvider } from "@/lib/contexts/drawing-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("service worker registered"))
        .catch((err) =>
          console.error("service worker registration failed", err),
        );
    }
  }, []);
  return (
    <DrawingProvider>
      <Toaster />
      <Component {...pageProps} />
    </DrawingProvider>
  );
}
