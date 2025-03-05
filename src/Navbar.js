import { CalendarCheck } from "lucide";
import React, { useState } from "react";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import {
  FaBars,
  FaCalendarAlt,
  FaFileMedicalAlt,
  FaUser,
} from "react-icons/fa";
import { Link, useLocation } from "react-router";

function Navbar() {
  const fetchingCurrentLocation = useLocation();
  const [openingNavbar, setopeningNavbar] = useState(false);

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
            <Link to={"/"}>
              <button
                className={`px-3 py-1 rounded ${
                  fetchingCurrentLocation.pathname === "/"
                    ? "border text-white border-white"
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
                    ? "border text-white border-white"
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
                      ? "border text-white border-white"
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
                    ? "border text-white border-white"
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
                    ? "border text-white border-white"
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

      <div className="hidden sm:block border bg-[#34b1ff] w-52 font-semibold text-white min-h-screen h-full">
        <div className="px-4 my-10">
          <Link to={"/Patient"}>
            <button
              className={`px-3 py-1 rounded ${
                fetchingCurrentLocation.pathname === "/"
                  ? "border text-white border-white"
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
                  ? "border text-white border-white"
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
                className={`mt-5 px-3 py-1 rounded ${
                  fetchingCurrentLocation.pathname === "/Appointment"
                    ? "border text-white border-white"
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
                  ? "border text-white border-white"
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
                  ? "border text-white border-white"
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
    </div>
  );
}

export default Navbar;
