"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import Modal from "@/components/ProfileModel";
import toast from "react-hot-toast";
export default function Home() {
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const getProfile = async (pass: string) => {
    try {
      setShowModal(false);
      setLoading(true);
      const { data } = await axios.get(`/api/profile?pass=${pass}`);
      setProfile(data.profile); 
    } catch (error: any) {
      setShowModal(true);
      toast.error(error?.response?.data?.message || "Password is wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const pass = searchParams.get("pass");
    if (!pass) {
      setShowModal(true);
    } else {
      getProfile(pass);
    }
  }, []);

  const handlePasswordSubmit = (password: string) => {
    getProfile(password);
  };



  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Team Info */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800">Team Profile</h1>
              <p className="text-lg text-gray-600 mt-2">
                Event: {profile?.event}
              </p>
              <p className="text-md text-gray-500">{profile?.college}</p>
            </div>

            {/* Team & Players Section */}
            <div className="bg-white shadow rounded-xl p-6 sm:p-8 mb-3">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Team Members
              </h2>
              <div className="grid gap-6 md:gap-8 max-h-[400px] overflow-y-auto">
                {profile?.players?.map((player: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 md:gap-6 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white shadow">
                        <img
                          src={player.playerIdCard}
                          alt={`${player.name}'s ID`}
                          className="w-full h-full object-cover"
                         
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {" "}
                          {player.gender == "male" ? "Mr. " : "Ms. "}{" "}
                          {player.name}
                        </h3>
                        {player.isCaptain && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Captain
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="truncate">email: {player.email}</p>
                        <p>Phone: {player.mobile}</p>
                        <p>Gender: {player.gender}</p>
                        <p>Enrollment: {player.enrollment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white shadow rounded-xl p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Payment Details
              </h2>
              <div className="flex flex-col justify-between items-center gap-2 ">
                <div className="flex gap-1">
                  <p className="text-sm font-medium text-gray-500">
                    Transaction ID
                  </p>
                  <p className="font-mono text-gray-900 break-all">
                    {profile?.transactionId}
                  </p>
                </div>
                <p className="text-md text-gray-600">Transaction Screenshot:</p>

                <img
                  src={profile?.transactionSs}
                  alt="Transaction Screenshot"
                  className="w-[400px] h-[400px]  object-contain rounded "
                />
              </div>
            </div>

            {/* Status & Reason */}
            <div className="mt-12 bg-white shadow-xl rounded-lg p-6  ">
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                Status
              </h2>
              <div className="flex items-center gap-2">
                {
                  profile?.status==="pending"? <p className="text-lg text-yellow-600 font-semibold">
                  {profile?.status}
                </p>:profile?.status==="rejecred"?<p className="text-lg text-red-600 font-semibold">
                  {profile?.status}
                </p>:<p className="text-lg text-green-600 font-semibold">
                  {profile?.status}
                </p>
                }
             
              <p className="text-md text-gray-600 font-semibold">
                - {profile?.reason}
              </p>
              </div>
              
            </div>
          </div>
        </div>
      )}

      {/* Modal for Password */}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSubmit={handlePasswordSubmit}
        />
      )}
    </>
  );
}
