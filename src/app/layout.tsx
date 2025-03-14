"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [theme, setTheme] = useState(localStorage?.getItem("pocketedTheme"))

  useEffect(() => {
    const storedTheme = localStorage.getItem("pocketedTheme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      localStorage.setItem("pocketedTheme", "dark");
    }
  }, []);

  return (
    <html lang="en" data-theme={theme} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
