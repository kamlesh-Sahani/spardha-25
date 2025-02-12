"use client";
import React, { useState } from "react";
import { List, Grid } from "lucide-react";

const Download = () => {
  const files = [
    {
      title: "Events and Registration",
      link: "https://drive.google.com/file/d/1KQOfXtS_vfpBgPdecSULtZWSHD3K1sKw/view?usp=sharing",
    },
    {
      title: "Trophy of Tournament Weightage and Reward List",
      link: "https://drive.google.com/file/d/1vy3Fib-Imm0_9NF5phugHc1xvTfYkW3t/view?usp=sharing",
    },
    {
      title: "SPARDHA’25 Rule Book",
      link: "https://drive.google.com/file/d/1UxO_QECcMFfghJL4i0vjO7PrAhkRh7d6/view?usp=sharing",
    },
    {
      title: "SPARDHA’25 General Instructions and Guidelines",
      link: "https://drive.google.com/file/d/1zmsZpU6Wprw6k8Mio2wP3qhLhW9rzMI8/view?usp=sharing",
    },
    {
      title: "Arm Wrestling Rulebook",
      link: "https://drive.google.com/file/d/1emn_g_YcBWCv2rBN4xiciJWcnIgOj_q5/view?usp=drive_link",
    },
    {
      title: "Badminton Rulebook",
      link: "https://drive.google.com/file/d/1WM9-ibbkoOfWZ3PswaMmfweSStxxVdHt/view?usp=drive_link",
    },
    {
      title: "Basketball Rulebook",
      link: "https://drive.google.com/file/d/1WSS8Y1LIyLzAcMbPmDNwnNdX8Tt3_q6E/view?usp=drive_link",
    },
    {
      title: "Bodybuilding Rulebook",
      link: "https://drive.google.com/file/d/1DE5ytozgHLJnVGN1DHGih30sExJlORer/view?usp=drive_link",
    },
    {
      title: "Chess Rulebook",
      link: "https://drive.google.com/file/d/1quP7dpahKPCJIQC6czOXyt5z5A4YG4i0/view?usp=drive_link",
    },
    {
      title: "Football Rulebook",
      link: "https://drive.google.com/file/d/154cG0vO46cnxeAvFxJgpW4KmQuIG8Ko7/view?usp=drive_link",
    },
    {
      title: "Kabaddi Rulebook",
      link: "https://drive.google.com/file/d/1AyE2okQHcRQ8Wt22s-FTBpoPt0MD-Ni-/view?usp=drive_link",
    },
    {
      title: "Table Tennis Rulebook",
      link: "https://drive.google.com/file/d/1Y1gHC2qGlVpcru53eOyOo4RNGTvZZRW4/view?usp=drive_link",
    },
    {
      title: "Tug of War Rulebook",
      link: "https://drive.google.com/file/d/1_6NvpOvaAYoeMEghcZreeY2vUi7ZbllY/view?usp=drive_link",
    },
    {
      title: "Volleyball Rulebook",
      link: "https://drive.google.com/file/d/1gVRkCKIXMszoqqQKVVfl7DIqRTyqlyMA/view?usp=drive_link",
    },
    {
      title: "College Authorization Form",
      link: "https://docs.google.com/document/d/1M-Sr-gll7GAHr5M3YOPmNnjUx82ThvZc/edit?usp=drive_link&ouid=100348752291149549951&rtpof=true&sd=true",
    },
   
  ];

  const [isListView, setIsListView] = useState(false);

  return (
    <div className="min-h-screen p-8 w-full bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">
        SPARDHA’25 Downloads
      </h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-400"
        onClick={() => setIsListView(!isListView)}
      >
        {isListView ? <Grid size={20} /> : <List size={20} />} Toggle View
      </button>

      {isListView ? (
        <div className="min-h-screen w-full p-8 bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-100 mb-6">
            SPARDHA’25 Downloads
          </h1>
          <div className="w-full max-w-2xl bg-slate-800   transition-colors duration-200 shadow-md rounded-lg p-6">
            <ul className="space-y-4">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between border-b pb-3 last:border-none"
                >
                  <span className="text-lg text-gray-100">{file.title}</span>
                  <a
                    href={file.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Tournament Documents
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {files.map((doc, index) => (
                <a
                  key={index}
                  href={doc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 bg-slate-800 rounded-lg shadow-lg hover:bg-slate-100 transition-colors duration-200"
                >
                  <h2 className="text-xl font-semibold text-sky-400 group-hover:text-emerald-400 mb-2 transition-colors duration-200">
                    {doc.title}
                  </h2>
                  <div className="mt-3 inline-flex items-center text-emerald-400 group-hover:text-sky-400 transition-colors duration-200">
                    <span className="mr-2">View Document</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Download;
