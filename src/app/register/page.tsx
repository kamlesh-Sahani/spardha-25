"use client"

import React, { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, User, CreditCard, Smartphone, Mail, FileText, Plus, Send } from "lucide-react"

const inputVariants = {
  focus: { scale: 1.05, transition: { type: "spring", stiffness: 300 } },
}

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)" },
  tap: { scale: 0.95 },
}

const selectVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
}

function AnimatedRegistrationForm() {
  const [playerCount, setPlayerCount] = useState(1)
  const [isEventOpen, setIsEventOpen] = useState(false)
  const [isCollegeOpen, setIsCollegeOpen] = useState(false)
  const formRef = useRef(null)

  const scrollToBottom = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center p-4">
      <motion.form
        ref={formRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl overflow-hidden"
      >
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-6 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Event Registration
        </motion.h2>

        <div className="space-y-6">
          <motion.div
            className="relative"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer"
              onClick={() => setIsEventOpen(!isEventOpen)}
            >
              <option value="">Select event</option>
              {/* Add your event options here */}
            </select>
            <motion.div
              animate={isEventOpen ? "open" : "closed"}
              variants={selectVariants}
              transition={{ duration: 0.3 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            >
              <ChevronDown className="text-gray-400" />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer"
              onClick={() => setIsCollegeOpen(!isCollegeOpen)}
            >
              <option value="">Choose college</option>
              {/* Add your college options here */}
            </select>
            <motion.div
              animate={isCollegeOpen ? "open" : "closed"}
              variants={selectVariants}
              transition={{ duration: 0.3 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            >
              <ChevronDown className="text-gray-400" />
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-gray-700">Captain Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
                <input
                  type="text"
                  placeholder="Captain name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </motion.div>
              <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
                <input
                  type="text"
                  placeholder="ID Card number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                />
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </motion.div>
              <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
                <input
                  type="tel"
                  placeholder="Mobile number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                />
                <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </motion.div>
              <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </motion.div>
            </div>
            <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
              <input
                type="file"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-gray-700">Player Details</h3>
            <AnimatePresence>
              {[...Array(playerCount)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
                      <input
                        type="text"
                        placeholder="Player name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </motion.div>
                    <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
                      <input
                        type="text"
                        placeholder="College ID number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                      />
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </motion.div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
                      <input
                        type="tel"
                        placeholder="Mobile number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                      />
                      <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </motion.div>
                    <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
                      <input
                        type="file"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      />
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <motion.button
              type="button"
              onClick={() => {
                setPlayerCount((prev) => prev + 1)
                setTimeout(scrollToBottom, 100)
              }}
              className="w-full px-4 py-2 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors duration-300 flex items-center justify-center"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Plus className="mr-2" /> Add another player
            </motion.button>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-gray-700">Payment Details</h3>
            <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
              <input
                type="text"
                placeholder="Transaction ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
              />
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </motion.div>
            <motion.div className="relative" whileFocus="focus" variants={inputVariants}>
              <input
                type="file"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </motion.div>
          </motion.div>

          <motion.button
            type="submit"
            className="w-full px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <Send className="mr-2" /> Register
          </motion.button>
        </div>
      </motion.form>
    </div>
  )
}

export default AnimatedRegistrationForm


