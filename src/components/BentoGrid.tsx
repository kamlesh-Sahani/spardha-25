"use client"

import React, { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const BentoGrid = ({ events }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false, // Changed to false to trigger animation on every scroll
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: (i) => {
      const directions = ["translateX(-50px)", "translateX(50px)", "translateY(-50px)", "translateY(50px)"]
      return {
        opacity: 0,
        transform: directions[i % directions.length],
      }
    },
    visible: {
      opacity: 1,
      transform: "translate(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="relative" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10"
      >
        {events.map((event, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={itemVariants}
            className={`bg-white bg-opacity-10 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
              event.size === "large-horizontal" ? "col-span-2" : event.size === "large-vertical" ? "row-span-2" : ""
            }`}
          >
            <div className={`relative overflow-hidden ${event.size === "large-vertical" ? "h-full" : "h-48"}`}>
              <motion.img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{event.name}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default BentoGrid

