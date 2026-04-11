import type { Metadata } from "next";
import AuthListener from "@/app/client/AuthListener";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Polycogni Capital",
    template: "%s | Polycogni Capital",
  },
  description:
    "Polycogni Capital is the First Hybrid Layer 2 Blockchain that introduces smart contracts to Bitcoin.",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  manifest: "/site.webmanifest",
  themeColor: "#000000",
  openGraph: {
    title: "Polycogni Capital",
    description:
      "Polycogni Capital is the First Hybrid Layer 2 Blockchain that introduces smart contracts to Bitcoin.",
    url: "https://www.polycognicapital.com",
    siteName: "Polycogni Capital",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Polycogni Capital",
    description:
      "Polycogni Capital is the First Hybrid Layer 2 Blockchain that introduces smart contracts to Bitcoin.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthListener />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
