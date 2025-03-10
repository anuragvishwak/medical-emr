import React, { useEffect, useState } from "react";
import PatientNavbar from "./PatientNavbar";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../FirebaseConfig";
import { BiBell } from "react-icons/bi";
import PatientUpperBar from "./PatientUpperBar";

function PatientAppointment() {
  const [appointmentDetails, setappointmentDetails] = useState([]);

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
    gatheringAppointmentDetails();
  }, []);

  return (
    <div className="flex">
      <div>
        <PatientNavbar />
      </div>
      <div className="w-full  bg-gray-50">
        <PatientUpperBar />
        <div className="p-5">
          {appointmentDetails.map((appoint) => (
            <div>
              <p>{appoint.doctor}</p>
              <p></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientAppointment;
