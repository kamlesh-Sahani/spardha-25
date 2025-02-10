// "use client";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Loader from "@/components/Loader";
// import Modal from "@/components/ProfileModel";
// import toast from "react-hot-toast";

// export default function Home() {
//   const searchParams = useSearchParams();
//   const [profile, setProfile] = useState<any>();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [pass, setPass] = useState<string>("");
//   const [showModal, setShowModal] = useState<boolean>(false);

//   const getProfile = async (pass: string) => {
//     try {
//       setShowModal(false);
//       setLoading(true);
//       const { data } = await axios.get(`/api/profile?pass=${pass}`);
    
//       setProfile(data.profile);
//     } catch (error: any) {
//       setShowModal(true);
//       toast.error(error?.response?.data?.message || "Password is wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const pass = searchParams.get("pass");
//     if (!pass) {
//       setShowModal(true);
//     } else {
//       getProfile(pass);
//     }
//   }, []);

//   const handlePasswordSubmit = (password: string) => {
//     setPass(password);
//     getProfile(password);
//   };

//   useEffect(() => {
//     if (!profile) {
//       setShowModal(true);
//     }
//   }, [profile]);
//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Team Info */}
//             <div className="text-center mb-12">
//               <h1 className="text-4xl font-bold text-gray-800">Team Profile</h1>
//               <p className="text-lg text-gray-600 mt-2">
//                 Event: {profile?.event}
//               </p>
//               <p className="text-md text-gray-500">{profile?.college}</p>
//             </div>

//             {/* Team & Players Section */}
//             <div className="bg-white shadow-xl rounded-lg p-6">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//                 Team Details
//               </h2>

//               <div className="space-y-6">
//                 {/* Player Details */}
//                 {profile?.players.map((player: any, index: number) => (
//                   <div
//                     key={index}
//                     className="flex items-center space-x-4 border-b pb-4"
//                   >
//                     <div className="relative w-24 h-24 rounded-full overflow-hidden">
//                       <img
//                         src={player.playerIdCard}
//                         alt={`ID Card of ${player.name}`}
//                       />
//                     </div>
//                     <div>
//                       <p className="text-xl font-semibold text-gray-800">
//                         {player.gender=="Male"?"Mr. ":"Mrs. "}{player.name}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Gender: {player.gender}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Mobile: {player.mobile}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Email: {player.email}
//                       </p>
//                       {player.isCaptain && (
//                         <p className="text-sm text-green-600 font-bold mt-2">
//                           Captain
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Transaction Info */}
//             <div className="mt-12 bg-white shadow-xl rounded-lg p-6 flex justify-between   max-sm:flex-col">
//               <div>
//               <h2 className="text-2xl font-semibold text-gray-800 mb-1">
//                 Transaction Details
//               </h2>
//               <p className="text-md text-gray-600">
//                 Transaction ID: {profile?.transactionId}
//               </p>
//               </div>
            
//               <div className="mt-3  flex max-sm:flex-col">
//                 <p className="text-md text-gray-600">Transaction Screenshot:</p>
//                 <div className="w-full h-64 mt-2 relative">
//                   <img
//                     src={profile?.transactionSs}
//                     alt="Transaction Screenshot"
//                     className="w-full sm:w-[400px] object-cover"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Status & Reason */}
//             <div className="mt-12 bg-white shadow-xl rounded-lg p-6  ">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-1">
//                 Status
//               </h2>
//               <div className="flex items-center gap-2">
//                 {
//                   profile?.status==="pending"? <p className="text-lg text-yellow-600 font-semibold">
//                   {profile?.status}
//                 </p>:profile?.status==="rejecred"?<p className="text-lg text-red-600 font-semibold">
//                   {profile?.status}
//                 </p>:<p className="text-lg text-green-600 font-semibold">
//                   {profile?.status}
//                 </p>
//                 }
             
//               <p className="text-md text-gray-600 font-semibold">
//                 - {profile?.reason}
//               </p>
//               </div>
              
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal for Password */}
//       {showModal && (
//         <Modal
//           onClose={() => setShowModal(false)}
//           onSubmit={handlePasswordSubmit}
//         />
//       )}
//     </>
//   );
// }
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import Modal from "@/components/ProfileModel";
import toast from "react-hot-toast";

interface Player {
  name: string;
  gender: "Male" | "Female";
  mobile: string;
  email: string;
  playerIdCard: string;
  isCaptain: boolean;
}

interface ProfileData {
  event: string;
  college: string;
  players: Player[];
  transactionId: string;
  transactionSs: string;
  status: "pending" | "approved" | "rejected";
  reason?: string;
}

export default function Home() {
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getProfile = useCallback(async (password: string) => {
    try {
      setShowModal(false);
      setLoading(true);
      const { data } = await axios.get<{ profile: ProfileData }>(
        `/api/profile?pass=${encodeURIComponent(password)}`
      );
      
      if (!data?.profile) {
        throw new Error("Invalid profile data");
      }

      setProfile(data.profile);
    } catch (error: any) {
      setShowModal(true);
      toast.error(error?.response?.data?.message || "Invalid credentials");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const password = searchParams.get("pass");
    if (!password) {
      setShowModal(true);
    } else {
      getProfile(password);
    }
  }, [searchParams, getProfile]);

  const handlePasswordSubmit = (password: string) => {
    getProfile(password);
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Team Info */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">Team Profile</h1>
            <p className="text-lg text-gray-600 mt-2">
              Event: {profile?.event || "N/A"}
            </p>
            <p className="text-md text-gray-500">{profile?.college || "N/A"}</p>
          </div>

          {/* Team & Players Section */}
          <div className="bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Team Details
            </h2>

            <div className="space-y-6">
              {profile?.players.map((player, index) => (
                <div
                  key={`player-${index}`}
                  className="flex items-center space-x-4 border-b pb-4"
                >
                  <div className="relative w-24 h-24 rounded-full overflow-hidden">
                    <img
                      src={player.playerIdCard}
                      alt={`${player.name}'s ID card`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      {player.gender === "Male" ? "Mr." : "Ms."} {player.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Gender: {player.gender}
                    </p>
                    <p className="text-sm text-gray-600">
                      Mobile: {player.mobile}
                    </p>
                    <p className="text-sm text-gray-600">
                      Email: {player.email}
                    </p>
                    {player.isCaptain && (
                      <span className="inline-block mt-2 px-2 py-1 text-xs font-bold text-green-700 bg-green-100 rounded">
                        Captain
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Info */}
          <div className="mt-12 bg-white shadow-xl rounded-lg p-6 grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Transaction Details
              </h2>
              <p className="text-md text-gray-600 break-all">
                Transaction ID: {profile?.transactionId || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-md text-gray-600 mb-2">
                Transaction Screenshot:
              </p>
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {profile?.transactionSs && (
                  <img
                    src={profile.transactionSs}
                    alt="Transaction proof"
                    className="object-contain w-full h-full"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Status & Reason */}
          <div className="mt-12 bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Application Status
            </h2>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  profile?.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : profile?.status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {profile?.status?.toUpperCase() || "UNKNOWN"}
              </span>
              {profile?.reason && (
                <p className="text-gray-600 text-sm">{profile.reason}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSubmit={handlePasswordSubmit}
        />
      )}
    </>
  );
}