import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import admin from "../assets/img/figure/admin.jpg";

const Headers = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
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
        <ul className="navbar-nav">
          <li className="navbar-item dropdown header-admin" ref={dropdownRef}>
            <button
              className="navbar-nav-link dropdown-toggle"
              onClick={toggleDropdown}
            >
              <div className="admin-img mr-3">
                <img src={admin} alt="Admin" />
              </div>
              <div className="admin-title">
                <h5 className="item-title">John Doe</h5>
                <span>Admin</span>
              </div>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu dropdown-menu-right show">
                <div className="item-header">
                  <h6 className="item-title">John Doe</h6>
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
                      <Link to="/signin">
                        <i className="flaticon-turn-off" />
                        Log Out
                      </Link>
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
