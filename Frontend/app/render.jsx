"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";

const Render = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = () => {
      if (typeof window !== "undefined") {  
        const accessToken = localStorage.getItem("accessToken");
        const apiToken = localStorage.getItem("apiToken");

        if (accessToken && apiToken) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return (
      <div className="main-bg flex justify-center items-center min-h-screen">
        <Spinner color="primary" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null;
};

export default Render;
