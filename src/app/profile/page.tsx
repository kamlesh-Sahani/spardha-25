"use client";
import { FC } from "react";
import Image from "next/image";
import ss from "@/app/assets/basketball S.png";

// Dummy data for team and players
const teamData = {
  teamID: 12345,
  event: "Football Championship",
  college: "ABC University",
  status: "approved",
  transactionId: "TXN-987654",
  transactionSs: ss, // Placeholder image
  amount: 1500,
  players: [
    {
      name: "John Doe",
      gender: "Male",
      mobile: "9876543210",
      email: "john.doe@example.com",
      playerIdCard: "ID-12345",
      isCaptain: true,
    },
    {
      name: "Jane Smith",
      gender: "Female",
      mobile: "9876541234",
      email: "jane.smith@example.com",
      playerIdCard: "ID-12346",
      isCaptain: false,
    },
  ],
  timeline: [
    { date: "2025-01-01", event: "Team Registration" },
    { date: "2025-01-10", event: "First Match Played" },
    { date: "2025-01-20", event: "Quarter-finals" },
  ],
};

const ProfilePage: FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Team Profile</h1>

        {/* Team Header */}
        <div className="flex justify-between mb-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Team ID: {teamData.teamID}</h2>
            <p className="text-lg text-gray-700">Event: {teamData.event}</p>
            <p className="text-lg text-gray-700">College: {teamData.college}</p>
            <p className="text-lg text-gray-700">Status: <span className={`text-${teamData.status === "approved" ? "green" : teamData.status === "pending" ? "yellow" : "red"}-500`}>{teamData.status}</span></p>
          </div>
          <div>
            <Image src={teamData.transactionSs} alt="Transaction Screenshot" width={150} height={150} className="rounded-lg shadow-lg" />
          </div>
        </div>

        {/* Transaction Details */}
        <div className="flex justify-between mb-6">
          <div>
            <p className="text-lg text-gray-700">Transaction ID: {teamData.transactionId}</p>
            <p className="text-lg text-gray-700">Amount Paid: ₹{teamData.amount}</p>
          </div>
        </div>

        {/* Players Section */}
        <div className="border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">Players</h2>
          <div className="space-y-4">
            {teamData.players.map((player, index) => (
              <div key={index} className="flex justify-between items-center p-4 border-b">
                <div className="space-y-2">
                  <p className="text-xl font-semibold">{player.name} {player.isCaptain && <span className="text-sm text-blue-500">(Captain)</span>}</p>
                  <p className="text-gray-600">Email: {player.email}</p>
                  <p className="text-gray-600">Mobile: {player.mobile}</p>
                  <p className="text-gray-600">Player ID: {player.playerIdCard}</p>
                </div>
                <div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Message</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">Timeline</h2>
          <div className="space-y-4">
            {teamData.timeline.map((entry, index) => (
              <div key={index} className="flex justify-between p-4 border-b">
                <div className="space-y-2">
                  <p className="text-lg font-semibold">{entry.event}</p>
                  <p className="text-gray-600">{new Date(entry.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
