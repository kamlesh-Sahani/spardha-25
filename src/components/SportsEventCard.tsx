"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import eventImage from "@/data/EventData";
import Link from "next/link";

const EventCards = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showRules, setShowRules] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const expandedCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <>
      <motion.div
        ref={sectionRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 relative"
      >
        {eventImage.map((event) => (
          <motion.div
            key={event.id}
            variants={cardVariants}
            className="relative"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <div className="p-8 flex flex-col items-center h-full">
                <img
                  src={event.image.src || "/placeholder.svg"}
                  alt={event.name}
                  className="w-20 h-20 object-contain mb-6"
                />
                <h3 className="text-xl font-semibold text-center mb-6">
                  {event.name}
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 w-full mt-auto">
                <Link href={"/register"} >
                  <button className="w-full bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors text-base">
                    Register
                  </button>
                  </Link>
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="w-full bg-gray-100 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors text-base"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm"
            style={{
              paddingTop: "64px",
              paddingBottom: "64px",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl w-full max-w-4xl mx-auto my-8 relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="md:flex flex-col gap-8">
                {/* Top section */}
                <div className="flex gap-8 p-6 border-b">
                  {/* Left side - Image */}
                  <div className="w-1/3">
                    <img
                      src={selectedEvent.image.src || "/placeholder.svg"}
                      alt={selectedEvent.name}
                      className="w-48 h-48 object-contain mx-auto"
                    />
                  </div>

                  {/* Right side - Fee, Reward, Coordinator */}
                  <div className="w-2/3 space-y-4">
                    <h2 className="text-3xl font-bold mb-4">
                      {selectedEvent.name}
                    </h2>
                    <div className="space-y-4 text-sm">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Registration Fee:
                        </h3>
                        <p>{selectedEvent.fee}</p>
                      </div>
                      {selectedEvent.cashReward && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Cash Reward:
                          </h3>
                          <p>Winner Prize: {selectedEvent.cashReward.winner}</p>
                          <p>
                            Runner-Up Prize: {selectedEvent.cashReward.runnerUp}
                          </p>
                        </div>
                      )}
                      {selectedEvent.coordinators && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Student Coordinators:
                          </h3>
                          {selectedEvent.coordinators.map(
                            (coordinator: any, index: number) => (
                              <p key={index}>
                                {coordinator.name}: {coordinator.phone}
                              </p>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom section - Rules */}
                <div className="p-6">
                  <div className="space-y-4 text-sm">
                    {selectedEvent.rules && (
                      <div>
                        {isMobile ? (
                          <>
                            <button
                              onClick={() => setShowRules(!showRules)}
                              className="flex items-center justify-between w-full text-lg font-semibold text-gray-900 mb-2"
                            >
                              <span>Rules</span>
                              {showRules ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </button>
                            {showRules && (
                              <ul className="list-disc pl-5 space-y-2 mt-2 max-h-60 overflow-y-auto">
                                {selectedEvent.rules.map(
                                  (rule: string, index: number) => (
                                    <li key={index}>{rule}</li>
                                  )
                                )}
                              </ul>
                            )}
                          </>
                        ) : (
                          <>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Rules:
                            </h3>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                              {selectedEvent.rules.map(
                                (rule: string, index: number) => (
                                  <li key={index}>{rule}</li>
                                )
                              )}
                            </ul>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Register button at the bottom */}
                <Link href={"/register"} >
                  <div className="px-6 pb-6">
                    <button className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                      Register Now
                    </button>
                  </div>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventCards;
