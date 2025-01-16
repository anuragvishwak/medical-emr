import React, { useEffect, useState } from "react";
import { FaCalendarCheck, FaPlus, FaRupeeSign } from "react-icons/fa";
import Navbar from "../Navbar";
import AddMedicalRecord from "./AddMedicalRecord";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfig";

function MedicalRecords() {
  const [openingMedicalRecord, setopeningMedicalRecord] = useState(false);
  const [gatheringMedicalRecord, setgatheringMedicalRecord] = useState([]);
  const [appointmentDetails, setappointmentDetails] = useState([]);
  const [openingAppointment, setopeningAppointment] = useState(false);

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

  async function medicalRecords() {
    const MedicalRecords = await getDocs(
      collection(database, "medical_records")
    );
    let multipleArray = MedicalRecords.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setgatheringMedicalRecord(multipleArray);
    console.log(multipleArray);
  }

  useEffect(() => {
    medicalRecords();
    gatheringAppointmentDetails();
  }, []);

  return (
    <div className="sm:flex min-h-screen h-full bg-gray-50">
     <div className="flex p-4 sm:p-0">
        <Navbar />
        <p className="text-3xl ml-2 sm:hidden text-[#333333] font-semibold">Medical Records</p>
      </div>
      <div className="px-5 sm:p-5 overflow-auto h-screen w-full">
        <div className="flex items-center mb-5 justify-between">
          <div className="">
            <p className="text-3xl hidden sm:block font-semibold">Medical Record</p>
            <p className="text-gray-400 hidden sm:block">
              Here you can manage medical records of the patients.
            </p>
          </div>
          <button
            onClick={() => {
              setopeningMedicalRecord(true);
            }}
            className="bg-[#333333] text-white font-semibold text-sm p-2 sm:px-4 rounded"
          >
            <div className="flex items-center">
              <FaPlus className="mr-1" />
              <p> Add Medical Record</p>
            </div>
          </button>
        </div>

        {gatheringMedicalRecord.map((medical) => (
          <div className="bg-white mb-3 p-5 rounded shadow">
            <p className="text-3xl font-bold text-[#333333]">
              {medical.patient}
            </p>
            <div>
              <div className="my-5">
                <div className="flex items-center">
                  <p className="text-[#333333] mr-2 font-semibold">
                    Allergies:
                  </p>
                  {medical.allergies.map((allergy) => (
                    <p className="text-gray-500">{allergy}</p>
                  ))}
                </div>

                <div className="flex items-center">
                  <p className="text-[#333333] mr-2 font-semibold">
                    Immunization Records:
                  </p>
                  {medical.immunization_records.map((immune) => (
                    <p className="text-gray-500">{immune}</p>
                  ))}
                </div>

                <hr className="my-2" />
                <div className="sm:flex items-center">
                  <p className="text-[#333333] mr-2 font-semibold">
                    Clinical Note:
                  </p>
                  <p className="text-gray-500">{medical.clinical_note}</p>
                </div>
              </div>

              <div className="flex mb-2 items-center">
                <p className="font-bold text-lg sm:text-xl text-gray-500">
                  Appointment Details
                </p>
                <button
                  onClick={() => {
                    setopeningAppointment(!openingAppointment);
                  }}
                  className="ml-2 hover:bg-[#333333] text-[#333333] border border-[#333333] font-bold hover:text-white px-2 py-1 text-sm rounded"
                >
                  view details
                </button>
              </div>
              {openingAppointment &&
                appointmentDetails
                  .filter(
                    (appointment) => appointment.patient === medical.patient
                  )
                  .map((appointment, index) => (
                    <div className="border mb-3 p-2 rounded">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-500">
                          Appointment {index + 1}
                        </p>
                        <div className="flex items-center">
                          <p className="font-semibold mr-2 text-[#333333]">
                            Date:
                          </p>
                          <p className="text-gray-500">
                            {new Date(
                              appointment?.appointmentDate?.seconds * 1000
                            ).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                      </div>
                      <hr className="my-3" />

                      <div className="sm:flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="text-[#333333] mr-2 font-semibold">
                            Fees:
                          </p>
                          <FaRupeeSign className="text-gray-400" />
                          <p className="text-gray-400">{appointment.fees}/-</p>
                        </div>
                        <div className="sm:flex items-center">
                          <div className="flex items-center">
                          <FaCalendarCheck className="text-[#333333]" />
                          <p className="ml-1 mr-2 font-semibold text-[#333333]">
                            Appointment Type:
                          </p>
                          </div>
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
                        <p className="font-semibold mr-2 text-[#333333]">
                          Note:
                        </p>
                        <p className="text-gray-500">
                          {appointment.additionalNote}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        ))}
      </div>

      {openingMedicalRecord && (
        <AddMedicalRecord setopeningMedicalRecord={setopeningMedicalRecord} />
      )}
    </div>
  );
}

export default MedicalRecords;
