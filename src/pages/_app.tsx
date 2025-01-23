import { Toaster } from "@/components/ui/toaster";
import { DrawingProvider } from "@/lib/contexts/drawing-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DrawingProvider>
      <Toaster />
      <Component {...pageProps} />
    </DrawingProvider>
  );
}
