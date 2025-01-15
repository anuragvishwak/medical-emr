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
        className="border-2 border-[#292E1E] rounded p-1"
      >
        <FaBars size={20} />
      </button>


      {openingNavbar && (
        <div className="absolute top-14 shadow-xl z-50 border bg-white font-semibold text-[#333333]">
          <div className="px-4 flex flex-col my-10">
            <Link to={"/"}>
              <button
                className={`px-3 py-1 rounded ${
                  fetchingCurrentLocation.pathname === "/"
                    ? "border bg-gray-200"
                    : ""
                }`}
              >
                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  Patient Details
                </div>
              </button>
            </Link>

            <div>
              <Link to={"/Appointment"}>
                <button
                  className={`mt-5 px-3 py-1 rounded ${
                    fetchingCurrentLocation.pathname === "/Appointment"
                      ? "border bg-gray-200"
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
                    ? "border bg-gray-200"
                    : ""
                }`}
              >
                <div className="flex items-center">
                  <FaFileMedicalAlt className="mr-2" />
                  Medical Records
                </div>
              </button>
            </Link>

            <button>
              <div className="flex items-center">
                <RiMoneyRupeeCircleLine className=" text-xl mr-1" />
                Billing & Payment
              </div>
            </button>
          </div>
        </div>
      )}

      <div className="hidden sm:block border bg-white w-52 font-semibold text-[#333333] min-h-screen h-full">
        <div className="px-4 my-10">
          <Link to={"/"}>
            <button
              className={`px-3 py-1 rounded ${
                fetchingCurrentLocation.pathname === "/"
                  ? "border bg-gray-200"
                  : ""
              }`}
            >
              <div className="flex items-center">
                <FaUser className="mr-2" />
                Patient Details
              </div>
            </button>
          </Link>

          <div>
            <Link to={"/Appointment"}>
              <button
                className={`mt-5 px-3 py-1 rounded ${
                  fetchingCurrentLocation.pathname === "/Appointment"
                    ? "border bg-gray-200"
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
                  ? "border bg-gray-200"
                  : ""
              }`}
            >
              <div className="flex items-center">
                <FaFileMedicalAlt className="mr-2" />
                Medical Records
              </div>
            </button>
          </Link>

          <button>
            <div className="flex items-center">
              <RiMoneyRupeeCircleLine className=" text-xl mr-1" />
              Billing & Payment
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
