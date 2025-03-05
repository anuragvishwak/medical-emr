import React, { useState } from "react";
import { FaStethoscope } from "react-icons/fa";
import img1 from "./loginBanner.png";
import { useNavigate } from "react-router";

function Login({ setopeningLogin }) {
  const navigation = useNavigate();
  const [currentTab, setcurrentTab] = useState("login");
  const [selectedRole, setSelectedRole] = useState("");

  const roles = [
    { label: "Doctor", value: "doctor" },
    { label: "Nurse", value: "nurse" },
    { label: "Lab Technician", value: "lab_technician" },
    { label: "Receptionist", value: "receptionist" },
    { label: "Pharmacist", value: "pharmacist" },
    { label: "Administrator", value: "administrator" },
  ];

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white rounded">
        <div className="flex items-center p-5 justify-between">
          <p className="text-[#34b1ff] text-xl sm:text-2xl font-bold">Welcome Back!</p>
          <div
            style={{
              boxShadow:
                "inset 2px 2px 5px rgba(0, 0, 0, 0.1), inset -2px -2px 5px rgba(0, 0, 0, 0.1)",
            }}
            className="bg-white hidden sm:block p-2 shadow-inner rounded-full"
          >
            <button
              onClick={() => {
                setcurrentTab("login");
              }}
              className={`text-[#333333] py-1 font-semibold rounded-full px-3 ${
                currentTab === "login" ? "bg-[#34b1ff] text-white shadow" : ""
              }`}
            >
              Patient
            </button>
            <button
              onClick={() => {
                setcurrentTab("signup");
              }}
              className={`text-[#333333] py-1 font-semibold rounded-full px-3 ${
                currentTab === "signup" ? "bg-[#34b1ff] text-white shadow" : ""
              }`}
            >
              Staff
            </button>
          </div>
          <button
            onClick={() => {
              setopeningLogin(false);
            }}
            className="font-bold text-red-500"
          >
            Close
          </button>
        </div>

        <div
            style={{
              boxShadow:
                "inset 2px 2px 5px rgba(0, 0, 0, 0.1), inset -2px -2px 5px rgba(0, 0, 0, 0.1)",
            }}
            className="bg-white sm:hidden w-[150px] p-2 shadow-inner rounded-full"
          >
            <button
              onClick={() => {
                setcurrentTab("login");
              }}
              className={`text-[#333333] py-1 font-semibold rounded-full px-3 ${
                currentTab === "login" ? "bg-[#34b1ff] text-white shadow" : ""
              }`}
            >
              Patient
            </button>
            <button
              onClick={() => {
                setcurrentTab("signup");
              }}
              className={`text-[#333333] py-1 font-semibold rounded-full px-3 ${
                currentTab === "signup" ? "bg-[#34b1ff] text-white shadow" : ""
              }`}
            >
              Staff
            </button>
          </div>

        <div className="sm:flex items-center">
          <img src={img1} className="h-44 w-full sm:h-80" />
          <div className="p-3 sm:p-10">
            {currentTab === "signup" ? (
              <div className="flex flex-col">
                <label className="font-semibold text-lg">Role</label>
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
            ) : (
              ""
            )}
            <div className="grid grid-cols-1 sm:grid-col-2 sm:gap-5">
            <div className="">
              <p className="text-[#333333]  text-lg font-semibold">Email</p>
              <input
                placeholder="anurag@gmail.com"
                className=" border w-full border-gray-400  rounded px-4 py-1"
              ></input>
            </div>

            <div>
              <p className="text-[#333333] text-lg font-semibold">Password</p>
              <input
                placeholder="anu200"
                type="password"
                className=" border w-72 border-gray-400  rounded px-4 sm:w-full py-1"
              ></input>
            </div>
            </div>

            <button
              onClick={() => {
                navigation("/Patient");
              }}
              className="bg-[#34b1ff] text-white w-full py-1 mt-7 rounded"
            >
              Proceed
            </button>
          </div>
        </div>

        <div className="flex items-center p-5 justify-end">
          <p className="text-[#333333]">Have an Account?</p>
          <button className="text-[#34b1ff] ml-2 font-semibold">SignUp</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
