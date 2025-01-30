"use client";
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import "react-toastify/dist/ReactToastify.css"
import { Upload, User, Trophy, ChevronDown, PlusCircle, CreditCard, School, BadgeInfo } from "lucide-react"
import Lottie from "react-lottie-player"
import footballAnimation from "../assets/footballAnimation.json"
import basketballAnimation from "../assets/basketballAnimation.json"
import ChessAnimation from "../assets/ChessAnimation.json"
import runningAnimation from "../assets/runningAnimation.json"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import qrcode from "../assets/qrcode.jpg"
import { TextField, Tooltip } from "@mui/material"
import { Listbox, Transition, Combobox } from "@headlessui/react"

const theme = createTheme({
  palette: {
    primary: {
      main: "#fb8500",
    },
  },
})

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function RegisterPage() {
  const sportAnimations = {
    football: footballAnimation,
    basketball: basketballAnimation,
    running: runningAnimation,
    chess: ChessAnimation,
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-[#fdf0d5] to-[#f59323] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <AnimatePresence>
          {Object.keys(sportAnimations).map((sport, index) => (
            <motion.div
              key={sport}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 2,
                scale: 1,
                x: Math.sin(Date.now() / 1000 + index) * 50,
                y: Math.cos(Date.now() / 1000 + index) * 50,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Lottie animationData={sportAnimations[sport]} play style={{ width: 100, height: 100 }} />
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <motion.div
                className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-[#fb8500] px-6 py-4 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white mr-2" />
                  <h2 className="text-2xl font-bold text-white text-center">Sports Event Registration</h2>
                </div>

                <div className="p-6 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2 group">
                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                        <Trophy className="w-5 h-5 text-[#fb8500] group-hover:text-[#fb8500] transition-colors" />
                      </motion.div>
                      <span className="group-hover:text-[#fb8500] transition-colors">Select Event</span>
                      <Tooltip title="Select Sports Event in Which You Willing to Participate" placement="top-end">
                        <BadgeInfo className="w-4 h-4" />
                      </Tooltip>
                    </motion.label>
                    <Listbox>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">Select Event from here</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={React.Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {/* Event options would go here */}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </motion.div>

                  <motion.label className="block text-sm font-medium text-gray-700 -mb-2 flex items-center gap-2 group">
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      <School className="w-5 h-5 text-[#fb8500] group-hover:text-[#fb8500] transition-colors" />
                    </motion.div>
                    <span className="group-hover:text-[#fb8500] transition-colors">
                      Select College(Input Min. 3 Letter)
                    </span>
                    <Tooltip
                      title="Type Initial 3 Letter of Your College Name(Not Short Name). If Not in List Click on Not in List! Add College. Enter Complete College Name as This Will Print on Certificate. Ex - Don Bosco Institute of Technology Not like DBIT"
                      placement="right-start"
                      className=""
                    >
                      <BadgeInfo className="w-4 h-4" />
                    </Tooltip>
                  </motion.label>
                  <Combobox as="div" className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg -mt-3 bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <Combobox.Input
                        placeholder="select and add college..."
                        className="w-full border-none py-3 pl-3 pr-10 placeholder:text-black focus:placeholder:hidden text-sm leading-5 text-gray-900 focus:ring-0"
                      />
                      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2" />
                    </div>
                    <Transition
                      as={React.Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                        {/* College options would go here */}
                      </Combobox.Options>
                    </Transition>
                  </Combobox>

                  <motion.div variants={itemVariants} className="bg-gray-50 shadow p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#fb8500]" />
                      Captain Details
                      <Tooltip
                        title="Select Gender and captain Full Name, Same Name Will print on Certificate. Student ID Must be Same as per College ID Card. A valid Phone Number having Whatsapp, ID card Image in .JPG and .JPEG Format, Size of Image 1MB"
                        placement="top-end"
                      >
                        <BadgeInfo className="w-4 h-4" />
                      </Tooltip>
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="flex items-center">
                        <select className="w-1/4 text-sm outline-none rounded-tl-md rounded-bl-md py-4 px-2 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 bg-white shadow-sm">
                          <option value="Mr.">Mr.</option>
                          <option value="Ms.">Ms.</option>
                        </select>
                        <TextField fullWidth label="Captain Full Name" variant="outlined" />
                      </div>
                      <TextField fullWidth label="Captain Student ID Number" variant="outlined" />
                      <TextField fullWidth label="Captain Mobile Number" variant="outlined" />
                      <div className="relative">
                        <input type="file" name="idCardPic" id="idCardPic" accept="image/*" className="sr-only" />
                        <label
                          htmlFor="idCardPic"
                          className="flex items-center justify-center p-2 w-full rounded-lg border border-gray-300 shadow-sm transition-all duration-300 cursor-pointer hover:bg-gray-50"
                        >
                          <Upload className="w-5 h-5 text-[#fb8500] mr-2" />
                          Upload Captain ID Card Picture
                        </label>
                      </div>
                      <TextField
                        fullWidth
                        label="Gmail Address"
                        variant="outlined"
                        type="email"
                        className="col-span-2"
                      />
                    </div>
                  </motion.div>

                  <motion.div className="flex flex-col gap-4 border p-4 rounded-lg bg-gray-50" variants={itemVariants}>
                    <h3 className="text-lg font-medium text-gray-900 flex gap-3 items-center">
                      Add Players
                      <Tooltip
                        title="Select Gender and Player Full Name, Same Name Will print on Certificate. Student ID Must be Same as per College ID Card. A valid Phone Number having Whatsapp, ID card Image in .JPG and .JPEG Format, Size of Image 1MB. After that click on Add Player. Notify - You must be Enter Required Player Details and Unique Field Require and Extra Player is Enter as Captain Choice. Watch the Table After Each Entry."
                        placement="top-end"
                      >
                        <BadgeInfo className="h-4 w-4" />
                      </Tooltip>
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="flex items-center ">
                        <select className="text-sm outline-none rounded-tl-lg rounded-bl-lg h-full py-4 px-3 border focus:border-slate-600 shadow-sm bg-white">
                          <option value="Mr.">Mr.</option>
                          <option value="Ms.">Ms.</option>
                        </select>
                        <TextField fullWidth label="Player Name" variant="outlined" />
                      </div>
                      <TextField fullWidth label="Player College ID Number" variant="outlined" />
                      <TextField fullWidth label="Player Mobile" variant="outlined" />
                      <div>
                        <input
                          type="file"
                          id="player-idCard"
                          name="playerIdCardPic"
                          accept="image/*"
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#fdf0d5] file:text-[#fb8500] hover:file:bg-[#fb8500]/20"
                        />
                      </div>
                    </div>
                    <motion.button
                      type="button"
                      className="flex justify-center gap4 cursor-pointer text-white font-bold shadow-md hover:scale-[1.2] shadow-orange-400 rounded-full px-5 py-2 bg-gradient-to-bl from-orange-400 to-orange-600 hover:bg-gradient-to-tr hover:from-blue-500 hover:to-blue-700 hover:shadow-md hover:shadow-blue-400"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PlusCircle />
                      Add More Players
                    </motion.button>
                  </motion.div>

                  <motion.div variants={itemVariants} className="bg-gray-50 shadow p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#fb8500]" />
                      Payment Details
                      <Tooltip
                        title="Enter valid Transaction ID and Enter the ScreentShot, ScreenShot Must be in .JPG and .JPEG Format, Make the payment as per amount shown with the qr code."
                        placement="right-start"
                      >
                        <BadgeInfo className="h-4 w-4" />
                      </Tooltip>
                    </h3>
                    <div className="space-y-4">
                      <TextField fullWidth label="Transaction ID" variant="outlined" />
                      <div>
                        <label htmlFor="transactionScreenshot" className="block text-sm font-medium text-gray-700 mb-2">
                          Upload Transaction Screenshot
                        </label>
                        <input
                          type="file"
                          id="transactionScreenshot"
                          name="transactionScreenshot"
                          accept="image/*"
                          className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-[#fdf0d5] file:text-[#fb8500]
                            hover:file:bg-[#fb8500]/20"
                        />
                      </div>
                      <p className="inline-block">
                        <span className="bg-orange-200 font-medium rounded-full text-orange-500 px-3 py-1">
                          Amount:
                        </span>{" "}
                        <span className="font-medium">0</span>
                      </p>
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  className="px-6 py-4 bg-gray-50 flex justify-end"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    type="submit"
                    className="bg-[#fb8500] text-white px-6 py-2 rounded-lg hover:bg-[#fb8500]/80 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fb8500] flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Submit Registration
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden lg:w-1/3 self-start"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="bg-[#fb8500] px-6 py-4">
                <h2 className="text-2xl font-bold text-white text-center">Event Details</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="text-center">
                  <p>Event Name: </p>
                  <div className="flex justify-between mt-2 bg-orange-100 p-3 rounded-xl">
                    <p className="font-bold text-orange-400">
                      Minimum Player : <span className="text-base text-gray-950">0</span>
                    </p>
                    <p className="font-bold text-orange-400">
                      Extra Player : <span className="text-base text-gray-950">0</span>
                    </p>
                  </div>
                </div>
                <div className="bg-[#fb8500] px-6 py-4 -mx-6">
                  <h3 className="text-xl font-bold text-white text-center">Payment Option</h3>
                </div>
                <div className="flex justify-center">
                  <div className="bg-gray-200 p-4 rounded-lg">
                    <img src={qrcode || "/placeholder.svg"} alt="QR Code" className="w-48 h-48" />
                  </div>
                </div>
                <div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">Amount: ₹0</p>
                    <p className="text-lg mt-2">UPI: PPQR01.YUZUNL@IOB</p>
                  </div>
                  <div className="text-left">
                    <div className="inline-block mb-2">
                      <h1 className="bg-orange-200 text-orange-500 px-2 py-1 font-medium rounded-full">
                        NEFT Bank Details :
                      </h1>
                    </div>
                    <p className="mb-2">A/c Name: Don Bosco Institute of Technology</p>
                    <p className="mb-2">A/c No. 179502000000526</p>
                    <p className="mb-2">IFSC Code.: IOBA0001795</p>
                    <p className="mb-2">Account Type: Current Account</p>
                    <p className="inline-block">Branch Name: Indian Overseas Bank, New Friends Colony, New Delhi</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

  


      </div>
    </ThemeProvider>
  )
}

export default RegisterPage
