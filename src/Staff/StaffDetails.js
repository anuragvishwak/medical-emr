import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
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
import { CalendarCheck, Clock } from "lucide";
import { BiCalendarEvent, BiMedal, BiMoney, BiPhone } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

function StaffDetails() {
  const [openingAddStaffForm, setopeningAddStaffForm] = useState(false);
  const [currentSubTab, setcurrentSubTab] = useState("doctor");
  const [gatheringStaffDetails, setgatheringStaffDetails] = useState([]);

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
    <div className="flex w-full sm:flex min-h-screen h-full">
      <div>
        <Navbar />
      </div>
      <div className="w-full p-4">
        <div className="flex items-end mb-3 sm:mb-5 justify-between">
          <div>
            <p className="text-xl text-[#333333] hidden sm:block sm:text-3xl font-bold">
              Staff Details
            </p>
            <p className="text-gray-500 hidden sm:block">
              Here, you can manage patients and view their details seamlessly.
            </p>
          </div>
          <div>
            <button
              onClick={() => setopeningAddStaffForm(true)}
              className="bg-[#333333] mt-2 sm:mt-0 text-white font-bold text-sm sm:text-base py-2 px-2 sm:px-4 rounded"
            >
              <div className="flex items-center">
                <FaPlus className="mr-1" />
                Add Staff
              </div>
            </button>
          </div>
        </div>

        <div className="border-y border-gray-300 py-1.5">
          <div className="flex items-center font-bold justify-between w-6/12">
            <button
              onClick={() => {
                setcurrentSubTab("doctor");
              }}
              className={`${
                currentSubTab === "doctor"
                  ? "text-[#333333]"
                  : "text-gray-400"
              }`}
            >
              Doctor
            </button>
            <button
              onClick={() => {
                setcurrentSubTab("nurse");
              }}
              className={`${
                currentSubTab === "nurse"
                  ? "text-[#333333]"
                  : "text-gray-400"
              }`}
            >
              Nurse
            </button>
            <button
              onClick={() => {
                setcurrentSubTab("labtechnician");
              }}
              className={`${
                currentSubTab === "labtechnician"
                  ? "text-[#333333]"
                  : "text-gray-400"
              }`}
            >
              Lab Technician
            </button>
            <button
              onClick={() => {
                setcurrentSubTab("receptionist");
              }}
              className={`${
                currentSubTab === "receptionist"
                  ? "text-[#333333]"
                  : "text-gray-400"
              }`}
            >
              Receptionist
            </button>
            <button
              onClick={() => {
                setcurrentSubTab("pharmacist");
              }}
              className={`${
                currentSubTab === "pharmacist"
                  ? "text-[#333333]"
                  : "text-gray-400"
              }`}
            >
              Pharmacist
            </button>
            <button
              onClick={() => {
                setcurrentSubTab("administrator");
              }}
              className={`${
                currentSubTab === "administrator"
                  ? "text-[#333333]"
                  : "text-gray-400"
              }`}
            >
              Administrator
            </button>
          </div>
        </div>

        <div className="my-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {gatheringStaffDetails.map((staff) => (
           <div className="p-3 mb-5 shadow-md bg-white">
             <div className="border border-gray-300 p-3">
              <div>
                <div className="sm:flex items-center justify-between">
                  <p className="text-2xl text-[#333333] font-bold">
                    {staff.name}
                  </p>
                  <div className="sm:py flex items-center">
                    <p className="font-bold border text-[#333333] border-[#333333] py-1 px-4 rounded mr-3">
                      {staff.role}
                    </p>
                    <p
                      className={`font-semibold py-1 px-4 rounded ${
                        staff.workStatus === "Active"
                          ? "bg-green-100 text-green-500"
                          : "text-red-500 bg-red-100"
                      }`}
                    >
                      {staff.workStatus}
                    </p>
                  </div>
                </div>
                <div className="flex font-semibold text-sm text-[#333333] items-center">
                  <p className=" rounded-full">
                    {staff.qualification}
                  </p>
                  <p className="mx-2  rounded-full">
                    {staff.specialization}
                  </p>
                  <p className="mr-2  rounded-full">
                    {staff.department}
                  </p>
                  <p className=" text-sm font-bold rounded-full">
                    {staff.medicalLicenseNo}
                  </p>
                </div>
                <hr className="my-2" />
              </div>

              <div className="sm:flex justify-between">
                <div>
                  <p className="text-xl text-[#333333] font-bold">Personal Information</p>
                  <div className="flex items-center">
                    <FaUser className="text-gray-500" />
                    <p className="text-gray-500">Gender:</p>
                    <p className="text-[#333333] ml-2 font-semibold capitalize">{staff.gender}</p>
                  </div>

                  <div className="flex items-center">
                    <BiCalendarEvent className="text-gray-500" />
                    <p className="text-gray-500">Date of Birth:</p>
                    <p className="text-[#333333] ml-2 font-semibold ">{staff.dob}</p>
                  </div>

                  <div className="flex items-center">
                    <MdEmail className="text-gray-500" />
                    <p className="text-gray-500">Email:</p>
                    <p className="text-[#333333] ml-2 font-semibold">{staff.email}</p>
                  </div>

                  <div className="flex items-center">
                    <BiPhone className="text-gray-500" />
                    <p className="text-gray-500">Phone No:</p>
                    <p className="text-[#333333] ml-2 font-semibold">+91 {staff.phoneNo}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xl text-[#333333] font-bold">Professional Information</p>
                  <div className="flex items-center">
                    <BiMedal className="text-gray-500" />
                    <p className="text-gray-500">Experience:</p>
                    <p className="text-[#333333] ml-2 font-semibold">{staff.yearOfExperience} yrs</p>
                  </div>

                  <div className="flex items-center">
                    <FaClock className="text-gray-500" />
                    <p className="text-gray-500">Shift:</p>
                    <p className="text-[#333333] ml-2 font-semibold">{staff.shiftTiming}</p>
                  </div>

                  <div className="flex items-center">
                    <FaRupeeSign className="text-gray-500" />
                    <p className="text-gray-500">Income:</p>
                    <p className="text-[#333333] ml-2 font-semibold">{staff.salaryAmount}/-</p>
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="text-gray-500" />
                    <p className="text-gray-500">Joined:</p>
                    <p className="text-[#333333] ml-2 font-semibold">{staff.dateOfJoining}</p>
                  </div>
                </div>
              </div>
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
