import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfig";

function RenderingAppointmentDetails({
  setopeningAdditionalDetails,
  gatheringWholeDetails,
}) {
  const [patientDetails, setPatientDetails] = useState([]);
  const [openingAdditionalNote, setopeningAdditionalNote] = useState(false);

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

  useEffect(() => {
    gatheringPatientDetails();
  }, []);

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white w-[340px] sm:w-auto h-screen overflow-auto my-10 p-3 sm:p-5 rounded">
        <div className="flex items-center justify-between">
          <p className="font-bold text-2xl text-[#715AFF]">Appointment Details</p>
          <button
            onClick={() => {
              setopeningAdditionalDetails(false);
            }}
            className="font-semibold text-red-500"
          >
            Close
          </button>
        </div>

        <div className="">
          <div className="sm:flex items-center mt-3 mb-1.5 justify-between">
            <div className="flex text-sm items-center">
              <p className="text-[#102E4A] font-semibold">Appointment ID:</p>
              <p className="ml-1 font-semibold text-[#715AFF]">
                {gatheringWholeDetails.id}
              </p>
            </div>
            <div className="flex text-sm items-center">
              <p className="text-[#102E4A] font-semibold">Date:</p>
              <p className="ml-1 font-semibold text-[#715AFF]">
                {new Date(
                  gatheringWholeDetails?.appointmentDate?.seconds * 1000
                ).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>

          <div className="sm:flex border-y py-1.5 justify-between">
            <div className="flex items-center text-[#102E4A]">
              <p className="text-[#102E4A]">Patient:</p>
              <p className="text-[#715AFF] ml-1">
                {gatheringWholeDetails.patient}
              </p>
            </div>

            <div className="flex items-center text-[#102E4A]">
              <p className="text-[#102E4A]">Doctor:</p>
              <p className="text-[#715AFF] ml-1">
                {gatheringWholeDetails.doctor}
              </p>
            </div>
          </div>

          <div className="border p-3 mt-6 rounded-xl border-gray-300">
            <p className="text-xl text-[#715AFF] font-bold">
              Medical Information
            </p>
            <div className=" text-[#102E4A] my-3">
              <p className="text-lg font-semibold">Symptom:</p>
              <p className="text-[#715AFF] w-24 text-center rounded-full bg-[#f2f0ff]">
                {gatheringWholeDetails.symptom.name}
              </p>
            </div>

            <div className=" text-[#102E4A] my-3">
              <p className="text-lg font-semibold">Description:</p>
              <p className="text-[#715AFF]">
                {gatheringWholeDetails.symptom.description}
              </p>
            </div>

            <div className=" text-[#102E4A] my-3">
              <p className="text-lg font-semibold">Vital Signs:</p>
             
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-3 rounded-lg bg-gray-100">
                  <p className="text-sm">Blood Pressure:</p>
                  <p className="font-semibold">
                    {gatheringWholeDetails.bloodPressure} mmHg
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-gray-100">
                  <p className="text-sm">Heart Rate:</p>
                  <p className="font-semibold">
                    {gatheringWholeDetails.heartRate} bpm
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-gray-100">
                  <p className="text-sm">Temperature:</p>
                  <p className="font-semibold">
                    {gatheringWholeDetails.temperature} C
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-gray-100">
                  <p className="text-sm">Oxygen Saturation:</p>
                  <p className="font-semibold">
                    {gatheringWholeDetails.oxygenSaturation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border p-3 mt-6 rounded-xl border-gray-300">
            <p className="text-xl text-[#715AFF] font-bold">
              Medications & Tests
            </p>

            <div className="my-3">
              <p className="font-semibold">Medicines:</p>
              {gatheringWholeDetails.symptom.medication.map((med) => (
                <li>{med}</li>
              ))}
            </div>

            <div className="">
              <p className="font-semibold">Tests:</p>
              {gatheringWholeDetails.symptom.tests.map((med) => (
                <li>{med}</li>
              ))}
            </div>
          </div>
          <div
            className={`flex justify-end ${
              openingAdditionalNote === true ? "hidden" : "block"
            }`}
          >
            <button
              onClick={() => {
                setopeningAdditionalNote(true);
              }}
              className="bg-[#715AFF] px-4 py-1 text-white rounded mt-3"
            >
              Add Note
            </button>
          </div>

          {openingAdditionalNote && (
            <div className="border p-3 mt-6 rounded-xl border-gray-300">
              <div className="flex items-center justify-between">
                <p className="text-xl text-[#715AFF] font-bold">
                  Additional Notes
                </p>
                <button
                  onClick={() => {
                    setopeningAdditionalNote(false);
                  }}
                  className="font-semibold text-red-500"
                >
                  Close
                </button>
              </div>

              <div>
                <textarea placeholder="Take medicines regularly..." className="border h-20 my-3 w-full border-gray-300 rounded p-1.5"></textarea>

                <div className="flex justify-end">
                  <button className="bg-[#715AFF] text-white py-1 rounded-lg px-4">Add Note</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RenderingAppointmentDetails;
