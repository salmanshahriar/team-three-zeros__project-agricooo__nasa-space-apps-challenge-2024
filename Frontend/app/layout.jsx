import Navbar from "./components/Navbar";
import "./globals.css";
import 'boxicons/css/boxicons.min.css';
import { NextUIProvider } from "@nextui-org/react";
import Render from "./render";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" /> {/* Fix applied here */}
        <meta name="description" content="Agricooo - A powerful app for farmers using NASA datasets for real-time insights." />
        <meta name="keywords" content="Agriculture, NASA Space Apps, IoT, Weather Prediction, AI Recommendations" />
        <meta name="author" content="Team ThreeZeros" />
        <link rel="icon" href="/favicon.ico" />
        <title>Agricooo - NSAC2024</title>
      </head>
      <body className="main-bg">
        <NextUIProvider>
          <Render>
            <Navbar />
            {children}
          </Render>
        </NextUIProvider>
      </body>
    </html>
  );
}
