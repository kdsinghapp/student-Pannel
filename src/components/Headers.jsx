import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import admin from "../assets/img/figure/admin.jpg";
import { useSidebarContext } from "../context/SidebarContext";
const Headers = ({ selectedYear }) => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isSidebarOpen, toggleSidebar } = useSidebarContext();
  const dropdownRef = useRef(null);
  const [userName, setUserName] = useState("");

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);
  return (
    <div className="navbar navbar-expand-md header-menu-one bg-light">
      <div className="nav-bar-header-one">
        <div className="header-logo">
          <Link to="/signin">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="toggle-button sidebar-toggle">
          <button type="button" className="item-link" onClick={toggleSidebar}>
            <span className="btn-icon-wrap">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>
      <div className="d-md-none mobile-nav-bar">
        <button
          className="navbar-toggler pulse-animation"
          type="button"
          onClick={toggleMobileNav}
        >
          <i className="far fa-arrow-alt-circle-down" />
        </button>
        <button
          type="button"
          className="navbar-toggler sidebar-toggle-mobile"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars" />
        </button>
      </div>
      <div
        className={`header-main-menu collapse navbar-collapse ${
          isMobileNavOpen ? "show" : ""
        }`}
        id="mobile-navbar"
      >
        <ul className="navbar-nav">
          <li className="navbar-item header-search-bar">
            <div className="input-group stylish-input-group">
              <span className="input-group-addon">
                <button type="submit">
                  <span className="flaticon-search" aria-hidden="true" />
                </button>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>
          </li>
        </ul>
        <div className="breadcrumbs-area  ">
          <h3>{selectedYear}</h3>
        </div>
        <ul className="navbar-nav">
          <li className="navbar-item dropdown header-admin">
            <a
              className="navbar-nav-link dropdown-toggle"
              href="#"
              onClick={toggleDropdown}
            >
              <div className="admin-img mr-3">
                <img src={admin} alt="Admin" />
              </div>
              <div className="admin-title">
                <h5 className="item-title">{userName || "Admin"}</h5>
                <span>Admin</span>
              </div>
            </a>
            {isDropdownOpen && (
              <div className="dropdown-menu dropdown-menu-right show">
                <div className="item-header">
                  <h6 className="item-title">{userName || "Admin"}</h6>
                </div>
                <div className="item-content">
                  <ul className="settings-list">
                    <li>
                      <Link to="/profile">
                        <i className="flaticon-user" />
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <a onClick={handleLogout}>
                        <i className="flaticon-turn-off" />
                        Log Out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Headers;
