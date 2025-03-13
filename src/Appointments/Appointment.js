import React, { useEffect, useState } from "react";
import { FaCalendarCheck, FaPlus, FaRupeeSign } from "react-icons/fa";
import Navbar from "../Navbar";
import AddAppointments from "./AddAppointments";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfig";

function Appointment() {
  const [openingAppointmentForm, setopeningAppointmentForm] = useState(false);
  const [appointmentDetails, setappointmentDetails] = useState([]);

  async function gatheringAppointmentDetails() {
    const appointmentDetails = await getDocs(
      collection(database, "appointment_details")
    );
    let multipleArray = appointmentDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setappointmentDetails(multipleArray);
    console.log(multipleArray);
  }

  useEffect(() => {
    gatheringAppointmentDetails();
  }, []);

  return (
    <div className="bg-gray-50  sm:flex min-h-screen h-full">
      <div className="flex p-4 sm:p-0">
        <Navbar />
      </div>
      <div className="w-full overflow-auto h-screen px-5 sm:p-5">
        <div className="flex bg-white shadow p-3 items-end mb-3 sm:mb-5 justify-between">
          <div>
            <p className="text-xl text-[#715AFF] hidden sm:block sm:text-3xl font-semibold">
              Appointment Details
            </p>
          </div>
          <div>
            <input
              placeholder="Search Appointments"
              className="border border-gray-300 rounded p-1"
            />
            <button
              onClick={() => setopeningAppointmentForm(true)}
              className="bg-[#715AFF] ml-2 mt-2 sm:mt-0 text-white font-bold text-sm sm:text-base py-1 px-2 sm:px-4 rounded"
            >
              <div className="flex items-center">
                <FaPlus className="mr-1" />
                Add Appointment
              </div>
            </button>
          </div>
        </div>

        <div>
          {appointmentDetails.map((appointment) => (
            <div className="bg-white shadow p-4 rounded mb-5">
              <div className="flex items-center justify-between">
                <p className="text-[#979797] font-semibold text-lg">
                  Appointment Details
                </p>
                <div className="flex items-center">
                  <p className="font-semibold mr-2 text-[#333333]">Date:</p>
                  <p className="text-gray-500">
                    {new Date(
                      appointment?.appointmentDate?.seconds * 1000
                    ).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
              <hr className="my-3" />

              <p className="font-bold text-xl mb-2 text-[#333333]">
                {appointment.patient}
              </p>

              <div className="sm:flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-[#333333] mr-2 font-semibold">Fees:</p>
                  <FaRupeeSign className="text-gray-400" />
                  <p className="text-gray-400">{appointment.fees}/-</p>
                </div>
                <div className="flex items-center">
                  <FaCalendarCheck className="text-[#333333]" />
                  <p className="ml-1 mr-2 font-semibold text-[#333333]">
                    Appointment Type:
                  </p>
                  <p
                    className={`${
                      appointment.appointmentType === "Emergency"
                        ? " text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {appointment.appointmentType}
                  </p>
                </div>
              </div>

              <hr className="my-3" />
              <div className="flex items-center">
                <p className="font-semibold mr-2 text-[#333333]">Note:</p>
                <p className="text-gray-500">{appointment.additionalNote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {openingAppointmentForm && (
        <AddAppointments
          setopeningAppointmentForm={setopeningAppointmentForm}
          gatheringAppointmentDetails={gatheringAppointmentDetails}
        />
      )}
    </div>
  );
}

export default Appointment;
