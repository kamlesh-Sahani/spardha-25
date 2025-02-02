"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import eventImage, { type IEventImage } from "@/data/EventData";
import { registerAction } from "../action/team.action";
import { colleges } from "@/data/CollegeData";
import { sportsData } from "@/data/AllEventData";
import { z } from "zod";

const registrationSchema = z.object({
  event: z.string().min(1, "Please select an event"),
  collegeName: z.string().min(1, "College name is required"),
  players: z
    .array(
      z.object({
        name: z.string().min(2, "Player name must be at least 2 characters"),
        enrollment: z
          .string()
          .min(5, "Enrollment number must be at least 5 characters"),
        phone: z
          .string()
          .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
        photo: z.string().min(1, "Photo URL is required"),
        isCaptain: z.boolean(),
        email: z.string().email("Invalid email address"),
      })
    )
    .min(1, "At least one player is required"),
  captain: z.string().min(1, "Please select a captain"),
  transactionId: z
    .string()
    .min(5, "Transaction ID must be at least 5 characters"),
  transactionImage: z
    .instanceof(File)
    .nullable()
    .refine((file) => file !== null, {
      message: "Transaction image is required",
    }),
});

interface Sports {
  sport: string;
  minPlayers: number;
  substitute: number | "NA";
  entryFee: number;
  maxEntry: number | "Open";
}

// players: [] as {
//   name: string;
//   enrollment: string;
//   phone: string;->mobile
//   photo: string;->playerIdCard
//   isCaptain: boolean;
//   email: string;
// +gender:string;
// }[],


interface playerType{
    name: string;
    enrollment: string;
    mobile: string;// changed-> phone to mobile
    playerIdCard:File | null;// changes photo to playerIdCard
    isCaptain: boolean;
    email: string;
    gender:string;
  
}
const Register = () => {
  const [formData, setFormData] = useState({
    event: sportsData[0].sport,
    collegeName: "",
    players: [] as playerType[],
    captain: "",
    transactionId: "",
    transactionImage: null as File | null,
  });
  const [selectedEvent, setSelectedEvent] = useState<Sports | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [eventData, setEventData] = useState<IEventImage[]>();
  const [apiResponseMessage, setApiResponseMessage] = useState<string | null>(
    null
  );
  const [currentPlayer, setCurrentPlayer] = useState<playerType>({
    name: "",
    enrollment: "",
    mobile: "",
    playerIdCard:null,
    email: "",
    gender:"",
    isCaptain: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === "event") {
      const selectedSport = value.toLowerCase();
      const filteredEvent = sportsData.find(
        (data) => data.sport.toLowerCase() === selectedSport
      );
      setSelectedEvent(filteredEvent);
    }
    if (name === "captain") {
      setFormData((prevData) => ({
        ...prevData,
        players: prevData.players.map((player) => ({
          ...player,
          isCaptain: player.name === value,
        })),
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
        playerIdCard:e.target.files[0],
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
      mobile: "",
      playerIdCard: "",
      email: "",
      isCaptain: false,
    });
  };




  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setApiResponseMessage("");
    console.log(formData);
    const validation = registrationSchema.safeParse(formData);
    
    // if (!validation.success) {
    //   const errors = validation.error.errors.reduce(
    //     (acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }),
    //     {} as Record<string, string>
    //   );
   
    //   setErrors(errors); 
    //   setLoading(false);
    //   return; 
    // }
  
    try {
      const res = await registerAction(formData);
      console.log("res", res);
    } catch (err: any) {
      console.log(err);
      if (err instanceof z.ZodError) {
        // ❌ This case won't be hit because we're validating before API call
        console.error("Unexpected ZodError:", err);
        setApiResponseMessage("Validation failed, but it should be handled before API call.");
      } else {
        setApiResponseMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    setEventData(eventImage);
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#27473c] to-[#1b7758] p-6">
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
                <p className="text-2xl font-bold">
                  Amount: ₹{selectedEvent?.entryFee || 0}
                </p>
                <p className="text-lg mt-2">UPI: PPQR01.YUZUNL@IOB</p>
              </div>
            </div>
          </div>
        </motion.div>
        <hr className="border-t border-white/20 my-4" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-white font-bold text-2xl mb-4">Event Details:</h1>
          <p className="text-lg font-semibold text-gray-100">
            Event Name:{" "}
            <span className="font-normal">{selectedEvent?.sport || "NA"}</span>
          </p>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2 mt-2">
            <p className="font-bold text-white">
              Minimum Players:{" "}
              <span className="text-base text-gray-100">
                {selectedEvent?.minPlayers || "NA"}
              </span>
            </p>
            <p className="font-bold text-white">
              Extra Players:{" "}
              <span className="text-base text-gray-100">
                {selectedEvent?.substitute || "NA"}
              </span>
            </p>
          </div>
        </motion.div>
        <hr className="border-t border-white/20 my-8" />
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                {sportsData?.map((event, id) => (
                  <option
                    key={id}
                    value={event.sport.toLowerCase()}
                    className="text-gray-900"
                  >
                    {event.sport}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-white text-lg mb-2">Select College</label>
              <select
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="w-full p-3 bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
              >
                {colleges?.map((college, index) => (
                  <option
                    key={index}
                    value={college.name.toLowerCase()}
                    className="text-gray-900"
                  >
                    {college.name}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
          <hr className="border-t border-white/20 my-8" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Add Players
            </h2>
            {formData.players?.length < (selectedEvent?.minPlayers ?? 0) && (
              <div className="flex flex-col gap-4 mb-4">
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
                  <div className="flex flex-col text-white gap-2">
                    <label>Player Name</label>
                    <input
                      type="text"
                      name="name"
                      value={currentPlayer.name}
                      onChange={(e) => handlePlayerChange(e, "name")}
                      placeholder="Enter Player Name"
                      className="w-full p-3 placeholder-white bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div className="flex flex-col text-white gap-2">
                    <label>Player Enrollment Number</label>
                    <input
                      type="text"
                      name="enrollment"
                      value={currentPlayer.enrollment}
                      onChange={(e) => handlePlayerChange(e, "enrollment")}
                      placeholder="Enter Player Enrollment"
                      className="w-full p-3 placeholder-white bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
                    />
                    {errors.enrollment && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.enrollment}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col text-white gap-2">
                    <label>Player Email</label>
                    <input
                      type="email"
                      value={currentPlayer.email}
                      onChange={(e) => handlePlayerChange(e, "email")}
                      placeholder="Enter Player Email"
                      className="w-full p-3 placeholder-white bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col text-white gap-2">
                    <label>Player Phone Number</label>
                    <input
                      type="phone"
                      value={currentPlayer.mobile}
                      onChange={(e) => handlePlayerChange(e, "mobile")}
                      placeholder="Enter Player phone number"
                      className="w-full p-3 placeholder-white bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col text-white gap-2">
                    <label>Upload ID Card Image</label>
                    <input
                      name="playerIdCard"
                      type="file"
                      onChange={handlePlayerImageChange}
                      className="w-full p-3 bg-white/30 text-white rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
                    />
                    {errors.photo && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.photo}
                      </p>
                    )}
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
                        <span className="font-bold">Phone:</span> {player.mobile}
                      </p>
                      <p>
                        <span className="font-bold">ID Card:</span>{" "}
                        {player.playerIdCard ? (
                          <img
                            src={player.playerIdCard}
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
                          <td className="py-2 px-4">{player.mobile}</td>
                          <td className="py-2 px-4">
                            {player.playerIdCard ? (
                              <img
                                src={player.playerIdCard}
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
              {errors.transactionId && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.transactionId}
                </p>
              )}
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
              {errors.transactionImage && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.transactionImage}
                </p>
              )}
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
