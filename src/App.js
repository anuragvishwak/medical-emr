import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Patient from "./Patient";
import Appointment from "./Appointments/Appointment";
import MedicalRecords from "./MedicalRecords/MedicalRecords";
import BillPay from "./Billing&Payment.js/BillPay";
import StaffDetails from "./Staff/StaffDetails";
import SingleLandingPage from "./SingleLandingPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Patient" element={<Patient />} />
          <Route path="/" element={<SingleLandingPage />} />
          <Route path="/Appointment" element={<Appointment />} />
          <Route path="/MedicalRecords" element={<MedicalRecords />} />
          <Route path="/Billing&Payment" element={<BillPay />} />
          <Route path="/StaffDetails" element={<StaffDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
