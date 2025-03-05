import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { database } from "../FirebaseConfig";

function AddStaff({ setopeningAddStaffForm }) {
  const [currentTab, setcurrentTab] = useState("personal");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [departmment, setdepartment] = useState("");
  const [yearOfExperience, setyearOfExperience] = useState("");
  const [selectedQualification, setSelectedQualification] = useState("");
  const [dateOfJoining, setdateOfJoining] = useState("");
  const [medicalLicenseNo, setmedicalLicenseNo] = useState("");
  const [salaryAmount, setsalaryAmount] = useState("");
  const [workStatus, setworkdStatus] = useState("");
  const [shiftTiming, setshiftTiming] = useState("");

  function creatingStaff() {
    try {
      const docRef = addDoc(collection(database, "staff_details"), {
        role: selectedRole,
        name: name,
        age: age,
        gender: selectedGender,
        dob: dob,
        phoneNo: phoneNo,
        email: email,
        department: departmment,
        yearOfExperience: yearOfExperience,
        qualification: selectedQualification,
        dateOfJoining: dateOfJoining,
        medicalLicenseNo: medicalLicenseNo,
        salaryAmount: salaryAmount,
        workStatus: workStatus,
        shiftTiming: shiftTiming,
        specialization: selectedSpecialization
      });
      alert("successfully Staff details is submitted!!!");
    } catch (e) {
      console.error(e);
    }
  }

  const qualifications = [
    "MBBS",
    "MD",
    "MS",
    "BDS",
    "MDS",
    "B.Sc Nursing",
    "M.Sc Nursing",
    "D.Pharm",
    "B.Pharm",
    "Physiotherapist",
    "Radiologist",
    "Lab Technician",
    "Other",
  ];

  const roles = [
    { label: "Doctor", value: "doctor" },
    { label: "Nurse", value: "nurse" },
    { label: "Lab Technician", value: "lab_technician" },
    { label: "Receptionist", value: "receptionist" },
    { label: "Pharmacist", value: "pharmacist" },
    { label: "Administrator", value: "administrator" },
  ];

  const specializations = {
    doctor: [
      { label: "Cardiologist", value: "cardiologist" },
      { label: "Dermatologist", value: "dermatologist" },
      { label: "Neurologist", value: "neurologist" },
      { label: "Orthopedic", value: "orthopedic" },
      { label: "Pediatrician", value: "pediatrician" },
      { label: "General Physician", value: "general_physician" },
    ],
    nurse: [
      { label: "Critical Care Nurse", value: "critical_care_nurse" },
      { label: "Pediatric Nurse", value: "pediatric_nurse" },
      { label: "Surgical Nurse", value: "surgical_nurse" },
      { label: "Oncology Nurse", value: "oncology_nurse" },
    ],
    lab_technician: [
      { label: "Radiology Technician", value: "radiology_technician" },
      { label: "Pathology Technician", value: "pathology_technician" },
      { label: "Microbiology Technician", value: "microbiology_technician" },
    ],
    receptionist: [
      { label: "Front Desk Executive", value: "front_desk_executive" },
      { label: "Patient Coordinator", value: "patient_coordinator" },
    ],
    pharmacist: [
      { label: "Clinical Pharmacist", value: "clinical_pharmacist" },
      { label: "Retail Pharmacist", value: "retail_pharmacist" },
    ],
    administrator: [
      { label: "HR Manager", value: "hr_manager" },
      { label: "Operations Manager", value: "operations_manager" },
    ],
  };

  const departments = [
    { value: "cardiology", label: "Cardiology" },
    { value: "neurology", label: "Neurology" },
    { value: "orthopedics", label: "Orthopedics" },
    { value: "pediatrics", label: "Pediatrics" },
    { value: "oncology", label: "Oncology" },
    { value: "radiology", label: "Radiology" },
    { value: "emergency", label: "Emergency" },
    { value: "surgery", label: "Surgery" },
    { value: "dermatology", label: "Dermatology" },
    { value: "psychiatry", label: "Psychiatry" },
  ];

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white">
        <div className="flex  bg-[#333333] p-5 text-white items-center justify-between">
          <p className="font-bold text-3xl">Add Staff</p>
          <button
            onClick={() => setopeningAddStaffForm(false)}
            className="text-red-500 font-bold"
          >
            Close
          </button>
        </div>

        <div className="flex border font-semibold text-[#333333] border-gray-300 items-center mt-5 mx-5 p-2 justify-between bg-gray-100 shadow-inner">
          <button
            onClick={() => {
              setcurrentTab("personal");
            }}
            className={`px-4 py-1.5 ${
              currentTab === "personal" ? "bg-white shadow" : ""
            }`}
          >
            Personal Information
          </button>
          <button
            className={`px-4 py-1.5 ${
              currentTab === "professional" ? "bg-white shadow" : ""
            }`}
            onClick={() => {
              setcurrentTab("professional");
            }}
          >
            Professional Information
          </button>
          <button
            className={`px-4 py-1.5 ${
              currentTab === "additional" ? "bg-white shadow" : ""
            }`}
            onClick={() => {
              setcurrentTab("additional");
            }}
          >
            Additional Information
          </button>
        </div>

        <div className="p-5">
          {currentTab === "personal" ? (
            <div>
              <p className="font-semibold text-xl mb-1">Personal Information</p>
              <div className="grid grid-cols-3 my-3 gap-5">
                <div className="flex flex-col">
                  <label className="font-semibold">Name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="border border-gray-300 rounded p-1.5"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">Date of Birth</label>
                  <input
                    type="date"
                    onChange={(e) => setDob(e.target.value)}
                    className="border border-gray-300 rounded p-1.5"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">Age</label>
                  <input
                    type="number"
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="40"
                    className="border border-gray-300 rounded p-1.5"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col">
                  <label className="font-semibold">Gender</label>
                  <select
                    className="border border-gray-300 rounded p-1.5"
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">Phone</label>
                  <input
                    type="tel"
                    onChange={(e) => setPhoneNo(e.target.value)}
                    placeholder="+91 9104031875"
                    className="border border-gray-300 rounded p-1.5"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">Email</label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="johndoe@gmail.com"
                    className="border border-gray-300 rounded p-1.5"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <button 
                onClick={()=>{
                  setcurrentTab('professional')
                }}
                className="hover:text-white text-[#333333] border border-[#333333] hover:bg-[#333333] py-1.5 px-6 rounded">
                  Next
                </button>
              </div>
            </div>
          ) : currentTab === "professional" ? (
            <div>
              <p className="font-semibold text-xl mb-1">
                Professional Information
              </p>
              <div className="grid grid-cols-3 my-3 gap-5">
                <div className="flex flex-col">
                  <label className="font-semibold">Role / Designation</label>
                  <select
                    className="border border-gray-300 rounded p-1.5"
                    onChange={(e) => setSelectedRole(e.target.value)}
                    value={selectedRole}
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex flex-col">
                    <label className="font-semibold">Specialization</label>
                    <select
                      className="border border-gray-300 rounded p-1.5"
                      onChange={(e) =>
                        setSelectedSpecialization(e.target.value)
                      }
                      value={selectedSpecialization}
                    >
                      <option value="">Select Specialization</option>
                      {specializations[selectedRole]?.map((spec) => (
                        <option key={spec.value} value={spec.value}>
                          {spec.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="">
                  <p className="font-semibold">Department</p>
                  <select
                    onChange={(e) => {
                      setdepartment(e.target.value);
                    }}
                    className="border border-gray-300 w-full rounded p-1.5"
                  >
                    {departments.map((department) => (
                      <option value={department.value}>
                        {department.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="font-semibold">Year of Experience</p>
                  <input
                    onChange={(e) => setyearOfExperience(e.target.value)}
                    placeholder="5 yrs"
                    className="border w-full border-gray-300 rounded p-1.5"
                  ></input>
                </div>
                <div>
                  <p className="font-semibold">Quanlification</p>
                  <select
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedQualification}
                    onChange={(e) => setSelectedQualification(e.target.value)}
                  >
                    <option value="">Select Qualification</option>
                    {qualifications.map((qualification, index) => (
                      <option key={index} value={qualification}>
                        {qualification}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center mt-5 justify-between">
                <button 
                onClick={()=>{
                  setcurrentTab('personal')
                }}
                className="border py-1.5 px-6 rounded border-[#333333] hover:text-white hover:bg-[#333333] text-[#333333]">
                  Back
                </button>
                <button 
                 onClick={()=>{
                  setcurrentTab('additional')
                }}
                className="bg-[#333333] text-white py-1.5 px-6 rounded">
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <p className="font-semibold text-xl mb-1">
                  Additional Information
                </p>

                <div className="grid grid-cols-3 my-3 gap-5">
                  <div>
                    <p className="font-semibold">Date of Joining</p>
                    <input
                      onChange={(e) => setdateOfJoining(e.target.value)}
                      placeholder="johndoe@gmail.com"
                      className="border w-full border-gray-300 rounded p-1.5"
                    ></input>
                  </div>

                  <div>
                    <p className="font-semibold">Shift Timing</p>
                    <select
                      onChange={(e) => {
                        const shift = e.target.value;
                        setshiftTiming(shift);
                      }}
                      className="w-full border p-1.5 rounded border-gray-300"
                    >
                      <option>Select Shift Timing</option>
                      <option>Morning</option>
                      <option>Evening</option>
                      <option>Night</option>
                    </select>
                  </div>

                  <div>
                    <p className="font-semibold">Work Status</p>
                    <select
                      onChange={(e) => {
                        const status = e.target.value;
                        setworkdStatus(status);
                      }}
                      className="w-full border p-1.5 rounded border-gray-300"
                    >
                      <option>Select Work Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="font-semibold">Salary Amount</p>
                    <input
                      onChange={(e) => setsalaryAmount(e.target.value)}
                      placeholder="30,0000/-"
                      className="border border-gray-300 w-full rounded p-1.5"
                    ></input>
                  </div>

                  <div>
                    <p className="font-semibold">Medical License Number</p>
                    <input
                      onChange={(e) => setmedicalLicenseNo(e.target.value)}
                      placeholder="DMC/R/12345"
                      className="border border-gray-300 w-full rounded p-1.5"
                    ></input>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-between">
              <button 
                 onClick={()=>{
                  setcurrentTab('professional')
                }}
                className="hover:bg-[#333333] border border-[#333333] text-[#333333] hover:text-white py-1.5 px-6 rounded">
                  Back
                </button>
                <button 
                onClick={()=>{
                  creatingStaff();
                }}
                className="text-white bg-[#333333] py-1.5 px-6 rounded">
                  Create Staff
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddStaff;
