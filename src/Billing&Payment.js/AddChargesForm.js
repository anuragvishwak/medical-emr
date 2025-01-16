import { addDoc, collection } from "firebase/firestore";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { database } from "../FirebaseConfig";

function AddChargesForm({ setopeningCharges }) {
  const [treatmentType, settreatmentType] = useState("");
  const [treatmentName, settreatmentName] = useState("");

  async function submittingTreatmentCharges(values) {
    try {
      await addDoc(collection(database, "add_charges"), {
        treatmentType: treatmentType,
        charges: values.charges,
        treatmentName: treatmentName,
        syntoms: values.syntoms,
      });
      toast.success("Charges added succesfully!!!");
    } catch {
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white rounded p-5">
        <div className="flex mb-5 justify-between">
          <p className="font-bold text-2xl">Add Charges</p>
          <button
            onClick={() => {
              setopeningCharges(false);
            }}
            className="text-red-500 font-semibold"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="">
            <p>Treatment Type:</p>
            <select
              className="border w-full p-1.5 rounded border-gray-400"
              onChange={(e) => {
                const appointment = e.target.value;
                settreatmentType(appointment);
              }}
            >
              <option>Select Treatment Type</option>
              <option>General Medicine (MBBS)</option>
              <option>Surgical Treatments</option>
              <option>Dental Treatments</option>
              <option>Psychological Treatment</option>
            </select>
          </div>

          <div>
            <p>Treatment Name</p>
            <input
              onClick={(e) => {
                settreatmentName(e.target.value);
              }}
              placeholder="Root Cananl"
              className="border w-full border-gray-400 rounded p-1.5"
            ></input>
          </div>
        </div>

       
        <Formik
          initialValues={{
            syntoms: [""],
            charges: "",
          }}
          onSubmit={(values) => {
            console.log("Form values:", values);
            submittingTreatmentCharges(values);
          }}
        >
          {({ values }) => (
            <Form>
              <FieldArray name="syntoms">
                {({ push, remove }) => (
                  <div className="w-full mt-3">
                    {values.syntoms.map((_, index) => (
                      <div key={index} className="w-full mb-4">
                        <div className="flex items-center">
                          <label htmlFor={`syntoms.${index}`}>
                            Syntoms {index + 1}
                          </label>
                          <button
                            type="button"
                            onClick={() => push("")}
                            className="bg-[#333333]  text-white p-1 text-sm rounded-full mt-1 ml-1"
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <div className="flex w-full items-center">
                          <Field
                            name={`syntoms.${index}`}
                            placeholder="Enter immunization record"
                            className="border p-2 border-gray-400 rounded w-full"
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 ml-1 text-xl"
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>

              <label>Treatment Charges:</label>
              <Field
                type="number"
                name="charges"
                placeholder="Enter charges"
                className="border p-2 rounded border-gray-400 w-full"
              />

              <button
                type="submit"
                className="text-white p-2 rounded mt-5 w-full bg-[#333333]"
              >
                Add Treatment Charges
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddChargesForm;
