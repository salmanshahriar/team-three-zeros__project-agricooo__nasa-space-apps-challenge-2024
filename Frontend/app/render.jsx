"use client"; // Ensure this component is a Client Component

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";

const Render = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Only run this on the client side
    const checkAuthentication = () => {
      const accessToken = localStorage.getItem("accessToken");
      const apiToken = localStorage.getItem("apiToken");

      // Check if both tokens are present, else mark as not authenticated
      if (accessToken && apiToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    // Redirect to auth page if not authenticated
    if (isAuthenticated === false) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  // Show loading spinner while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="main-bg flex justify-center items-center min-h-screen">
        <Spinner color="primary" />
      </div>
    );
  }

  // If authenticated, render children
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated, return null since we handle redirection above
  return null;
};

export default Render;
