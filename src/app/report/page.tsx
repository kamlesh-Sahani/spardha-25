"use client"; // Ensure this is a Client Component

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

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
import Loader from "@/components/Loader";
import { default as ReactSelect } from "react-select"; // ✅ Correct aliasing

// Define type
interface Player {
  name: string;
  gender: string;
  mobile: string;
  email: string;
  playerIdCard: string;
  isCaptain: boolean;
}

interface Team {
  _id: string;
  teamID: number;
  event: string;
  college: string;
  status: "pending" | "approved" | "rejected";
  transactionId: string;
  transactionSs: string;
  amount: number;
  players: Player[];
  createdAt: Date;
}

interface Filters {
  event: string;
  college: string;
  status: string;
}

export default function AdminReportPage() {
  const [teams, setTeams] = useState<Team[]>();
  const [filters, setFilters] = useState<Filters>({
    event: "",
    college: "",
    status: "",
  });
  const [selectedTeam, setSelectedTeam] = useState<Team>();
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [uiUpdate, setUiUpdate] = useState<boolean>(false);
  const [collegeData, setCollegeData] = useState<string[]>();
  const [eventData, setEventData] = useState<string[]>();
  const [statusLoading,setStatusLoading]= useState<boolean>(false);

  // New state for handling approval/rejection reason
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [statusReason, setStatusReason] = useState("");
  const [currentStatus, setCurrentStatus] = useState<"approved" | "rejected">();
  const [currentTeamId, setCurrentTeamId] = useState<string>();

  // Filter teams based on filters
  const filteredTeams =
    teams &&
    teams.filter((team) => {
      return (
        (filters.event && filters.event !== "all"
          ? team.event.toLowerCase().includes(filters.event.toLowerCase())
          : true) &&
        (filters.college && filters.college !== "all"
          ? team.college.toLowerCase().includes(filters.college.toLowerCase())
          : true) &&
        (filters.status && filters.status !== "all"
          ? team.status === filters.status
          : true)
      );
    });

  // Update team status
  const updateTeamStatus = async () => {
    try {
      setStatusLoading(true);
      const { data } = await axios.post("/api/report/status", {
        _id: currentTeamId,
        status: currentStatus,
        reason: statusReason,
      });
      if (data.success) {
        toast.success(data.message || "Successfully updated");
      } else {
        toast.error(data.message);
      }
      setUiUpdate((prev) => !prev);
      setIsStatusDialogOpen(false); // Close the dialog after submission
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }finally{
      setStatusLoading(false);
    }
  };

  // Open status dialog for approve/reject
  const openStatusDialog = (
    teamId: string,
    status: "approved" | "rejected"
  ) => {
    setCurrentTeamId(teamId);
    setCurrentStatus(status);
    setIsStatusDialogOpen(true);
  };

  // Open player details modal
  const openPlayerModal = (team: Team) => {
    setSelectedTeam(team);
    setIsPlayerModalOpen(true);
  };

  // Open transaction screenshot modal
  const openTransactionModal = (team: Team) => {
    setSelectedTeam(team);
    setIsTransactionModalOpen(true);
  };

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/report/all");
        setTeams(data.teams);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [uiUpdate]);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get("/api/report/data");
        setCollegeData(data.data.colleges);
        setEventData(data.data.events);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Team Registrations Report</h1>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        {collegeData && (
          <ReactSelect
            value={
              filters.college
                ? { value: filters.college, label: filters.college }
                : { value: "all", label: "All Colleges" }
            }
            onChange={(selectedOption: any) =>
              setFilters({
                ...filters,
                college:
                  selectedOption?.value === "all" ? "" : selectedOption?.value,
              })
            }
            options={[
              { value: "all", label: "All Colleges" },
              ...(collegeData?.map((college) => ({
                value: college,
                label: college,
              })) || []),
            ]}
            placeholder="Filter by College"
            className="w-[300px]"
          />
        )}

        {eventData && (
          <ReactSelect
            value={
              filters.event
                ? { value: filters.event, label: filters.event }
                : { value: "all", label: "All Events" }
            }
            onChange={(selectedOption: any) =>
              setFilters({
                ...filters,
                event:
                  selectedOption?.value === "all" ? "" : selectedOption?.value,
              })
            }
            options={[
              { value: "all", label: "All Events" },
              ...(eventData?.map((event) => ({ value: event, label: event })) ||
                []),
            ]}
            placeholder="Filter by Event"
            className="w-[300px]"
          />
        )}

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
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team ID</TableHead>
                  <TableHead>Date</TableHead>

                  <TableHead>Event</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams &&
                  filteredTeams.map((team) => (
                    <TableRow key={team.teamID}>
                      <TableCell>{team.teamID}</TableCell>
                      <TableCell>
                        {team?.createdAt
                          ? new Date(team.createdAt).toLocaleDateString()
                          : "N/A"}
                      </TableCell>

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
                          onClick={() => openStatusDialog(team._id, "approved")}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => openStatusDialog(team._id, "rejected")}
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {/* Status Dialog (Reason Submission) */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="max-w-[400px] max-sm:max-w-[90vw] rounded">
          <DialogHeader>
            <DialogTitle>
              Provide a Reason for{" "}
              <span
                className={`${
                  currentStatus == "rejected"
                    ? "text-red-600"
                    : "text-green-700"
                }`}
              >
                {currentStatus}
              </span>
            </DialogTitle>
            <DialogDescription>
              Please provide a reason for the {currentStatus} status.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={statusReason}
            onChange={(e) => setStatusReason(e.target.value)}
            placeholder={`Reason for ${currentStatus} optional`}
            className="w-full mb-4"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsStatusDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={updateTeamStatus}>{statusLoading ? "Updateing...": "Submit Reason"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isPlayerModalOpen} onOpenChange={setIsPlayerModalOpen}>
        <DialogContent className="max-w-[70vw] max-sm:max-w-[90vw] rounded">
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
          <h1>Players Id Cards</h1>
          <div className="flex overflow-x-auto gap-5 ">
            {selectedTeam?.players.map((player, index) => (
              <div className="flex flex-col" key={index}>
                <h3>{player.name}</h3>
                <img
                  src={player.playerIdCard}
                  className="w-[400px] object-contain rounded "
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Transaction Screenshot Modal */}
      <Dialog
        open={isTransactionModalOpen}
        onOpenChange={setIsTransactionModalOpen}
      >
        <DialogContent className="max-w-[70vw] max-sm:max-w-[90vw] rounded">
          <DialogHeader>
            <DialogTitle>Transaction Screenshot</DialogTitle>
            <DialogDescription>
              Screenshot of the transaction for the team.
            </DialogDescription>
            <DialogTitle>
              Transaction ID : {selectedTeam?.transactionId}
            </DialogTitle>
          </DialogHeader>
          <img
            src={selectedTeam?.transactionSs || ""}
            alt="Transaction Screenshot"
            className="w-[400px] object-contain rounded "
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
