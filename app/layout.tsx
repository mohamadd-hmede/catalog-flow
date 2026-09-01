import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthSessionProvider from "@/app/components/session-provider";

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
    default: "CatalogFlow",
    template: "%s | CatalogFlow",
  },
  description:
    "A modern product catalog and management platform built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthSessionProvider>
          <Header />

          <div className="min-h-screen">{children}</div>

          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
