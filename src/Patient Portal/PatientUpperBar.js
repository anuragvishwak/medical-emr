import React, { useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import PatientNotification from "../Notification/PatientNotification";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfig";

function PatientUpperBar() {
  const [openingPatientNotification, setopeningPatientNotification] =
    useState(false);

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
    <div className="bg-white shadow border-b border-gray-300 p-2">
      {patientDetails?.map((render) => (
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Welcome, {render.name}</p>
          <button
            onClick={() => {
              setopeningPatientNotification(!openingPatientNotification);
            }}
            className=""
          >
            <BiBell
              size={30}
              className="border-2 text-white bg-[#333333] border-[#333333] p-1 rounded-full"
            />
          </button>
        </div>
      ))}

      {openingPatientNotification && (
        <PatientNotification
          setopeningPatientNotification={setopeningPatientNotification}
        />
      )}
    </div>
  );
}

export default PatientUpperBar;
