"use client"; // Ensure this is a Client Component

import { useState ,useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast"

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

// Define types
interface Player {
  name: string;
  gender: string;
  mobile: string;
  email: string;
  playerIdCard: string;
  isCaptain: boolean;
}

interface Team {
  _id:string;
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
  const [loading,setLoading]=useState<boolean>(false);
  const [uiUpdate,setUiUpdate] = useState<boolean>(false);
  // Filter teams based on filters
 // Filter teams based on filters
const filteredTeams = teams && teams.filter((team) => {
  return (
    (filters.event ? team.event.toLowerCase().includes(filters.event.toLowerCase()) : true) &&
    (filters.college ? team.college.toLowerCase().includes(filters.college.toLowerCase()) : true) &&
    (filters.status && filters.status !== "all" ? team.status === filters.status : true)
  );
});


  // Update team status
  const updateTeamStatus = async(_id: string, status: "pending" | "approved" | "rejected") => {
    try {
      const {data} = await axios.post("/api/report/status",{_id,status});
      console.log(data,"stataus");
      if(data.success){
        toast.success(data.message || "successfuly updated");
      }else{
        toast.error(data.message );
      }
      setUiUpdate((prev)=>!prev);
    } catch (error:any) {
      toast.error(error?.response?.data?.message || "something went wrong");
      console.log(error);
    }
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

  useEffect(()=>{
    (async function (){
      setLoading(true);
      try {
        const {data} = await axios.get("/api/report/all");
      setTeams(data.teams)
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
      
    })()
  },[uiUpdate])

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
    {
      loading ? <Loader /> :<>
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
            {filteredTeams &&  filteredTeams.map((team) => (
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
                    onClick={() => updateTeamStatus(team._id, "approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => updateTeamStatus(team._id, "rejected")}
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
    }
      

      {/* Player Details Modal */}
      <Dialog open={isPlayerModalOpen} onOpenChange={setIsPlayerModalOpen}>
        <DialogContent >
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
                   <img src={player.playerIdCard}  className="w-[400px] object-contain rounded "/>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Screenshot</DialogTitle>
            <DialogDescription>
              Screenshot of the transaction for the team.
            </DialogDescription>
            <DialogTitle>Transaction ID : {selectedTeam?.transactionId}</DialogTitle>

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