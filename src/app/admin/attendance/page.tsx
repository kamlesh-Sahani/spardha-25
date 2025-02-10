"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { attendTeams, markAttendance } from "@/app/action/team.action";
import Loader from "@/components/Loader";
import { FaRegEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Team {
  _id: string;
  teamID: number;
  event: string;
  college: string;
  reported: boolean;
}

export default function AttendancePage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [teamID, setTeamID] = useState<number | null>(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [uiUpdate, setUiUpdate] = useState<boolean>(false);
  const [atttendanceLoading, setAttendanceLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleMarkAttendance = async () => {
    if (!teamID || !password) {
      toast.error("Please enter Team ID and Password");
      return;
    }
    try {
      setAttendanceLoading(true);
      const res = await markAttendance(teamID, password);
      if (res.success) {
        toast.success(res.message);
        setIsDialogOpen(false);
        setTeamID(null);
        setPassword("");
        setUiUpdate((prev) => !prev);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setAttendanceLoading(false);
    }
  };

  const teamDetail = (teamId: string) => {
    router.push(`/profile/id/${teamId}`);
  };

  const fetchAttendTeams = async () => {
    try {
      setLoading(true);
      const res = await attendTeams();
      const parsedTeams = JSON.parse(res.teams!);
      setTeams(parsedTeams);
      setFilteredTeams(parsedTeams);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendTeams();
  }, [uiUpdate]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = teams.filter(
      (team) =>
        team.teamID.toString().includes(lowercasedQuery) ||
        team.event.toLowerCase().includes(lowercasedQuery) ||
        team.college.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredTeams(filtered);
  }, [searchQuery, teams]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Event Attendance</h1>
         

<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild className="z-[110]">
                <Button variant="outline">Mark Attendance</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Mark Attendance</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Label htmlFor="teamID">Team ID</Label>
                  <Input
                    id="teamID"
                    value={!teamID ? "" : teamID}
                    onChange={(e) => setTeamID(Number(e.target.value))}
                    placeholder="Enter Team ID"
                  />
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                  />
                </div>
                <DialogFooter>
                  <Button onClick={handleMarkAttendance}>
                    {atttendanceLoading ? "Marking..." : "Submit"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </div>
          <Input
              placeholder="Search by Team ID, Event, or College"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-1/3 mb-2"
            />

          {/* Teams Table */}
          <Card className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team ID</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Reported</TableHead>
                  <TableHead>View Team Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams.length > 0 ? (
                  filteredTeams.map((team) => (
                    <TableRow key={team.teamID}>
                      <TableCell>{team.teamID}</TableCell>
                      <TableCell>{team.event}</TableCell>
                      <TableCell>{team.college}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            team.reported
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {team.reported ? "Reported" : "Not Reported"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => teamDetail(team._id)}
                          variant={"outline"}
                        >
                          <FaRegEye />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No teams found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}
      
    </>
  );
}
