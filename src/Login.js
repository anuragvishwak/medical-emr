import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { database } from "./FirebaseConfig";
import { MdEditCalendar, MdMedicalInformation } from "react-icons/md";
import { FaBriefcaseMedical } from "react-icons/fa";

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
      <div className=" sm:w-6/12 rounded">
        <div className="sm:flex">
          <div className="bg-[#715AFF] rounded-l-2xl hidden  sm:flex items-center justify-center w-full">
           <div>
           <div className="flex items-center px-5">
              <FaBriefcaseMedical size={40} className="mr-6 text-white" />
              <div>
                <p className="text-2xl font-bold text-white">Welcome to ANUEMR</p>
                <p className="text-lg font-bold text-white">
                  Secure medical records.
                </p>
              </div>
            </div>

            <div className="mt-7">
              <p className="text-[#715AFF]  rounded-xl shadow-xl ml-5 text-justify p-3 font-semibold">
              Experience hassle-free healthcare with ANUEMR! Our secure and user-friendly platform allows you to manage medical records, track vital health data, and schedule appointments with ease. Stay on top of your well-being with daily health monitoring and seamless access to your medical history—all in one convenient place. Take charge of your health today!
              </p>
            </div>
           </div>
          </div>

          <div className="w-full p-4 rounded-r-2xl bg-[#715AFF]">
            <div className="p-3 rounded-xl shadow-xl bg-white sm:p-6">
              <div className="flex mb-5 items-start sm:mb-10 justify-between">
                <p className="text-xl sm:text-2xl text-[#715AFF] font-bold">
                  ANUEMR'S Medical EMR
                </p>
                <button
                  onClick={() => {
                    setopeningLogin(false);
                  }}
                  className="font-bold  text-red-500"
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
                  <p className="text-[#333333] text-lg font-semibold">
                    Password
                  </p>
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
    </div>
  );
}

export default Login;
