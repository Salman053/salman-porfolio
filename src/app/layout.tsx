import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import SmoothScrollProvider from "@/provider/smooth-scroll-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Salman Khan | Full-Stack Web Developer Portfolio",
  description: "Professional portfolio showcasing web development projects, React expertise, and full-stack solutions. Hire for modern web applications.",
  keywords: ["web developer", "React developer", "full-stack", "portfolio", "Muhammad Salman Khan"],
  openGraph: {
    title: "Muhammad Salman Khan - Web Developer",
    description: "View my latest web development projects and skills",
    images: ['/og-image.png'], // Add an OpenGraph image
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={false}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-background`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
