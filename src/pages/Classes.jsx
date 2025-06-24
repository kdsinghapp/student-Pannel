import React, { useEffect, useState } from "react";
import Headers from "../components/Headers";
import fiList from "../assets/assets/icon/fi_list.png";
import classList from "../assets/assets/icon/class.png";
import tableEdit from "../assets/assets/icon/tabler_edit.png";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Sidebar from "../components/Sidebar";
import DownloadTemplate from "../components/ClassAddOn/DownloadTemplate";
import AddNewFile from "../components/ClassAddOn/AddNewFile";
import AddNewClass from "../components/ClassAddOn/AddNewClass";
import * as bootstrap from "bootstrap";
import {
  deleteClassById,
  getAllClasses,
  updateClassById,
  addClasses,
} from "../utils/authApi";
import Swal from "sweetalert2";
import img1 from "../assets/assets/icon/circle-round.png";
import Notification from "../components/Notification";
const Classes = () => {
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "" });
  const [showModal, setShowModal] = useState(false);
  const [className, setClassName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: "", type: "success" });
  const [yearGroups, setYearGroups] = useState([]);
  const [selectedYearGroup, setSelectedYearGroup] = useState("");
  const [yearGroupHierarchy, setYearGroupHierarchy] = useState([]); // Store full hierarchy
  const [selectedDivision, setSelectedDivision] = useState("");
  const [divisionClasses, setDivisionClasses] = useState([]);
  const [sectionNames, setSectionNames] = useState([""]);
  const [selectedClassObj, setSelectedClassObj] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const userData = JSON.parse(localStorage.getItem("userData"));
  const curriculum =
    userData?.user?.school_details?.[0]?.curriculums?.[0]?.curriculum_division
      ?.curriculum_id;
  const school = userData?.user?.school_details?.[0]?.curriculums?.[0]?.id;

  console.log("Curriculum ID:", curriculum);
  console.log("School ID:", school);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const addClass = async (e) => {
    e.preventDefault();
    if (!selectedDivision) {
      alert("Please select a Year Group!");
      return;
    }
    if (!selectedClassObj) {
      alert("Please select a Class!");
      return;
    }
    if (sectionNames.some((name) => name.trim() === "")) {
      alert("Section name cannot be empty!");
      return;
    }
    const newClassData = {
      name: sectionNames,
      school_curriculum_id: school,
      curriculum_class_id: selectedClassObj.id,
    };
    console.log("New Class Payload:", newClassData);
    try {
      const res = await addClasses(newClassData);
      console.log("class-list", res);
      if (!res.status) {
        setToastData({
          message: res.message || "Class not added",
          type: "denger",
        });
        setShowToast(true);
      }
      if (res.status) {
        // setData(res.data);
        getClassData();
      }
    } catch (error) {
      console.error("Error add class data:", error);
      if (error.message) {
        console.error("Response Error:", error.response.data);
        alert(
          `Error: ${error.response.data.message || "Something went wrong"}`
        );
      } else if (error.request) {
        console.error("Network Error:", error.request);
        alert("Network error. Please check your internet connection.");
      } else {
        console.error("Unexpected Error:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }
    setClassName(""); // Reset input field after adding
    handleCloseModal(); // Close modal after adding
  };

  const getClassData = async () => {
    setLoading(true);
    try {
      const res = await getAllClasses();
      console.log("class-list", res);
      if (res.status) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
      if (error.message) {
        console.error("Response Error:", error.response.data);
        alert(
          `Error: ${error.response.data.message || "Something went wrong"}`
        );
      } else if (error.request) {
        console.error("Network Error:", error.request);
        alert("Network error. Please check your internet connection.");
      } else {
        console.error("Unexpected Error:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch year groups (class hierarchy) for dropdown
  useEffect(() => {
    const fetchYearGroups = async () => {
      try {
        const res = await fetch(
          `https://server-php-8-3.technorizen.com/gradesphere/api/user/classes/get-class-hierarchy?school_curriculum_id=${school}`
        );
        const result = await res.json();
        if (result.status && result.data && result.data.length > 0) {
          setYearGroupHierarchy(result.data); // Store full hierarchy
        }
      } catch (err) {
        // handle error
      }
    };
    fetchYearGroups();
  }, []);

  // Update classes dropdown when division changes
  useEffect(() => {
    if (!selectedDivision) {
      setDivisionClasses([]);
      setSelectedClassObj(null);
      return;
    }
    // Find the selected division object
    const divisionObj = yearGroupHierarchy.find(
      (item) => item.curriculum_division?.name === selectedDivision
    );
    if (divisionObj && divisionObj.curriculum_division?.classes) {
      setDivisionClasses(divisionObj.curriculum_division.classes);
    } else {
      setDivisionClasses([]);
    }
    setSelectedClassObj(null);
  }, [selectedDivision, yearGroupHierarchy]);

  // Update selectedClassObj when class changes
  useEffect(() => {
    if (!selectedYearGroup) {
      setSelectedClassObj(null);
      return;
    }
    const classObj = divisionClasses.find((cls) => cls.name === selectedYearGroup);
    setSelectedClassObj(classObj || null);
  }, [selectedYearGroup, divisionClasses]);

  useEffect(() => {
    getClassData();
  }, []);

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setData(sortedData);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc"
        ? "fas fa-sort-up"
        : "fas fa-sort-down";
    }
    return "fas fa-sort";
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setEditFormData({ name: item.name });
  };

  const handleInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (selectedItem) {
      try {
        const res = await updateClassById(selectedItem.id, editFormData);

        setData((prevData) =>
          prevData.map((item) =>
            item.id === selectedItem.id ? { ...item, ...editFormData } : item
          )
        );
        document.getElementById("closeEditModal").click();
      } catch (error) {
        console.error("Error updating class:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log(id);
          const res = await deleteClassById(id);
          setData((prevData) => prevData.filter((item) => item.id !== id));
          Swal.fire("Deleted!", "The class has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the class.", "error");
        }
      }
    });
  };

  const handleSectionNameChange = (idx, value) => {
    setSectionNames((prev) => prev.map((s, i) => (i === idx ? value : s)));
  };
  const handleAddSection = () => {
    setSectionNames((prev) => [...prev, ""]);
  };
  const handleRemoveSection = (idx) => {
    setSectionNames((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <>
      <div id="wrapper" className="wrapper bg-ash">
        <Headers />

        <div className="dashboard-page-one">
          <Sidebar />
          <div className="dashboard-content-one">
            <div className="breadcrumbs-area">
              <h3 style={{ fontSize: "22px" }}>Class Lists</h3>
            </div>
            <div className="filter-bar">
              <div className="filter-group form-group filter-container mb-3">
                <button className="btn btn-light">
                  <i className="fas fa-filter" />
                </button>
                <span
                  className="btn"
                  style={{ fontSize: "14px", color: "#646464" }}
                >
                  Filter By
                </span>
                <input
                  type="text"
                  className="filter-input form-control"
                  id="date-input"
                  placeholder="Date"
                  onclick="toggleCalendar()"
                />
                <div className="calendar" id="calendar">
                  <div className="calendar-header">
                    <button onclick="prevMonth()">◁</button>
                    <span id="month-year" />
                    <button onclick="nextMonth()">▷</button>
                  </div>
                  <div className="calendar-grid" id="calendar-grid" />
                  <button className="apply-button" onclick="applyDate()">
                    Apply Now
                  </button>
                </div>
                <select className="form-control">
                  <option style={{ fontSize: "16px", color: "#646464" }}>
                    {" "}
                    Name
                  </option>
                </select>
                <span className="reset-filter btn" style={{ color: "red" }}>
                  <i className="fas fa-sync-alt" /> Reset Filter
                </span>
              </div>
              <div>
                <button
                  className="btn btn-purple modal-trigger"
                  onClick={() => {
                    const modalElement = document.getElementById("download");
                    if (modalElement) {
                      const modal = new bootstrap.Modal(modalElement);
                      modal.show();
                    }
                  }}
                  style={{ color: "white", background: "#501b8d" }}
                >
                  <i className="fas fa-download" /> Template
                </button>
                <button
                  className="btn btn-purple modal-trigger"
                  onClick={() => {
                    const modalElement = document.getElementById("upload");
                    if (modalElement) {
                      const modal = new bootstrap.Modal(modalElement);
                      modal.show();
                    }
                  }}
                  style={{ color: "white", background: "#501b8d" }}
                >
                  <i className="fas fa-upload" /> Upload
                </button>
                <button
                  className="btn btn-purple modal-trigger"
                  style={{ color: "white", background: "#501b8d" }}
                  onClick={handleOpenModal}
                >
                  <i className="fas fa-plus" /> Add New
                </button>
                {/* <a
                  href="#"
                  className="btn btn-purple modal-trigger"
                  data-toggle="modal"
                  data-target="#addclass"
                >
                  <i className="fas fa-plus" /> Add New
                </a> */}
              </div>
            </div>
            {/* Class Table Area Start Here */}
            <div className="card height-auto">
              <div className="card-body p-0">
                {loading && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minHeight: '300px',
                    }}
                  >
                    <div
                      className="spinner-border text-primary"
                      role="status"
                      style={{ width: '4rem', height: '4rem' }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                <div className="table-responsive" style={{ display: loading ? 'none' : 'block' }}>
                  <table className="table display data-table">
                    <thead>
                      <tr>
                        <th
                          onClick={() => sortData("id")}
                          style={{
                            cursor: "pointer",
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          <img src={fiList} alt="Class ID" /> Class ID{" "}
                          <i className={getSortIcon("id")} />
                        </th>
                        <th
                          onClick={() => sortData("name")}
                          style={{
                            width: "60%",
                            cursor: "pointer",
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          <img src={classList} alt="Class Name" /> Class Name{" "}
                          <i className={getSortIcon("name")} />
                        </th>
                        <th>
                          <img src={tableEdit} alt="Action" /> Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map((item, index) => (
                          <tr key={index} style={{ lineHeight: "35px" }}>
                            <td
                              style={{
                                cursor: "pointer",
                                fontSize: "15px",
                                color: "#646464",
                              }}
                            >
                              {item.id}
                            </td>
                            <td
                              style={{
                                cursor: "pointer",
                                fontSize: "13px",
                                color: "#646464",
                              }}
                            >
                              {item.name}
                            </td>
                            <td className="action-icons">
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#editModal"
                                onClick={() => handleEditClick(item)}
                              >
                                <i className="fas fa-edit" />
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#viewModal"
                                onClick={() => setSelectedItem(item)}
                              >
                                <i className="fas fa-eye" />
                              </a>
                              <a href="#" onClick={() => handleDelete(item.id)}>
                                <i className="fas fa-trash" />
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="3"
                            style={{ textAlign: "center", padding: "10px" }}
                          >
                            No records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* View Info Model */}
      <div
        className="modal fade"
        id="viewModal"
        tabIndex="-1"
        aria-labelledby="viewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="viewModalLabel"
                style={{ fontSize: "25px" }}
              >
                View Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: "14px" }}>Item ID: {selectedItem?.id}</p>
              <p style={{ fontSize: "14px" }}>Name: {selectedItem?.name}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{ fontSize: "12px" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Info Model */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="editModalLabel"
                style={{ fontSize: "25px" }}
              >
                Edit Item
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closeEditModal"
              ></button>
            </div>
            <div className="modal-body">
              <label style={{ fontSize: "14px" }}>Name:</label>
              <input
                style={{ fontSize: "14px" }}
                type="text"
                className="form-control"
                name="name"
                value={editFormData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{ fontSize: "12px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
                style={{ fontSize: "12px" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Create Info Model */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ fontSize: "18px" }}>
                  <img src={img1} alt="icon" /> Add New Class
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label style={{ fontSize: "16px", color: "#646464" }}>
                    Division
                  </label>
                  <select
                    className="form-control"
                    style={{ fontSize: "16px", color: "#646464", border: "1px solid lightgrey" }}
                    value={selectedDivision}
                    onChange={(e) => {
                      setSelectedDivision(e.target.value);
                      setSelectedYearGroup(""); // Reset class selection
                    }}
                  >
                    <option value="">Select Division</option>
                    {yearGroupHierarchy.map((item, idx) => (
                      <option key={item.curriculum_division?.id || idx} value={item.curriculum_division?.name}>
                        {item.curriculum_division?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: "16px", color: "#646464" }}>
                   Year Group
                  </label>
                  <select
                    className="form-control"
                    style={{ fontSize: "16px", color: "#646464", border: "1px solid lightgrey" }}
                    value={selectedYearGroup}
                    onChange={(e) => setSelectedYearGroup(e.target.value)}
                    disabled={!selectedDivision}
                  >
                    <option value="">Select  Year Group</option>
                    {divisionClasses.map((cls) => (
                      <option key={cls.id} value={cls.name}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: "16px", color: "#646464" }}>
                    Class
                  </label>
                  {sectionNames.map((section, idx) => (
                    <div key={idx} className="input-group mb-2">
                      <input
                        type="text"
                        name={`section-${idx}`}
                        className="form-control mr-3"
                        value={section}
                        onChange={(e) => handleSectionNameChange(idx, e.target.value)}
                        placeholder="Enter Class Name"
                        disabled={!selectedYearGroup}
                      />
                      <div className="input-group-append">
                        {sectionNames.length > 1 && (
                          <button
                            className="btn btn-danger ml-2"
                            type="button"
                            onClick={() => handleRemoveSection(idx)}
                          >
                            -
                          </button>
                        )}
                        {idx === sectionNames.length - 1 && (
                          <button
                            className="btn btn-success ml-2"
                            type="button"
                            onClick={handleAddSection}
                            disabled={!selectedYearGroup}
                          >
                            +
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => addClass(e)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && <div className="modal-backdrop fade show"></div>}
      <DownloadTemplate />
      <AddNewFile />
      {/* <AddNewClass /> */}
      {showToast && (
        <Notification
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};

export default Classes;
