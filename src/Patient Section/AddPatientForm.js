import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../FirebaseConfig";
import { toast } from "react-toastify";

function AddPatientForm({ setOpeningPatientForm }) {
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    console.log("values", name, email, age, phoneNo, address);

    try {
      const docRef = await addDoc(collection(database, "patient_details"), {
        name: name,
        age: age,
        gender: selectedGender,
        dob: selectedDate,
        phoneNo: phoneNo,
        email: email,
        address: address,
      });
      console.log("Document written with ID: ", docRef.id);
      toast.success("Patient added successfully!");
      setOpeningPatientForm(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-5">
        <div className="flex items-center mb-4 justify-between">
          <p className="font-bold text-3xl">Add Patient</p>
          <button
            onClick={() => setOpeningPatientForm(false)}
            className="text-red-500  font-bold"
          >
            Close
          </button>
        </div>
        <p className="font-semibold text-xl mb-1">Basic Information</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="border border-gray-300 rounded p-1.5"
            ></input>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Age</label>
            <input
              onChange={(e) => setAge(e.target.value)}
              placeholder="20"
              className="border border-gray-300 rounded p-1.5"
            ></input>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Gender</label>
            <select
              className="border border-gray-300 rounded p-1.5"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="font-semibold">Date of Birth</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
              isClearable
              className="border rounded p-1.5 border-gray-300"
            />
          </div>
        </div>

        <div className="mt-8">
          <p className="font-semibold text-xl mb-1">Contact Information</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold">Phone</label>
              <input
                onChange={(e) => setphoneNo(e.target.value)}
                placeholder="+91 9104031875"
                className="border border-gray-300 rounded p-1.5"
              ></input>
            </div>{" "}
            <div className="flex flex-col">
              <label className="font-semibold">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@gmail.com"
                className="border border-gray-300 rounded p-1.5"
              ></input>
            </div>
          </div>

          <div className="mt-4">
            <label className="font-semibold">Address</label>
            <textarea
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Zundal, Ahmedabad, India"
              type="textarea"
              className="w-full border p-1.5 rounded border-gray-300"
            ></textarea>
          </div>
        </div>
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="w-full bg-[#333333] text-white mt-5 p-2 rounded"
        >
          Add Patient
        </button>
      </div>
    </div>
  );
}

export default AddPatientForm;
