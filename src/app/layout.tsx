"use client"

import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = localStorage.getItem("pocketedTheme")
  if (!theme) {
    localStorage.setItem("pocketedTheme", "dark")
  }

  return (
    <html lang="en" data-theme={localStorage.getItem("pocketedTheme")} suppressHydrationWarning>
      <body
        className={` antialiased`}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
