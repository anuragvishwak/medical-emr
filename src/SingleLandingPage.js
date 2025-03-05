import React, { useState } from "react";
import img1 from "./ANUEMR.png";
import Login from "./Login.js";
import { MdDocumentScanner } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaClock, FaRegClock, FaTimesCircle, FaUsers } from "react-icons/fa";
import { GoGraph } from "react-icons/go";

function SingleLandingPage() {
  const [openingLogin, setopeningLogin] = useState(false);

  return (
    <div className="">
      <div className="flex items-center fixed top-0 w-full bg-white shadow p-3 justify-between">
        <img className="h-6" src={img1} />

        <button
          onClick={() => {
            setopeningLogin(true);
          }}
          className="bg-[#34b1ff] ml-16 py-1 px-4 rounded-full text-white"
        >
          Explore
        </button>
      </div>

      <div className="bg-gradient-to-r from-white to-[#e3f5ff] mt-14 px-7 sm:px-12 py-16 sm:py-32">
        <p className="bg-[#d2eeff] w-60 text-center py-1.5 rounded-lg font-semibold text-[#34b1ff]">
          ANURAG'S EMR SOLUTIONS
        </p>
        <p className="text-[#34b1ff] font-bold text-3xl sm:text-5xl">
          Streamline Your Medical Practice with MediCare EMR
        </p>
        <p className="text-[#333333] sm:text-xl font-semibold sm:w-5/12 mt-8">
          A comprehensive electronic medical records system designed by
          healthcare professionals for healthcare professionals.
        </p>
      </div>

      <div className="p-5 my-10 sm:p-0">
        <p className="text-[#34b1ff] text-center text-2xl sm:text-4xl font-bold">
          Everything you need to manage patient care.
        </p>
        <p className="text-[#333333] font-semibold text-sm sm:text-base text-center">
          Our comprehensive EMR system is designed to streamline your workflow
          and improve patient outcomes.
        </p>

        <div className="grid mt-5 grid-cols-1 sm:grid-cols-4 sm:mx-10 gap-5">
          <div className="flex shadow-lg border border-gray-300 p-3 rounded items-center">
            <IoDocumentTextOutline
              size={50}
              className="text-[#34b1ff] bg-[#e3f5ff] p-1 rounded"
            />
            <div className="ml-2">
              <p className="text-lg text-[#333333] font-bold">
                Electronic Health Records
              </p>
              <p className="text-gray-400">
                Securely store and access patient records from anywhere,
                anytime.
              </p>
            </div>
          </div>

          <div className="flex shadow-lg border border-gray-300 p-3 rounded items-center">
            <FaUsers
              size={50}
              className="text-[#34b1ff] bg-[#e3f5ff] p-1 rounded"
            />
            <div className="ml-2">
              <p className="text-lg text-[#333333] font-bold">Patient Portal</p>
              <p className="text-gray-400">
                Empower patients with secure access to their health information.
              </p>
            </div>
          </div>

          <div className="flex shadow-lg border border-gray-300 p-3 rounded items-center">
            <FaRegClock
              size={50}
              className="text-[#34b1ff] bg-[#e3f5ff] p-1 rounded"
            />
            <div className="ml-2">
              <p className="text-lg text-[#333333] font-bold">
                Appointment Scheduling
              </p>
              <p className="text-gray-400">
                Efficiently manage appointments and reduce no-shows.
              </p>
            </div>
          </div>

          <div className="flex shadow-lg border border-gray-300 p-3 rounded items-center">
            <GoGraph
              size={50}
              className="text-[#34b1ff] bg-[#e3f5ff] p-1 rounded"
            />
            <div className="ml-2">
              <p className="text-lg text-[#333333] font-bold">
                Analytics & Reporting
              </p>
              <p className="text-gray-400">
                Gain insights into your practice with comprehensive reporting.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-10 bg-[#e3f5ff] my-20">
        <div>
          <p className="text-[#34b1ff] text-center text-4xl font-bold">
            Designed for every healthcare role.
          </p>
          <p className="text-[#333333] font-semibold text-center">
            See how MediCare EMR benefits different members of your healthcare
            team.
          </p>
        </div>
        <div>
          <button></button>
        </div>
      </div>
      {openingLogin && <Login setopeningLogin={setopeningLogin} />}
    </div>
  );
}

export default SingleLandingPage;
