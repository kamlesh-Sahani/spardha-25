"use client";
import React from "react"
import { motion } from "framer-motion"
import { Typewriter } from "react-simple-typewriter"
import logo from "@/app/assets/logo.png";
import Image from "next/image";
const Header = () => {
  const sportsImage1 = 'https://cdn.pixabay.com/photo/2016/12/25/15/41/ball-1930191_1280.jpg'
  const sportsImage2 = 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  const sportsImage3 = 'https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  return (
    <header className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
      <div className="absolute inset-0 flex justify-around items-center pointer-events-none">
        {[sportsImage1, sportsImage2, sportsImage3].map((img, index) => (
          <div
            key={index}
            className="w-1/3 h-1/3 opacity-0 transition-all duration-300 ease-in-out hover:opacity-30 hover:scale-110 hover:filter hover:brightness-125 pointer-events-auto"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="font-dancing text-6xl font-bold md:text-7xl mb-4 text-[#ff83bd] relative z-10"
      >
        <Typewriter
          words={[
            "Don Bosco Institute of Technology",
            "Welcome to DBIT!",
            "Participate on Awesome Events!",
            "Learn, Innovate, Excel!",
          ]}
          loop={Number.POSITIVE_INFINITY}
          cursor
          cursorStyle="|"
          typeSpeed={100} // Adjust speed for smooth effect
          deleteSpeed={50}
          delaySpeed={2000} // Pause before deleting
        />
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-3xl md:text-4xl relative z-10"
      >
        <Image  src={logo} alt="Spardha Logo" />
      </motion.h2>
    </header>
  )
}

export default Header

