import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Classes from "./pages/Classes";
import Students from "./pages/student/Students";
import Grading from "./pages/Grading";
import Teachers from "./pages/teachers/Teachers";
import CurriculamSetup from "./pages/CurriculumSetup";
import Grade from "./pages/Grade";
import InternalAssesment from "./pages/InternalAssesment";
import ExternalAssesment from "./pages/ExternalAssesment";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import WelcomePage from "./pages/WelcomePage";
import AddExternalAssesment from "./components/ExternalAssesments/AddExternalAssesment";
import NotFound from "./pages/NotFound";
import AddStudentDetails from "./pages/student/AddStudentDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/students" element={<Students />} />
        <Route path="/grading-setup" element={<Grading />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/curriculam-setup" element={<CurriculamSetup />} />
        <Route path="/grade" element={<Grade />} />
        <Route path="/internal-assessment" element={<InternalAssesment />} />
        <Route path="/external-assessment" element={<ExternalAssesment />} />
        <Route
          path="/external-assessment/add-external-assessment"
          element={<AddExternalAssesment />}
        />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/signin" element={<WelcomePage />} />
        <Route path="/add-student-details" element={<AddStudentDetails/>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
