import { CalendarCheck } from "lucide";
import React from "react";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { FaCalendarAlt, FaFileMedicalAlt, FaUser } from "react-icons/fa";

function Navbar() {
  return (
    <div className="border bg-white w-52 font-semibold text-[#333333] min-h-screen h-full">
      <div className="px-4 py-10">

        <button>
            <div className="flex items-center">
                <FaUser className="mr-2"/>
            Patient Details
            </div>
        </button>
        <button className="pt-10">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" />
            Appointments
          </div>
        </button>
        <button className="py-10">
          <div className="flex items-center">
            <FaFileMedicalAlt className="mr-2" />
            Medical Records
          </div>
        </button>

        <button>
          <div className="flex items-center">
            <RiMoneyRupeeCircleLine  className=" text-xl mr-1" />
            Billing & Payment
          </div>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
