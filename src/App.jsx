import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Classes from "./pages/Classes";
import Students from "./pages/student/Students";
import Grading from "./pages/Grading";
import Teachers from "./pages/teachers/Teachers";
import CurriculamSetup from "./pages/CurriculumSetup";
import InternalAssesment from "./pages/InternalAssesment";
import ExternalAssesment from "./pages/ExternalAssesment";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import WelcomePage from "./pages/WelcomePage";
import AddExternalAssesment from "./components/ExternalAssesments/AddExternalAssesment";
import NotFound from "./pages/NotFound";
import AddStudentDetails from "./pages/student/AddStudentDetails";
import { SidebarProvider } from "./context/SidebarContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddTeacherDetails from "./pages/teachers/AddTeacherDetails";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("userTokenStudent");
  if (!token) {
    // If not on signin or signup, redirect to signin
    if (location.pathname !== "/signin" && location.pathname !== "/signup") {
      return <Navigate to="/signin" replace />;
    }
  }
  return children;
}

function App() {
  return (
    <Router>
      <SidebarProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<WelcomePage />} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/students" element={<Students />} />
                <Route path="/grading-setup" element={<Grading />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/add-teacher" element={<AddTeacherDetails />} />
                <Route path="/curriculam-setup" element={<CurriculamSetup />} />
                <Route path="/internal-assessment" element={<InternalAssesment />} />
                <Route path="/external-assessment" element={<ExternalAssesment />} />
                <Route
                  path="/external-assessment/add-external-assessment"
                  element={<AddExternalAssesment />}
                />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/add-student-details" element={<AddStudentDetails/>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
      </SidebarProvider>
    </Router>
  );
}

export default App;
