import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfig";
import { toast } from "react-toastify";
import { setCurrentScreen } from "firebase/analytics";
import { RiMedicineBottleLine, RiPsychotherapyFill } from "react-icons/ri";
import { BiInjection } from "react-icons/bi";
import { FaRegHospital } from "react-icons/fa";

function Treatment() {
  const [openingTreatment, setopeningTreatment] = useState(false);
  const [treatmentType, settreatmentType] = useState("");
  const [theraphy, settherapy] = useState("");
  const [dosage, setdosage] = useState("");
  const [strength, setstrength] = useState("");
  const [medicineName, setmedicineName] = useState("");
  const [treatmentName, setreatmentName] = useState("");
  const [currentTab, setcurrrentTab] = useState("view");
  const [gatheringTreatmentDetails, setgatheringTreatmentDetails] = useState(
    []
  );

  async function treatmentDetails() {
    try {
      const treatment = getDocs(collection(database, "treatments"));
      let multipleArray = (await treatment).docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setgatheringTreatmentDetails(multipleArray);
    } catch {
      console.log("Something went wrong.");
    }
  }

  async function submittingTreatments() {
    try {
      await addDoc(collection(database, "treatments"), {
        treatmentType: treatmentType,
        therapy: theraphy,
        dosage: dosage,
        strength: strength,
        medicineName: medicineName,
        treatmentName: treatmentName,
      });
      toast.success("Treatment added successfully!!");
      setopeningTreatment(false);
    } catch {
      toast.error("Something went wrong!!!");
    }
  }

  useEffect(() => {
    treatmentDetails();
  }, []);

  console.log(gatheringTreatmentDetails);

  return (
    <div>
      <div className="sm:flex items-center my-3 justify-between">
        <p className="text-[#333333]  text-2xl font-semibold">Treatments</p>
        <div className="bg-gray-100 shadow-inner text-sm border rounded w-60 flex items=center justify-between p-1">
          <button
            className={` px-2 py-1 ${
              currentTab === "add" ? "bg-white rounded shadow" : ""
            }`}
            onClick={() => {
              setcurrrentTab("add");
            }}
          >
            Add Treatment
          </button>

          <button
            className={` px-2 py-1 ${
              currentTab === "view" ? "bg-white rounded shadow" : ""
            }`}
            onClick={() => {
              setcurrrentTab("view");
            }}
          >
            View Treatment
          </button>
        </div>
      </div>
      {currentTab === "add" ? (
        <div className="border border-gray-400 text-[#333333] p-3 rounded">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <div className="">
              <p>Treatment Type:</p>
              <select
                className="border w-full p-1.5 rounded border-gray-400"
                onChange={(e) => {
                  const appointment = e.target.value;
                  settreatmentType(appointment);
                }}
              >
                <option>Select Treatment Type</option>
                <option>General Medicine (MBBS)</option>
                <option>Surgical Treatments</option>
                <option>Dental Treatments</option>
                <option>Psychological Treatment</option>
              </select>
            </div>
            <div>
              <p>Treatment Name:</p>
              <input
                onChange={(e) => {
                  setreatmentName(e.target.value);
                }}
                placeholder="Root Canal"
                className="border w-full border-gray-400 rounded p-1.5"
              ></input>
            </div>

            <div className="">
              <p>Therapy:</p>
              <select
                className="border w-full p-1.5 rounded border-gray-400"
                onChange={(e) => {
                  const appointment = e.target.value;
                  settherapy(appointment);
                }}
              >
                <option>select Therapy</option>
                <option>Physical Therapy</option>
                <option>Psychotherapy</option>
              </select>
            </div>
          </div>

          <div className="mt-2">
            <p className="text-lg font-semibold text-gray-400">Medications:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              <div>
                <p>Medication Name</p>
                <input
                  onChange={(e) => {
                    setmedicineName(e.target.value);
                  }}
                  placeholder="Combiflam"
                  className="border w-full border-gray-400 rounded p-1.5"
                ></input>
              </div>

              <div className="">
                <p>Dosage Type:</p>
                <select
                  className="border w-full p-1.5 rounded border-gray-400"
                  onChange={(e) => {
                    const appointment = e.target.value;
                    setdosage(appointment);
                  }}
                >
                  <option>Select Dosage Form</option>
                  <option>Tablet</option>
                  <option>Syrup</option>
                  <option>Injection</option>
                </select>
              </div>

              <div className="">
                <p>Strenth:</p>
                <select
                  className="border w-full p-1.5 rounded border-gray-400"
                  onChange={(e) => {
                    const appointment = e.target.value;
                    setstrength(appointment);
                  }}
                >
                  <option>Select Strength </option>
                  <option>100mg</option>
                  <option>250mg</option>
                  <option>500mg</option>
                </select>
              </div>
            </div>
            <div className="flex  mt-3 justify-end">
              <button
                onClick={() => {
                  submittingTreatments();
                }}
                className="bg-[#333333] text-white py-1 px-3 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {gatheringTreatmentDetails.map((treat) => (
            <div className="border p-3 rounded-xl shadow">
              <p className="text-xl font-bold text-[#333333]">
                {treat.treatmentName}
              </p>
              <p className="text-gray-500">{treat.treatmentType}</p>

              <div className="grid mt-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                <div className="flex items-center">
                  <RiMedicineBottleLine size={30} className="text-gray-500" />
                  <div>
                    <p className="font-semibold text-[#333333]">Medicine:</p>
                    <div className="flex text-gray-500 items-center">
                      <p>{treat.medicineName}</p>
                      <span>-</span>
                      <p>{treat.strength}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <BiInjection className="text-gray-500" size={28} />
                  <div>
                    <p className="font-semibold text-[#333333]">Dosage:</p>
                    <p className="text-gray-500">{treat.dosage}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <RiPsychotherapyFill className="text-gray-500" size={28} />
                  <div>
                    <p className="font-semibold text-[#333333]">Therapy:</p>
                    <p className="text-gray-500">{treat.therapy}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Treatment;
