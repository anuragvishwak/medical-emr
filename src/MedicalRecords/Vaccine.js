import React, { useState } from "react";

function Vaccine({ openingVaccineForm }) {
  const [vaccineType, setvaccineType] = useState("");
  const [vaccineName, setvaccineName] = useState("");

  return (
    <div>
      {openingVaccineForm && (
        <div className="border p-3 rounded-xl border-gray-400">
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
              <input className="border w-full border-gray-300 rounded p-1.5"></input>
            </div>
          </div>

          <div className="grid my-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <div>
              <p className="mb-1">Stock</p>
              <input className="border w-full border-gray-300 rounded p-1.5"></input>
            </div>

            <div>
              <p className="mb-1">Precautions</p>
              <input className="border w-full border-gray-300 rounded p-1.5"></input>
            </div>

            <div>
              <p className="mb-1">Cost</p>
              <input className="border w-full border-gray-300 rounded p-1.5"></input>
            </div>
          </div>

          <div>
            <p className="mb-1">Storage Requirements</p>
            <textarea className="border w-full h-20 border-gray-300 rounded p-1.5"></textarea>
          </div>

          <div className="flex justify-end mt-5">
            <button className="px-6 bg-[#333333] text-white p-2 rounded">
              + Add Vaccine
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vaccine;
