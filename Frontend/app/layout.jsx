"use client";

import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import Head from "next/head";
import "./globals.css";
import 'boxicons/css/boxicons.min.css';
import { NextUIProvider } from "@nextui-org/react";

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = () => {
      const accessToken = localStorage.getItem("accessToken");
      const apiToken = localStorage.getItem("apiToken");

      // Determine if user is authenticated
      if (accessToken && apiToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    // Only redirect if authentication status is determined
    if (isAuthenticated !== null) {
      if (isAuthenticated) {
        // If authenticated, do nothing or navigate to the desired authenticated route
      } else {
        router.push("/auth"); // Redirect to auth page if not authenticated
      }
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return <Spinner color="primary" className="main-bg flex justify-center items-center" />;
  }

  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Agricooo" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </Head>
      <body className="main-bg">
        <NextUIProvider>
          <Navbar />
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
