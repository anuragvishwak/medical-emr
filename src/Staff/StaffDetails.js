import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendar,
  FaClock,
  FaPlus,
  FaRupeeSign,
  FaUser,
} from "react-icons/fa";
import AddStaff from "./AddStaff";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfig";
import { BiCalendarEvent, BiMedal, BiMoney, BiPhone } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

function StaffDetails() {
  const [openingAddStaffForm, setopeningAddStaffForm] = useState(false);
  const [currentSubTab, setcurrentSubTab] = useState("doctor");
  const [gatheringStaffDetails, setgatheringStaffDetails] = useState([]);
  const [capturingStaffId, setcapturingStaffId] = useState(null);

  async function renderingStaffDetails() {
    const appointmentDetails = await getDocs(
      collection(database, "staff_details")
    );
    let multipleArray = appointmentDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setgatheringStaffDetails(multipleArray);
  }

  useEffect(() => {
    renderingStaffDetails();
  }, []);

  return (
    <div className="bg-[#eff7ff] sm:flex w-full min-h-screen h-full">
      <div className="flex bg-white border border-gray-300 sm:bg-none p-2 shadow sm:p-0 items-center">
        <Navbar />
        <div className="flex  items-center sm:hidden">
          <input
            placeholder="Search Staffs"
            className="border border-gray-300 rounded p-1 ml-2"
          />
          <button
            onClick={() => setopeningAddStaffForm(true)}
            className="bg-[#715AFF] ml-2 text-white font-bold text-sm sm:text-base py-1 px-2 sm:px-4 rounded"
          >
            <div className="flex items-center">
              <FaPlus className="mr-1" />
              Add Staff
            </div>
          </button>
        </div>
      </div>
      <div className="w-full ">
        <div className="sm:flex hidden  bg-white shadow p-3 items-end  justify-between">
          <div>
            <p className="text-xl text-[#715AFF] hidden sm:block sm:text-3xl font-semibold">
              Staff Details
            </p>
          </div>
          <div>
            <input
              placeholder="Search Staffs"
              className="border border-gray-300 rounded p-1.5"
            />
            <button
              onClick={() => setopeningAddStaffForm(true)}
              className="bg-[#715AFF] ml-2 mt-2 sm:mt-0 text-white font-bold text-sm sm:text-base 
              py-1.5 px-2 sm:px-4 rounded"
            >
              <div className="flex items-center">
                <FaPlus className="mr-1" />
                Add Staff
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3 sm:p-4">
          {gatheringStaffDetails.map((staff) => (
            <div key={staff.id} className="shadow-md border bg-white">
              <div className="p-3">
                <div className="">
                  <div className="flex items-center justify-between">
                    <p className="sm:text-lg text-[#715AFF] font-bold">
                      {staff.name}
                    </p>
                    <div className="sm:py flex items-center">
                      <p className="font-bold text-pink-500 bg-pink-50 py-1 px-4 text-sm sm:text-base rounded mr-3">
                        {staff.role}
                      </p>
                      <p
                        className={`font-semibold py-1 px-4 text-sm sm:text-base rounded ${
                          staff.workStatus === "Active"
                            ? "bg-green-100 text-green-500"
                            : "text-red-500 bg-red-100"
                        }`}
                      >
                        {staff.workStatus}
                      </p>
                    </div>
                  </div>
                  <div className="font-semibold flex items-center text-sm sm:text-base mt-2  text-[#102E4A]">
                    <p className="">{staff.qualification}</p>
                    <span className="mx-1">|</span>
                    <p className="">{staff.specialization}</p>
                    <span className="mx-1">|</span>
                    <p className="">{staff.department}</p>
                  </div>
                </div>

                <AnimatePresence>
                  {capturingStaffId === staff.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <hr className="my-2" />
                      <div className="">
                        {/* Personal Information */}
                        <div>
                          <p className="text-xl text-[#333333] font-bold">
                            Personal Information
                          </p>
                          <div className="flex items-center">
                            <FaUser className="text-gray-500" />
                            <p className="text-gray-500">Gender:</p>
                            <p className="text-[#333333] ml-2 font-semibold capitalize">
                              {staff.gender}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <BiCalendarEvent className="text-gray-500" />
                            <p className="text-gray-500">Date of Birth:</p>
                            <p className="text-[#333333] ml-2 font-semibold">
                              {staff.dob}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <MdEmail className="text-gray-500" />
                            <p className="text-gray-500">Email:</p>
                            <p className="text-[#333333] ml-2 font-semibold">
                              {staff.email}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <BiPhone className="text-gray-500" />
                            <p className="text-gray-500">Phone No:</p>
                            <p className="text-[#333333] ml-2 font-semibold">
                              +91 {staff.phoneNo}
                            </p>
                          </div>
                        </div>

                        {/* Professional Information */}
                        <div className="mt-5">
                          <p className="text-xl text-[#333333] font-bold">
                            Professional Information
                          </p>
                          <div className="flex items-center">
                            <BiMedal className="text-gray-500" />
                            <p className="text-gray-500">Experience:</p>
                            <p className="text-[#333333] ml-2 font-semibold">
                              {staff.yearOfExperience} yrs
                            </p>
                          </div>
                          <div className="flex items-center">
                            <FaClock className="text-gray-500" />
                            <p className="text-gray-500">Shift:</p>
                            <p className="text-[#333333] ml-2 font-semibold">
                              {staff.shiftTiming}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <FaRupeeSign className="text-gray-500" />
                            <p className="text-gray-500">Income:</p>
                            <p className="text-[#333333] ml-2 font-semibold">
                              {staff.salaryAmount}/-
                            </p>
                          </div>
                          <div className="flex items-center">
                            <FaCalendar className="text-gray-500" />
                            <p className="text-gray-500">Joined:</p>
                            <p className="text-[#333333] ml-2 font-semibold">
                              {staff.dateOfJoining}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center bg-[#715AFF] mt-5 p-2 justify-between">
                <p className="font-bold text-white">{staff.medicalLicenseNo}</p>
                <button
                  onClick={() =>
                    setcapturingStaffId(
                      capturingStaffId === staff.id ? null : staff.id
                    )
                  }
                  className="bg-[#102E4A] sm:mt-0 text-white font-bold text-sm py-1 px-2 sm:px-4 "
                >
                  {capturingStaffId === staff.id ? "Close" : "View More"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {openingAddStaffForm && (
        <AddStaff setopeningAddStaffForm={setopeningAddStaffForm} />
      )}
    </div>
  );
}

export default StaffDetails;
