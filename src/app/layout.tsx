import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import SmoothScrollProvider from "@/provider/smooth-scroll-provider";
import { Toaster } from "@/components/ui/sonner";

import "@/styles/globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Salman Khan | Full-Stack Web Developer Portfolio",
  description: "Professional portfolio showcasing web development projects, React expertise, and full-stack solutions. Hire for modern web applications.",
  keywords: ["web developer", "React developer", "full-stack", "portfolio", "Muhammad Salman Khan"],
  openGraph: {
    title: "Muhammad Salman Khan - Web Developer",
    description: "View my latest web development projects and skills",
    images: ['/og-image.png'],
  }
  ,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

import { CustomCursor } from "@/components/animated/custom-cursor"; 
import { InteractiveBackground } from "@/components/animated/interactive-background";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-background`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          {/* <CustomCursor /> */}
          {/* <InteractiveBackground /> */}
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
