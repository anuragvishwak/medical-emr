import { addDoc, collection, getDocs } from "firebase/firestore";
import { X } from "lucide";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { database } from "../FirebaseConfig";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

function AddAppointments({
  setopeningAppointmentForm,
  gatheringAppointmentDetails,
}) {
  const [startDate, setstartDate] = useState("");
  const [patientDetails, setPatientDetails] = useState([]);
  const [appointmentType, setappointmentType] = useState("");
  const [selectPatient, setselectPatient] = useState("");
  const [fees, setfees] = useState("");
  const [additionalNote, setadditionalNote] = useState("");
  const [gatheringDoctors, setgatheringDoctors] = useState([]);
  const [selectedDoctor, setselctedDoctor] = useState("");

  const currentDate = new Date();

  async function gatheringPatientDetails() {
    const patientDetails = await getDocs(
      collection(database, "patient_details")
    );
    let multipleArray = patientDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPatientDetails(multipleArray);
  }

  async function renderingStaffDetails() {
    const patientDetails = await getDocs(collection(database, "staff_details"));
    let multipleArray = patientDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgatheringDoctors(multipleArray);
  }

  async function creatingAppointment() {
    try {
      await addDoc(collection(database, "appointment_details"), {
        appointmentDate: startDate,
        appointmentType: appointmentType,
        patient: selectPatient,
        fees: fees,
        additionalNote: additionalNote,
        doctor: selectedDoctor,
        date: currentDate,
        appointmentStatus: "pending",

      });
      setopeningAppointmentForm(false);
      toast.success("Appointment created.");
      gatheringAppointmentDetails();
    } catch {
      toast.error("something went wrong");
    }
  }

  useEffect(() => {
    gatheringPatientDetails();
    renderingStaffDetails();
  }, []);

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white h-screen sm:h-auto overflow-auto  w-80 sm:w-auto my-8  sm:my-0 rounded p-5">
        <div className="flex mb-5 items-center justify-between">
          <p className="font-bold text-[#715AFF] text-2xl">Add Appointment</p>
          <button
            onClick={() => {
              setopeningAppointmentForm(false);
            }}
            className="font-bold text-red-500"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="">
            <p className="font-semibold text-[#715AFF]">Appointment Date</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setstartDate(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="Select a date"
              className=" border border-gray-400 w-80 rounded p-1.5"
            />
          </div>
          <div className="">
            <p className="font-semibold text-[#715AFF]">Appointment Type</p>
            <select
              className="border w-full p-1.5 rounded border-gray-400"
              onChange={(e) => {
                const appointment = e.target.value;
                setappointmentType(appointment);
              }}
            >
              <option>Select Appointment Type</option>
              <option>Routine Checkup</option>
              <option>Specialist Consultation</option>
              <option>Dental Appointments</option>
              <option>Specialist Consultation</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 my-3 gap-5">
          <div>
            <p className="font-semibold text-[#715AFF]">Patient</p>
            <select
              className="border w-full  p-1.5 rounded border-gray-400"
              onChange={(e) => {
                const patient = e.target.value;
                setselectPatient(patient);
              }}
            >
              <option>Select Patient</option>
              {patientDetails.map((patient) => (
                <option key={patient.id} value={patient.name}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="font-semibold text-[#715AFF]">Doctor</p>
            <select
              onChange={(e) => {
                setselctedDoctor(e.target.value);
              }}
              className="border w-full  p-1.5 rounded border-gray-400"
            >
              <option>Select Doctor</option>
              {gatheringDoctors.map((staff) => (
                <>
                  <option>{staff.name}</option>
                </>
              ))}
            </select>
          </div>
        </div>

       <div className="grid grid-cols-1 mb-2 sm:grid-cols-2 gap-5">
       <div className="border border-gray-300 p-3 rounded">
          <p className="font-semibold text-lg mb-2 text-[#102E4A]">Selected Patient</p>
          {patientDetails.filter((patient) => patient.name === selectPatient).map((patient) => (
            <div>
              <p className="font-semibold text-[#715AFF]">{patient.name}</p>
            <div className="flex items-center">
            <p className="text-sm text-[#102E4A]">{patient.email}</p>
              <span className="text-[#102E4A] mx-1">|</span>
              <p className="text-sm text-[#102E4A]">{patient.phoneNo}</p>
              <span className="text-[#102E4A] mx-1">|</span>
              <p className="text-sm text-[#102E4A]">{patient.gender}</p>
            </div>
            </div>
          )
        )}
        </div>

        <div className="border border-gray-300 p-3 rounded">
          <p className="font-semibold text-lg mb-2 text-[#102E4A]">Selected Doctor</p>
          {gatheringDoctors
            .filter((doc) => doc.name === selectedDoctor)
            .map((doc) => (
              <div className="">
                <p className="font-semibold text-[#715AFF]">{doc.name}</p>
                <div className="flex items-center">
                  <p className="text-sm text-[#102E4A]">{doc.email}</p>
                  <span className="text-[#102E4A] mx-1">|</span>
                  <p className="text-sm text-[#102E4A]">{doc.role}</p>
                  <span className="text-[#102E4A] mx-1">|</span>
                  <p className="text-sm text-[#102E4A]">{doc.department}</p>
                </div>
              </div>
            ))}
        </div>
       </div>

        <div className="mb-3">
          <p className="font-semibold text-[#715AFF]">Doctor Fees</p>
          <input
            onChange={(e) => {
              setfees(e.target.value);
            }}
            placeholder="500/-"
            className="border w-full border-gray-400 rounded p-1.5"
          ></input>
        </div>

        <div>
          <p className="font-semibold text-[#715AFF]">Additional Note</p>
          <textarea
            onChange={(e) => {
              setadditionalNote(e.target.value);
            }}
            placeholder="Add a note for the doctor..."
            className="border-gray-400 rounded border p-1.5 w-full"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              creatingAppointment();
            }}
            className="px-10 mt-5 bg-[#102E4A] text-white py-2 rounded"
          >
            <div className="flex justify-center items-center">
              <FaPlus className="mr-2" />
              Add Appointment
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddAppointments;
