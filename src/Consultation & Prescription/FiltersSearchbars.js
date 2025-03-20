import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function FiltersSearchbars() {
  const [patientDetails, setPatientDetails] = useState([]);
  const [gatheringStaffDetails, setgatheringStaffDetails] = useState([]);
  const [departmment, setdepartment] = useState("");
  const [selectedPatient, setselectedPatient] = useState("");
  const [selectedDoctor, setselectedDoctor] = useState("");
  const [capturedAppointmentId, setcapturedAppointmentId] = useState("");

  const departments = [
    { value: "cardiology", label: "Cardiology" },
    { value: "neurology", label: "Neurology" },
    { value: "orthopedics", label: "Orthopedics" },
    { value: "pediatrics", label: "Pediatrics" },
    { value: "oncology", label: "Oncology" },
    { value: "radiology", label: "Radiology" },
    { value: "emergency", label: "Emergency" },
    { value: "surgery", label: "Surgery" },
    { value: "dermatology", label: "Dermatology" },
    { value: "psychiatry", label: "Psychiatry" },
  ];

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

  async function renderingStaffDetails() {
    const appointmentDetails = await getDocs(
      collection(database, "staff_details")
    );
    let multipleArray = appointmentDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setgatheringStaffDetails(multipleArray);
  }

  useEffect(() => {
    gatheringPatientDetails();
    renderingStaffDetails();
  }, []);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <input
          className="border border-gray-400 rounded p-1"
          placeholder="Search Appointment No"
        ></input>
        <button className="bg-[#102E4A] text-white py-1 p-3 ml-2 rounded">
          Search
        </button>
      </div>


      <div className="flex items-center">
        <select
          onChange={(e) => {
            setselectedPatient(e.target.value);
          }}
          className="border  border-gray-400 rounded p-1"
        >
          <option>Select Patient</option>
          {patientDetails.map((patient) => (
            <option>{patient.name}</option>
          ))}
        </select>

        <select
          onChange={(e) => {
            setselectedDoctor(e.target.value);
          }}
          className="border border-gray-400 mx-3 rounded p-1"
        >
          <option>Select Doctor</option>
          {gatheringStaffDetails.map((patient) => (
            <option>{patient.name}</option>
          ))}
        </select>

        <select
          onChange={(e) => {
            setdepartment(e.target.value);
          }}
          className="border border-gray-400 w-auto rounded p-1"
        >
          {departments.map((department) => (
            <option value={department.value}>{department.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FiltersSearchbars;
