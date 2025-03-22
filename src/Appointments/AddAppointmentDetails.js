import { collection, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { doc } from "firebase/firestore";
import { database, db } from "../FirebaseConfig";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { toast } from "react-toastify";

function AddAppointmentDetails({
  setopeningAdditionalDetailsForm,
  gatheringWholeDetails,
}) {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [temprature, settemperature] = useState("");
  const [bloodPressure, setbloodPressure] = useState("");
  const [heartRate, setheartRate] = useState("");
  const [oxygenSaturation, setoxygenSaturation] = useState("");

const symptoms = [
    {
      id: "fever",
      name: "Fever",
      description: "High body temperature, chills, and sweating.",
      commonCauses: ["Flu", "Infection", "Heat exhaustion"],
      severity: "Moderate",
      diagnosis: ["Viral Infection", "Bacterial Infection"],
      medications: ["Paracetamol", "Ibuprofen"],
      tests: ["Blood Test", "CBC"],
      treatmentPlan: ["Hydration", "Rest", "Fever Medication"],
    },
    {
      id: "cough",
      name: "Cough",
      description: "Persistent dry or wet cough.",
      commonCauses: ["Cold", "Allergy", "Bronchitis"],
      severity: "Mild to Severe",
      diagnosis: ["Common Cold", "Bronchitis"],
      medications: ["Cough Syrup", "Antihistamines"],
      tests: ["Chest X-ray", "Sputum Test"],
      treatmentPlan: ["Steam Inhalation", "Cough Suppressant"],
    },
    {
      id: "headache",
      name: "Headache",
      description: "Pain or pressure in the head.",
      commonCauses: ["Stress", "Dehydration", "Migraine"],
      severity: "Mild to Severe",
      diagnosis: ["Migraine", "Tension Headache"],
      medications: ["Aspirin", "Ibuprofen"],
      tests: ["MRI", "CT Scan"],
      treatmentPlan: ["Pain Relief Medication", "Relaxation Therapy"],
    },
    {
      id: "fatigue",
      name: "Fatigue",
      description: "Extreme tiredness or lack of energy.",
      commonCauses: ["Lack of sleep", "Anemia", "Chronic illness"],
      severity: "Moderate",
      diagnosis: ["Iron Deficiency", "Chronic Fatigue Syndrome"],
      medications: ["Iron Supplements", "Vitamin B12"],
      tests: ["Blood Test", "Thyroid Function Test"],
      treatmentPlan: ["Balanced Diet", "Regular Exercise", "Stress Management"],
    },
    {
      id: "shortnessOfBreath",
      name: "Shortness of Breath",
      description: "Difficulty in breathing or feeling breathless.",
      commonCauses: ["Asthma", "Heart issues", "COVID-19"],
      severity: "Severe",
      diagnosis: ["Asthma", "Pneumonia", "Heart Disease"],
      medications: ["Inhalers", "Bronchodilators"],
      tests: ["Pulmonary Function Test", "Chest X-ray"],
      treatmentPlan: ["Oxygen Therapy", "Inhalation Medication"],
    },
    {
      id: "soreThroat",
      name: "Sore Throat",
      description: "Pain or irritation in the throat.",
      commonCauses: ["Cold", "Flu", "Allergy"],
      severity: "Mild",
      diagnosis: ["Viral Pharyngitis", "Strep Throat"],
      medications: ["Lozenges", "Pain Relievers"],
      tests: ["Throat Swab Test"],
      treatmentPlan: ["Warm Salt Water Gargle", "Rest", "Pain Relievers"],
    },
    {
      id: "nausea",
      name: "Nausea",
      description: "Feeling of vomiting or uneasiness in the stomach.",
      commonCauses: ["Food poisoning", "Pregnancy", "Motion sickness"],
      severity: "Moderate",
      diagnosis: ["Gastroenteritis", "Vertigo"],
      medications: ["Antiemetics", "Ginger Supplements"],
      tests: ["Stool Test", "Blood Test"],
      treatmentPlan: ["Stay Hydrated", "Small Frequent Meals"],
    },
    {
      id: "dizziness",
      name: "Dizziness",
      description: "Feeling lightheaded or unsteady.",
      commonCauses: ["Low blood pressure", "Dehydration", "Inner ear problem"],
      severity: "Mild to Moderate",
      diagnosis: ["Vertigo", "Anemia"],
      medications: ["Antihistamines", "Iron Supplements"],
      tests: ["Blood Pressure Test", "Dix-Hallpike Test"],
      treatmentPlan: ["Adequate Hydration", "Slow Movements", "Iron-Rich Diet"],
    },
  ];

  const updateAppointmentDetails = async (appointmentId) => {
    try {
      const appointmentRef = doc(
        database,
        "appointment_details",
        appointmentId
      );
      await updateDoc(appointmentRef, {
        symptom: {
          name: "Headache",
          description: "Severe headache and nausea",
          medication: ["Paracetamol", "Ibuprofen"],
          tests: ["Blood test", "MRI scan"],
          treatment_plan: "Rest, hydration, and follow-up in 2 weeks",
        },
        temperature: temprature,
        bloodPressure: bloodPressure,
        heartRate: heartRate,
        oxygenSaturation: oxygenSaturation,
      });
      console.log("Appointment details updated successfully!");
      toast.success("Appointment details updated successfully!");
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Something went wrong Please try again!!!");
    }
  };

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white w-[330px] sm:w-auto h-screen overflow-auto my-10 p-3 sm:p-5 rounded">
        <div className="flex  text-[#715AFF] items-center justify-between">
          <p className="font-bold text-xl sm:text-2xl"> Add Additonal Details</p>
          <button
            onClick={() => setopeningAdditionalDetailsForm(false)}
            className="text-red-500 font-bold"
          >
            Close
          </button>
        </div>

        <div className="">
          <div className="sm:flex justify-between border-y py-1 my-3 items-center">
            <div className="flex text-sm items-center">
              <p className="text-[#102E4A] font-semibold">Appointment ID:</p>
              <p className="ml-1 font-semibold text-[#715AFF]">
                {gatheringWholeDetails.id}
              </p>
            </div>

            <div className="flex text-sm items-center">
              <p className="text-[#102E4A] font-semibold">Date:</p>
              <p className="ml-1 font-semibold text-[#715AFF]">
                {new Date(
                  gatheringWholeDetails?.appointmentDate?.seconds * 1000
                ).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex items-center text-[#102E4A]">
              <p className="text-[#102E4A]">Patient:</p>
              <p className="text-[#715AFF] ml-1">
                {gatheringWholeDetails.patient}
              </p>
            </div>

            <div className="flex items-center text-[#102E4A]">
              <p className="text-[#102E4A]">Doctor:</p>
              <p className="text-[#715AFF] ml-1">
                {gatheringWholeDetails.doctor}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <p className="font-semibold text-[#715AFF]">Symptom:</p>
          <select
            className="border w-full border-gray-400 rounded p-1"
            onChange={(e) => setSelectedSymptom(e.target.value)}
          >
            <option value="">Select a symptom</option>
            {symptoms.map((symptom) => (
              <option key={symptom.id} value={symptom.id}>
                {symptom.name}
              </option>
            ))}
          </select>

          {selectedSymptom && (
            <div>
              {symptoms
                .filter((symptom) => symptom.id === selectedSymptom)
                .map((symptom) => (
                  <div key={symptom.id}>
                    <div className="sm:flex my-2 items-center">
                      <p className="font-semibold">Description:</p>
                      <p className="ml-2 w-auto">{symptom.description}</p>
                    </div>

                    <div className="">
                      <p className="font-semibold mr-2">Common Causes:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm sm:text-base">
                        {symptom.commonCauses.map((cause) => (
                          <>
                            <p className="px-3 border-gray-300 rounded-full border">
                              {cause}
                            </p>
                          </>
                        ))}
                      </div>
                    </div>

                    <div className="flex my-3 bg-[#e7e4ff] p-3 rounded justify-between">
                      <div className="">
                        <p className="font-semibold text-[#715AFF]">
                          Diagnosis:
                        </p>
                        <div className="text-[#102E4A]">
                          {symptom.diagnosis.map((cause) => (
                            <>
                              <li>{cause}</li>
                            </>
                          ))}
                        </div>
                      </div>

                      <div className="">
                        <p className="font-semibold text-[#715AFF]">
                          Medications:
                        </p>
                        <div className="text-[#102E4A]">
                          {symptom.medications.map((cause) => (
                            <>
                              <li>{cause}</li>
                            </>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <p className="font-semibold mr-2">Tests:</p>
                      <div className="flex items-center space-x-2 text-sm">
                        {symptom.tests.map((cause) => (
                          <>
                            <p className="bg-gray-100 py-1 px-3 rounded-full">
                              {cause}
                            </p>
                          </>
                        ))}
                      </div>
                    </div>

                    <div className="">
                      <p className="font-semibold mr-2 mb-1 text-[#715AFF]">
                        Treatment Plan:
                      </p>
                      <div className="flex text-[#102E4A] items-center space-x-4">
                        {symptom.treatmentPlan.map((cause) => (
                          <>
                            <p>{cause}</p>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        <hr className="my-2" />

        <div>
          <p className="text-[#102E4A] text-lg font-bold">Additional Details</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-5">
            <div>
              <p className="font-semibold text-[#715AFF]">Temperature:</p>
              <input
                onChange={(e) => {
                  settemperature(e.target.value);
                }}
                placeholder="40C"
                className="border w-full border-gray-400 rounded p-1"
              ></input>
            </div>

            <div>
              <p className="font-semibold text-[#715AFF]">
                Blood Pressure (mmHg):
              </p>
              <input
                onChange={(e) => {
                  setbloodPressure(e.target.value);
                }}
                placeholder="e.g., 120/80"
                className="border w-full border-gray-400 rounded p-1"
              ></input>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5">
            <div>
              <p className="font-semibold text-[#715AFF]">Heart Rate (BPM):</p>
              <input
                onChange={(e) => {
                  setheartRate(e.target.value);
                }}
                placeholder="eg. 72 bpm"
                className="border w-full border-gray-400 rounded p-1"
              ></input>
            </div>
            <div>
              <p className="font-semibold text-[#715AFF]">
                Oxygen Saturation (%):
              </p>
              <input
                onChange={(e) => {
                  setoxygenSaturation(e.target.value);
                }}
                placeholder="eg. 100%"
                className="border w-full border-gray-400 rounded p-1.5"
              ></input>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            updateAppointmentDetails(gatheringWholeDetails.id);
          }}
          className="mt-5 bg-[#715AFF] text-white font-semibold py-1 w-full rounded"
        >
          Add Details
        </button>
      </div>
    </div>
  );
}

export default AddAppointmentDetails;
