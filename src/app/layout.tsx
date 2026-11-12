import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import SmoothScrollProvider from "@/provider/smooth-scroll-provider";
import { Toaster } from "@/components/ui/sonner";
/** ignore */
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

const siteUrl = "https://salman-afridi.vercel.app";
const siteName = "Muhammad Salman Khan | Full-Stack Web Developer";
const description =
  "Portfolio of Muhammad Salman Khan, a Full-Stack Web Developer from Kohat, Pakistan building modern, scalable web applications with Next.js, React, TypeScript and Node.js. Explore live projects, skills and experience — available for freelance and full-time roles.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Muhammad Salman Khan | Full-Stack Web Developer",
    template: "%s | Muhammad Salman Khan",
  },
  description,
  applicationName: siteName,
  category: "technology",
  creator: "Muhammad Salman Khan",
  authors: [{ name: "Muhammad Salman Khan", url: siteUrl }],
  keywords: [
    "Muhammad Salman Khan",
    "Salman Khan developer",
    "Full-Stack Web Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Web Developer Pakistan",
    "Kohat Web Developer",
    "Freelance Web Developer",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  // openGraph.images / twitter.images are auto-injected by the
  // opengraph-image.tsx / twitter-image.tsx file conventions.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "Muhammad Salman Khan | Full-Stack Web Developer",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Salman Khan | Full-Stack Web Developer",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1e" },
  ],
  colorScheme: "light dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Salman Khan",
  jobTitle: "Full-Stack Web Developer",
  url: siteUrl,
  image: `${siteUrl}/salman.png`,
  email: "mailto:salmankhanm859@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kohat",
    addressRegion: "Khyber Pakhtunkhwa",
    addressCountry: "PK",
  },
  sameAs: [
    "https://github.com/Salman053",
    "https://www.linkedin.com/in/muhammadsalmankhan12",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "JavaScript",
    "Laravel",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased overflow-x-hidden bg-background`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          {/* <CustomCursor /> */}
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
