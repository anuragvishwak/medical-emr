import React from "react";
import { LuLogOut } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router";

function PatientNavbar() {
  const currentLocation = useLocation();
  const navigation = useNavigate();

  return (
    <div className="border px-4 flex flex-col w-56 py-10 h-screen">
      <Link to={"/PatientDashboard"} className="">
        <button
          className={`py-1.5 text-start px-4 w-full ${
            currentLocation.pathname === "/PatientDashboard"
              ? "border border-gray-300"
              : ""
          }`}
        >
          Dashboard
        </button>
      </Link>
      <Link to={"/PatientAppointment"}>
        <button
          className={`w-full text-start py-1.5 px-4 ${
            currentLocation.pathname === "/PatientAppointment"
              ? "border border-gray-300"
              : ""
          }`}
        >
          Appointments
        </button>
      </Link>
      <Link>
        <button>Medical History</button>
      </Link>
      <Link>
        <button>Vital & Measurement</button>
      </Link>
      <Link>
        <button>Lab Results & Diagnose</button>
      </Link>
      <Link>
        <button>Treatment & Prescriptions</button>
      </Link>
      <Link>
        <button>Billing & Insurance</button>
      </Link>
      <Link>
        <button>Clinical Notes</button>
      </Link>

      <button
        onClick={() => {
          navigation("/");
          localStorage.clear();
        }}
        className="flex mt-10 items-center"
      >
        <LuLogOut /> <p className="font-semibold ml-1">Logout</p>
      </button>
    </div>
  );
}

export default PatientNavbar;
