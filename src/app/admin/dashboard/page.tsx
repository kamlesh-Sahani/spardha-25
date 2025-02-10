"use client";
import { dashboardData } from '@/app/action/dashboard.action';
import Loader from '@/components/Loader';
import {
  ClipboardList, Users, Gamepad, IndianRupee, School,
  User, UserCheck, CheckCircle, XCircle, Clock
} from 'lucide-react';
import { useState, useEffect } from "react";

export default function Dashboard() {
  // State to store the fetched dashboard data
  const [dashboardStats, setDashboardStats] = useState({
    totalRegistration: 0,
    totalPlayer: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    male: 0,
    female: 0,
    college: 0,
    events: 0,
    totalPayment: 0
  });
  const [loading,setLoading]= useState<boolean>(false);

  useEffect(() => {
    (async function() {
      setLoading(true);
      try {
        const res = await dashboardData();
        setDashboardStats(JSON.parse(res.data!));
     
      } catch (error) {
        console.log("Error:", error);
      }finally{
        setLoading(false);
      }
    })();
  }, []);

  // Dummy stat cards with dynamic values based on fetched data
  const stats = [
    { title: 'Total Registration', value: dashboardStats.totalRegistration, icon: <ClipboardList className="w-6 h-6" /> },
    { title: 'Player Registered', value: dashboardStats.totalPlayer, icon: <Users className="w-6 h-6" /> },
    { title: 'Registrations Approved', value: dashboardStats.approved, icon: <CheckCircle className="w-6 h-6" /> },
    { title: 'Registrations Rejected', value: dashboardStats.rejected, icon: <XCircle className="w-6 h-6" /> },
    { title: 'Registrations Pending', value: dashboardStats.pending, icon: <Clock className="w-6 h-6" /> },
    { title: 'Male Registrations', value: dashboardStats.male, icon: <User className="w-6 h-6" /> },
    { title: 'Female Registrations', value: dashboardStats.female, icon: <UserCheck className="w-6 h-6" /> },
    { title: 'Colleges Participated ', value: dashboardStats.college, icon: <School className="w-6 h-6" /> },
    { title: 'Active Events', value: dashboardStats.events, icon: <Gamepad className="w-6 h-6" /> },
    { title: 'Total Payments', value: `₹ ${dashboardStats.totalPayment.toLocaleString()}`, icon: <IndianRupee className="w-6 h-6" /> },
  ];
  return (
    <>
    {
      loading ?<Loader />:<div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-full text-blue-500">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-sm text-gray-500">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    }
    </>
  );
}
