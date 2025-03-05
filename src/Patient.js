import React, { useEffect, useState } from "react";
import AddPatientForm from "./Patient Section/AddPatientForm";
import { collection, getDocs } from "firebase/firestore";
import { database } from "./FirebaseConfig";
import { LuUser } from "react-icons/lu";
import { CiMail, CiPhone } from "react-icons/ci";
import { FaPencilAlt, FaPlus, FaUser } from "react-icons/fa";
import { BiCalendar } from "react-icons/bi";
import Navbar from "./Navbar";
import { MdDelete } from "react-icons/md";

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
    <div className="bg-[#f7fcff] w-full sm:flex min-h-screen h-full">
      <div className="flex items-center p-4 sm:p-0">
      <Navbar />
      <div className="sm:hidden">
            <button
              onClick={() => setOpeningPatientForm(true)}
              className="text-[#34b1ff] font-bold"
            >
              <div className="flex border-2 mx-2 p-1.5 rounded border-[#34b1ff] items-center">
                <FaUser className="" />
              </div>
            </button>
          </div>
        <p className="text-[#34b1ff] text-2xl sm:text-3xl sm:hidden font-semibold">
          Patient Details
        </p>
      </div>

      <div className="w-full px-5  sm:p-5">
        <div className="flex justify-between">
          <div>
            <p className="text-xl text-[#34b1ff] hidden sm:block sm:text-3xl font-semibold">
              Patient Details
            </p>
            <p className="text-[#333333] hidden sm:block">
              Here, you can manage patients and view their details seamlessly.
            </p>
          </div>
          <div className="hidden sm:block">
            <button
              onClick={() => setOpeningPatientForm(true)}
              className="text-[#34b1ff] font-bold"
            >
              <div className="flex items-center">
                <FaUser className="mr-1" />
                <p className="">Anurag Vishwakarma</p>
              </div>
            </button>
          </div>
        </div>

        <div className="flex border-y border-gray-300 py-2 my-2 items-center">
          <input
            placeholder="search patients"
            className=" sm:w-60 border border-gray-300 rounded p-1.5"
          ></input>
          <div>
            <button
              onClick={() => setOpeningPatientForm(true)}
              className="bg-[#34b1ff] ml-3 sm:mt-0 text-white font-bold text-sm sm:text-base py-1.5 px-2 sm:px-4 rounded"
            >
              <div className="flex items-center">
                <FaPlus className="mr-1" />
                Add Patient
              </div>
            </button>
          </div>
        </div>

        <div className="grid overflow-auto h-screen sm:h-auto grid-cols-1 sm:grid-cols-2 gap-5">
          {patientDetails.map((patient) => (
            <div
              key={patient.id}
              className="bg-white border p-5 rounded-lg shadow"
            >
              <div>
                <p className="font-bold text-xl">{patient.name}</p>
                <p className="text-gray-400">{patient.email}</p>
              </div>
              <hr className="my-3" />
              <div className="">
                <div className="grid grid-cols-2 gap-5">
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
                </div>

                <div className="grid grid-cols-2 gap-5">
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

                  <div className="flex items-center">
                    <LuUser size={30} className="bg-gray-200 p-1 rounded" />
                    <div className="ml-2">
                      <p className="font-semibold text-sm">Gender</p>
                      <p className="text-gray-400">{patient.gender}</p>
                    </div>
                  </div>
                </div>

                <hr className="my-2"/>
                <div className="flex items-center justify-end">
                  <button className="text-blue-500"><FaPencilAlt size={18} /></button>
                  <button className="ml-1 text-red-500"><MdDelete size={23} /></button>
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
