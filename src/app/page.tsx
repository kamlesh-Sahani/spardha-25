"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BentoGrid from "@/components/BentoGrid";
import Header from "@/components/Header";
import EventCards from "@/components/SportsEventCard";
import EventDetails from "@/components/EventDetail";
import Footer from "@/components/Footer";

export interface EventType{
  name:string;
  image:string;
  description:string;
  size:string;
}
const events:EventType[] = [
  {
    name: "Football",
    image:
      "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Annual Football Event",
    size: "large-horizontal",
  },
  {
    name: "Basketball",
    image:
      "https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Celebration of diversity",
    size: "small",
  },
  {
    name: "Vollyball",
    image:
      "https://cdn.pixabay.com/photo/2016/12/25/15/41/ball-1930191_1280.jpg",
    description: "Inter-college sports competition",
    size: "large-vertical",
  },
  {
    name: "Kabaddi",
    image:
      "https://www.indiasports.com/wp-content/uploads/2020/04/Kabaddi-1536x1152.jpg",
    description: "24-hour coding challenge",
    size: "large-vertical",
  },
  {
    name: "Tug of War",
    image: "https://wallpaperaccess.com/full/8811245.jpg",
    description: "Showcase of student artwork",
    size: "small",
  },
  {
    name: "Table Tennis",
    image:
      "https://images.pexels.com/photos/18511482/pexels-photo-18511482/free-photo-of-ping-pong-ball-and-rackets.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Innovative projects display",
    size: "small",
  },
  {
    name: "Badminton",
    image:
      "https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Live performances by students",
    size: "large-horizontal",
  },
  {
    name: "Chess",
    image:
      "https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Battle of words and ideas",
    size: "small",
  },
  {
    name: "Arm Wrestling",
    image:
      "https://t3.ftcdn.net/jpg/01/83/11/08/360_F_183110859_TbBKm5B9KxFgArFLPXfGQYeeQnWmChRV.jpg",
    description: "Latest technology showcase",
    size: "small",
  },
  {
    name: "Body Building",
    image: "https://wallpapercave.com/wp/wp3197414.jpg",
    description: "Trendsetting student designs",
    size: "small",
  },
  {
    name: "Power Lifting",
    image:
      "https://i.pinimg.com/736x/53/c7/e8/53c7e8570534aa5b057cb82ea05e63cc.jpg",
    description: "Reunion of past graduates",
    size: "large-horizontal",
  },
];

const InstructionPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0, 1],
    ["#003566", "#fff7d1", "#ffe568"]
  );

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen relative"
      style={{ backgroundColor }}
    >
      <div className="relative z-10">
        <Header />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 py-12"
        >
          <BentoGrid events={events} />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mt-16 mb-8 text-center text-white"
          >
            Featured Events
          </motion.h2>
          <EventCards />
          <EventDetails />
        </motion.div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default InstructionPage;
