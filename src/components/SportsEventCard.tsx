"use client"
import React, { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import eventImage from "@/data/EventData";
import Image from "next/image";

interface Event {
  id: number;
  name: string;
  image: string;
  description: string;
}

const EventCards = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const sectionRef = useRef(null);



  const expandedCardVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  return (
    <motion.div
      ref={sectionRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      transition={{ staggerChildren: 0.1 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12 relative"
    >
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            key="expanded-card"
            initial=""
            animate="visible"
            variants={expandedCardVariants}
            className="absolute inset-0 bg-[#820263] z-50 overflow-y-auto p-4 md:p-8 rounded-3xl"
          >
            <div className="max-w-full mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <Image
                    src={selectedEvent.image}
                    alt={selectedEvent.name}
                    width={500}
                    height={500}
                    className="w-full h-96 object-contain"
                  />
                  <h2 className="text-3xl font-bold p-6 text-white">{selectedEvent.name}</h2>
                </div>
                <div className="md:w-1/2 p-6">
                  <p className="text-lg mb-6 text-white">{selectedEvent.description}</p>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="bg-[#d90368] text-white px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {eventImage.map((event) => (
        <motion.div
          key={event.id}
          className={` rounded-full  shadow-lg group flex flex-wrap items-center justify-center ${
            selectedEvent ? "opacity-0 pointer-events-none" : ""
          }`}
        >
          <div className="relative min-h-64 min-w-64 sm:h-72 md:h-80">
            <Image src={event.image} alt={event.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#d90368] text-white px-6 py-3 rounded-full"
                onClick={() => setSelectedEvent(event)}
              >
                View Details
              </motion.button>
            </div>
          </div>
          <div className=" bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-xl font-bold text-center text-white">{event.name}</h3>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default EventCards;
