import React, { useEffect, useState } from "react";
import { FaCalendarCheck, FaEye, FaPlus, FaRupeeSign } from "react-icons/fa";
import Navbar from "../Navbar";
import AddAppointments from "./AddAppointments";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfig";
import AddAppointmentDetails from "./AddAppointmentDetails";
import RenderingAppointmentDetails from "./RenderingAppointmentDetails";

function Appointment() {
  const [openingAppointmentForm, setopeningAppointmentForm] = useState(false);
  const [appointmentDetails, setappointmentDetails] = useState([]);
  const [openingAdditionaDetailsForm, setopeningAdditionalDetailsForm] =
    useState(false);
  const [gatheringWholeDetails, setgatheringWholeDetails] = useState({});
  const [openingAdditionalDetails, setopeningAdditionalDetails] =
    useState(false);

  const renderingItems = "Gathering some of the appointment details...";
  console.log(renderingItems);

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
    <div className="sm:flex w-full min-h-screen h-full">
      <div className="flex p-3  border-b border-gray-300 sm:p-0">
        <Navbar />
        <div className="flex items-center sm:hidden ml-2">
          <input
            placeholder="Search Appointments"
            className="border border-gray-300 rounded p-1"
          />
          <button
            onClick={() => setopeningAppointmentForm(true)}
            className="bg-[#715AFF] ml-2 text-white font-bold text-sm sm:text-base py-1.5 px-2 sm:px-4 rounded"
          >
            <div className="flex items-center">Add Appoint</div>
          </button>
        </div>
      </div>
      <div className="w-full overflow-auto h-screen">
        <div className="sm:flex hidden p-3 border-b justify-between">
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

        <div className="grid p-5 grid-cols-1 sm:grid-cols-3 gap-5">
          {appointmentDetails.map((appointment) => (
            <div className="border border-gray-300 rounded-xl bg-white">
              <div className="p-5">
                <div className="flex items-center  justify-between">
                  <p className="text-[#102E4A] font-semibold text-lg">
                    Appointment Details
                  </p>
                  <div className="flex items-center">
                    <p className="font-semibold mr-2 text-[#102E4A]">Date:</p>
                    <p className="text-gray-500">
                      {new Date(
                        appointment?.appointmentDate?.seconds * 1000
                      ).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
                <hr className="my-3" />

                <p className="font-bold text-xl mb-2 text-[#715AFF]">
                  {appointment.patient}
                </p>

                <div className="">
                  <div className="flex items-center">
                    <p className="text-[#102E4A] mr-2 font-semibold">Fees:</p>
                    <FaRupeeSign className="text-gray-400" />
                    <p className="text-gray-400">{appointment.fees}/-</p>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarCheck className="text-[#102E4A]" />
                    <p className="ml-1 mr-2 font-semibold text-[#102E4A]">
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

                <div className="flex items-center">
                  <p className="font-semibold mr-2 text-[#102E4A]">Note:</p>
                  <p className="text-[#715AFF]">{appointment.additionalNote}</p>
                </div>
              </div>

              <div className="flex mt-4 bg-[#102E4A] rounded-b-xl text-sm font-semibold items-center justify-end p-2">
                <button className="bg-white rounded text-[#715AFF] px-2 py-1 shadow">
                  <div
                    onClick={() => {
                      setopeningAdditionalDetails(true);
                      setgatheringWholeDetails(appointment);
                    }}
                    className="flex items-center"
                  >
                    <FaEye className="mr-1" />
                    View Details
                  </div>
                </button>
                <button
                  onClick={() => {
                    setopeningAdditionalDetailsForm(true);
                    setgatheringWholeDetails(appointment);
                  }}
                  className="bg-[#715AFF] ml-3 rounded text-white px-2 py-1 shadow"
                >
                  + Add Details
                </button>
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

      {openingAdditionalDetails && <RenderingAppointmentDetails gatheringWholeDetails = {gatheringWholeDetails} setopeningAdditionalDetails = {setopeningAdditionalDetails}/>}

      {openingAdditionaDetailsForm && (
        <AddAppointmentDetails
          setopeningAdditionalDetailsForm={setopeningAdditionalDetailsForm}
          gatheringWholeDetails={gatheringWholeDetails}
        />
      )}
    </div>
  );
}

export default Appointment;
