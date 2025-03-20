import React, { useState } from "react";
import Navbar from "../Navbar";
import { FaPlus } from "react-icons/fa";
import FiltersSearchbars from "./FiltersSearchbars";

function ConsultationPrescriptionSection() {
  const [currentTab, setcurrentTab] = useState("consultation");

  return (
    <div className="sm:flex w-full min-h-screen h-full">
      <div>
        <Navbar />
      </div>
      <div className="w-full">
        <div className=" hidden sm:block p-3 w-full">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl text-[#715AFF] hidden sm:block sm:text-3xl font-semibold">
                Consultation & Prescription
              </p>
            </div>
            <div className="flex text-sm items-center">
              <div className="flex items-center p-1 bg-gray-100 shadow-inner border rounded">
                <button
                  className={`text-[#102E4A] rounded px-2 py-1 ${currentTab === "consultation" ? "bg-white shadow" : ""}`}
                  onClick={() => {
                    setcurrentTab("consultation");
                  }}
                >
                  Consultation
                </button>
                <button
                 className={`text-[#102E4A] rounded px-2 py-1 ${currentTab === "prescription" ? "bg-white shadow" : ""}`}
                  onClick={() => {
                    setcurrentTab("prescription");
                  }}
                >
                  Prescription
                </button>
              </div>
              <button
                //   onClick={() => setopeningAddStaffForm(true)}
                className="bg-[#715AFF] ml-2 mt-2 sm:mt-0 text-white font-bold text-sm sm:text-base 
                          py-1.5 px-2 sm:px-6 rounded"
              >
                <div className="flex items-center">
                  <FaPlus className="mr-1" />
                  Add Staff
                </div>
              </button>
            </div>
          </div>

          <div className="py-3">
            <FiltersSearchbars />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultationPrescriptionSection;
