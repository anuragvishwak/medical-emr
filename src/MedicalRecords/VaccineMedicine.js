import React, { useState } from "react";
import Vaccine from "./Vaccine";

function VaccineMedicine() {
  const [medType, setmedType] = useState("vaccine");
  const [openiningVaccineForm, setopeningVaccineForm] = useState(false);
  return (
    <div>
      <div className="sm:flex items-center my-3 justify-between">
        <p className="text-[#333333]  text-2xl font-semibold">
          {medType === "vaccine" ? "Vaccine" : "Medicine"}
        </p>

        <div className="flex items-center">
          <button
            onClick={() => {
                setopeningVaccineForm(!openiningVaccineForm);
            }}
            className={`bg-[#333333] rounded text-white px-3 py-1 ${
              medType === "medicine" ? "hidden" : "block"
            }`}
          >
            Add Vaccine
          </button>
          <button
            className={`bg-[#333333] rounded text-white px-3 py-1 ${
              medType === "vaccine" ? "hidden" : "block"
            }`}
          >
            Add Medicine
          </button>

          <div className="bg-gray-100 ml-4 shadow-inner text-sm border rounded w-40 flex items=center justify-between p-1">
            <button
              className={`px-2 py-1 ${
                medType === "vaccine" ? "bg-white rounded shadow" : ""
              }`}
              onClick={() => {
                setmedType("vaccine");
              }}
            >
              Vaccines
            </button>
            <button
              className={`px-2 py-1 ${
                medType === "medicine" ? "bg-white rounded shadow" : ""
              }`}
              onClick={() => {
                setmedType("medicine");
              }}
            >
              Medicines
            </button>
          </div>
        </div>

      </div>
        <Vaccine openingVaccineForm = {openiningVaccineForm}/>
    </div>
  );
}

export default VaccineMedicine;
