import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { database } from "../FirebaseConfig";
import { toast } from "react-toastify";
import RenderingVaccine from "./RenderingVaccine";

function Vaccine({ openingVaccineForm, setopeningVaccineForm }) {
  const [vaccineType, setvaccineType] = useState("");
  const [vaccineName, setvaccineName] = useState("");
  const [stock, setstock] = useState("");
  const [precaution, setprecaution] = useState("");
  const [cost, setcost] = useState();
  const [storageRequirements, setstoreageRequirements] = useState("");
  const [dosage, setdosage] = useState("");


  async function submittingVccines() {
    try {
      await addDoc(collection(database, "vaccine"), {
        vaccineType: vaccineType,
        vaccineName: vaccineName,
        stock: stock,
        precaution: precaution,
        storageRequirements: storageRequirements,
        dosage: dosage,
        cost: cost
      });
      toast.success("Treatment added successfully!!");
      setopeningVaccineForm(false);
    } catch {
      toast.error("Something went wrong!!!");
    }
  }

  return (
    <div>
      {openingVaccineForm && (
        <div className="border p-3 mb-5 rounded-xl border-gray-400">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-5">
            <div>
              <p className="mb-1">Name</p>
              <input
                onChange={(e) => {
                  setvaccineName(e.target.value);
                }}
                className="border w-full border-gray-300 rounded p-1.5"
              ></input>
            </div>

            <div className="">
              <p className="mb-1">Type</p>
              <select
                className="border p-1.5 rounded w-full border-gray-300"
                onChange={(e) => {
                  const appointment = e.target.value;
                  setvaccineType(appointment);
                }}
              >
                <option>Inactivated vaccine</option>
                <option>Live-attenuated vaccine</option>
                <option>Messenger RNA</option>
              </select>
            </div>

            <div>
              <p className="mb-1">Dosage</p>
              <input
                onChange={(e) => {
                  setdosage(e.target.value);
                }}
                className="border w-full border-gray-300 rounded p-1.5"
              ></input>
            </div>
          </div>

          <div className="grid my-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <div>
              <p className="mb-1">Stock</p>
              <input
                onChange={(e) => {
                  setstock(e.target.value);
                }}
                className="border w-full border-gray-300 rounded p-1.5"
              ></input>
            </div>

            <div>
              <p className="mb-1">Precautions</p>
              <input
                onChange={(e) => {
                  setprecaution(e.target.value);
                }}
                className="border w-full border-gray-300 rounded p-1.5"
              ></input>
            </div>

            <div>
              <p className="mb-1">Cost</p>
              <input
                onChange={(e) => {
                  setcost(e.target.value);
                }}
                className="border w-full border-gray-300 rounded p-1.5"
              ></input>
            </div>
          </div>

          <div>
            <p className="mb-1">Storage Requirements</p>
            <textarea
              onChange={(e) => {
                setstoreageRequirements(e.target.value);
              }}
              className="border w-full h-20 border-gray-300 rounded p-1.5"
            ></textarea>
          </div>

          <div className="flex justify-end mt-5">
            <button
              onClick={() => {
                submittingVccines();
              }}
              className="px-6 bg-[#333333] text-white p-2 rounded"
            >
              + Add Vaccine
            </button>
          </div>
        </div>
      )}

      <RenderingVaccine />
    </div>
  );
}

export default Vaccine;
