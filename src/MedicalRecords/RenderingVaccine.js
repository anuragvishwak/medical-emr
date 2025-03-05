import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../FirebaseConfig";
import { BiInjection } from "react-icons/bi";
import { FaBox, FaRupeeSign } from "react-icons/fa";

function RenderingVaccine() {
  const [gatheringVaccineDetails, setgatheringVaccineDetails] = useState();
  async function vaccineDetails() {
    try {
      const treatment = getDocs(collection(database, "vaccine"));
      let multipleArray = (await treatment).docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setgatheringVaccineDetails(multipleArray);
      console.log(multipleArray);
    } catch {
      console.log("Something went wrong.");
    }
  }

  useEffect(() => {
    vaccineDetails();
  }, []);

  return (
    <div>
      {gatheringVaccineDetails?.map((vaccine) => (
        <div className="border rounded-xl shadow p-5">
          <div className="sm:flex items-center justify-between">
            <p className="text-xl font-bold text-[#333333]">
              {vaccine.vaccineName}
            </p>
            <div>
              <p className="text-blue-500 bg-blue-100 px-3 rounded-full font-semibold">
                {vaccine.vaccineType}
              </p>
            </div>
          </div>

          <div className="md:flex items-center my-4 justify-between">
            <div className="flex items-center">
              <BiInjection className="text-gray-500" size={20} />
              <p className="font-semibold text-[#333333]">Dosage:</p>
              <p className="text-gray-500 ml-2">{vaccine.dosage} mg</p>
            </div>

            <div className="flex items-center">
              <FaBox className="text-gray-500 mr-1" />
              <p className="font-semibold text-[#333333]">Stock:</p>
              <p className="text-gray-500 ml-2">{vaccine.stock} Qty</p>
            </div>

            <div className="flex items-center">
              <FaRupeeSign className="text-gray-500 mr-1" />
              <p className="font-semibold text-[#333333]">Cost:</p>
              <p className="text-gray-500 ml-2">{vaccine.cost}/-</p>
            </div>
          </div>

          <div
            className="border-l-8 
          border-gray-300"
          >
            <div className="bg-gray-50 text-sm sm:text-base p-3 mb-3 border">
              <p className="font-semibold text-gray-700">
                Storage Requirements
              </p>
              <p className="text-gray-500">{vaccine.storageRequirements}</p>
            </div>
          </div>

          <div
            className="border-l-8 
          border-gray-300"
          >
            <div className="bg-gray-50 p-3 text-sm sm:text-base  border">
              <p className="font-semibold text-gray-700">Precautions</p>
              <p className="text-gray-500">{vaccine.precaution}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RenderingVaccine;
