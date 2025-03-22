import { motion } from "framer-motion";
import React, { useState } from "react";
import { LuMessageSquareMore } from "react-icons/lu";

function NotificationPortal({ setopeningNotification }) {
  const [currentTab, setcurrentTab] = useState("general");
  const [openingMessageInput, setopeningMessageInput] = useState(false);
  const [openingParticularMessage, setopeningParticularMessage] =
    useState(false);

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-end p-7 fixed inset-0 bg-opacity-70">
      <div className="bg-white z-50 shadow-2xl w-7/12 h-screen overflow-auto p-5 rounded-rounded">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <LuMessageSquareMore size={30} className="text-[#715AFF]" />
            <p className="text-2xl font-bold text-[#715AFF]">Notifications</p>
          </div>
          <button
            onClick={() => {
              setopeningNotification(false);
            }}
            className="text-red-500 font-semibold"
          >
            Close
          </button>
        </div>

        <div className="flex items-center my-3  justify-end ">
          <div className="flex bg-gray-50 p-[3px] shadow-inner border text-sm rounded items-center justify-between font-semibold">
            <button
              onClick={() => setcurrentTab("general")}
              className="relative py-1 px-2 text-[#333333]"
            >
              {currentTab === "general" && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute inset-0 bg-white shadow rounded"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
              <span className="relative z-10 text-[#715AFF]">General</span>
            </button>

            <button
              onClick={() => setcurrentTab("management")}
              className="relative py-1 px-2 text-[#333333]"
            >
              {currentTab === "management" && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute inset-0 bg-white shadow rounded"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
              <span className="relative z-10 text-[#715AFF]">Management</span>
            </button>
          </div>

          <div className="ml-3">
            <input
              placeholder="search for messages...."
              className="py-1 px-3 border rounded mr-2 border-gray-300"
            ></input>
            <button
              onClick={() => {
                setopeningMessageInput(!openingMessageInput);
              }}
              className="bg-[#715AFF] text-white py-1 rounded px-4"
            >
              + Create
            </button>
          </div>
        </div>

        {openingMessageInput && (
          <div className="p-2 rounded border mt-3">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p>Title</p>
                <input
                  placeholder="Regarding Payment Due"
                  className="border w-full rounded p-1 bg-gray-50 border-gray-300"
                ></input>
              </div>
              <div>
                <p>Message Type</p>
                <select className="border w-full rounded p-1 bg-gray-50 border-gray-300">
                  <option>Select type</option>
                  <option>General</option>
                  <option>Management</option>
                </select>
              </div>
            </div>

            <div>
              <p>Description</p>
              <textarea
                placeholder="Hi user, here is an general remainder for your payment Due!"
                className="border w-full h-28 bg-gray-50 rounded p-1 border-gray-300"
              ></textarea>
            </div>

            <div className="flex items-center justify-end">
              <button className="bg-[#5F4BB6] text-white font-semibold py-1 px-3 rounded">
                Create Message
              </button>
            </div>
          </div>
        )}

        <div className="border p-3 rounded shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <p className="bg-orange-500 mr-2 py-1.5 font-semibold text-white px-2 rounded-full">
                AV
              </p>
              <div>
                <p className="font-bold text-[#102E4A] text-sm">Anurag Vishwakarma</p>
                <p className="text-sm text-gray-400">
                  anuragvishwakarma4132@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <button className=" text-[#5F4BB6]">Mark as read</button>
              <p className="text-orange-500 ml-2 px-4 rounded font-bold border border-orange-500">
                General
              </p>
            </div>
          </div>

          <div className="mt-3">
            <p className="font-bold  text-[#715AFF]">Pending Fees!</p>
            <p className="text-[#102E4A] text-sm">
              Hi sir, we request you pay your fees on time else legal actions
              will be takes against you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationPortal;
