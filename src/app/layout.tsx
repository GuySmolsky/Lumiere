import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "LUMIÈRE | The Art of Radiance",
  description: "Eco-conscious luxury skincare brand. Sustainably sourced. Scientifically refined.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased bg-[var(--background)] min-h-screen relative`}
      >
        <div className="grain-overlay pointer-events-none fixed inset-0 z-[100]"></div>
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
