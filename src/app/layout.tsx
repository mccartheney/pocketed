"use client"
import "./globals.css"
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/LoadingPage";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const [theme, setTheme] = useState("")
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem("pocketedTheme");
    console.log(storedTheme)
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      localStorage.setItem("pocketedTheme", "dark");
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (theme === "") {
    return <html lang="en" data-theme={theme} suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
      </body>
    </html>
  }

  if (isLoading) {

    return <html lang="en" data-theme={theme} suppressHydrationWarning>
      <body
        className={` antialiased`}
      >
        <LoadingPage />
      </body>
    </html>
  }

  return (
    <html lang="en" data-theme={theme} suppressHydrationWarning>
      <body
        className={` antialiased`}
      >
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
