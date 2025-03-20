import React from "react";

function RenderingAppointmentDetails({
  setopeningAdditionalDetails,
  gatheringWholeDetails,
}) {
  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-5 rounded">
        <div className="flex items-center justify-between">
          <p className="font-bold text-2xl">Appointment Details</p>
          <button
            onClick={() => {
              setopeningAdditionalDetails(false);
            }}
            className="font-semibold text-red-500"
          >
            Close
          </button>
        </div>

        <div>
          <div>
            <p>
              Appointment Date:{" "}
              {new Date(
                gatheringWholeDetails?.appointmentDate
              ).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderingAppointmentDetails;
