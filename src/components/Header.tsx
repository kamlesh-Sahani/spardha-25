"use client";

import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Spardha from "@/app/assets/logo.png";

const Header = () => {
  const sportsImages = [
    "https://cdn.pixabay.com/photo/2016/12/25/15/41/ball-1930191_1280.jpg",
    "https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseEnter = (index: number) => {
    if (!isMobile) setActiveImage(index);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setActiveImage(null);
  };

  const handleMouseMove = (e:any) => {
    if (!isMobile) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <header className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
      <div className="absolute inset-0 flex flex-col md:flex-row justify-around items-center">
        {sportsImages.map((img, index) => (
          <div
            key={index}
            className={`w-full md:w-1/3 h-1/3 md:h-full relative overflow-hidden ${
              isMobile ? "mb-4" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <div
              className="w-full h-full absolute top-0 left-0 bg-[#fff7d1]"
              style={{
                maskImage:
                  activeImage === index && !isMobile
                    ? `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, transparent 100%, black 100%)`
                    : isMobile
                    ? "linear-gradient(to bottom, transparent, black 50%)"
                    : "none",
                WebkitMaskImage:
                  activeImage === index && !isMobile
                    ? `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, transparent 100%, black 100%)`
                    : isMobile
                    ? "linear-gradient(to bottom, transparent, black 50%)"
                    : "none",
              }}
            />
            <img
              src={img || "/placeholder.svg"}
              alt={`Sports Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="font-dancing text-4xl md:text-6xl font-bold lg:text-8xl mb-4 text-[#3d2f51] relative z-10"
      >
        Don Bosco Institute of Technology
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-xl md:text-3xl lg:text-4xl relative z-10"
      >
        <img
          src={Spardha.src}
          alt="Spardha Logo"
          className="max-w-full h-auto"
        />
      </motion.h2>
      <motion.h3
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="font-mono text-1xl md:text-1xl font-bold lg:text-2xl mb-4 text-[#0c134f] relative z-10"
      >
        Annual Inter College Sports Tournament
      </motion.h3>
      <motion.h4
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="font-mono text-xl md:text-xl font-bold lg:text-xl mb-4 text-[#472f15] relative z-10"
      >
        28 February - 01 March, 2025
      </motion.h4>
      <span className="text-xl md:text-5xl font-dancing font-medium text-[#3d2f51] mt-1 relative z-10">
        <Typewriter
          words={[
            "Spardha: Beyond Limits, Beyond Victory! 🚀🥇",
            "The Battle for Greatness Begins Here! ⚔🏆",
            "Fuel the Fire, Conquer the Arena! 🔥🏆",
          ]}
          loop={true}
          cursor={true}
          typeSpeed={50}
          deleteSpeed={30}
          delaySpeed={2000}
        />
      </span>
    </header>
  );
};

export default Header;
