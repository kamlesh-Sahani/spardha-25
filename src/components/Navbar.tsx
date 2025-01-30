"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Home,
  FileClock,
  ClipboardCopy,
  Menu,
  X,
  NotebookTabs,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Spardha", path: "/" },
  { icon: FileClock, label: "Register", path: "/register" },
  { icon: ClipboardCopy, label: "Report", path: "/report" },
  { icon: NotebookTabs, label: "Player Detail", path: "/DetailPage" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current route

  return (
    <div>
      {/* Top Contact Bar */}
      <div className="hidden lg:block bg-gray-800 text-white py-4 px-3">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4 px-3">
            <span className="flex items-center">
              <Mail size={20} className="mr-2" /> info@example.com
            </span>
            <span className="flex items-center">
              <Phone size={20} className="mr-2" /> +1 234 567 8900
            </span>
          </div>
          <div className="flex items-center space-x-4 px-2">
            <Facebook size={20} />
            <Twitter size={20} />
            <Instagram size={20} />
            <Linkedin size={20} />
          </div>
        </div>
      </div>

      {/* Desktop Navbar */}
      <nav className="hidden lg:block bg-gray-950 text-white py-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-around py-2 items-center">
          <div className="text-2xl font-bold">
            <img
              src="https://www.donboscoitggsipu.org/images/logo%20(2).png"
              className="w-28"
              alt="Logo"
            />
          </div>
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link key={item.label} href={item.path}>
                <span
                  className={`flex items-center space-x-2 ${
                    pathname === item.path ? "text-blue-400" : "hover:text-blue-400"
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-gray-950 text-white rounded-full"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-y-0 right-0 w-64 bg-gray-950 text-gray-200 z-40 lg:hidden"
          >
            <nav className="flex flex-col p-8 space-y-4 mt-16">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link key={item.label} href={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                    <span
                      className={`flex items-center space-x-2 ${
                        pathname === item.path ? "text-blue-400" : "hover:text-blue-400"
                      }`}
                    >
                      <item.icon size={24} />
                      <span>{item.label}</span>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
