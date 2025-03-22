import React, { useEffect, useState } from "react";
import AddPatientForm from "./Patient Section/AddPatientForm";
import { collection, getDocs } from "firebase/firestore";
import { database } from "./FirebaseConfig";
import { LuUser } from "react-icons/lu";
import { CiPhone } from "react-icons/ci";
import { FaBell, FaPencilAlt, FaPlus, FaUser } from "react-icons/fa";
import { BiCalendar } from "react-icons/bi";
import Navbar from "./Navbar";
import { MdDelete } from "react-icons/md";
import NotificationPortal from "./Notification/NotificationPortal";

function Patient() {
  const [openingPatientForm, setOpeningPatientForm] = useState(false);
  const [patientDetails, setPatientDetails] = useState([]);
  const [openingNotification, setopeningNotification] = useState(false);

  const colorMap = {
    A: "#26F0F1",
    B: "#33FF57",
    C: "#5733FF",
    D: "#FF33A1",
    E: "#A133FF",
    F: "#33A1FF",
    G: "#FFA133",
    H: "#33FFA1",
    I: "#A1FF33",
    J: "#26F0F1",
    K: "#33FF57",
    L: "#5733FF",
    M: "#FF33A1",
    N: "#A133FF",
    O: "#33A1FF",
    P: "#FFA133",
    Q: "#33FFA1",
    R: "#A1FF33",
    S: "#26F0F1",
    T: "#33FF57",
    U: "#5733FF",
    V: "#FF33A1",
    W: "#A133FF",
    X: "#33A1FF",
    Y: "#FFA133",
    Z: "#33FFA1",
  };

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
    <div className="sm:flex">
      <div className="flex p-3 sm:p-0 bg-white sm:block items-center">
        <Navbar />
        <div className=" sm:hidden">
          <button
            onClick={() => setOpeningPatientForm(true)}
            className="bg-[#715AFF] ml-3 sm:mt-0 text-white font-bold text-sm sm:text-base py-1 px-2 sm:px-4 rounded"
          >
            <div className="flex items-center">
              <FaPlus className="mr-1" />
              Add Patient
            </div>
          </button>
        </div>

        <div className="sm:hidden">
          <button
            onClick={() => {
              setopeningNotification(!openingNotification);
            }}
            className="bg-[#102E4A] text-white py-1 px-2 sm:text-base text-sm sm:px-4 rounded ml-3"
          >
            <div className="flex items-center">
              <FaBell />
              <p className="ml-1 font-semibold">Notification</p>
            </div>
          </button>
        </div>
      </div>

      <div className="h-screen overflow-auto w-full">
        <div className="hidden sm:block">
          <div className="flex w-full p-3 bg-white border-b items-center justify-between">
            <p className="text-xl text-[#715AFF] hidden sm:block sm:text-3xl font-semibold">
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
                  className="bg-[#715AFF] ml-3 sm:mt-0 text-white font-bold text-sm sm:text-base py-1 px-2 sm:px-4 rounded"
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
                  className="bg-[#102E4A] text-white py-1 px-2 sm:px-4 rounded ml-3"
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
                className="text-[#715AFF] font-bold"
              >
                <div className="flex items-center">
                  <FaUser className="mr-1" />
                  <p className="">Anurag Vishwakarma</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="grid p-5 sm:p-4 grid-cols-1 sm:grid-cols-3 gap-4">
          {patientDetails.map((patient) => {
            const initials = patient.name.slice(0, 2).toUpperCase();
            const bgColor =
              colorMap[patient.name[0].toUpperCase()] || "#CCCCCC";
            return (
              <div
                key={patient.id}
                className="bg-white border border-gray-400 p-5 rounded-lg"
              >
                <div className="flex items-start  justify-between">
                  <div className="flex items-center">
                    <p
                      style={{ backgroundColor: bgColor }}
                      className="mr-3 rounded-full py-1 px-1.5 text-lg font-bold"
                    >
                      {initials}
                    </p>
                    <div>
                      <p className="font-bold text-[#715AFF]">{patient.name}</p>
                      <p className="text-[#102E4A] text-sm">{patient.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <button className="text-[#715AFF]">
                      <FaPencilAlt size={18} />
                    </button>
                    <button className="ml-1 text-[#102E4A]">
                      <MdDelete size={23} />
                    </button>
                  </div>
                </div>
                <hr className="my-5" />
                <div className="">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex items-center">
                      <LuUser
                        size={30}
                        className="bg-[#e9e5fb] text-[#715AFF] p-1 rounded"
                      />
                      <div className="ml-2">
                        <p className="font-semibold text-sm">Age</p>
                        <p className="text-gray-400">{patient.age} Years</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <CiPhone
                        size={30}
                        className="bg-[#e9e5fb] text-[#715AFF] p-1 rounded"
                      />
                      <div className="ml-2">
                        <p className="font-semibold text-sm">Phone</p>
                        <p className="text-gray-400">{patient.phoneNo}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex items-center">
                      <BiCalendar
                        size={30}
                        className="bg-[#e9e5fb] text-[#715AFF] p-1 rounded"
                      />
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
                      <LuUser
                        size={30}
                        className="bg-[#e9e5fb] text-[#715AFF] p-1 rounded"
                      />
                      <div className="ml-2">
                        <p className="font-semibold text-sm">Gender</p>
                        <p className="text-gray-400">{patient.gender}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
