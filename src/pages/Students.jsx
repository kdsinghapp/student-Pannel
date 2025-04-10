import React, { useState,useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Headers from "../components/Headers";
import studentId from "../assets/assets/icon/fi_list.png";
import studentPh from "../assets/assets/icon/ph_student.png";
import studentCat from "../assets/assets/icon/category.png";
import studentClass from "../assets/assets/icon/class.png";
import studentProg from "../assets/assets/icon/tabler_progress.png";
import studentStat from "../assets/assets/icon/lets-icons_status.png";
import studentEdit from "../assets/assets/icon/tabler_edit.png";
import Sidebar from "../components/Sidebar";
import * as bootstrap from "bootstrap";
import DownloadTemplate from "../components/DownloadTemplate";
import {
  getAllStudents,getStudentById,deleteStudentById,updateStudentById,addStudents} from "../utils/authApi";
import { useNavigate } from "react-router-dom";


const Students = () => {
  const [students, setStudents] = useState([]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const navigate = useNavigate();
  
  // const sList = [
  //   {
  //     id: 1010,
  //     name: "George Martin",
  //     category: "ESL",
  //     class: "Class 10A",
  //     progress: 10,
  //     nationality: "Indian",
  //   },
  //   {
  //     id: 1011,
  //     name: "Ankur Warikoo",
  //     category: "ESL",
  //     class: "Class 10A",
  //     progress: 100,
  //     nationality: "Indian",
  //   },
  //   {
  //     id: 1012,
  //     name: "Rahul Rawat",
  //     category: "ESL",
  //     class: "Class 10A",
  //     progress: 50,
  //     nationality: "Indian",
  //   },
  //   {
  //     id: 1013,
  //     name: "Jay Shah",
  //     category: "ESL",
  //     class: "Class 10A",
  //     progress: 10,
  //     nationality: "Indian",
  //   },
  //   {
  //     id: 1014,
  //     name: "George Martin",
  //     category: "ESL",
  //     class: "Class 10A",
  //     progress: 10,
  //     nationality: "Indian",
  //   },
  //   {
  //     id: 1015,
  //     name: "George Martin",
  //     category: "ESL",
  //     class: "Class 10A",
  //     progress: 10,
  //     nationality: "Indian",
  //   },
  // ]

   const getStudentsData = async () => {
      try {
        const res = await getAllStudents();
        console.log("student-list",res)
        if (res.status) {
          setStudents(res.data);
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
      }
    };

   useEffect(() => {
    getStudentsData();
    }, []);

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...students].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setStudents(sortedData);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc"
        ? "fas fa-sort-up"
        : "fas fa-sort-down";
    }
    return "fas fa-sort";
  };
  const navigateToAddStudents = () => {
    navigate("/add-student-details")
  }

  return (
    <>
      <div id="wrapper" className="wrapper bg-ash">
        <Headers />
        <div className="dashboard-page-one">
          <Sidebar />
          <div className="dashboard-content-one">
            {/* Breadcubs Area Start Here */}
            <div className="breadcrumbs-area d-flex justify-content-between">
              <h3>Student Lists</h3>
              <div>
            {/* <button class="btn btn-purple modal-trigger mb-0" data-toggle="modal"
                                    data-target="#download"><i class="fas fa-download"></i> Template</button>
            <button class="btn btn-purple modal-trigger mb-0" data-toggle="modal"
                                    data-target="#upload"><i class="fas fa-upload"></i> Upload</button> */}
            <a href="add-student-details.html" class="btn btn-purple text-white"><i class="fas fa-plus"></i> Add New</a>
          </div>
            </div>
            {/* Breadcubs Area End Here */}
            <div className="filter-bar">
              <div className="filter-group form-group">
                <button className="btn btn-light">
                  <i className="fas fa-filter" />
                </button>
                <span className="btn">Filter By</span>
                <select className="form-control">
                  <option>Your Group</option>
                </select>
                <select className="form-control">
                  <option>Class</option>
                </select>
                <select className="form-control">
                  <option>ID</option>
                </select>
                <span className="reset-filter btn">
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
                              onClick={navigateToAddStudents}
                            >
                              <i className="fas fa-plus" /> Add New
                            </button>
                         
                          </div>
            </div>
            {/* Class Table Area Start Here */}
            <div className="card height-auto">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table display data-table">
                    <thead>
                      <tr>
                        <th onClick={() => sortData("id")}>
                          <img src={studentId} /> Student Id{" "}
                          <i className={getSortIcon("id")} />
                        </th>
                        <th onClick={() => sortData("name")}>
                          <img src={studentPh} /> Student Name{" "}
                          <i className={getSortIcon("name")} />
                        </th>
                        <th onClick={() => sortData("category")}>
                          <img src={studentCat} /> Category{" "}
                          <i className={getSortIcon("category")} />
                        </th>
                        <th onClick={() => sortData("class")}>
                          <img src={studentClass} /> Class{" "}
                          <i className={getSortIcon("class")} />
                        </th>
                        <th onClick={() => sortData("progress")}>
                          <img src={studentProg} /> Progress{" "}
                          <i className={getSortIcon("progress")} />
                        </th>
                        <th onClick={() => sortData("nationality")}>
                          <img src={studentStat} /> Nationality{" "}
                          <i className={getSortIcon("nationality")} />
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student.id}>
                          <td>{student.id}</td>
                          <td>{student.first_name }  {student.last_name }</td>
                          <td>{student.category}</td>
                          <td>{student.class}</td>
                          <td className="progress-indicator">
                            {student.progress}%{" "}
                            <span
                              className={`progress-circle progress-${
                                student.progress === 100
                                  ? "green"
                                  : student.progress > 50
                                  ? "orange"
                                  : "red"
                              }`}
                            />
                          </td>
                          <td>{student.nationality}</td>
                          <td className="action-icons">
                            <i className="fas fa-edit" />
                            <i className="fas fa-eye" />
                            <a
                              href="javascript:void()"
                              data-toggle="modal"
                              data-target="#deleteconfirm"
                            >
                              <i className="fas fa-trash" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Class Table Area End Here */}
          </div>
        </div>
        {/* Page Area End Here */}
      </div>
      {/* <div
        className="modal fade"
        id="download"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Download Template</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <div className="upload-box">
                <label style={{ cursor: "pointer" }}>
                  <input type="file" style={{ display: "none" }} />
                  <img src="assets/upload.png" alt="Upload Icon" />
                  <p>This is the template to quickly add students</p>
                  <span>CSV</span>
                </label>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <div className="help-center">
                <img src="assets/help.png" alt="Help Icon" /> Help Center
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-outline"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-success">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <DownloadTemplate/>
      <div
        className="modal fade"
        id="upload"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add new file!</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <div className="upload-box">
                <label style={{ cursor: "pointer" }}>
                  <input type="file" style={{ display: "none" }} />
                  <img src="assets/upload.png" alt="Upload Icon" />
                  <p>Drag &amp; Drop or Choose file to upload</p>
                  <span>CSV, Doc, pdf</span>
                </label>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <div className="help-center">
                <img src="assets/help.png" alt="Help Icon" /> Help Center
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-outline"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  // onClick="openModal()"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="deleteconfirm"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <h4>Are you sure you want to delete this?</h4>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-danger">
                Delete Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
