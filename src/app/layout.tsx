import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pranav | AI & Full-Stack Engineer",
  description: "AI-focused full-stack developer building real-world systems, automation platforms, and intelligent AI tools. Open to internships and impactful engineering opportunities.",
  keywords: [
    "AI developer",
    "Full stack developer",
    "Next.js developer",
    "AI systems",
    "student developer",
    "internship candidate",
    "system design",
    "automation engineer",
    "AI Full Stack Developer India",
    "Next.js AI portfolio",
    "Student AI engineer portfolio"
  ],
  authors: [{ name: "Pranav" }],
  openGraph: {
    title: "Pranav | AI & Full-Stack Engineer",
    description: "AI-focused full-stack developer building real-world systems, automation platforms, and intelligent AI tools.",
    url: "https://pranav-exe.vercel.app", // Placeholder for actual domain
    siteName: "Pranav.exe Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranav | AI & Full-Stack Engineer",
    description: "AI-focused full-stack developer building real-world systems and intelligent AI tools.",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export const viewport = {
  themeColor: "#00f0ff",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
