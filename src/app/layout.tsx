import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MNBA",
  description: "League results fixtures, team and player Register",
    icons: {
    icon: "/favicon.ico", 
  },
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
        <SessionProviderWrapper>
          <Navbar />
          {children}
          <footer className="text-center mt-8 sm:mt-10 text-gray-500 text-xs sm:text-sm">
            Powered by             <Link
              href="https://kuntech.co.zw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold"
            >
              KunTech
            </Link>
          </footer>



        </SessionProviderWrapper>
      </body>
    </html>
  );
}
