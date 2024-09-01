"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';


function Navbar() {
  const pathname = usePathname();
  const menuRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const initialIndex = pathname === '/' ? 0 :
                         pathname === '/dashboard' ? 1 :
                         pathname === '/ai-assistant' ? 2 : 3;
    setActiveIndex(initialIndex);
  }, [pathname]);

  useEffect(() => {
    if (menuRef.current) {
      const menuItems = menuRef.current.children;
      const activeItem = menuItems[activeIndex];
      setIndicatorStyle({
        left: `${activeItem.offsetLeft}px`,
        width: `${activeItem.clientWidth}px`,
      });
    }
  }, [activeIndex]);

  const handleMenuClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <header className="fixed z-50 md:w-[400px] bottom-0 left-1/2 transform -translate-x-1/2 w-80 bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-full shadow-2xl backdrop-blur-lg border border-gray-200">
      <nav className="relative flex sm:justify-around items-center p-3 bg-white/20 backdrop-blur-md rounded-full shadow-xl">
        <div
          className="absolute bottom-0 h-2 bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 ease-in-out rounded-full"
          style={indicatorStyle}
        />
        <ul ref={menuRef} className="flex space-x-4 w-full justify-around items-center">
          <li>
            <Link
              href="/"
              onClick={() => handleMenuClick(0)}
              className={`text-center text-gray-900 dark:text-gray-100 transition-colors duration-200 ${activeIndex === 0 ? 'font-bold' : ''}`}
            >
              <i className='bx bxs-home text-3xl'></i>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              onClick={() => handleMenuClick(1)}
              className={`text-center text-gray-900 dark:text-gray-100 transition-colors duration-200 ${activeIndex === 1 ? 'font-bold' : ''}`}
            >
              <i className='bx bxs-dashboard text-3xl'></i>
            </Link>
          </li>
          <li>
            <Link
              href="/ai-assistant"
              onClick={() => handleMenuClick(2)}
              className={`text-center text-gray-900 dark:text-gray-100 transition-colors duration-200 ${activeIndex === 2 ? 'font-bold' : ''}`}
            >
              <i className='bx bxs-message-square-dots text-3xl'></i>
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              onClick={() => handleMenuClick(3)}
              className={`text-center text-gray-900 dark:text-gray-100 transition-colors duration-200 ${activeIndex === 3 ? 'font-bold' : ''}`}
            >
              <i className='bx bxs-user-rectangle text-3xl'></i>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
