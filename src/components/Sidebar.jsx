import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo1.png";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userTokenStudent");
    localStorage.removeItem("userStudentData");
    navigate("/signin");
  };

  return (
    <>
      <div className="sidebar-main sidebar-menu-one sidebar-expand-md sidebar-color">
        <div className="mobile-sidebar-header d-md-none">
          <div className="header-logo">
            <Link to="/signin">
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </div>
        <div className="sidebar-menu-content">
          <ul className="nav nav-sidebar-menu sidebar-toggle-view">
            <li
              className={`nav-item ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <Link to="/" className="nav-link">
                <i className="flaticon-menu-1" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/classes" ? "active" : ""
              }`}
            >
              <Link to="/classes" className="nav-link">
                <i className="flaticon-maths-class-materials-cross-of-a-pencil-and-a-ruler" />
                <span>Classes</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/students" ? "active" : ""
              }`}
            >
              <Link to="/students" className="nav-link">
                <i className="flaticon-classmates" />
                <span>Students</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/teachers" ? "active" : ""
              }`}
            >
              <Link to="/teachers" className="nav-link">
                <i className="flaticon-multiple-users-silhouette" />
                <span>Teachers</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/grading-setup" ? "active" : ""
              }`}
            >
              <Link to="/grading-setup" className="nav-link">
                <i className="fa fa-star" />
                <span>Grading Setup</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/curriculam-setup" ? "active" : ""
              }`}
            >
              <Link to="/curriculam-setup" className="nav-link">
                <i className="fa fa-tasks" />
                <span>Curriculam Setup</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/grade" ? "active" : ""
              }`}
            >
              <Link to="/grade" className="nav-link">
                <i className="flaticon-shopping-list" />
                <span>Grade Book</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/internal-assessment" ? "active" : ""
              }`}
            >
              <Link to="/internal-assessment" className="nav-link">
                <i className="fa fa-cube" />
                <span>Internal Assessment</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/external-assessment" ? "active" : ""
              }`}
            >
              <Link to="/external-assessment" className="nav-link">
                <i className="fa fa-list" />
                <span>External Assessment</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/reports" ? "active" : ""
              }`}
            >
              <Link to="/reports" className="nav-link">
                <i className="fa fa-file" />
                <span>Student Reports</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/statistics" ? "active" : ""
              }`}
            >
              <a href="statistics.html" className="nav-link">
                <i className="fa fa-object-group" />
                <span>Statistics</span>
              </a>
            </li>
          </ul>
          <ul className="nav nav-sidebar-menu sidebar-toggle-view border-top mt-100">
            <li
              className={`nav-item ${
                location.pathname === "/settings" ? "active" : ""
              }`}
            >
              <Link to="/settings" className="nav-link">
                <i className="fa fa-cog" />
                <span>Settings</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/signup" ? "active" : ""
              }`}
            >
              <button className="nav-link" onClick={handleLogout}>
                <i className="flaticon-turn-off" />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <i classname="flaticon-menu-1">
        <i classname="flaticon-maths-class-materials-cross-of-a-pencil-and-a-ruler">
          <i classname="flaticon-classmates">
            <i classname="flaticon-multiple-users-silhouette">
              <i classname="fa fa-star">
                <i classname="fa fa-tasks">
                  <i classname="flaticon-shopping-list">
                    <i classname="fa fa-cube">
                      <i classname="fa fa-list">
                        <i classname="fa fa-file">
                          <i classname="fa fa-object-group">
                            <i classname="fa fa-cog">
                              <i classname="flaticon-turn-off"></i>
                            </i>
                          </i>
                        </i>
                      </i>
                    </i>
                  </i>
                </i>
              </i>
            </i>
          </i>
        </i>
      </i>
    </>
  );
};

export default Sidebar;
