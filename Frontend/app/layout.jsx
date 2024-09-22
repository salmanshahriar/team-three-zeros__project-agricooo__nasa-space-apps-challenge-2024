"use client";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import "./globals.css";
import 'boxicons/css/boxicons.min.css';
import { NextUIProvider } from '@nextui-org/react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const apiToken = localStorage.getItem("apiToken");
    
    if (accessToken && apiToken) {
      setIsAuthenticated(true);
      router.push('/');
    } else {
      setIsAuthenticated(false);
      router.push('/auth');
    }
  }, [router]);

  return (
    <html lang="en">
      <body className={`${inter.className} main-bg`}>
        <NextUIProvider>
          <Navbar />
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
