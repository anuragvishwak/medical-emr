import React, { useEffect, useState } from "react";
import AddPatientForm from "./Patient Section/AddPatientForm";
import { collection, getDocs } from "firebase/firestore";
import { database } from "./FirebaseConfig";
import { LuUser } from "react-icons/lu";
import { CiMail, CiPhone } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { Calendar } from "lucide";
import { BiCalendar } from "react-icons/bi";
import Navbar from "./Navbar";

function Patient() {
  const [openingPatientForm, setOpeningPatientForm] = useState(false);
  const [patientDetails, setPatientDetails] = useState([]);

  const dateFormat = new Date();

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
    <div className="bg-gray-50 flex min-h-screen h-full">
      <div>
        <Navbar />
      </div>
      <div className="w-full p-5">
        <div className="flex items-end mb-5 justify-between">
          <div>
            <p className="text-3xl font-semibold">Patient Details</p>
            <p className="text-gray-400">
              Here, you can manage patients and view their details seamlessly.
            </p>
          </div>
          <div>
            <button
              onClick={() => setOpeningPatientForm(true)}
              className="bg-[#333333] text-white font-bold py-2 px-4 rounded"
            >
              <div className="flex items-center">
                <FaPlus className="mr-1" />
                Add Patient
              </div>
            </button>
          </div>
        </div>

        <div className="">
          {patientDetails.map((patient) => (
            <div
              key={patient.id}
              className="bg-white border p-5 rounded-lg mb-3 shadow"
            >
              <div>
                <p className="font-bold text-xl">{patient.name}</p>
                <p className="text-gray-400">{patient.email}</p>
              </div>
              <hr className="my-3" />
              <div className="flex items-center w-9/12 justify-between">
                <div className="flex items-center">
                  <LuUser size={30} className="bg-gray-200 p-1 rounded" />
                  <div className="ml-2">
                    <p className="font-semibold text-sm">Age</p>
                    <p className="text-gray-400">{patient.age} Years</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <CiPhone size={30} className="bg-gray-200 p-1 rounded" />
                  <div className="ml-2">
                    <p className="font-semibold text-sm">Phone</p>
                    <p className="text-gray-400">+91 {patient.phoneNo}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <CiMail size={30} className="bg-gray-200 p-1 rounded" />
                  <div className="ml-2">
                    <p className="font-semibold text-sm">Email</p>
                    <p className="text-gray-400">{patient.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <LuUser size={30} className="bg-gray-200 p-1 rounded" />
                  <div className="ml-2">
                    <p className="font-semibold text-sm">Gender</p>
                    <p className="text-gray-400">{patient.gender}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <BiCalendar size={30} className="bg-gray-200 p-1 rounded" />
                  <div className="ml-2">
                    <p className="font-semibold text-sm">Date of Birth</p>
                    <p className="text-gray-400">
                      {new Date(patient.dob.seconds * 1000).toLocaleDateString(
                        "en-GB"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {openingPatientForm && (
        <AddPatientForm setOpeningPatientForm={setOpeningPatientForm} />
      )}
    </div>
  );
}

export default Patient;
