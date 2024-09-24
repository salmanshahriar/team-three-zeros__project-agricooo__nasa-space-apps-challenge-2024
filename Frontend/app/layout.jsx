"use client";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import Head from "next/head";
import "./globals.css";
import 'boxicons/css/boxicons.min.css';
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const apiToken = localStorage.getItem("apiToken");

    if (accessToken && apiToken) {
      setIsAuthenticated(true);
      router.push("/");
    } else {
      setIsAuthenticated(false);
      router.push("/auth");
    }
  }, [router]);

  if (isAuthenticated === null) {
    return  <Spinner color="Primary" className="main-bg flex justify-center items-center "/>; 
  }

  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className={`${inter.className} main-bg`}>
        <NextUIProvider>
          <Navbar />
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
