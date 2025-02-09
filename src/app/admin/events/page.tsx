"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // Import Switch component
import { allEvents } from "@/app/action/event.action";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Loader from "@/components/Loader";

interface Event {
  _id: number;
  name: string;
  type: string;
  hovername: string;
  fee: string;
  image: string;
  cashReward: {
    winner: string;
    runnerUp: string;
  };
  coordinators: { name: string; phone: string }[];
  rules: string[];
  description?: string;
  status: "Active" | "Disabled";
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading,setLoading]=useState<boolean>(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await allEvents();
      setEvents(JSON.parse(res.events!));
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const toggleStatus = (id: number) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event._id === id
          ? {
              ...event,
              status: event.status === "Active" ? "Disabled" : "Active",
            }
          : event
      )
    );
  };

  const openEventModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
   <>
   {
    loading?<Loader />: <div className="p-6 bg-gray-100">
    <h1 className="text-2xl font-bold mb-6">Event Management</h1>

    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
          <TableHead>ID</TableHead>
            <TableHead>Event Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Winner Cash Reward</TableHead>
            <TableHead>Runner-Up Cash Reward</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event,index) => (
            <TableRow key={event._id}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.type}</TableCell>
              <TableCell>{event.fee}</TableCell>
              <TableCell>{event.cashReward.winner}</TableCell>
              <TableCell>{event.cashReward.runnerUp}</TableCell>
              <TableCell>
                <Switch
                  checked={event.status === "Active"}
                  onCheckedChange={() => toggleStatus(event._id)}
                />
                <span
                  className={`ml-2 font-medium ${
                    event.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {event.status}
                </span>
              </TableCell>
              <TableCell>
                <Button onClick={() => openEventModal(event)}>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* Event Details Modal */}
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-[70vw] max-sm:max-w-[90vw] rounded z-[110]">
        <DialogHeader>
          <DialogTitle>{selectedEvent?.name}</DialogTitle>
          <DialogDescription>{selectedEvent?.hovername}</DialogDescription>
        </DialogHeader>
        <div className="mb-4">
          <h3 className="font-semibold">Coordinators:</h3>
          <ul>
            {selectedEvent?.coordinators.map((coordinator, index) => (
              <li key={index}>
                {coordinator.name} - {coordinator.phone}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Rules:</h3>
          <ul className="list-disc list-inside">
            {selectedEvent?.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  </div>
   }
   </>
  );
}
