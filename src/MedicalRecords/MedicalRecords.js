import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Navbar from "../Navbar";
import AddMedicalRecord from "./AddMedicalRecord";

function MedicalRecords() {

    const [openingMedicalRecord, setopeningMedicalRecord] = useState(false); 

  return (
    <div className="flex">
      <div>
        <Navbar />
      </div>
      <div className="p-5 bg-gray-50 w-full">
      <div className="flex items-center justify-between">
        <div className="">
          <p className="text-3xl font-semibold">Medical Record</p>
          <p className="text-gray-400">Here you can manage medical records of the patients.</p>
        </div>
        <button 
        onClick={()=>{
            setopeningMedicalRecord(true);
        }}
        className="bg-[#333333] text-white py-2  px-4 rounded">
          <div className="flex items-center">
            <FaPlus className="mr-1"/>
            <p> Add Medical Record</p>
          </div>
        </button>
      </div>
      </div>


      {openingMedicalRecord && <AddMedicalRecord setopeningMedicalRecord = {setopeningMedicalRecord} />}
    </div>
  );
}

export default MedicalRecords;
