import React, { useState } from "react";
import img1 from "./ANUEMR.png";
import Login from "./Login.js";
import img2 from "./vecteezy_medical-concept-operating-room-doctor-holding-a-tablet_24651508.jpg";
import img3 from "./olga-guryanova-tMFeatBSS4s-unsplash.jpg";
import { MdMonitorHeart } from "react-icons/md";
import { LuHandshake } from "react-icons/lu";
import { FaBars, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

function SingleLandingPage() {
  const [openingLogin, setopeningLogin] = useState(false);
  const [currentTab, setcurrentTab] = useState("home");
  const [openingNavbar, setopeningNavbar] = useState(false);

  return (
    <div className="">
      <div style={{ backgroundImage: `url(${img2})` }}>
        <div className="flex items-center px-3 pt-3 w-full justify-between">
          <div className="flex items-center">
            <button
              onClick={() => {
                setopeningNavbar(!openingNavbar);
              }}
              className="mr-2 border-2 border-[#102E4A] text-[#102E4A] p-1 rounded sm:hidden"
            >
              <FaBars />
            </button>
            <img className="h-6" src={img1} />
          </div>

          {openingNavbar && (
            <div className="bg-white flex flex-col top-12 p-2 rounded shadow-xl fixed font-semibold">
              <button
                onClick={() => {
                  setcurrentTab("home");
                }}
                className={currentTab === "home" ? "text-[#715AFF]" : ""}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setcurrentTab("price");
                }}
                className={currentTab === "price" ? "text-[#715AFF]" : ""}
              >
                Pricing
              </button>
              <button
                onClick={() => {
                  setcurrentTab("resource");
                }}
                className={currentTab === "resource" ? "text-[#715AFF]" : ""}
              >
                Resources
              </button>
              <button
                onClick={() => {
                  setcurrentTab("company");
                }}
                className={currentTab === "company" ? "text-[#715AFF]" : ""}
              >
                Company
              </button>
            </div>
          )}

          <div className="hidden sm:flex items-center  justify-between w-80 font-semibold">
            <button
              onClick={() => {
                setcurrentTab("home");
              }}
              className={currentTab === "home" ? "text-[#715AFF]" : ""}
            >
              Home
            </button>
            <button
              onClick={() => {
                setcurrentTab("price");
              }}
              className={currentTab === "price" ? "text-[#715AFF]" : ""}
            >
              Pricing
            </button>
            <button
              onClick={() => {
                setcurrentTab("resource");
              }}
              className={currentTab === "resource" ? "text-[#715AFF]" : ""}
            >
              Resources
            </button>
            <button
              onClick={() => {
                setcurrentTab("company");
              }}
              className={currentTab === "company" ? "text-[#715AFF]" : ""}
            >
              Company
            </button>
          </div>
          <button
            onClick={() => {
              setopeningLogin(true);
            }}
            className="bg-[#715AFF] py-1.5 pl-4 pr-2 rounded-full text-white"
          >
            <div className="flex items-center">
              <p className="font-semibold mr-5">Explore</p>
              <FaArrowRightLong
                size={30}
                className="bg-white text-[#715AFF] p-1.5 rounded-full"
              />
            </div>
          </button>
        </div>
        <div className="py-10 sm:py-20 px-5 sm:px-10">
          <p className="text-[#102E4A] text-4xl sm:text-6xl font-bold">
            Transform Healthcare with Medical EMR – Smart, Secure, Seamless!
          </p>

          <p className="font-semibold mt-4 text-sm sm:text-base text-white text-justify">
            Say goodbye to paperwork and hello to efficiency! Medical EMR is the
            ultimate digital solution designed to streamline patient record
            management, improve workflow, and enhance patient care. With
            real-time access, secure data storage, and an intuitive interface,
            our EMR system empowers healthcare professionals to focus on what
            truly matters—saving lives.
          </p>

          <div className="flex items-center mt-5 sm:mt-10">
            <button className="bg-[#715AFF] border border-[#715AFF] py-1 px-4 rounded shadow text-white">
              Learn More
            </button>
            <button className="border border-[#102E4A] ml-3 text-[#102E4A] hover:bg-[#102E4A] py-1 px-4 rounded font-semibold shadow hover:text-white">
              Book a demo
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#eef7ff] flex justify-center min-h-screen h-full">
        <div>
          <div className="bg-white my-10 sm:my-20 items-center mx-5 xl:mx-10 rounded-xl shadow-xl lg:flex p-6">
            <img
              src={img3}
              className="h-[400px] lg:h-96 w-full lg:w-auto rounded-xl"
            />
            <div className="lg:ml-10 mt-5 sm:mt-0">
              <p className="text-[#715AFF] text-center w-40 py-1 font-semibold rounded-full bg-[#eae6ff]">
                Our Specialzation
              </p>
              <div>
                <p className="text-[#102E4A] mt-4 text-3xl font-semibold">
                  Health services for well-being
                </p>
                <p>
                  We provide an extensive array of health services designed to
                  cater to your unique health needs.
                </p>
              </div>

              <div className="md:flex mt-7 items-center">
                <div className="sm:mr-7">
                  <div className="flex items-center">
                    <MdMonitorHeart
                      className="text-[#715AFF] p-1 rounded bg-[#e6e2fc]"
                      size={28}
                    />
                    <p className="ml-2 text-lg text-[#715AFF] font-semibold">
                      Tracking for appointments & medications
                    </p>
                  </div>
                  <p className="text-justify w-auto">
                    Never miss an appointment or a dose again! With our advanced
                    tracking system, Medical EMR ensures seamless scheduling of
                    patient appointments and medication reminders. Automated
                    alerts, real-time updates, and an intuitive dashboard help
                    healthcare providers and patients stay on top of their
                    schedules effortlessly—enhancing care, reducing no-shows,
                    and improving medication adherence.
                  </p>
                </div>

                <div className="mt-5 md:mt-0">
                  <div className="flex items-center">
                    <LuHandshake
                      className="text-[#715AFF] p-1 rounded bg-[#e6e2fc]"
                      size={28}
                    />
                    <p className="ml-2 text-lg text-[#715AFF] font-semibold">
                      Collaborative Lab Result Review
                    </p>
                  </div>

                  <p className="text-justify w-auto">
                    Enhance communication and teamwork among doctors, nurses,
                    and medical staff with real-time commenting on patient lab
                    results. This feature allows healthcare professionals to
                    share observations, provide clarifications, and discuss
                    findings directly within the EMR system. Ensure accurate
                    diagnoses, streamline decision-making, and improve patient
                    outcomes with seamless collaboration.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center p-5 shadow-xl rounded-xl bg-white mb-10 sm:mb-20 mx-5 md:mx-10">
            <div>
              <div className="sm:flex justify-between">
              <p className="text-[#715AFF] sm:hidden mb-3 text-center w-28 py-1 font-semibold rounded-full bg-[#eae6ff]">
                  Features
                </p>
                <p className="text-[#102E4A] text-3xl font-semibold">
                  Key Features
                </p>
                <p className="text-[#715AFF] hidden sm:block text-center w-28 py-1 font-semibold rounded-full bg-[#eae6ff]">
                  Features
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 ">
                <div className="p-3 bg-[#f5f3ff] rounded-xl border border-[#c7bfff]">
                  <p className="text-xl text-[#715AFF] font-semibold">
                    Smart Appointment & Medication Tracking
                  </p>
                  <p className="text-[#102E4A] text-justify">
                    Ensure patients never miss an appointment or medication.
                    Automated reminders and scheduling tools keep both
                    healthcare providers and patients informed, reducing
                    no-shows and improving treatment adherence.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#f5f3ff] border border-[#c7bfff]">
                  <p className="text-xl text-[#715AFF] font-semibold">
                    Collaborative Lab Result Annotations
                  </p>
                  <p className="text-[#102E4A] text-justify">
                    Doctors, nurses, and medical staff can comment on lab
                    results, provide suggestions, and collaborate in real time.
                    This feature enhances communication, speeds up
                    decision-making, and ensures accurate patient diagnosis and
                    care.
                  </p>
                </div>

                <div className="p-3 bg-[#f5f3ff] rounded-xl border border-[#c7bfff]">
                  <p className="text-xl text-[#715AFF] font-semibold">
                    Secure Digital Patient Records
                  </p>
                  <p className="text-[#102E4A] text-justify">
                    Store, access, and update patient records securely in the
                    cloud. The system ensures encrypted, real-time access to
                    medical histories, prescriptions, and treatment plans,
                    reducing paperwork and enhancing efficiency.
                  </p>
                </div>

                <div className="p-3 bg-[#f5f3ff] rounded-xl border border-[#c7bfff]">
                  <p className="text-xl text-[#715AFF] font-semibold">
                    Seamless E-Prescription Management
                  </p>
                  <p className="text-[#102E4A] text-justify">
                    Eliminate prescription errors with digital prescriptions
                    sent directly to pharmacies. This feature improves
                    medication accuracy and enhances patient convenience.
                  </p>
                </div>

                <div className="p-3 bg-[#f5f3ff] rounded-xl border border-[#c7bfff]">
                  <p className="text-xl text-[#715AFF] font-semibold">
                    Notification Panel for Patients & Staff
                  </p>
                  <p className="text-[#102E4A] text-justify">
                    Stay updated with real-time notifications! Patients receive
                    appointment and medication reminders, while staff are
                    alerted about new lab results, patient updates, and urgent
                    cases.
                  </p>
                </div>

                <div className="p-3 bg-[#f5f3ff] rounded-xl border border-[#c7bfff]">
                  <p className="text-xl text-[#715AFF] font-semibold">
                    Integrated Billing & Insurance Management
                  </p>
                  <p className="text-[#102E4A] text-justify">
                    Automate billing, insurance claims, and payment tracking
                    with a seamless financial management system that reduces
                    administrative workload and ensures faster reimbursements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#102E4A] py-5 sm:py-20 px-5 sm:px-10 text-white">
        <div>
          <p className="text-3xl font-bold">Supporting your wellness journey</p>
          <p className="text-sm text-justify">
            Our comprehensive health resources, expert advice, and supportive
            community are here to guide you every step of the way.
          </p>

          <div className="flex mt-7 items-center">
            <input
              placeholder="write your thoughts down..."
              className="bg-[#102E4A] w-48 sm:w-60 border border-white py-1 px-3  rounded"
            ></input>
            <button className="py-1 px-4 rounded ml-2 bg-[#715AFF]">
              Reach Us!
            </button>
          </div>
        </div>
      </div>
      {openingLogin && <Login setopeningLogin={setopeningLogin} />}
    </div>
  );
}

export default SingleLandingPage;
