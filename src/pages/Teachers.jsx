import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Headers from "../components/Headers";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
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

const Teachers = () => {
  const initialTeachers = [
    {
      id: 1010,
      name: "George Martin",
      department: "Maths",
      subject: "Math",
      email: "arjun@gmail.com",
      yearGroup: "Year 10",
    },
    {
      id: 1011,
      name: "Ankur Warikoo",
      department: "Physics",
      subject: "Science",
      email: "teacher@gmail.com",
      yearGroup: "Year 10",
    },
    {
      id: 1012,
      name: "Rahul Rawat",
      department: "Math",
      subject: "Math",
      email: "new@gmail.com",
      yearGroup: "Year 10",
    },
    {
      id: 1013,
      name: "Jay Shah",
      department: "Science",
      subject: "Chemistry",
      email: "123@gmail.com",
      yearGroup: "Year 10",
    },
    {
      id: 1014,
      name: "George Martin",
      department: "History",
      subject: "History",
      email: "teacher@gmail.com",
      yearGroup: "Year 10",
    },
    {
      id: 1015,
      name: "George Martin",
      department: "Math",
      subject: "Math",
      email: "mailto@gmail.com",
      yearGroup: "Year 10",
    },
  ];

  const [teachers, setTeachers] = useState(initialTeachers);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc"
        ? "fas fa-sort-up"
        : "fas fa-sort-down";
    }
    return "fas fa-sort";
  };

  const sortTable = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...teachers].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setTeachers(sortedData);
  };

  return (
    <>
      <div id="wrapper" className="wrapper bg-ash">
        <Headers />
        {/* Header Menu Area End Here */}
        {/* Page Area Start Here */}
        <div className="dashboard-page-one">
          {/* Sidebar Area Start Here */}
          <Sidebar />
          {/* Sidebar Area End Here */}
          <div className="dashboard-content-one">
            {/* Breadcubs Area Start Here */}
            <div className="breadcrumbs-area">
              <h3>Teacher Lists</h3>
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
>
  <i className="fas fa-download" /> Template
</button>

                <button
                  className="btn btn-purple modal-trigger mb-0"
                  data-toggle="modal"
                  data-target="#upload"
                >
                  <i className="fas fa-upload" /> Upload
                </button>
                <a
                  href="add-teacher-details.html"
                  className="btn btn-purple text-white"
                >
                  <i className="fas fa-plus" /> Add New
                </a>
              </div>
            </div>
            {/* Class Table Area Start Here */}
            <div className="card height-auto">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table display data-table">
                    <thead>
                      <tr>
                        <th
                          onClick={() => sortTable("id")}
                          style={{ cursor: "pointer" }}
                        >
                          <img src={studentId} alt="ID" /> Teacher Id{" "}
                          <i className={getSortIcon("id")} />
                        </th>
                        <th
                          onClick={() => sortTable("name")}
                          style={{ cursor: "pointer" }}
                        >
                          <img src={studentPh} alt="Name" /> Teacher Name{" "}
                          <i className={getSortIcon("name")} />
                        </th>
                        <th
                          onClick={() => sortTable("department")}
                          style={{ cursor: "pointer" }}
                        >
                          <img src={studentCat} alt="Department" /> Department{" "}
                          <i className={getSortIcon("department")} />
                        </th>
                        <th
                          onClick={() => sortTable("subject")}
                          style={{ cursor: "pointer" }}
                        >
                          <img src={studentClass} alt="Subject" /> Subject{" "}
                          <i className={getSortIcon("subject")} />
                        </th>
                        <th
                          onClick={() => sortTable("email")}
                          style={{ cursor: "pointer" }}
                        >
                          <img src={studentProg} alt="Email" /> Email{" "}
                          <i className={getSortIcon("email")} />
                        </th>
                        <th
                          onClick={() => sortTable("yearGroup")}
                          style={{ cursor: "pointer" }}
                        >
                          <img src={studentStat} alt="Year Group" /> Year Group{" "}
                          <i className={getSortIcon("yearGroup")} />
                        </th>
                        <th>
                          <img src={studentEdit} alt="Action" /> Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.map((teacher) => (
                        <tr key={teacher.id}>
                          <td>{teacher.id}</td>
                          <td>{teacher.name}</td>
                          <td>{teacher.department}</td>
                          <td>{teacher.subject}</td>
                          <td>{teacher.email}</td>
                          <td>{teacher.yearGroup}</td>
                          <td className="action-icons">
                            <i className="fas fa-edit" />
                            <a href="teacher-list-with-profile.html">
                              <i className="fas fa-eye" />
                            </a>
                            <a
                              href="javascript:void(0);"
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
                  onclick="openModal()"
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

export default Teachers;
