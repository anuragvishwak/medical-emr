import React, { useEffect, useState } from "react";
import AddPatientForm from "./Patient Section/AddPatientForm";
import { collection, getDocs } from "firebase/firestore";
import { database } from "./FirebaseConfig";
import { LuMessageSquareMore, LuUser } from "react-icons/lu";
import { CiMail, CiPhone } from "react-icons/ci";
import { FaBell, FaPencilAlt, FaPlus, FaUser } from "react-icons/fa";
import { BiCalendar, BiNotification } from "react-icons/bi";
import Navbar from "./Navbar";
import { MdDelete } from "react-icons/md";
import NotificationPortal from "./Notification/NotificationPortal";

function Patient() {
  const [openingPatientForm, setOpeningPatientForm] = useState(false);
  const [patientDetails, setPatientDetails] = useState([]);
  const [openingNotification, setopeningNotification] = useState(false);

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
    <div className="bg-[#f7fcff] flex">
      <div>
        <Navbar />
      </div>
      {/* <div className="sm:hidden">
        <button
          onClick={() => setOpeningPatientForm(true)}
          className="text-[#5F4BB6] font-bold"
        >
          <div className="flex border-2 mx-2 p-1.5 rounded border-[#5F4BB6] items-center">
            <FaUser className="" />
          </div>
        </button>
      </div>
      <p className="text-[#5F4BB6] text-2xl sm:text-3xl sm:hidden font-semibold">
        Patient Details
      </p> */}

      <div className="h-screen overflow-auto w-full">
        <div className="">
          <div className="flex w-full p-3 bg-white shadow items-center justify-between">
            <p className="text-xl text-[#5F4BB6] hidden sm:block sm:text-3xl font-semibold">
              Patient Details
            </p>

            <div className="flex items-center">
              <input
                placeholder="search patients"
                className=" border border-gray-300 rounded p-1"
              ></input>
              <div>
                <button
                  onClick={() => setOpeningPatientForm(true)}
                  className="bg-[#5F4BB6] ml-3 sm:mt-0 text-white font-bold text-sm sm:text-base py-1 px-2 sm:px-4 rounded"
                >
                  <div className="flex items-center">
                    <FaPlus className="mr-1" />
                    Add Patient
                  </div>
                </button>
              </div>

              <div>
                <button
                  onClick={() => {
                    setopeningNotification(!openingNotification);
                  }}
                  className="bg-[#333333] text-white py-1 px-2 sm:px-4 rounded ml-3"
                >
                  <div className="flex items-center">
                    <FaBell />
                    <p className="ml-1 font-semibold">Notification</p>
                  </div>
                </button>
              </div>
              <span className="text-gray-300 text-2xl mx-1.5">|</span>
              <button
                onClick={() => setOpeningPatientForm(true)}
                className="text-[#5F4BB6] font-bold"
              >
                <div className="flex items-center">
                  <FaUser className="mr-1" />
                  <p className="">Anurag Vishwakarma</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="grid p-5 grid-cols-1 sm:grid-cols-2 gap-5">
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

                <hr className="my-2" />
                <div className="flex items-center justify-end">
                  <button className="text-blue-500">
                    <FaPencilAlt size={18} />
                  </button>
                  <button className="ml-1 text-red-500">
                    <MdDelete size={23} />
                  </button>
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

      {openingNotification && (
        <NotificationPortal setopeningNotification={setopeningNotification} />
      )}
    </div>
  );
}

export default Patient;
