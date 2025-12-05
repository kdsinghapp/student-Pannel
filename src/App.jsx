import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Classes from "./pages/Classes";
import Students from "./pages/student/Students";
import Grading from "./pages/grading/Grading";
import AddGrading from "./pages/grading/AddGrading";
import EditGrading from "./pages/grading/EditGrading";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTeacherDetails from "./pages/teachers/AddTeacherDetails";
import Departments from "./pages/departments/Departments";
import AddDepartment from "./pages/departments/AddDepartment";
import EditDepartment from "./pages/departments/EditDepartment";
import Subjects from "./pages/subjects/Subjects";
import AddSubject from "./pages/subjects/AddSubject";
import EditSubject from "./pages/subjects/EditSubject";
import GradeBook from "./pages/gradeBook/GradeBook";
import Profile from "./pages/profile/Profile";

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
                  <Route path="/add-grading" element={<AddGrading />} />
                  <Route path="/edit-grading/:id" element={<EditGrading />} />
                  <Route path="/teachers" element={<Teachers />} />
                  <Route path="/add-teacher" element={<AddTeacherDetails />} />
                  <Route
                    path="/curriculam-setup"
                    element={<CurriculamSetup />}
                  />
                  <Route
                    path="/internal-assessment"
                    element={<InternalAssesment />}
                  />
                  <Route
                    path="/external-assessment"
                    element={<ExternalAssesment />}
                  />
                  <Route
                    path="/external-assessment/add-external-assessment"
                    element={<AddExternalAssesment />}
                  />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route
                    path="/add-student-details"
                    element={<AddStudentDetails />}
                  />
                  //departments routes
                  <Route path="/departments" element={<Departments />} />
                  <Route path="/add-department" element={<AddDepartment />} />
                  <Route
                    path="/edit-department/:id"
                    element={<EditDepartment />}
                  />
                  //subjects routes
                  <Route path="/subjects" element={<Subjects />} />
                  <Route path="/add-subject" element={<AddSubject />} />
                  <Route path="/edit-subject/:id" element={<EditSubject />} />
                  <Route path="/grade-book" element={<GradeBook />} />
                  <Route path="/profile" element={<Profile />} />
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
