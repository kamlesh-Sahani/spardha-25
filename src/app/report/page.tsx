"use client"; // Ensure this is a Client Component

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type ITeam } from "@/models/team.model";

// Sample team data

const teamData:any = [
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
    createdAt: new Date("2025-01-01"), // Use Date object instead of string
  },
];

export default function AdminReportPage() {
  const [teams, setTeams] = useState(teamData);
  const [filters, setFilters] = useState({
    event: "",
    college: "",
    status: "",
  });
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  // Filter teams based on filters
  const filteredTeams = teams.filter((team: any) => {
    return (
      (filters.event ? team.event.includes(filters.event) : true) &&
      (filters.college ? team.college.includes(filters.college) : true) &&
      (filters.status ? team.status === filters.status : true)
    );
  });

  // Update team status
  const updateTeamStatus = (teamID: number, status: string) => {
    setTeams((prevTeams:any) =>
      prevTeams.map((team:any) =>
        team.teamID === teamID ? { ...team, status } : team
      )
    );
  };

  // Open player details modal
  const openPlayerModal = (team: any) => {
    setSelectedTeam(team);
    setIsPlayerModalOpen(true);
  };

  // Open transaction screenshot modal
  const openTransactionModal = (team:any) => {
    setSelectedTeam(team);
    setIsTransactionModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Team Registrations Report</h1>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Filter by Event"
          value={filters.event}
          onChange={(e) => setFilters({ ...filters, event: e.target.value })}
        />
        <Input
          placeholder="Filter by College"
          value={filters.college}
          onChange={(e) => setFilters({ ...filters, college: e.target.value })}
        />
        <Select
          value={filters.status}
          onValueChange={(value) => setFilters({ ...filters, status: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team ID</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>College</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeams.map((team) => (
              <TableRow key={team.teamID}>
                <TableCell>{team.teamID}</TableCell>
                <TableCell>{team.event}</TableCell>
                <TableCell>{team.college}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => openPlayerModal(team)}
                  >
                    View Players
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => openTransactionModal(team)}
                  >
                    View Transaction
                  </Button>
                  <Button
                    onClick={() => updateTeamStatus(team.teamID, "approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => updateTeamStatus(team.teamID, "rejected")}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Player Details Modal */}
      <Dialog open={isPlayerModalOpen} onOpenChange={setIsPlayerModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Player Details</DialogTitle>
            <DialogDescription>
              Details of players in the team.
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Captain</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedTeam?.players.map((player, index) => (
                <TableRow key={index}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.gender}</TableCell>
                  <TableCell>{player.mobile}</TableCell>
                  <TableCell>{player.email}</TableCell>
                  <TableCell>{player.isCaptain ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      {/* Transaction Screenshot Modal */}
      <Dialog
        open={isTransactionModalOpen}
        onOpenChange={setIsTransactionModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Screenshot</DialogTitle>
            <DialogDescription>
              Screenshot of the transaction for the team.
            </DialogDescription>
          </DialogHeader>
          <img
            src={selectedTeam?.transactionSs}
            alt="Transaction Screenshot"
            className="w-full h-auto"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
