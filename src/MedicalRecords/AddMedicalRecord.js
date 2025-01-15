import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfig";
import { FaRupeeSign } from "react-icons/fa";

function AddMedicalRecord({ setopeningMedicalRecord }) {
  const [patientDetails, setPatientDetails] = useState([]);
  const [appointmentDetails, setappointmentDetails] = useState([]);
  const [selectPatient, setselectPatient] = useState("");

  async function gatheringPatientDetails() {
    const patientDetails = await getDocs(
      collection(database, "patient_details")
    );
    let multipleArray = patientDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(multipleArray);
    setPatientDetails(multipleArray);
  }

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
    gatheringPatientDetails();
    gatheringAppointmentDetails();
  }, []);

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-5 rounded">
        <div className="flex justify-between">
          <p className="font-bold text-2xl">Add Medical Record</p>
          <button
            onClick={() => {
              setopeningMedicalRecord(false);
            }}
            className="text-red-500 font-semibold"
          >
            Close
          </button>
        </div>

        <div>
          <div>
            <p>Select Patient</p>
            <select
              className="border w-full  p-1.5 rounded border-gray-400"
              onChange={(e) => {
                const patient = e.target.value;
                setselectPatient(patient);
              }}
            >
              {patientDetails.map((patient) => (
                <option key={patient.id} value={patient.name}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          {selectPatient ? (
            <div className="my-3">
              <div className="">
                <p className="text-lg font-semibold">Patient Details</p>
                {patientDetails
                  .filter((patient) => patient.name === selectPatient)
                  .map((patient) => (
                    <div className="text-gray-500 flex items-center justify-between">
                      <p>{patient.name}</p>
                      <span className="mx-2">|</span>
                      <p className="">{patient.email}</p>
                      <span className="mx-2">|</span>
                      <p>{patient.gender}</p>
                      <span className="mx-2">|</span>
                      <p>{patient.phoneNo}</p>
                    </div>
                  ))}
              </div>

              <div className="">
                <p className="text-lg font-semibold">Appointment Details</p>
                {appointmentDetails
                  .filter(
                    (appointment) => appointment.patient === selectPatient
                  )
                  .map((appointment) => (
                    <div className="text-gray-500 flex items-center justify-between">
                      <p>Type: {appointment.appointmentType}</p>
                      <span className="mx-2">|</span>
                      <div className="flex  items-center">
                        <p className="mr-1">Fees:</p>
                        <FaRupeeSign className="" />
                        <p className="">{appointment.fees}/-</p>
                      </div>
                      <span className="mx-2">|</span>
                      <p>{appointment.gender}</p>
                      <span className="mx-2">|</span>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default AddMedicalRecord;
