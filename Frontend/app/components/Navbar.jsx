"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';

function Navbar() {
  const pathname = usePathname();
  const menuRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const isAuthPage = pathname === '/auth'; 
  
  const handleMenuClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const initialIndex =
      pathname === '/' ? 0 :
      pathname.startsWith('/weather') ? 1 : 
      pathname === '/dashboard' ? 2 :
      pathname === '/assistance' ? 3 :
      pathname === '/market' ? 4 : 0;
    setActiveIndex(initialIndex);
  }, [pathname]);

  useEffect(() => {
    if (menuRef.current) {
      const menuItems = menuRef.current.children;
      const activeItem = menuItems[activeIndex];
      const sliderWidth = 40;
      const sliderOffset = activeItem.offsetLeft + (activeItem.clientWidth / 2) - (sliderWidth / 2);
      setIndicatorStyle({
        left: `${sliderOffset}px`,
        width: `${sliderWidth}px`,
        height: '5px',
      });
    }
  }, [activeIndex]);

  if (isAuthPage) {
    return null; 
  }

  return (
    <header className="fixed z-30 w-full md:w-[500px] md:rounded-xl bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 p-1 shadow-2xl backdrop-blur-lg hover:shadow-3xl transition-shadow duration-300">
      <nav className="relative flex sm:justify-around items-center p-2 rounded-lg bg-white/20 backdrop-blur-md shadow-xl">
        <div
          className="absolute bottom-0 h-4 bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 ease-in-out rounded-full"
          style={{ ...indicatorStyle, transition: 'all 0.5s ease' }}
        />
        <ul ref={menuRef} className="flex space-x-4 w-full justify-around items-center">
          <li>
            <Link
              href="/"
              onClick={() => handleMenuClick(0)}
              className={`flex flex-col items-center text-white transition-all duration-200 transform ${
                activeIndex === 0 ? 'scale-105 font-bold' : 'hover:scale-105'
              }`}
            >
              <i className="bx bxs-home text-3xl"></i>
              <span className="text-xs font-medium mt-1">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/weather"
              onClick={() => handleMenuClick(1)}
              className={`flex flex-col items-center text-white transition-all duration-200 transform ${
                activeIndex === 1 ? 'scale-105 font-bold' : 'hover:scale-105'
              }`}
            >
              <i className="bx bxs-cloud-rain text-3xl"></i>
              <span className="text-xs font-medium mt-1">Weather</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              onClick={() => handleMenuClick(2)}
              className={`flex flex-col items-center text-white transition-all duration-200 transform ${
                activeIndex === 2 ? 'scale-105 font-bold' : 'hover:scale-105'
              }`}
            >
              <i className="bx bxs-dashboard text-3xl"></i>
              <span className="text-xs font-medium mt-1">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/assistance"
              onClick={() => handleMenuClick(3)}
              className={`flex flex-col items-center text-white transition-all duration-200 transform ${
                activeIndex === 3 ? 'scale-105 font-bold' : 'hover:scale-105'
              }`}
            >
              <i className="bx bxs-chat text-3xl"></i>
              <span className="text-xs font-medium mt-1">Assistance</span>
            </Link>
          </li>
          <li>
            <Link
              href="/market"
              onClick={() => handleMenuClick(4)}
              className={`flex flex-col items-center text-white transition-all duration-200 transform ${
                activeIndex === 4 ? 'scale-105 font-bold' : 'hover:scale-105'
              }`}
            >
              <i className="bx bxs-store text-3xl"></i>
              <span className="text-xs font-medium mt-1">Market</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
