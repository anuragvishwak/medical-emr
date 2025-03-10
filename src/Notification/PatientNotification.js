import React from 'react'

function PatientNotification({setopeningPatientNotification}) {
  return (
    <div className='bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70'>
    <div className='bg-white p-5 shadow-2xl'>
        <div className='flex items-center justify-between'>
            <p className='text-3xl text-[#34b1ff] font-bold'>Notifications</p>
            <button 
            onClick={()=>{
                setopeningPatientNotification(false);
            }}
            className='text-red-500 font-bold'>Close</button>
        </div>
    </div>
    </div>
  )
}

export default PatientNotification