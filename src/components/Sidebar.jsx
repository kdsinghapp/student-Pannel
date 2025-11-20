import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo1.png";
import { useSidebarContext } from "../context/SidebarContext";

const Sidebar = () => {
  const { isSidebarOpen } = useSidebarContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const menuItems = [
    { path: "/", label: "Dashboard", icon: "flaticon-menu-1" },
    {
      path: "/classes",
      label: "Classes",
      icon: "flaticon-maths-class-materials-cross-of-a-pencil-and-a-ruler",
    },
    { path: "/departments", label: "Departments", icon: "flaticon-classmates" },
    { path: "/subjects", label: "Subjects", icon: "flaticon-classmates" },
    { path: "/students", label: "Students", icon: "flaticon-classmates" },
    {
      path: "/teachers",
      label: "Teachers",
      icon: "flaticon-multiple-users-silhouette",
    },
    { path: "/grading-setup", label: "Grading Setup", icon: "fa fa-star" },
    {
      path: "/curriculam-setup",
      label: "Curriculam Setup",
      icon: "fa fa-tasks",
    },
    {
      path: "/grade-book",
      label: "Grade Book",
      icon: "flaticon-shopping-list",
    },
    {
      path: "/internal-assessment",
      label: "Internal Assessment",
      icon: "fa fa-cube",
    },
    {
      path: "/external-assessment",
      label: "External Assessment",
      icon: "fa fa-list",
    },
    { path: "/reports", label: "Student Reports", icon: "fa fa-file" },
    {
      path: "/statistics",
      label: "Statistics",
      icon: "fa fa-object-group",
      isExternal: true,
    },
  ];

  const renderMenuItem = (item) => {
    const isActive = location.pathname === item.path;
    if (item.isExternal) {
      return (
        <a href="statistics.html" className="nav-link">
          <i className={item.icon} />
          {isSidebarOpen && <span>{item.label}</span>}
        </a>
      );
    }
    return (
      <Link to={item.path} className="nav-link">
        <i className={item.icon} />
        {isSidebarOpen && <span>{item.label}</span>}
      </Link>
    );
  };

  return (
    <aside>
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
            {menuItems.map((item) => (
              <li
                key={item.path}
                className={`nav-item ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                {renderMenuItem(item)}
              </li>
            ))}
          </ul>
          <ul className="nav nav-sidebar-menu sidebar-toggle-view border-top mt-100">
            <li
              className={`nav-item ${
                location.pathname === "/settings" ? "active" : ""
              }`}
            >
              <Link to="/settings" className="nav-link">
                <i className="fa fa-cog" />
                {isSidebarOpen && <span>Settings</span>}
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>
                <i className="flaticon-turn-off" />
                {isSidebarOpen && <span>Log Out</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
