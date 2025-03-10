import React, { useEffect, useState } from "react";
import PatientNavbar from "./PatientNavbar";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { database } from "../FirebaseConfig";
import PatientUpperBar from "./PatientUpperBar";

function PatientDashboard() {
  const [patientDetails, setPatientDetails] = useState([]);
  const colorSequence = [
    "bg-red-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-yellow-500",
  ];

  const getRandomColor = (index) => {
    return colorSequence[index % colorSequence.length];
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

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    const initials = words
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
    return initials;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    if (timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleDateString();
    }
    return timestamp;
  };

  useEffect(() => {
    gatheringPatientDetails();
  }, []);

  return (
    <div className="flex">
      <div>
        <PatientNavbar />
      </div>
     <div className="w-full">
      <PatientUpperBar patientDetails = {patientDetails}/>
     <div className="p-6 bg-gray-50  h-full overflow-auto w-full">
        {patientDetails.map((render, index) => (
          <div className="flex justify-center">
            <div className="bg-white p-5 rounded shadow-xl border">
              <div className="flex items-center justify-center">
                <p
                  className={`py-2.5 text-2xl font-bold text-white px-3 rounded-full ${getRandomColor(
                    index
                  )}`}
                >
                  {getInitials(render.name)}
                </p>
              </div>
 
              <p className="text-center text-[#34b1ff] font-bold text-xl">{render.name}</p>
              <p className="text-center text-gray-400">{render.email}</p>

              <div className="flex items-center mt-7 justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#333333]">0</p>
                  <p>Past Appointments</p>
                </div>

                <span className="text-7xl font-[50] px-6">|</span>

                <div className="text-center">
                  <p className="text-3xl font-bold text-[#333333]">0</p>
                  <p>Upcoming Appointments</p>
                </div>
              </div>
            </div>

            <div className="bg-white ml-2 p-5 rounded shadow-xl border">
              <p className="font-bold text-[#34b1ff] mb-5 text-2xl">Basic Details</p>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-gray-400">Gender</p>
                  <p className="text-[#333333] font-semibold">{render.gender}</p>
                </div>

                <div>
                  <p className="text-gray-400">Birthday</p>
                  <p className="text-[#333333] font-semibold">{formatDate(render.dob)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Phone Number</p>
                  <p className="text-[#333333] font-semibold">{render.phoneNo}</p>
                </div>

                <div>
                  <p className="text-gray-400">Address</p>
                  <p className="text-[#333333] font-semibold">{render.address}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
     </div>
    </div>
  );
}

export default PatientDashboard;
