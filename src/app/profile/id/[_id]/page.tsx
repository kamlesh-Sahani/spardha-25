"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { getTeam } from "@/app/action/team.action";

export default function Home() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getProfile = async (_id: string) => {
    try {
      setLoading(true);
      const res = await getTeam(_id);
      setProfile(JSON.parse(res.team!));
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const _id = pathname.split("/").at(-1);
    if (_id) getProfile(_id);
  }, []);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = "/placeholder-user.jpg"; // Add a placeholder image in public folder
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Team Info Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {profile?.teamName || "Team Profile"}
              </h1>
              <div className="text-lg text-gray-600">
                <p>{profile?.event}</p>
                <p className="text-gray-500 text-base">{profile?.college}</p>
              </div>
            </div>

            {/* Players Grid */}
            <div className="bg-white shadow rounded-xl p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Team Members
              </h2>
              <div className="grid gap-6 md:gap-8 h-[400px] overflow-y-auto">
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
                          onError={handleImageError}
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
                        <p className="truncate">{player.email}</p>
                        <p>{player.mobile}</p>
                        <p>Gender: {player.gender}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction Details */}
            <div className="bg-white shadow rounded-xl p-6 sm:p-8 mb-2">
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

            {/* Status Card */}
            <div className="bg-white shadow rounded-xl p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Registration Status
              </h2>
              <div className="flex flex-wrap items-baseline gap-2">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    profile?.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : profile?.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {profile?.status?.toUpperCase()}
                </span>
                {profile?.reason && (
                  <p className="text-gray-600 text-sm mt-2 sm:mt-0 break-words w-full">
                    Reason: {profile.reason}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
