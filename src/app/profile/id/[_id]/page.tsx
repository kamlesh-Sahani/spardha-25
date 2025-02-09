"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { getTeam } from "@/app/action/team.action";

export default function Home() {
const pathname= usePathname();
  const [profile, setProfile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const getProfile = async (_id: string) => {
    try {
      setLoading(true);
      const res = await getTeam(_id);
      console.log(res);
      setProfile(JSON.parse(res.team!));
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const _id = pathname.split("/").at(-1);
    console.log(_id)
    if(_id){
        getProfile(_id);
    }else{

    }
  }, []);

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
            <div className="bg-white shadow-xl rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Team Details
              </h2>

              <div className="space-y-6">
                {/* Player Details */}
                {profile?.players.map((player: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 border-b pb-4"
                  >
                    <div className="relative w-24 h-24 rounded-full overflow-hidden">
                      <img
                        src={player.playerIdCard}
                        alt={`ID Card of ${player.name}`}
                      />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-gray-800">
                        {player.gender=="Male"?"Mr. ":"Mrs. "}{player.name}
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
                        <p className="text-sm text-green-600 font-bold mt-2">
                          Captain
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction Info */}
            <div className="mt-12 bg-white shadow-xl rounded-lg p-6 flex justify-between">
              <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                Transaction Details
              </h2>
              <p className="text-md text-gray-600">
                Transaction ID: {profile?.transactionId}
              </p>
              </div>
            
              <div className="mt-3">
                <p className="text-md text-gray-600">Transaction Screenshot:</p>
                <div className="w-full h-64 mt-2 relative">
                  <img
                    src={profile?.transactionSs}
                    alt="Transaction Screenshot"
                    className="w-[400px] object-cover"
                  />
                </div>
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

   
    </>
  );
}
