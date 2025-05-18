"use client";
import React, { useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  const navLinks = [
    { name: "首页", href: "/" },
    { name: "关于我们", href: "/about" },
    { name: "服务", href: "/services" },
    { name: "联系", href: "/contact" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="font-bold text-xl text-rose-600">每周作业平台</span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 dark:text-gray-200 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
          {/* Search Box */}
          <div className="hidden md:block ml-4">
            <input
              type="text"
              placeholder="搜索..."
              className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          {/* Theme Toggle & Avatar */}
          <div className="flex items-center space-x-4 ml-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-rose-100 dark:hover:bg-rose-700"
              aria-label="切换主题"
            >
              {theme === "light" ? "🌞" : "🌙"}
            </button>
            <img
              src="https://i.pravatar.cc/32"
              alt="用户头像"
              className="w-8 h-8 rounded-full border-2 border-rose-400"
            />
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-rose-600 focus:outline-none"
              aria-label="打开菜单"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-gray-700 dark:text-gray-200 hover:text-rose-600 px-3 py-2 rounded-md text-base font-medium"
            >
              {link.name}
            </a>
          ))}
          <div className="mt-2">
            <input
              type="text"
              placeholder="搜索..."
              className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>
      )}
    </nav>
  );
}