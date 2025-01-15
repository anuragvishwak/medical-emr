import React, { useState } from "react";
import Navbar from "../Navbar";
import { FaPlus } from "react-icons/fa";
import AddPaymentForm from "./AddPaymentForm";

function BillPay() {
  const [openingBilling, setopeningBilling] = useState(false);
  const [currentTab, setcurrentTab] = useState('charges');

  return (
    <div className="flex min-h-screen h-full bg-gray-50">
      <div>
        <Navbar />
        <p className="text-3xl ml-2 sm:hidden text-[#333333] font-semibold">
          Billing & Payment
        </p>
      </div>
      <div className="w-full px-5 sm:p-5">
        <div className="flex items-center mb-5 justify-between">
          <div className="">
            <p className="text-3xl hidden sm:block font-semibold">
              Billing & Charges
            </p>
            <p className="text-gray-400 hidden sm:block">
              Here you can manage Bills & Payments of the patients.
            </p>
          </div>
          <button
            onClick={() => {
              setopeningBilling(true);
            }}
            className="bg-[#333333] text-white font-semibold text-sm p-2 sm:px-4 rounded"
          >
            <div className="flex items-center">
              <FaPlus className="mr-1" />
              <p> Add Payment</p>
            </div>
          </button>
        </div>

        <div className="w-36 text-lg font-semibold  flex items-center justify-between">
            <button className={`${currentTab === 'charges'? 'text-[#333333] border-b border-[#333333]' : 'text-gray-400'}`} onClick={()=>{setcurrentTab('charges')}}>Charges</button>
            <button className={`${currentTab === 'billing'? 'text-[#333333] border-b border-[#333333]' : 'text-gray-400'}`} onClick={()=>{setcurrentTab('billing')}}>Billing</button>
        </div>
        <hr className=""/>
      </div>
      {openingBilling && <AddPaymentForm setopeningBilling = {setopeningBilling}/>}
    </div>
  );
}

export default BillPay;
