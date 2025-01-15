import React, { useEffect, useState } from "react";
import AddPatientForm from "./Patient Section/AddPatientForm";
import { collection, getDocs } from "firebase/firestore";
import { database } from "./FirebaseConfig";
import { LuUser } from "react-icons/lu";
import { CiMail, CiPhone } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { BiCalendar } from "react-icons/bi";
import Navbar from "./Navbar";

function Patient() {
  const [openingPatientForm, setOpeningPatientForm] = useState(false);
  const [patientDetails, setPatientDetails] = useState([]);

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
    <div className="bg-gray-50 w-full sm:flex min-h-screen h-full">
      <div className="flex p-4 sm:p-0 items-center ">
        <Navbar />
        <p className=" ml-2 text-3xl sm:hidden font-semibold">Patient Details</p>
      </div>

      <div className="w-full px-5 sm:p-5">
        <div className="flex items-end mb-3 sm:mb-5 justify-between">
          <div>
            <p className="text-xl hidden sm:block sm:text-3xl font-semibold">Patient Details</p>
            <p className="text-gray-400 hidden sm:block">
              Here, you can manage patients and view their details seamlessly.
            </p>
          </div>
          <div>
            <button
              onClick={() => setOpeningPatientForm(true)}
              className="bg-[#333333] mt-2 sm:mt-0 text-white font-bold text-sm sm:text-base py-2 px-2 sm:px-4 rounded"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
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
                      {new Date(
                        patient?.dob?.seconds * 1000
                      ).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {openingPatientForm && (
        <AddPatientForm
          gatheringPatientDetails={gatheringPatientDetails}
          setOpeningPatientForm={setOpeningPatientForm}
        />
      )}
    </div>
  );
}

export default Patient;
