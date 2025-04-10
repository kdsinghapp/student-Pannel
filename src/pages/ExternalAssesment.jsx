import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import * as bootstrap from "bootstrap";
import Headers from "../components/Headers";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UploadExternal from "../components/ExternalAssesments/UploadExternal";
import TemplateExternal from "../components/ExternalAssesments/TemplateExternal";
import DownloadTemplate from "../components/DownloadTemplate";

const ExternalAssesment = () => {
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [data, setData] = useState([
    {
      yearGroup: 1010,
      department: "Maths",
      subject: "Maths",
      teacher: "Rahul Jain",
      assessment: "Biology",
      gradingScheme: "Attitude to learning",
    },
    {
      yearGroup: 1010,
      department: "Maths",
      subject: "Maths",
      teacher: "Rahul Jain",
      assessment: "Biology",
      gradingScheme: "Attitude to learning",
    },
    {
      yearGroup: 1010,
      department: "Science",
      subject: "Science",
      teacher: "Rahul Jain",
      assessment: "Biology",
      gradingScheme: "Attitude to learning",
    },
    {
      yearGroup: 1010,
      department: "Science",
      subject: "Science",
      teacher: "Rahul Jain",
      assessment: "Biology",
      gradingScheme: "Attitude to learning",
    },
    {
      yearGroup: 1010,
      department: "History",
      subject: "History",
      teacher: "Rahul Jain",
      assessment: "Biology",
      gradingScheme: "Attitude to learning",
    },
    {
      yearGroup: 1010,
      department: "Chemistry",
      subject: "Chemistry",
      teacher: "Rahul Jain",
      assessment: "Biology",
      gradingScheme: "Attitude to learning",
    },
    {
      yearGroup: 1010,
      department: "Science",
      subject: "Science",
      teacher: "Rahul Jain",
      assessment: "Biology",
      gradingScheme: "Attitude to learning",
    },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    let sortedData = [...data];

    sortedData.sort((a, b) => {
      const valA = a[key].toString().toLowerCase();
      const valB = b[key].toString().toLowerCase();

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({
      key,
      direction: sortConfig.direction === "asc" ? "desc" : "asc",
    });
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

  return (
    <>
      <div id="wrapper" className="wrapper bg-ash">
        <Headers />
        <div className="dashboard-page-one">
          <Sidebar />
          <div className="dashboard-content-one">
            <div className="breadcrumbs-area">
              <h3>External Assessments</h3>
            </div>
            <div className="filter-bar grade">
              <div className="filter-group form-group">
                <button className="btn btn-light">
                  <i className="fas fa-filter" />
                </button>
                <span className="btn">Filter By</span>
                <select className="form-control">
                  <option>Department</option>
                </select>
                <select className="form-control">
                  <option>Subject Name</option>
                </select>
                <select className="form-control">
                  <option>Teacher</option>
                </select>
                <select className="form-control">
                  <option>Grading Scheme</option>
                </select>
                <span className="reset-filter btn">
                  <i className="fas fa-sync-alt" /> Reset Filter
                </span>
              </div>
              <div>
                <button
                  className="btn btn-purple modal-trigger mb-0"
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
                  // onClick={() => {
                  //   const modalElement = document.getElementById("upload");
                  //   if (modalElement) {
                  //     const modal = new bootstrap.Modal(modalElement);
                  //     modal.show();
                  //   }
                  // }}
                >
                  <i className="fas fa-upload" /> Upload
                </button>
                <Link
                  to="/external-assessment/add-external-assessment"
                  className="btn btn-purple text-white"
                >
                  <i className="fas fa-plus" /> Add New
                </Link>
              </div>
            </div>
            <div className="card height-auto">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table display data-table">
                    <thead>
                      <tr>
                        <th onClick={() => handleSort("yearGroup")}>
                          Year Group{" "}
                          <i className={getSortIcon("yearGroup")}></i>
                        </th>
                        <th onClick={() => handleSort("department")}>
                          Department{" "}
                          <i className={getSortIcon("department")}></i>
                        </th>
                        <th onClick={() => handleSort("subject")}>
                          Subject <i className={getSortIcon("subject")}></i>
                        </th>
                        <th onClick={() => handleSort("teacher")}>
                          Teacher <i className={getSortIcon("teacher")}></i>
                        </th>
                        <th onClick={() => handleSort("assessment")}>
                          Assessment{" "}
                          <i className={getSortIcon("assessment")}></i>
                        </th>
                        <th onClick={() => handleSort("gradingScheme")}>
                          Grading Scheme{" "}
                          <i className={getSortIcon("gradingScheme")}></i>
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, index) => (
                        <tr key={index}>
                          <td>{row.yearGroup}</td>
                          <td>{row.department}</td>
                          <td>{row.subject}</td>
                          <td>{row.teacher}</td>
                          <td>{row.assessment}</td>
                          <td>{row.gradingScheme}</td>
                          <td>
                            <i className="fas fa-edit" />{" "}
                            <i className="fas fa-eye" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DownloadTemplate />
      <UploadExternal />
    </>
  );
};

export default ExternalAssesment;
