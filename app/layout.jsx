import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";
import 'boxicons/css/boxicons.min.css';
import { NextUIProvider } from '@nextui-org/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Agricooo | By ThreeZeros",
  description: "Welcome to Agricooo, an innovative solution designed to help farmers around the world make informed decisions using real-time Earth observation data and powerful analytics. Agricooo empowers farmers to tackle the challenges posed by unpredictable weather, pests, and diseases, ensuring better crop management and enhanced agricultural productivity.",
};

export default function RootLayout({ children }) {
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
