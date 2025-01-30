// // "use client";
// // import React, { useEffect, useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { Upload, User, Trophy, ChevronDown, PlusCircle, CreditCard, School, BadgeInfo } from "lucide-react";
// // import Lottie from "react-lottie-player"
// // import footballAnimation from "@/app/assets/footballAnimation.json";
// // import basketballAnimation from "@/app/assets/basketballAnimation.json";
// // import ChessAnimation from "@/app/assets/ChessAnimation.json";
// // import runningAnimation from "@/app/assets/runningAnimation.json";
// // import { ThemeProvider, createTheme } from "@mui/material/styles";
// // import qrcode from "@/app/assets/qrcode.jpg";
// // import { TextField, Tooltip } from "@mui/material";
// // import { Listbox, Transition, Combobox } from "@headlessui/react";
// // import Image from "next/image";

// // const theme = createTheme({
// //   palette: {
// //     primary: {
// //       main: "#fb8500",
// //     },
// //   },
// // })

// // const itemVariants = {
// //   hidden: { opacity: 0, y: 20 },
// //   visible: { opacity: 1, y: 0 },
// // }

// // function RegisterPage() {

// //   const [styles, setStyles] = useState<{ top: string; left: string }>({
// //     top: "0%",
// //     left: "0%",
// //   });

// //   useEffect(() => {
// //     setStyles({
// //       top: `${Math.random() * 100}%`,
// //       left: `${Math.random() * 100}%`,
// //     });
// //   }, []);

// //   const sportAnimations:any = {
// //     football: footballAnimation,
// //     basketball: basketballAnimation,
// //     running: runningAnimation,
// //     chess: ChessAnimation,
// //   }

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <div className="min-h-screen bg-gradient-to-br from-[#fdf0d5] to-[#f59323] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
// //         <AnimatePresence>
// //           {Object.keys(sportAnimations).map((sport, index) => (
// //             <motion.div
// //               key={sport}
// //               initial={{ opacity: 0, scale: 0 }}
// //               animate={{
// //                 opacity: 2,
// //                 scale: 1,
// //                 x: Math.sin(Date.now() / 1000 + index) * 50,
// //                 y: Math.cos(Date.now() / 1000 + index) * 50,
// //               }}
// //               exit={{ opacity: 0, scale: 0 }}
// //               transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
// //               className="absolute"
// //               style={{
// //               ...styles,
// //                 transform: "translate(-50%, -50%)",
// //               }}
// //             >
// //               <Lottie animationData={sportAnimations[sport] as any} play style={{ width: 100, height: 100 }} />
// //             </motion.div>
// //           ))}
// //         </AnimatePresence>

// //         <motion.div
// //           className="max-w-7xl mx-auto"
// //           initial={{ opacity: 0, y: 50 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.5 }}
// //         >
// //           <div className="flex flex-col lg:flex-row gap-8">
// //             <div className="flex-1">
// //               <motion.div
// //                 className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden"
// //                 initial={{ opacity: 0, scale: 0.9 }}
// //                 animate={{ opacity: 1, scale: 1 }}
// //                 transition={{ duration: 0.5 }}
// //               >
// //                 <div className="bg-[#fb8500] px-6 py-4 flex items-center justify-center">
// //                   <Trophy className="w-8 h-8 text-white mr-2" />
// //                   <h2 className="text-2xl font-bold text-white text-center">Sports Event Registration</h2>
// //                 </div>

// //                 <div className="p-6 space-y-6">
// //                   <motion.div
// //                     initial={{ opacity: 0, y: 20 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ delay: 0.2 }}
// //                   >
// //                     <motion.label className="block text-sm font-medium text-gray-700 mb-2  items-center gap-2 group">
// //                       <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
// //                         <Trophy className="w-5 h-5 text-[#fb8500] group-hover:text-[#fb8500] transition-colors" />
// //                       </motion.div>
// //                       <span className="group-hover:text-[#fb8500] transition-colors">Select Event</span>
// //                       <Tooltip title="Select Sports Event in Which You Willing to Participate" placement="top-end">
// //                         <BadgeInfo className="w-4 h-4" />
// //                       </Tooltip>
// //                     </motion.label>
// //                     <Listbox>
// //                       <div className="relative mt-1">
// //                         <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
// //                           <span className="block truncate">Select Event from here</span>
// //                           <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
// //                             <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
// //                           </span>
// //                         </Listbox.Button>
// //                         <Transition
// //                           as={React.Fragment}
// //                           leave="transition ease-in duration-100"
// //                           leaveFrom="opacity-100"
// //                           leaveTo="opacity-0"
// //                         >
// //                           <Listbox.Options className="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
// //                             {/* Event options would go here */}
// //                           </Listbox.Options>
// //                         </Transition>
// //                       </div>
// //                     </Listbox>
// //                   </motion.div>

// //                   <motion.label className="block text-sm font-medium text-gray-700 -mb-2  items-center gap-2 group">
// //                     <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
// //                       <School className="w-5 h-5 text-[#fb8500] group-hover:text-[#fb8500] transition-colors" />
// //                     </motion.div>
// //                     <span className="group-hover:text-[#fb8500] transition-colors">
// //                       Select College(Input Min. 3 Letter)
// //                     </span>
// //                     <Tooltip
// //                       title="Type Initial 3 Letter of Your College Name(Not Short Name). If Not in List Click on Not in List! Add College. Enter Complete College Name as This Will Print on Certificate. Ex - Don Bosco Institute of Technology Not like DBIT"
// //                       placement="right-start"
// //                       className=""
// //                     >
// //                       <BadgeInfo className="w-4 h-4" />
// //                     </Tooltip>
// //                   </motion.label>
// //                   <Combobox as="div" className="relative mt-1">
// //                     <div className="relative w-full cursor-default overflow-hidden rounded-lg -mt-3 bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
// //                       <Combobox.Input
// //                         placeholder="select and add college..."
// //                         className="w-full border-none py-3 pl-3 pr-10 placeholder:text-black focus:placeholder:hidden text-sm leading-5 text-gray-900 focus:ring-0"
// //                       />
// //                       <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2" />
// //                     </div>
// //                     <Transition
// //                       as={React.Fragment}
// //                       leave="transition ease-in duration-100"
// //                       leaveFrom="opacity-100"
// //                       leaveTo="opacity-0"
// //                     >
// //                       <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
// //                         {/* College options would go here */}
// //                       </Combobox.Options>
// //                     </Transition>
// //                   </Combobox>

// //                   <motion.div variants={itemVariants} className="bg-gray-50 shadow p-6 rounded-lg">
// //                     <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
// //                       <User className="w-5 h-5 text-[#fb8500]" />
// //                       Captain Details
// //                       <Tooltip
// //                         title="Select Gender and captain Full Name, Same Name Will print on Certificate. Student ID Must be Same as per College ID Card. A valid Phone Number having Whatsapp, ID card Image in .JPG and .JPEG Format, Size of Image 1MB"
// //                         placement="top-end"
// //                       >
// //                         <BadgeInfo className="w-4 h-4" />
// //                       </Tooltip>
// //                     </h3>
// //                     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
// //                       <div className="flex items-center">
// //                         <select className="w-1/4 text-sm outline-none rounded-tl-md rounded-bl-md py-4 px-2 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 bg-white shadow-sm">
// //                           <option value="Mr.">Mr.</option>
// //                           <option value="Ms.">Ms.</option>
// //                         </select>
// //                         <TextField fullWidth label="Captain Full Name" variant="outlined" />
// //                       </div>
// //                       <TextField fullWidth label="Captain Student ID Number" variant="outlined" />
// //                       <TextField fullWidth label="Captain Mobile Number" variant="outlined" />
// //                       <div className="relative">
// //                         <input type="file" name="idCardPic" id="idCardPic" accept="image/*" className="sr-only" />
// //                         <label
// //                           htmlFor="idCardPic"
// //                           className="flex items-center justify-center p-2 w-full rounded-lg border border-gray-300 shadow-sm transition-all duration-300 cursor-pointer hover:bg-gray-50"
// //                         >
// //                           <Upload className="w-5 h-5 text-[#fb8500] mr-2" />
// //                           Upload Captain ID Card Picture
// //                         </label>
// //                       </div>
// //                       <TextField
// //                         fullWidth
// //                         label="Gmail Address"
// //                         variant="outlined"
// //                         type="email"
// //                         className="col-span-2"
// //                       />
// //                     </div>
// //                   </motion.div>

// //                   <motion.div className="flex flex-col gap-4 border p-4 rounded-lg bg-gray-50" variants={itemVariants}>
// //                     <h3 className="text-lg font-medium text-gray-900 flex gap-3 items-center">
// //                       Add Players
// //                       <Tooltip
// //                         title="Select Gender and Player Full Name, Same Name Will print on Certificate. Student ID Must be Same as per College ID Card. A valid Phone Number having Whatsapp, ID card Image in .JPG and .JPEG Format, Size of Image 1MB. After that click on Add Player. Notify - You must be Enter Required Player Details and Unique Field Require and Extra Player is Enter as Captain Choice. Watch the Table After Each Entry."
// //                         placement="top-end"
// //                       >
// //                         <BadgeInfo className="h-4 w-4" />
// //                       </Tooltip>
// //                     </h3>
// //                     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
// //                       <div className="flex items-center ">
// //                         <select className="text-sm outline-none rounded-tl-lg rounded-bl-lg h-full py-4 px-3 border focus:border-slate-600 shadow-sm bg-white">
// //                           <option value="Mr.">Mr.</option>
// //                           <option value="Ms.">Ms.</option>
// //                         </select>
// //                         <TextField fullWidth label="Player Name" variant="outlined" />
// //                       </div>
// //                       <TextField fullWidth label="Player College ID Number" variant="outlined" />
// //                       <TextField fullWidth label="Player Mobile" variant="outlined" />
// //                       <div>
// //                         <input
// //                           type="file"
// //                           id="player-idCard"
// //                           name="playerIdCardPic"
// //                           accept="image/*"
// //                           className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#fdf0d5] file:text-[#fb8500] hover:file:bg-[#fb8500]/20"
// //                         />
// //                       </div>
// //                     </div>
// //                     <motion.button
// //                       type="button"
// //                       className="flex justify-center gap4 cursor-pointer text-white font-bold shadow-md hover:scale-[1.2] shadow-orange-400 rounded-full px-5 py-2 bg-gradient-to-bl from-orange-400 to-orange-600 hover:bg-gradient-to-tr hover:from-blue-500 hover:to-blue-700 hover:shadow-md hover:shadow-blue-400"
// //                       whileHover={{ scale: 1.05 }}
// //                       whileTap={{ scale: 0.95 }}
// //                     >
// //                       <PlusCircle />
// //                       Add More Players
// //                     </motion.button>
// //                   </motion.div>

// //                   <motion.div variants={itemVariants} className="bg-gray-50 shadow p-6 rounded-lg">
// //                     <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
// //                       <CreditCard className="w-5 h-5 text-[#fb8500]" />
// //                       Payment Details
// //                       <Tooltip
// //                         title="Enter valid Transaction ID and Enter the ScreentShot, ScreenShot Must be in .JPG and .JPEG Format, Make the payment as per amount shown with the qr code."
// //                         placement="right-start"
// //                       >
// //                         <BadgeInfo className="h-4 w-4" />
// //                       </Tooltip>
// //                     </h3>
// //                     <div className="space-y-4">
// //                       <TextField fullWidth label="Transaction ID" variant="outlined" />
// //                       <div>
// //                         <label htmlFor="transactionScreenshot" className="block text-sm font-medium text-gray-700 mb-2">
// //                           Upload Transaction Screenshot
// //                         </label>
// //                         <input
// //                           type="file"
// //                           id="transactionScreenshot"
// //                           name="transactionScreenshot"
// //                           accept="image/*"
// //                           className="block w-full text-sm text-gray-500
// //                             file:mr-4 file:py-2 file:px-4
// //                             file:rounded-full file:border-0
// //                             file:text-sm file:font-semibold
// //                             file:bg-[#fdf0d5] file:text-[#fb8500]
// //                             hover:file:bg-[#fb8500]/20"
// //                         />
// //                       </div>
// //                       <p className="inline-block">
// //                         <span className="bg-orange-200 font-medium rounded-full text-orange-500 px-3 py-1">
// //                           Amount:
// //                         </span>{" "}
// //                         <span className="font-medium">0</span>
// //                       </p>
// //                     </div>
// //                   </motion.div>
// //                 </div>
// //                 <motion.div
// //                   className="px-6 py-4 bg-gray-50 flex justify-end"
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: 0.5 }}
// //                 >
// //                   <motion.button
// //                     type="submit"
// //                     className="bg-[#fb8500] text-white px-6 py-2 rounded-lg hover:bg-[#fb8500]/80 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fb8500] flex items-center"
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                   >
// //                     Submit Registration
// //                   </motion.button>
// //                 </motion.div>
// //               </motion.div>
// //             </div>

// //             <motion.div
// //               className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden lg:w-1/3 self-start"
// //               initial={{ opacity: 0, x: 50 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               transition={{ delay: 0.3, duration: 0.5 }}
// //             >
// //               <div className="bg-[#fb8500] px-6 py-4">
// //                 <h2 className="text-2xl font-bold text-white text-center">Event Details</h2>
// //               </div>
// //               <div className="p-6 space-y-6">
// //                 <div className="text-center">
// //                   <p>Event Name: </p>
// //                   <div className="flex justify-between mt-2 bg-orange-100 p-3 rounded-xl">
// //                     <p className="font-bold text-orange-400">
// //                       Minimum Player : <span className="text-base text-gray-950">0</span>
// //                     </p>
// //                     <p className="font-bold text-orange-400">
// //                       Extra Player : <span className="text-base text-gray-950">0</span>
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <div className="bg-[#fb8500] px-6 py-4 -mx-6">
// //                   <h3 className="text-xl font-bold text-white text-center">Payment Option</h3>
// //                 </div>
// //                 <div className="flex justify-center">
// //                   <div className="bg-gray-200 p-4 rounded-lg">
// //                     <Image src={qrcode} alt="QR Code" className="w-48 h-48" />
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <div className="text-center">
// //                     <p className="text-2xl font-bold">Amount: ₹0</p>
// //                     <p className="text-lg mt-2">UPI: PPQR01.YUZUNL@IOB</p>
// //                   </div>
// //                   <div className="text-left">
// //                     <div className="inline-block mb-2">
// //                       <h1 className="bg-orange-200 text-orange-500 px-2 py-1 font-medium rounded-full">
// //                         NEFT Bank Details :
// //                       </h1>
// //                     </div>
// //                     <p className="mb-2">A/c Name: Don Bosco Institute of Technology</p>
// //                     <p className="mb-2">A/c No. 179502000000526</p>
// //                     <p className="mb-2">IFSC Code.: IOBA0001795</p>
// //                     <p className="mb-2">Account Type: Current Account</p>
// //                     <p className="inline-block">Branch Name: Indian Overseas Bank, New Friends Colony, New Delhi</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </div>
// //         </motion.div>

// //       </div
// //     </ThemeProvider>
// //   )
// // }

// // export default RegisterPage

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// const events = ["Football", "Basketball", "Cricket", "Badminton", "Tennis"];
// import { motion } from "framer-motion";
// const Register = () => {
//   const [formData, setFormData] = useState({
//     event: events[0],
//     collegeName: "",
//     players: [] as {
//       name: string;
//       enrollment: string;
//       phone: string;
//       photo: string;
//     }[],
//     captain: "",
//     transactionId: "", // Add transactionId in formData
//     transactionImage: null as File | null, // Add transactionImage in formData
//   });

//   const [currentPlayer, setCurrentPlayer] = useState({
//     name: "",
//     enrollment: "",
//     phone: "",
//     photo: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handlePlayerChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: string
//   ) => {
//     setCurrentPlayer({ ...currentPlayer, [field]: e.target.value });
//   };

//   const handlePlayerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setCurrentPlayer({
//         ...currentPlayer,
//         photo: URL.createObjectURL(e.target.files[0]),
//       });
//     }
//   };

//   // Handle transaction image change
//   const handleTransactionImageChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (e.target.files) {
//       setFormData({
//         ...formData,
//         transactionImage: e.target.files[0],
//       });
//     }
//   };

//   const addPlayer = () => {
//     if (
//       currentPlayer.name.trim() === "" ||
//       currentPlayer.enrollment.trim() === ""
//     )
//       return;

//     setFormData((prev) => ({
//       ...prev,
//       players: [...prev.players, currentPlayer],
//     }));
//     setCurrentPlayer({
//       name: "",
//       enrollment: "",
//       phone: "",
//       photo: "",
//     });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Form Submitted:", formData);
//   };

//   return (
//     <div className="flex gap-12 justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
//       <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg">
//         <h1 className="text-4xl font-bold text-white text-center mb-6">
//           Event Registration
//         </h1>
//         <div>
//           {/* <h1 className="text-2xl text-white font-bold">Event Details</h1> */}
//           <h2 className="text-white text-2xl">Payment Option</h2>
//           <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
//             <div className="text-left text-white text-lg mt-6">
//               <div className="inline-block mb-4">
//                 <h1 className="bg-white/30 text-white px-2 py-1 font-medium rounded-full">
//                   NEFT Bank Details:
//                 </h1>
//               </div>
//               <p className="mb-2">
//                 A/c Name: Don Bosco Institute of Technology
//               </p>
//               <p className="mb-2">A/c No. 179502000000526</p>
//               <p className="mb-2">IFSC Code: IOBA0001795</p>
//               <p className="mb-2">Account Type: Current Account</p>
//               <p className="inline-block">
//                 Branch Name: Indian Overseas Bank, New Friends Colony, New Delhi
//               </p>
//             </div>
//             <div className="flex flex-col justify-center text-white items-center p-4 rounded-lg">
//               <Image
//                 src="/eventqr.jpeg"
//                 alt="QR Code"
//                 width={200}
//                 height={200}
//               />
//               <div className="text-center">
//                 <p className="text-2xl font-bold">Amount: ₹0</p>
//                 <p className="text-lg mt-2">UPI: PPQR01.YUZUNL@IOB</p>
//               </div>
//             </div>
//           </div>
//           <div className="space-y-2">
//             <h1 className="text-white font-bold text-2xl">Event Details:</h1>
//             <p className="text-lg font-semibold text-gray-100">
//               Event Name: <span className="font-normal">Summer Sports</span>
//             </p>

//            <div className="grid grid-cols-2 max-md:grid-cols-1 ">
//            <p className="font-bold text-white">
//               Minimum Players:{" "}
//               <span className="text-base text-gray-950">0</span>
//             </p>
//             <p className="font-bold text-white mb-4">
//               Extra Players: <span className="text-base text-gray-950">0</span>
//             </p>
//            </div>
//           </div>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2">
//             <div className="flex flex-col">
//               <label className="text-white text-lg mb-2">Select Event</label>
//               <select
//                 name="event"
//                 value={formData.event}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-indigo-400 outline-none"
//               >
//                 {events.map((event, id) => (
//                   <option key={id} value={event} className="text-gray-900">
//                     {event}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex flex-col">
//               <label className="text-white text-lg mb-2">College Name</label>
//               <input
//                 type="text"
//                 name="collegeName"
//                 value={formData.collegeName}
//                 onChange={handleChange}
//                 placeholder="Enter your college name"
//                 className="w-full p-3 placeholder-white bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-indigo-400 outline-none"
//               />
//             </div>
//           </div>
//           <div className="col-span-2 mt-4">
//             <h2 className="text-2xl font-semibold text-white mb-3">
//               Add Players
//             </h2>

//             {formData.players.length < 3 && (
//               <div className="flex flex-col gap-4 mb-4">
//                 <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2">
//                   <div className="flex flex-col text-white gap-2">
//                     <label htmlFor="">Player Name</label>
//                     <input
//                       type="text"
//                       value={currentPlayer.name}
//                       onChange={(e) => handlePlayerChange(e, "name")}
//                       placeholder="Enter Player Name"
//                       className="w-full p-3 placeholder-white bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-indigo-400 outline-none"
//                     />
//                   </div>
//                   <div className="flex flex-col text-white gap-2">
//                     <label htmlFor="">Player Enrollment Number</label>
//                     <input
//                       type="text"
//                       value={currentPlayer.enrollment}
//                       onChange={(e) => handlePlayerChange(e, "enrollment")}
//                       placeholder="Enter Player Enrollment"
//                       className="w-full p-3 placeholder-white bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-indigo-400 outline-none"
//                     />
//                   </div>
//                   <div className="flex flex-col text-white gap-2">
//                     <label htmlFor="">Player Phone Number</label>
//                     <input
//                       type="phone"
//                       value={currentPlayer.phone}
//                       onChange={(e) => handlePlayerChange(e, "phone")}
//                       placeholder="Enter Player phone number"
//                       className="w-full p-3 placeholder-white bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-indigo-400 outline-none"
//                     />
//                   </div>
//                   <div className="flex flex-col text-white gap-2">
//                     <label htmlFor="">Upload ID Card Image</label>
//                     <input
//                       type="file"
//                       onChange={handlePlayerImageChange}
//                       className="w-full p-3 bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-indigo-400 outline-none"
//                     />
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={addPlayer}
//                   className="px-4 py-2 bg-green-400 text-gray-900 rounded-lg shadow-md hover:bg-green-500 transition"
//                 >
//                   Add Player
//                 </button>
//               </div>
//             )}
//             {formData.players.length > 0 && (
//               <div className="mt-4 overflow-x-auto">
//                 <table className="min-w-full table-auto text-white bg-white/30 rounded-lg shadow-md">
//                   <thead>
//                     <tr className="text-left">
//                       <th className="py-2 px-4">Player Name</th>
//                       <th className="py-2 px-4">Enrollment Number</th>
//                       <th className="py-2 px-4">Phone Number</th>
//                       <th className="py-2 px-4">ID Card Photo</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {formData.players.map((player, index) => (
//                       <tr key={index}>
//                         <td className="py-2 px-4">{player.name}</td>
//                         <td className="py-2 px-4">{player.enrollment}</td>
//                         <td className="py-2 px-4">{player.phone}</td>
//                         <td className="py-2 px-4">
//                           {player.photo ? (
//                             <img
//                               src={player.photo}
//                               alt={`Player ${player.name}`}
//                               className="w-16 h-16 object-cover rounded-full"
//                             />
//                           ) : (
//                             <span>No Photo</span>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//           {formData.players.length > 0 && (
//             <div className="col-span-2">
//               <h2 className="text-2xl font-semibold text-white ">
//                 Select Captain
//               </h2>
//               <select
//                 name="captain"
//                 value={formData.captain}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-white/30 text-black-400 placeholder-white rounded-lg shadow-md focus:ring-2 focus:ring-indigo-400 outline-none"
//               >
//                 <option value="">Select Captain</option>
//                 {formData.players.map((player, index) => (
//                   <option key={index} value={player.name}>
//                     {player.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           <div className="col-span-2 ">
//             <h2 className="text-2xl font-semibold text-white mb-3">
//               Payment Details
//             </h2>
//             <div className="flex flex-col mb-4">
//               <label className="text-white text-lg mb-2">Transaction ID</label>
//               <input
//                 type="text"
//                 name="transactionId"
//                 value={formData.transactionId}
//                 onChange={handleChange}
//                 placeholder="Enter Transaction ID"
//                 className="w-full p-3 placeholder-white bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-indigo-400 outline-none"
//               />
//             </div>
//             <div className="flex flex-col mb-4">
//               <label className="text-white text-lg mb-2">
//                 Transaction Details Image
//               </label>
//               <input
//                 type="file"
//                 name="transactionImage"
//                 accept="image/*"
//                 onChange={handleTransactionImageChange}
//                 className="w-full p-3 bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-indigo-400 outline-none"
//               />
//             </div>
//             {formData.transactionImage && (
//               <div className="my-4">
//                 <img
//                   src={URL.createObjectURL(formData.transactionImage)}
//                   alt="Transaction Details"
//                   className="w-64 h-64 object-contain rounded-lg"
//                 />
//               </div>
//             )}
//           </div>
//           <div className="col-span-2 flex justify-center">
//             <button
//               type="submit"
//               className="px-6 w-full py-3 text-lg font-semibold bg-yellow-400 text-gray-900 rounded-lg shadow-md hover:bg-yellow-500 transition"
//             >
//               Register Now
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const events = ["Football", "Basketball", "Cricket", "Badminton", "Tennis"];

const Register = () => {
  const [formData, setFormData] = useState({
    event: events[0],
    collegeName: "",
    players: [] as {
      name: string;
      enrollment: string;
      phone: string;
      photo: string;
    }[],
    captain: "",
    transactionId: "",
    transactionImage: null as File | null,
  });

  const [currentPlayer, setCurrentPlayer] = useState({
    name: "",
    enrollment: "",
    phone: "",
    photo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlayerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setCurrentPlayer({ ...currentPlayer, [field]: e.target.value });
  };

  const handlePlayerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCurrentPlayer({
        ...currentPlayer,
        photo: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleTransactionImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        transactionImage: e.target.files[0],
      });
    }
  };

  const addPlayer = () => {
    if (
      currentPlayer.name.trim() === "" ||
      currentPlayer.enrollment.trim() === ""
    )
      return;

    setFormData((prev) => ({
      ...prev,
      players: [...prev.players, currentPlayer],
    }));
    setCurrentPlayer({
      name: "",
      enrollment: "",
      phone: "",
      photo: "",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-600 to-pink-700 p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-4xl font-bold text-white text-center mb-6">
          Event Registration
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className=""
        >
          <h2 className="text-white text-2xl font-bold mb-4">Payment Option</h2>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
            <div className="text-white text-lg">
              <div className="inline-block mb-4">
                <h1 className="bg-white/30 text-white px-4 py-2 font-medium rounded-full">
                  NEFT Bank Details:
                </h1>
              </div>
              <p className="mb-2">
                A/c Name: Don Bosco Institute of Technology
              </p>
              <p className="mb-2">A/c No. 179502000000526</p>
              <p className="mb-2">IFSC Code: IOBA0001795</p>
              <p className="mb-2">Account Type: Current Account</p>
              <p className="inline-block">
                Branch Name: Indian Overseas Bank, New Friends Colony, New Delhi
              </p>
            </div>
            <div className="flex flex-col justify-center items-center p-4 rounded-lg">
              <Image
                src="/eventqr.jpeg"
                alt="QR Code"
                width={200}
                height={200}
                className="rounded-lg"
              />
              <div className="text-center mt-4">
                <p className="text-2xl font-bold">Amount: ₹0</p>
                <p className="text-lg mt-2">UPI: PPQR01.YUZUNL@IOB</p>
              </div>
            </div>
          </div>
        </motion.div>

        <hr className="border-t border-white/20 my-4" />

        {/* Event Details Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-white font-bold text-2xl mb-4">Event Details:</h1>
          <p className="text-lg font-semibold text-gray-100">
            Event Name: <span className="font-normal">Summer Sports</span>
          </p>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2 mt-2">
            <p className="font-bold text-white">
              Minimum Players:{" "}
              <span className="text-base text-gray-100">0</span>
            </p>
            <p className="font-bold text-white">
              Extra Players: <span className="text-base text-gray-100">0</span>
            </p>
          </div>
        </motion.div>

        <hr className="border-t border-white/20 my-8" />

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid grid-cols-2 max-md:grid-cols-1 gap-4"
          >
            <div className="flex flex-col">
              <label className="text-white text-lg mb-2">Select Event</label>
              <select
                name="event"
                value={formData.event}
                onChange={handleChange}
                className="w-full p-3 bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
              >
                {events.map((event, id) => (
                  <option key={id} value={event} className="text-gray-900">
                    {event}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-white text-lg mb-2">College Name</label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="Enter your college name"
                className="w-full p-3 placeholder-white bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>
          </motion.div>

          <hr className="border-t border-white/20 my-8" />

          {/* Add Players Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Add Players
            </h2>
            {formData.players.length < 3 && (
              <div className="flex flex-col gap-4 mb-4">
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
                  <div className="flex flex-col text-white gap-2">
                    <label>Player Name</label>
                    <input
                      type="text"
                      value={currentPlayer.name}
                      onChange={(e) => handlePlayerChange(e, "name")}
                      placeholder="Enter Player Name"
                      className="w-full p-3 placeholder-white bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
                    />
                  </div>
                  <div className="flex flex-col text-white gap-2">
                    <label>Player Enrollment Number</label>
                    <input
                      type="text"
                      value={currentPlayer.enrollment}
                      onChange={(e) => handlePlayerChange(e, "enrollment")}
                      placeholder="Enter Player Enrollment"
                      className="w-full p-3 placeholder-white bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
                    />
                  </div>
                  <div className="flex flex-col text-white gap-2">
                    <label>Player Phone Number</label>
                    <input
                      type="phone"
                      value={currentPlayer.phone}
                      onChange={(e) => handlePlayerChange(e, "phone")}
                      placeholder="Enter Player phone number"
                      className="w-full p-3 placeholder-white bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
                    />
                  </div>
                  <div className="flex flex-col text-white gap-2">
                    <label>Upload ID Card Image</label>
                    <input
                      type="file"
                      onChange={handlePlayerImageChange}
                      className="w-full p-3 bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addPlayer}
                  className="px-4 py-2 bg-green-400 text-gray-900 rounded-lg shadow-md hover:bg-green-500 transition"
                >
                  Add Player
                </button>
              </div>
            )}

            {formData.players.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Player Details
                </h3>
                <div className="md:hidden">
                  {formData.players.map((player, index) => (
                    <div
                      key={index}
                      className="bg-white/10 p-4 rounded-lg mb-4 text-white"
                    >
                      <p>
                        <span className="font-bold">Name:</span> {player.name}
                      </p>
                      <p>
                        <span className="font-bold">Enrollment:</span>{" "}
                        {player.enrollment}
                      </p>
                      <p>
                        <span className="font-bold">Phone:</span> {player.phone}
                      </p>
                      <p>
                        <span className="font-bold">ID Card:</span>{" "}
                        {player.photo ? (
                          <img
                            src={player.photo}
                            alt={`Player ${player.name}`}
                            className="w-16 h-16 object-cover rounded-full mt-2"
                          />
                        ) : (
                          "No Photo"
                        )}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full table-auto text-white bg-white/30 rounded-lg shadow-md">
                    <thead>
                      <tr className="text-left">
                        <th className="py-2 px-4">Player Name</th>
                        <th className="py-2 px-4">Enrollment Number</th>
                        <th className="py-2 px-4">Phone Number</th>
                        <th className="py-2 px-4">ID Card Photo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.players.map((player, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4">{player.name}</td>
                          <td className="py-2 px-4">{player.enrollment}</td>
                          <td className="py-2 px-4">{player.phone}</td>
                          <td className="py-2 px-4">
                            {player.photo ? (
                              <img
                                src={player.photo}
                                alt={`Player ${player.name}`}
                                className="w-16 h-16 object-cover rounded-full"
                              />
                            ) : (
                              <span>No Photo</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>

          {/* Select Captain Section */}
          {formData.players.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">
                Select Captain
              </h2>
              <select
                name="captain"
                value={formData.captain}
                onChange={handleChange}
                className="w-full p-3 bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
              >
                <option value="" className="text-white">
                  Select Captain
                </option>
                {formData.players.map((player, index) => (
                  <option
                    key={index}
                    value={player.name}
                    className="text-black"
                  >
                    {player.name}
                  </option>
                ))}
              </select>
            </motion.div>
          )}

          <hr className="border-t border-white/20 my-8" />

          {/* Payment Details Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className=""
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Payment Details
            </h2>
            <div className="flex flex-col mb-4">
              <label className="text-white text-lg mb-2">Transaction ID</label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                placeholder="Enter Transaction ID"
                className="w-full p-3 placeholder-white bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-white text-lg mb-2">
                Transaction Details Image
              </label>
              <input
                type="file"
                name="transactionImage"
                accept="image/*"
                onChange={handleTransactionImageChange}
                className="w-full p-3 bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>
            {formData.transactionImage && (
              <div className="">
                <img
                  src={URL.createObjectURL(formData.transactionImage)}
                  alt="Transaction Details"
                  className="w-64 h-64 object-contain rounded-lg"
                />
              </div>
            )}
          </motion.div>

          <hr className="border-t border-white/20 my-4" />

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className=""
          >
            <button
              type="submit"
              className="w-full px-6 py-3 text-lg font-semibold bg-yellow-400 text-gray-900 rounded-lg shadow-md hover:bg-yellow-500 transition"
            >
              Register Now
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
