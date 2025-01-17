import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfig";
import { FaBars, FaDumpster, FaPlus, FaRupeeSign } from "react-icons/fa";
import { Formik, Form, Field, FieldArray } from "formik";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Treatment from "./Treatment";
import VaccineMedicine from "./VaccineMedicine";

function AddMedicalRecord({ setopeningMedicalRecord }) {
  const [patientDetails, setPatientDetails] = useState([]);
  const [appointmentDetails, setappointmentDetails] = useState([]);
  const [selectPatient, setselectPatient] = useState("");
  const [clinicalNotes, setclinicalNotes] = useState("");
  const [recordTabs, setrecordTabs] = useState("medicine");
  const [openingNavbar, setopeningNavbar] = useState(false);

  async function submittingMedicalRecord(values) {
    try {
      await addDoc(collection(database, "medical_records"), {
        patient: selectPatient,
        clinical_note: clinicalNotes,
        allergies: values.allergies,
        immunization_records: values.immunization_records,
      });
      toast.success("Medical Record created successfully!!!!");
    } catch (e) {
      console.log("Error", e);
      toast.error("Something went wrong!!!");
    }
  }

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
      <div className="bg-white overflow-auto h-[550px] w-auto sm:w-8/12  m-5 sm:m-0 p-5 rounded">
        <div className="flex mb-3 justify-between">
          <div className="flex items-center">
            <button
              onClick={() => {
                setopeningNavbar(!openingNavbar);
              }}
              className="text-[#333333]"
            >
              <FaBars
                size={20}
                className="border sm:hidden border-[#333333] p-1 rounded"
              />
            </button>
            <p className="ml-2 font-bold text-xl sm:text-2xl">Add Medical Record</p>
          </div>
          <button
            onClick={() => {
              setopeningMedicalRecord(false);
            }}
            className="text-red-500 font-semibold"
          >
            Close
          </button>
        </div>

        {openingNavbar && (
          <div className="sm:text-base absolute border bg-white shadow-xl  p-3 rounded sm:hidden text-sm font-semibold ">
            <div>
              <button
                className={`${
                  recordTabs === "medicine"
                    ? "text-[#333333] border-b border-[#333333]"
                    : "text-gray-400"
                }`}
                onClick={() => {
                  setrecordTabs("medicine");
                }}
              >
                Vaccines & Medicines
              </button>
            </div>
            <div>
              <button
                className={`my-3 ${
                  recordTabs === "treatment"
                    ? "text-[#333333] border-b border-[#333333]"
                    : "text-gray-400"
                }`}
                onClick={() => {
                  setrecordTabs("treatment");
                }}
              >
                Treatment
              </button>
            </div>
            <div>
              <button
                className={`${
                  recordTabs === "medical_record"
                    ? "text-[#333333] border-b border-[#333333]"
                    : "text-gray-400"
                }`}
                onClick={() => {
                  setrecordTabs("medical_record");
                }}
              >
                Create Medical Record
              </button>
            </div>
          </div>
        )}

        <div className="sm:text-base hidden sm:flex text-sm  md:w-11/12 lg:w-7/12 xl:w-6/12 font-semibold  items-center justify-between">
          <button
            className={`${
              recordTabs === "medicine"
                ? "text-[#333333] border-b border-[#333333]"
                : "text-gray-400"
            }`}
            onClick={() => {
              setrecordTabs("medicine");
            }}
          >
            Vaccines & Medicines
          </button>
          <button
            className={`${
              recordTabs === "treatment"
                ? "text-[#333333] border-b border-[#333333]"
                : "text-gray-400"
            }`}
            onClick={() => {
              setrecordTabs("treatment");
            }}
          >
            Treatment
          </button>
          <button
            className={`${
              recordTabs === "medical_record"
                ? "text-[#333333] border-b border-[#333333]"
                : "text-gray-400"
            }`}
            onClick={() => {
              setrecordTabs("medical_record");
            }}
          >
            Create Medical Record
          </button>
        </div>
        <hr className="hidden sm:block" />

        {recordTabs === "medical_record" ? (
          <div className="md:flex justify-between w-full mt-4">
            <div className="w-full">
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
                <div className="my-5">
                  <div className="">
                    <p className="text-lg font-semibold">Patient Details</p>
                    {patientDetails
                      .filter((patient) => patient.name === selectPatient)
                      .map((patient) => (
                        <div className="text-gray-500 sm:flex items-center justify-between">
                          <p>{patient.name}</p>
                          <span className="mx-2 hidden sm:block">|</span>
                          <p className="">{patient.email}</p>
                          <span className="mx-2 hidden sm:block">|</span>
                          <p>{patient.gender}</p>
                          <span className="mx-2 hidden sm:block">|</span>
                          <p>{patient.phoneNo}</p>
                        </div>
                      ))}
                  </div>

                  <div className="mt-2">
                    <p className="text-lg mb-2 font-semibold">
                      Appointment Details
                    </p>
                    <div className="h-60 overflow-auto">
                      {appointmentDetails
                        .filter(
                          (appointment) => appointment.patient === selectPatient
                        )
                        .map((appointment, index) => (
                          <div className="text-gray-500 border  p-2 rounded mb-4">
                            <p className="font-semibold text-[#333333]">
                              Appointment {index + 1}
                            </p>
                            <div className="flex justify-between">
                              <p>Type: {appointment.appointmentType}</p>
                              <div className="flex items-center">
                                <p className="mr-1">Fees:</p>
                                <FaRupeeSign className="" />
                                <p className="">{appointment.fees}/-</p>
                              </div>
                            </div>
                            <hr className="my-2" />
                            <p>Note: {appointment.additionalNote}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-2xl mt-10 font-semibold text-center text-gray-400">
                  Please Select a patient to view their details
                </p>
              )}
            </div>
            <div className="sm:ml-8 w-full">
              <p className="text-lg mb-2 font-semibold">Medical History</p>
              <div>
                <Formik
                  initialValues={{
                    allergies: [""],
                    immunization_records: [""],
                  }}
                  onSubmit={(values) => {
                    console.log("Form values:", values);
                    submittingMedicalRecord(values);
                  }}
                >
                  {({ values }) => (
                    <Form>
                      <div className="">
                        <FieldArray name="allergies">
                          {({ push, remove }) => (
                            <div>
                              {values.allergies.map((_, index) => (
                                <div key={index} className="mb-4">
                                  <div className="flex items-center">
                                    <label htmlFor={`allergies.${index}`}>
                                      Allergy
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => push("")}
                                      className="bg-[#333333] text-white p-1 text-sm rounded-full mt-1 ml-1"
                                    >
                                      <FaPlus />
                                    </button>
                                  </div>
                                  <div className="flex items-center">
                                    <Field
                                      name={`allergies.${index}`}
                                      placeholder="Enter allergy"
                                      className="border p-2 rounded w-full"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="text-red-500 ml-1 text-xl"
                                    >
                                      <MdDelete />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </FieldArray>

                        <FieldArray name="immunization_records">
                          {({ push, remove }) => (
                            <div>
                              {values.immunization_records.map((_, index) => (
                                <div key={index} className="mb-4">
                                  <div className="flex items-center">
                                    <label
                                      htmlFor={`immunization_records.${index}`}
                                    >
                                      Immunization Records (Vaccines)
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => push("")}
                                      className="bg-[#333333] text-white p-1 text-sm rounded-full mt-1 ml-1"
                                    >
                                      <FaPlus />
                                    </button>
                                  </div>
                                  <div className="flex items-center">
                                    <Field
                                      name={`immunization_records.${index}`}
                                      placeholder="Enter immunization record"
                                      className="border p-2 rounded w-full"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="text-red-500 ml-1 text-xl"
                                    >
                                      <MdDelete />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </FieldArray>
                      </div>

                      <div>
                        <p>Clinical Note:</p>
                        <textarea
                          onChange={(e) => {
                            setclinicalNotes(e.target.value);
                          }}
                          placeholder="add a clinical note...."
                          className="border w-full border-gray-300 rounded p-1.5 h-28"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-[#333333] w-full text-white p-2 rounded mt-4"
                      >
                        Submit
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        ) : recordTabs === "treatment" ? (
          <Treatment />
        ) : (
          <VaccineMedicine />
        )}
      </div>
    </div>
  );
}

export default AddMedicalRecord;
