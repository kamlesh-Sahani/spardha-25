"use client";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";

interface CollegePoints {
  college: string;
  points: number;
  event: string;
}

const SportsPointsPage = () => {
  const [data, setData] = useState<CollegePoints[]>([]);
  const [filteredData, setFilteredData] = useState<CollegePoints[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [eventOptions, setEventOptions] = useState<any[]>([]);
  const [collegeOptions, setCollegeOptions] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-result");
        const result = await response.json();
        console.log("Data:", result);
        setData(result);
        setFilteredData(result);

        const uniqueEvents = Array.from(
          new Set(result.map((item: CollegePoints) => item.event))
        );
        setEventOptions(
          uniqueEvents.map((event) => ({ value: event, label: event }))
        );

        const uniqueColleges = Array.from(
          new Set(result.map((item: CollegePoints) => item.college))
        );
        setCollegeOptions(
          uniqueColleges.map((college) => ({ value: college, label: college }))
        );
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = data;
    if (selectedEvent) {
      filtered = filtered.filter((item) => item.event === selectedEvent);
    }
    if (selectedCollege) {
      filtered = filtered.filter((item) => item.college === selectedCollege);
    }
    setFilteredData(filtered);
  }, [selectedEvent, selectedCollege, data]);

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Sports Points Leaderboard
      </h2>

      <div className="mb-4 flex gap-4">
        <ReactSelect
          options={eventOptions}
          placeholder="Filter by Event"
          isClearable
          onChange={(option) => setSelectedEvent(option ? option.value : null)}
        />
        <ReactSelect
          options={collegeOptions}
          placeholder="Filter by College"
          isClearable
          onChange={(option) =>
            setSelectedCollege(option ? option.value : null)
          }
        />
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Rank</th>
              <th className="border p-2">College</th>
              <th className="border p-2">Event</th>
              <th className="border p-2">Total Points</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((college, index) => (
              <tr
                key={`${college.college}-${college.event}`}
                className="text-center"
              >
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{college.college}</td>
                <td className="border p-2">{college.event}</td>
                <td className="border p-2 font-bold">{college.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SportsPointsPage;
