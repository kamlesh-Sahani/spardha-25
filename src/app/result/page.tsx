
"use client";
import React, { useEffect, useRef, useState } from "react";
import { sportsData } from "@/data/AllEventData";
import { allColleges } from "@/app/action/college.action";
// import { addSportsPoints } from "../action/result.actions";
import { default as ReactSelect } from "react-select";

interface TeamDetails {
  college: string;
  points: string;
}

interface FormData {
  event: string;
  winner: TeamDetails;
  runnerUp: TeamDetails;
}

const initialFormData: FormData = {
  event: "",
  winner: { college: "", points: "" },
  runnerUp: { college: "", points: "" },
};

const SportsPoints: React.FC = () => {
  const [eventOptions, setEventOptions] = useState<any[]>([]);
  const [collegeOptions, setCollegeOptions] = useState<any[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setEventOptions(
      sportsData?.map((event) => ({
        value: event.sport,
        label: event.sport,
      })) || []
    );
  }, []);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await allColleges();
        const collegeRes = JSON.parse(res.colleges!);
        setCollegeOptions(
          collegeRes?.map((college: { name: string }) => ({
            value: college.name,
            label: college.name,
          })) || []
        );
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    fetchColleges();
  }, []);

  const handleChange = (name: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleWinnerChange = (name: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      winner: {
        ...prevData.winner,
        [name]: name === "points" ? Number(value) : value,
      },
    }));
  };

  const handleRunnerUpChange = (name: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      runnerUp: {
        ...prevData.runnerUp,
        [name]: name === "points" ? Number(value) : value,
      },
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("/api/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response:", data);
      setMessage(data.message || "Sports points updated successfully!");
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-center mb-4">
          Add Sports Points
        </h2>
        <div className="mb-4">
          <label className="text-gray-700 text-lg mb-2">Select Event</label>
          <ReactSelect
            name="event"
            value={eventOptions.find((opt) => opt.value === formData.event)}
            onChange={(selectedOption) =>
              handleChange("event", selectedOption?.value || "")
            }
            options={eventOptions}
            placeholder="Select Event"
          />
        </div>
        <div className="border p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2">Winner</h3>
          <label className="block mb-1">College:</label>
          <ReactSelect
            value={collegeOptions.find(
              (opt) => opt.value === formData.winner.college
            )}
            onChange={(selectedOption) =>
              handleWinnerChange("college", selectedOption?.value || "")
            }
            options={collegeOptions}
            placeholder="Select College"
          />
          <label className="block">Points:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.winner.points}
            onChange={(e) =>
              handleWinnerChange("points", Number(e.target.value))
            }
          />
        </div>
        <div className="border p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2">Runner-Up</h3>
          <label className="block mb-1">College:</label>
          <ReactSelect
            value={collegeOptions.find(
              (opt) => opt.value === formData.runnerUp.college
            )}
            onChange={(selectedOption) =>
              handleRunnerUpChange("college", selectedOption?.value || "")
            }
            options={collegeOptions}
            placeholder="Select College"
          />

          <label className="block">Points:</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.runnerUp.points}
            onChange={(e) =>
              handleRunnerUpChange("points", Number(e.target.value))
            }
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {message && (
          <p
            className={`text-center mt-4 ${
              message.includes("Error") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SportsPoints;
