"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Search } from "lucide-react";
import { allColleges, newCollege } from "@/app/action/college.action";
import toast from "react-hot-toast"

const initialColleges = [
  { name: "Amity University, Noida" },
  { name: "Aravali College of Engineering And Management, Faridabad" },
  { name: "Asian Business School, Noida" },
  { name: "Delhi Technological University, Delhi" },
  { name: "Jamia Millia Islamia University, New Delhi" },
];

export default function CollegeTable() {
  const [colleges, setColleges] = useState(initialColleges);
  const [newCollegeData, setNewCollegeData] = useState({
    name: "",
    location: {
      state: "",
      pincode: "",
      country: "",
    },
  });
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const addCollege = async () => {
    try {
      const res = await newCollege(newCollegeData);
      if(res.success){
        toast.success(res.message || "added")
      }else{
        toast.error(res.message || "Erorr try again")
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Erorr try again")
    }finally{
      setOpen(false);
    }
   
  };

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    (async function () {
      try {
        const res = await allColleges();
        setColleges(JSON.parse(res.colleges!))
      } catch (error) {
        console.log(error);
      }
    })();
  }, [open]);

  return (
    <div className="p-6 w-full mx-auto mt-10">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Colleges List</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild className="z-[110] ">
            <Button variant="default" className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5" /> Add College
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add a New College</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Enter College Name with city"
              value={newCollegeData.name}
              onChange={(e) =>
                setNewCollegeData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="mt-3"
            />
            <p>Eg. Don Bosco Institute of Technology, Delhi</p>
            {/* Location Fields */}
            {/* <p>Location (optional)</p>
            <div className="space-y-3">
              <Input
                placeholder="State"
                value={newCollegeData.location.state}
                onChange={(e) =>
                  setNewCollegeData((prev) => ({
                    ...prev,
                    location: { ...prev.location, state: e.target.value },
                  }))
                }
              />
              <Input
                placeholder="Pincode"
                value={newCollegeData.location.pincode}
                onChange={(e) =>
                  setNewCollegeData((prev) => ({
                    ...prev,
                    location: { ...prev.location, pincode: e.target.value },
                  }))
                }
              />
              <Input
                placeholder="Country"
                value={newCollegeData.location.country}
                onChange={(e) =>
                  setNewCollegeData((prev) => ({
                    ...prev,
                    location: { ...prev.location, country: e.target.value },
                  }))
                }
              /> */}
            {/* </div> */}
            <DialogFooter className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addCollege}>Add College</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for a college..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* College Table */}
      <div className="border rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-16 text-center">#</TableHead>
              <TableHead>College Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredColleges.length > 0 ? (
              filteredColleges.map((college, index) => (
                <TableRow key={index} className="hover:bg-gray-50 transition">
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>{college.name}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="text-center py-4 text-gray-500"
                >
                  No colleges found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
