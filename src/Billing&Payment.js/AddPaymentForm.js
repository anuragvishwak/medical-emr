import React from 'react'

function AddPaymentForm({setopeningBilling}) {
  return (
    <div className='bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70'>
        <div className='bg-white p-5'>
        <div className="flex mb-5 justify-between">
          <p className="font-bold text-2xl">Add Medical Record</p>
          <button
            onClick={() => {
                setopeningBilling(false);
            }}
            className="text-red-500 font-semibold"
          >
            Close
          </button>
        </div>
        </div>
    </div>
  )
}

export default AddPaymentForm