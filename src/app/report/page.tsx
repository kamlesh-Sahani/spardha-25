"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";


// Sample team data
const teamData = [
  {
    teamID: 12345,
    event: "Football Championship",
    college: "ABC University",
    status: "pending",
    transactionId: "TXN-987654",
    transactionSs: "https://via.placeholder.com/150",
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
  },
  // Add more teams...
];

export default function AdminReportPage() {
  const [teams, setTeams] = useState(teamData);
  const [filters, setFilters] = useState({ event: "", college: "", status: "" });
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  // Filter teams based on filters
  const filteredTeams = teams.filter((team) => {
    return (
      (filters.event ? team.event.includes(filters.event) : true) &&
      (filters.college ? team.college.includes(filters.college) : true) &&
      (filters.status ? team.status === filters.status : true)
    );
  });

  // Update team status
  const updateTeamStatus = (teamID, status) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.teamID === teamID ? { ...team, status } : team
      )
    );
  };

  // Open player details modal
  const openPlayerModal = (team) => {
    setSelectedTeam(team);
    setIsPlayerModalOpen(true);
  };

  // Open transaction screenshot modal
  const openTransactionModal = (team) => {
    setSelectedTeam(team);
    setIsTransactionModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Team Registrations Report</h1>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Filter by Event"
          className="p-2 border rounded"
          value={filters.event}
          onChange={(e) => setFilters({ ...filters, event: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by College"
          className="p-2 border rounded"
          value={filters.college}
          onChange={(e) => setFilters({ ...filters, college: e.target.value })}
        />
        <select
          className="p-2 border rounded"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Team ID</th>
              <th className="p-3 text-left">Event</th>
              <th className="p-3 text-left">College</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeams.map((team) => (
              <tr key={team.teamID} className="border-b">
                <td className="p-3">{team.teamID}</td>
                <td className="p-3">{team.event}</td>
                <td className="p-3">{team.college}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      team.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : team.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {team.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => openPlayerModal(team)}
                    className="text-blue-500 hover:underline"
                  >
                    View Players
                  </button>
                  <button
                    onClick={() => openTransactionModal(team)}
                    className="text-blue-500 hover:underline"
                  >
                    View Transaction
                  </button>
                  <button
                    onClick={() => updateTeamStatus(team.teamID, "approved")}
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaCheck className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => updateTeamStatus(team.teamID, "rejected")}
                    className="text-red-500 hover:text-red-700"
                  >
                    <RxCross2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Player Details Modal */}
       {/* Player Details Modal */}
       <Dialog
        open={isPlayerModalOpen}
        onClose={() => setIsPlayerModalOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Player Details</h2>
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Gender</th>
                  <th className="p-2 text-left">Mobile</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Captain</th>
                </tr>
              </thead>
              <tbody>
                {selectedTeam?.players.map((player, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{player.name}</td>
                    <td className="p-2">{player.gender}</td>
                    <td className="p-2">{player.mobile}</td>
                    <td className="p-2">{player.email}</td>
                    <td className="p-2">
                      {player.isCaptain ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setIsPlayerModalOpen(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Transaction Screenshot Modal */}
      <Dialog
        open={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Transaction Screenshot</h2>
            <img
              src={selectedTeam?.transactionSs}
              alt="Transaction Screenshot"
              className="w-full h-auto"
            />
            <button
              onClick={() => setIsTransactionModalOpen(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}