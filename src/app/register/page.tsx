"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import eventImage, { type IEventImage } from "@/data/EventData";
import { registerAction } from "../action/team.action";
import { colleges } from "@/data/CollegeData";
import { sportsData } from "@/data/AllEventData";
import { z } from "zod";
import { default as ReactSelect } from "react-select";
const playerSchema = z.object({
  name: z.string().min(2, "Player name must be at least 2 characters"),

  enrollment: z
    .string()
    .min(5, "Enrollment number must be at least 5 characters"),

  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  photo: z.string().min(1, "Photo URL is required"),

  isCaptain: z.boolean(),

  email: z.string().email("Invalid email address"),
});
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
const Register = () => {
  const [formData, setFormData] = useState({
    event: "",
    collegeName: "",
    players: [] as {
      name: string;
      enrollment: string;
      phone: string;
      photo: string;
      isCaptain: boolean;
      email: string;
    }[],
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
  const [eventOptions,setEventOptions]= useState<any>();
  const [collegeOptions,setCollegeOptions]= useState<any>();

  const [currentPlayer, setCurrentPlayer] = useState({
    name: "",
    enrollment: "",
    phone: "",
    photo: "",
    email: "",
    isCaptain: false,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement> | any
  ) => {
    const { name, value } = e.target || e; // Handle both native select/input and ReactSelect

    // Special handling for event (selecting sport)
    if (name === "event") {
      const selectedSport = value?.toLowerCase();
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

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  //   selectedOption: any
  // ) => {
  //   const { name, value } = e.target;

  //   if (name === "event") {
  //     const selectedSport = value.toLowerCase();
  //     const filteredEvent = sportsData.find(
  //       (data) => data.sport.toLowerCase() === selectedSport
  //     );
  //     setSelectedEvent(filteredEvent);
  //   }
  //   if (name === "captain") {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       players: prevData.players.map((player) => ({
  //         ...player,
  //         isCaptain: player.name === value,
  //       })),
  //       [name]: value,
  //     }));
  //   } else {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   }
  // };
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
      email: "",
      isCaptain: false,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setApiResponseMessage("");

    const validation = registrationSchema.safeParse(formData);

    if (!validation.success) {
      const errors = validation.error.errors.reduce(
        (acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }),
        {} as Record<string, string>
      );

      setErrors(errors);
      setLoading(false);

      return;
    }

    try {
      const res = await registerAction(formData);
      console.log("res", res);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        console.error("Unexpected ZodError:", err);
        setApiResponseMessage(
          "Validation failed, but it should be handled before API call."
        );
      } else {
        setApiResponseMessage(
          "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEventData(eventImage);
  }, []);


  
useEffect(() => {
  setEventOptions(() => {
    const events = sportsData?.map((event) => ({
      value: event.sport.toLowerCase(),
      label: event.sport,
    })) || []; // Default to an empty array if sportsData is undefined or empty
    return events;
  });

  setCollegeOptions(() => {
    const collegeData = colleges?.map((college) => ({
      value: college.name.toLowerCase(),
      label: college.name,
    })) || []; // Default to an empty array if colleges is undefined or empty
    return collegeData;
  });
}, [sportsData, colleges]); 
 
  return (
    <div className="flex max-md:flex-col justify-center gap-4 items-start min-h-screen bg-gradient-to-r from-[#b98867] to-[#f5a937] p-6">
      <div className="flex relative top-[-12px] w-full max-w-3xl flex-col  bg-white rounded-3xl shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl  bg-white rounded-2xl"
        >
          <div className="md:text-4xl p-4 text-3xl font-bold bg-[#f5a937] text-white text-center mb-6 rounded-t-xl">
            <h1>Event Registration</h1>
          </div>

          <hr className="border-t border-white/20 my-0" />
          <form onSubmit={handleSubmit} className="p-11">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="grid grid-cols-1 gap-4"
            >
              <div className="flex flex-col">
                <label className="text-gray-700 text-lg mb-2">
                  Select Event
                </label>
                {eventOptions && (
                  <ReactSelect
                    name="event"
                    value={
                      eventOptions.find(
                        (option) => option.value === formData.event
                      ) || null
                    }
                    onChange={(selectedOption) =>
                      handleChange({
                        name: "event",
                        value: selectedOption?.value || "",
                      })
                    }
                    options={eventOptions}
                    placeholder="Select Event"
                    className="w-full p-3"
                  />
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 text-lg mb-2">
                  Select College
                </label>
                {collegeOptions && (
                  <ReactSelect
                    name="collegeName"
                    value={
                      collegeOptions.find(
                        (option) => option.value === formData.collegeName
                      ) || null
                    }
                    onChange={(selectedOption) =>
                      handleChange({
                        name: "collegeName",
                        value: selectedOption?.value || "",
                      })
                    }
                    options={collegeOptions}
                    placeholder="Select College"
                    className="w-full p-3"
                  />
                )}
              </div>
            </motion.div>
            <hr className="border-t border-gray-600 my-8" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6"
            >
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Add Players
              </h2>
              {formData.players?.length < (selectedEvent?.minPlayers ?? 0) && (
                <div className="flex flex-col gap-4 mb-4">
                  <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
                    <div className="flex flex-col text-gray-700 gap-2">
                      <label>Player Name</label>
                      <input
                        type="text"
                        name="name"
                        value={currentPlayer.name}
                        onChange={(e) => handlePlayerChange(e, "name")}
                        placeholder="Enter Player Name"
                        className="w-full p-3 placeholder-gray-600 bg-white/30 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
                      />
                      {errors.name && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col text-gray-700 gap-2">
                      <label>Player Enrollment Number</label>
                      <input
                        type="text"
                        name="enrollment"
                        value={currentPlayer.enrollment}
                        onChange={(e) => handlePlayerChange(e, "enrollment")}
                        placeholder="Enter Player Enrollment"
                        className="w-full p-3 placeholder-gray-600 bg-white/30 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
                      />
                      {errors.enrollment && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.enrollment}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col text-gray-700 gap-2">
                      <label>Player Email</label>
                      <input
                        type="email"
                        value={currentPlayer.email}
                        onChange={(e) => handlePlayerChange(e, "email")}
                        placeholder="Enter Player Email"
                        className="w-full p-3 placeholder-gray-600 bg-white/30 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
                      />
                      {errors.email && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col text-gray-700 gap-2">
                      <label>Player Phone Number</label>
                      <input
                        type="phone"
                        value={currentPlayer.phone}
                        onChange={(e) => handlePlayerChange(e, "phone")}
                        placeholder="Enter phone number"
                        className="w-full p-3 placeholder-gray-600 bg-white/30 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col text-gray-700 gap-2">
                      <label>Upload ID Card Image</label>
                      <input
                        name="photo"
                        type="file"
                        onChange={handlePlayerImageChange}
                        className="w-full p-3 bg-white/30 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
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
                    className="px-4 py-2 bg-orange-400 text-gray-100 rounded-lg shadow-md hover:bg-green-500 transition"
                  >
                    Add Player
                  </button>
                </div>
              )}

              {formData.players.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Player Details
                  </h3>
                  <div className="md:hidden">
                    {formData.players.map((player, index) => (
                      <div
                        key={index}
                        className="bg-white/10 p-4 rounded-lg mb-4 text-gray-700"
                      >
                        <p>
                          <span className="font-bold">Name:</span> {player.name}
                        </p>
                        <p>
                          <span className="font-bold">Enrollment:</span>{" "}
                          {player.enrollment}
                        </p>
                        <p>
                          <span className="font-bold">Phone:</span>{" "}
                          {player.phone}
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
                    <table className="min-w-full table-auto text-gray-700 bg-white/30 rounded-lg shadow-md">
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
            {formData.players.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-6"
              >
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Select Captain
                </h2>
                <select
                  name="captain"
                  value={formData.captain}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/30 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
                >
                  <option value="" className="text-gray-700">
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
            <hr className="border-t border-gray-600 my-8" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className=""
            >
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Payment Details
              </h2>
              <div className="flex flex-col mb-4">
                <label className="text-gray-700 text-lg mb-2">
                  Transaction ID
                </label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  placeholder="Enter Transaction ID"
                  className="w-full p-3 placeholder-gray-600 bg-white/30 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
                />
                {errors.transactionId && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.transactionId}
                  </p>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-gray-700 text-lg mb-2">
                  Transaction Details Image
                </label>
                <input
                  type="file"
                  name="transactionImage"
                  accept="image/*"
                  onChange={handleTransactionImageChange}
                  className="w-full p-3 bg-white/30 text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-purple-400 outline-none"
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
                className="w-full px-6 py-3 text-lg font-semibold bg-[#f5a937] text-white rounded-lg shadow-md hover:bg-yellow-500 transition"
              >
                Register Now
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
      <div className="flex relative top-[-12px] w-full max-w-2xl md:max-w-sm flex-col p-2 bg-white rounded-xl ">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl bg-white p-8 rounded-2xl "
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className="text-gray-700 font-bold text-3xl mb-6">
              Event Details:
            </h1>
            <p className="text-lg text-gray-500 font-bold">
              <span className="font-bold text-gray-700">
                {selectedEvent?.sport || "NA"}
              </span>
            </p>
            <div className="grid grid-cols-1">
              <div>
                <p className="font-bold text-gray-700">
                  Minimum Players:{" "}
                  <span className="text-base text-gray-500">
                    {selectedEvent?.minPlayers || "NA"}
                  </span>
                </p>
              </div>
              <div>
                <p className="font-bold text-gray-700">
                  Extra Players:{" "}
                  <span className="text-base text-gray-500">
                    {selectedEvent?.substitute || "NA"}
                  </span>
                </p>
              </div>
            </div>
            <hr className="border-t border-gray-600 my-8" />
          </motion.div>
          <h2 className="text-gray-700 md:text-3xl text-2xl font-extrabold mb-6">
            Payment Option
          </h2>
          <div className="flex flex-col justify-center items-center rounded-lg">
            <Image
              src="/eventqr.jpeg"
              alt="QR Code"
              width={220}
              height={220}
              className="rounded-lg mb-4"
            />
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-700">
                ₹{selectedEvent?.entryFee || 0}
              </p>
              <p className="text-xl text-gray-500 mt-2">
                UPI: PPQR01.YUZUNL@IOB
              </p>
            </div>
          </div>
          <hr className="border-t border-gray-600 my-7" />
          <div className="grid grid-cols-1  gap-6">
            <div className="text-gray-700 text-lg space-y-4">
              <div className="bg-[#f5a937] text-white px-6 py-3 font-semibold rounded-full w-fit">
                <h3>NEFT Bank Details:</h3>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">
                  A/c Name:{" "}
                  <span className="text-gray-500">
                    Don Bosco Institute of Technology
                  </span>
                </p>
                <p className="font-semibold">
                  A/c No: <span className="text-gray-500">179502000000526</span>
                </p>
                <p className="font-semibold">
                  IFSC Code: <span className="text-gray-500">IOBA0001795</span>
                </p>
                <p className="font-semibold">
                  Account Type:{" "}
                  <span className="text-gray-500">Current Account</span>
                </p>
                <p className="font-semibold">
                  Branch Name:{" "}
                  <span className="text-gray-500">
                    Indian Overseas Bank, New Friends Colony, New Delhi
                  </span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
