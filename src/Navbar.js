import { CalendarCheck } from "lucide";
import React, { useState } from "react";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import {
  FaBars,
  FaCalendarAlt,
  FaFileMedicalAlt,
  FaUser,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { LuLogOut } from "react-icons/lu";

function Navbar() {
  const fetchingCurrentLocation = useLocation();
  const [openingNavbar, setopeningNavbar] = useState(false);

  const navigation = useNavigate();

  return (
    <div>
      <button
        onClick={() => setopeningNavbar(!openingNavbar)}
        className="border-2 text-[#34b1ff] border-[#34b1ff] sm:hidden rounded p-1"
      >
        <FaBars size={20} />
      </button>

      {openingNavbar && (
        <div className="absolute top-14 shadow-xl z-50 border bg-[#34b1ff] font-semibold text-white">
          <div className="px-4 flex flex-col my-10">
            <Link to={"/Patient"}>
              <button
                className={`px-3 py-1 rounded ${
                  fetchingCurrentLocation.pathname === "/"
                    ? "text-white bg-[#715AFF]"
                    : ""
                }`}
              >
                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  Patient Details
                </div>
              </button>
            </Link>

            <Link to={"/StaffDetails"}>
              <button
                className={`mt-5 px-2 py-1 rounded ${
                  fetchingCurrentLocation.pathname === "/StaffDetails"
                    ? "text-white bg-[#715AFF]"
                    : ""
                }`}
              >
                <div className="flex items-center">
                  <FaUser className="text-xl mr-1" />
                  Add Staff
                </div>
              </button>
            </Link>

            <div>
              <Link to={"/Appointment"}>
                <button
                  className={`mt-5 px-3 py-1 rounded ${
                    fetchingCurrentLocation.pathname === "/Appointment"
                      ? "text-white bg-[#715AFF]"
                      : ""
                  }`}
                >
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    Appointments
                  </div>
                </button>
              </Link>
            </div>

            <Link to={"/MedicalRecords"}>
              <button
                className={`my-5 px-3 py-1 rounded ${
                  fetchingCurrentLocation.pathname === "/MedicalRecords"
                    ? "text-white bg-[#715AFF]"
                    : ""
                }`}
              >
                <div className="flex items-center">
                  <FaFileMedicalAlt className="mr-2" />
                  Medical Records
                </div>
              </button>
            </Link>

            <Link className="" to={"/Billing&Payment"}>
              <button
                className={` px-2 py-1 rounded ${
                  fetchingCurrentLocation.pathname === "/Billing&Payment"
                    ? "text-white bg-[#715AFF]"
                    : ""
                }`}
              >
                <div className="flex items-center">
                  <RiMoneyRupeeCircleLine className=" text-xl mr-1" />
                  Billing & Payment
                </div>
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="hidden sm:block border w-60 font-semibold text-[#102E4A] min-h-screen h-full">
        <div className="px-2 my-10">
          <Link to={"/Patient"}>
            <button
              className={`px-1 w-full  py-1 rounded ${
                fetchingCurrentLocation.pathname === "/Patient"
                  ? "text-white bg-[#715AFF]"
                  : ""
              }`}
            >
              <div className="flex items-center">
                <FaUser className="mr-2" />
                Patient Details
              </div>
            </button>
          </Link>

          <Link to={"/StaffDetails"}>
            <button
              className={`px-1 px-1 mt-5 w-full py-1 rounded ${
                fetchingCurrentLocation.pathname === "/StaffDetails"
                  ? "text-white bg-[#715AFF]"
                  : ""
              }`}
            >
              <div className="flex items-center">
                <FaUser className=" mr-1" />
                Add Staff
              </div>
            </button>
          </Link>

          <div>
            <Link to={"/Appointment"}>
              <button
                className={`mt-5 px-1 w-full py-1 rounded ${
                  fetchingCurrentLocation.pathname === "/Appointment"
                    ? "text-white bg-[#715AFF]"
                    : ""
                }`}
              >
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  Appointments
                </div>
              </button>
            </Link>
          </div>

          <Link to={"/ConsultationPrescriptionSection"}>
            <button
              className={`my-5 w-full py-1 rounded ${
                fetchingCurrentLocation.pathname === "/MedicalRecords"
                  ? "text-white bg-[#715AFF]"
                  : ""
              }`}
            >
              <div className="flex items-center">
                <FaFileMedicalAlt className="mr-2" />
                Consult & Prescribe
              </div>
            </button>
          </Link>

          <Link className="" to={"/Billing&Payment"}>
            <button
              className={` w-full py-1 rounded ${
                fetchingCurrentLocation.pathname === "/Billing&Payment"
                  ? "text-white bg-[#715AFF]"
                  : ""
              }`}
            >
              <div className="flex items-center">
                <RiMoneyRupeeCircleLine className=" text-xl mr-1" />
                Billing & Payment
              </div>
            </button>
          </Link>

          <button
            onClick={() => {
              navigation("/");
              localStorage.clear();
            }}
            className="flex mt-10 px-3 items-center"
          >
            <LuLogOut /> <p className="font-semibold ml-1">Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
