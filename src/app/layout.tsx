import Providers from "@/components/providers";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "squibble",
  description: "notes and thoughts",
};

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`antialiased ${geist.className}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
