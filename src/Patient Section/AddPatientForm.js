import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../FirebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function AddPatientForm({ setOpeningPatientForm, gatheringPatientDetails }) {
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [password, setpassword] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const docRef = await addDoc(collection(database, "patient_details"), {
        name: name,
        age: age,
        gender: selectedGender,
        dob: selectedDate,
        phoneNo: phoneNo,
        email: email,
        address: address,
        role: "patient",
      });

      console.log("Document written with ID: ", docRef.id);
      alert("Patient added successfully!");
      setOpeningPatientForm(false);
      gatheringPatientDetails();
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error adding patient: " + e.message);
    }
  };

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white w-80 overflow-auto  my-5 sm:w-auto">
        <div className="flex items-center p-5  justify-between">
          <p className="font-bold text-[#34b1ff] text-3xl">Add Patient</p>
          <button
            onClick={() => setOpeningPatientForm(false)}
            className="text-red-500  font-bold"
          >
            Close
          </button>
        </div>
        <div className="px-5 pb-5">
          <p className="font-semibold text-[#333333] text-xl mb-1">
            Basic Information
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold text-[#34b1ff]">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="border border-gray-300 rounded p-1.5"
              ></input>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-[#34b1ff]">Age</label>
              <input
                onChange={(e) => setAge(e.target.value)}
                placeholder="20"
                className="border border-gray-300 rounded p-1.5"
              ></input>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-[#34b1ff]">Gender</label>
              <select
                className="border border-gray-300 rounded p-1.5"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-[#34b1ff]">
                Date of Birth
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
                isClearable
                className="border rounded w-full p-1.5 border-gray-300"
              />
            </div>
          </div>

          <div className="mt-8">
            <p className="font-semibold text-[#333333] text-xl mb-1">
              Contact Information
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold text-[#34b1ff]">Phone</label>
                <input
                  onChange={(e) => setphoneNo(e.target.value)}
                  placeholder="+91 9104031875"
                  className="border border-gray-300 rounded p-1.5"
                ></input>
              </div>{" "}
              <div className="flex flex-col">
                <label className="font-semibold text-[#34b1ff]">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoe@gmail.com"
                  className="border border-gray-300 rounded p-1.5"
                ></input>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-[#34b1ff]">Password</label>
                <input
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="anu2002"
                  className="border border-gray-300 rounded p-1.5"
                ></input>
              </div>
            </div>

            <div className="mt-4">
              <label className="font-semibold text-[#34b1ff]">Address</label>
              <textarea
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Zundal, Ahmedabad, India"
                type="textarea"
                className="w-full border p-1.5 rounded border-gray-300"
              ></textarea>
            </div>
          </div>

          <div className="flex items-center mt-5">
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="w-full bg-[#34b1ff] text-white  p-2 rounded"
            >
              Add Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPatientForm;
