"use client";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import * as XLSX from "xlsx";
import { Download, UserX } from "lucide-react";

interface Participant {
  id: string;
  fullname: string;
  isVerified: boolean;
  isPresent: boolean;
  enrollment: string;
  semester: string;
  course: string;
  eventId: string;
  phone: string;
  email: string;
  event: string;
  teamMemberName: string;
  transaction: string;
  teamName: string;
  universityName: string;
  collegeName: string;
}
const ParticipantsList: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<
    Participant[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("present");



  useEffect(() => {
    let filtered = participants;
    if (filter === "present") {
      filtered = participants.filter((p) => p.isPresent);
    } else if (filter === "absent") {
      filtered = participants.filter((p) => !p.isPresent);
    }
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.fullname.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredParticipants(filtered);
  }, [searchQuery, filter, participants]);
  const exportToExcel = () => {
    const verifiedParticipants = participants
      .filter((participant) => participant.isVerified && participant.isPresent)
      .map(
        ({
          fullname,
          universityName,
          collegeName,
          enrollment,
          semester,
          course,
          phone,
          email,
          event,
        }) => ({
          Name: fullname,
          University: universityName,
          College: collegeName,
          Enrollment: enrollment,
          Semester: semester,
          Course: course,
          "Phone No.": phone,
          Email: email,
          Event: event,
        })
      );

    if (verifiedParticipants.length === 0) {
      alert("No verified participants to export.");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(verifiedParticipants);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Verified Participants");
    XLSX.writeFile(workbook, `VerifiedParticipants.xlsx`);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] h-screen">
        <Bars height="80" width="80" color="#3B82F6" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (filteredParticipants.length === 0) {
    return (
      <div className="flex items-center bg-white dark:bg-gray-900 justify-center min-h-screen text-red-500">
        No participant found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 shadow-lg shadow-white p-4 sm:p-8">
      <div className="mx-auto max-w-7xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Participants</h1>
              <p className="text-sm text-gray-500 mt-1">
                {filteredParticipants.length} total entries
              </p>
            </div>

            <div className="flex max-sm:flex-col w-full justify-center gap-4">
              <input
                type="text"
                placeholder="Search by name..."
                className="px-4 py-2 border rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="px-4 py-2 border rounded-lg"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="all">All</option>
              </select>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={exportToExcel}
                className="flex justify-center items-center  w-40 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                <Download className="w-5 h-5" />
                <span className="text-sm font-medium">Export CSV</span>
              </button>
            </div>
          </div>

          <div className="border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-800 ">
                  <tr>
                    {[
                      "Name",
                      "Enrollment",
                      "Sem",
                      "Course",
                      "Phone",
                      "Event",
                      "College",
                      "Attendance",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3.5 text-left text-sm font-semibold dark:text-gray-100 text-gray-900"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-700">
                  {filteredParticipants.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-4 py-6 text-center">
                        <div className="flex flex-col items-center p-8 text-gray-400 dark:text-gray-100">
                          <UserX className="w-12 h-12 mb-4" />
                          <p className="text-lg font-medium">
                            No participants found
                          </p>
                          <p className="text-sm mt-1">
                            All entries will appear here
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredParticipants.map((participant) => (
                      <tr
                        key={participant.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-gray-100 transition-colors"
                      >
                        <td className="px-4 py-3.5 text-sm">
                          {participant.fullname}
                        </td>
                        <td className="px-4 py-3.5 text-sm">
                          {participant.enrollment}
                        </td>
                        <td className="px-4 py-3.5 text-sm">
                          {participant.semester}
                        </td>
                        <td className="px-4 py-3.5 text-sm">
                          {participant.course}
                        </td>
                        <td className="px-4 py-3.5 text-sm">
                          {participant.phone}
                        </td>
                        <td className="px-4 py-3.5 text-sm">
                          {participant.event}
                        </td>
                        <td className="px-4 py-3.5 text-sm">
                          {participant.collegeName}
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              participant.isPresent
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {participant.isPresent ? "Present" : "Absent"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsList;

