import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Patient from "./Patient";

function App() {
  return (
    <div className="App">
      <Patient />
      <Router>
        <Routes>
          <Route path="/" element={<Patient />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
