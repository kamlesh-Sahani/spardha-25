"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import eventImage, { type IEventImage } from "@/data/EventData";
import { registerAction } from "../action/team.action";

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
  const [selectedEvent,setSelectedEvent] = useState<IEventImage>()
  const [eventData,setEventData]=useState<IEventImage[]>();
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




  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    try {
      const res = await registerAction(formData);
      console.log("res",res);
    } catch (error) {
      console.log("error",error)
    }
  };


  useEffect(()=>{
    setEventData(eventImage);
  },[])

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
                {eventData?.map((event, id) => (
                  <option key={id} value={event.name.toLowerCase()} className="text-gray-900">
                    {event.name}
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
