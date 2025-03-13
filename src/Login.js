import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { database } from "./FirebaseConfig";
import { MdEditCalendar, MdMedicalInformation } from "react-icons/md";

function Login({ setopeningLogin }) {
  const navigation = useNavigate();
  const [currentTab, setcurrentTab] = useState("login");
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roles = [
    { label: "Doctor", value: "doctor" },
    { label: "Nurse", value: "nurse" },
    { label: "Lab Technician", value: "lab_technician" },
    { label: "Receptionist", value: "receptionist" },
    { label: "Pharmacist", value: "pharmacist" },
    { label: "Administrator", value: "administrator" },
  ];

  const handleLogin = async () => {
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Check if the user is a patient
      const patientQuery = query(
        collection(database, "patient_details"),
        where("email", "==", email)
      );
      const patientSnapshot = await getDocs(patientQuery);

      if (!patientSnapshot.empty) {
        // User is a patient
        navigation("/PatientDashboard");
      } else {
        navigation("/Patient");
      }
    } catch (error) {
      console.error("Error signing in: ", error);
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white sm:w-6/12 rounded">
        <div className="sm:flex">
          <div className="bg-[#715AFF] hidden  sm:flex items-center justify-center w-full h-[410px]">
           <div className="px-5">
           <p className="text-3xl font-bold mb-7 text-white">Welcome Back! Let’s Get You Signed In.</p>
           <p className="text-xl font-bold text-white">Secure Access to Patient Care Starts Here.</p>
           </div>
          </div>
          <div className="p-3 w-full sm:p-6">
            <div className="flex mb-5 sm:mb-10 justify-between">
              <p className="text-xl sm:text-2xl text-[#715AFF] font-bold">ANUEMR'S Medical EMR</p>
              <button
                onClick={() => {
                  setopeningLogin(false);
                }}
                className="font-bold text-red-500"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-col-2 sm:gap-5">
              <div className="">
                <p className="text-[#333333] text-lg font-semibold">Email</p>
                <input
                  placeholder="anurag@gmail.com"
                  className="border w-full border-gray-400 rounded px-4 py-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>

              <div>
                <p className="text-[#333333] text-lg font-semibold">Password</p>
                <input
                  placeholder="anu200"
                  type="password"
                  className="border w-72 border-gray-400 rounded px-4 sm:w-full py-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
            </div>
            <button className="text-[#715AFF] font-semibold flex justify-end w-full mt-5">
              forgot password ?
            </button>

            <button
              onClick={handleLogin}
              className="bg-[#102E4A] text-white w-full py-1 mt-1 rounded"
            >
              Proceed
            </button>
            <div className="flex items-center p-5 justify-end">
              <p className="text-[#333333]">Have an Account?</p>
              <button className="text-[#715AFF] ml-2 font-semibold">
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
