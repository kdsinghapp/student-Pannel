import React, { useState } from "react";
import Headers from "../components/Headers";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import Sidebar from "../components/Sidebar";

const Grade = () => {
  const [data, setData] = useState([
    {
      id: 12,
      name: "Rohan S",
      eal: "Yes",
      sen: "No",
      year: "FY1",
      category: "Y",
      assessment: [12, 20, 35, 3, 30, 30],
    },
    {
      id: 13,
      name: "Norman J",
      eal: "Yes",
      sen: "No",
      year: "FY1",
      category: "Y",
      assessment: [12, 20, 35, 8, 45, 45],
    },
    {
      id: 14,
      name: "Julie K",
      eal: "No",
      sen: "No",
      year: "FY2",
      category: "Y",
      assessment: [12, 20, 35, 9, 50, 50],
    },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key, isAssessment = false, index = 0) => {
    let sortedData = [...data];

    sortedData.sort((a, b) => {
      const valA = isAssessment ? a.assessment[index] : a[key];
      const valB = isAssessment ? b.assessment[index] : b[key];

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
    <div id="wrapper" className="wrapper bg-ash">
      <Headers />
      {/* Page Area Start Here */}
      <div className="dashboard-page-one">
        {/* Sidebar Area Start Here */}
        <Sidebar />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n                .table th, .table td {\n            vertical-align: middle;\n         \n            border: none;\n        }\n        .table thead th {\n            background-color: #f8f9fa;\n            font-weight:500;\n            color:#000;\n            white-space: nowrap;\n          \n        }\n        .table tbody td {\n            background-color: #f8f9fa;\n            border:1px solid #eee;\n            font-size:13px;\n           \n          \n        }\n        .highlight {\n            background-color: #4880ff !important;\n            color: white !important;\n        }\n        .highlight{\n            border:none !important;\n        }\n        .highlight2 {\n            background-color: #ffffff !important;\n            color: #000 !important;\n        }\n        .progress-bar-custom {\n            height: 8px;\n            border-radius: 4px;\n        }\n            ",
          }}
        />
        {/* Sidebar Area End Here */}
        <div className="dashboard-content-one">
          {/* Breadcubs Area Start Here */}
          <div className="breadcrumbs-area">
            <h3>Grade Book </h3>
          </div>
          {/* Breadcubs Area End Here */}
          <div className="filter-bar grade">
            <div className="filter-group form-group">
              <button className="btn btn-light">
                <i className="fas fa-filter" />
              </button>
              <span className="btn">Filter By</span>
              <select className="form-control">
                <option>Year</option>
              </select>
              <select className="form-control">
                <option>Class</option>
              </select>
              <select className="form-control">
                <option>Term</option>
              </select>
              <select className="form-control">
                <option>Subject</option>
              </select>
              <select className="form-control">
                <option>Assessment</option>
              </select>
              <select className="form-control">
                <option>Teacher</option>
              </select>
              <span className="reset-filter btn">
                <i className="fas fa-sync-alt" /> Reset Filter
              </span>
            </div>
            <div style={{ marginTop: "-10px" }}>
              <button
                className="btn btn-purple"
                style={{ background: "#4880ff" }}
              >
                <i className="fas fa-download" style={{ fontSize: 20 }} />
              </button>
              <button className="btn btn-purple">
                <i className="fas fa-print" style={{ fontSize: 20 }} />
              </button>
            </div>
          </div>
          <div className="card height-auto">
            <div className="card-body">
              <div className="mt-3 d-flex">
                <div className="mr-3">
                  {" "}
                  <span
                    className="badge badge-success p-3 pl-3 pr-3"
                    style={{ borderRadius: "10px !important" }}
                  >
                    Grade Book
                  </span>
                </div>
                <div>
                  {" "}
                  <span>Grade &gt; 2020-21 &gt; Year 5 &gt; Formative</span>
                  <br />
                </div>
              </div>
            </div>
          </div>
          {/* Class Table Area Start Here */}
          <div className="card height-auto">
            <div className="card-body p-0 grade">
              <div className="table-responsive">
                <table className="table table-borderless  data-table">
                  <thead>
                    <tr>
                      <th onClick={() => handleSort("id")}>
                        ID <i className={getSortIcon("id")}></i>
                      </th>
                      <th onClick={() => handleSort("name")}>
                        Student Name <i className={getSortIcon("name")}></i>
                      </th>
                      <th onClick={() => handleSort("eal")}>
                        EAL <i className={getSortIcon("eal")}></i>
                      </th>
                      <th onClick={() => handleSort("sen")}>
                        SEN <i className={getSortIcon("sen")}></i>
                      </th>
                      <th onClick={() => handleSort("year")}>
                        Year <i className={getSortIcon("year")}></i>
                      </th>
                      <th onClick={() => handleSort("category")}>
                        Category <i className={getSortIcon("category")}></i>
                      </th>
                      {data[0].assessment.map((_, index) => (
                        <th
                          key={index}
                          onClick={() => handleSort("assessment", true, index)}
                        >
                          {index + 1}{" "}
                          <i className={getSortIcon(`assessment_${index}`)}></i>
                        </th>
                      ))}
                      <th>Overall Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((student) => (
                      <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.eal}</td>
                        <td>{student.sen}</td>
                        <td>{student.year}</td>
                        <td>{student.category}</td>
                        {student.assessment.map((score, index) => (
                          <td key={index} className="highlight2">
                            {score}
                          </td>
                        ))}
                        <td>
                          <div className="progress-container">
                            <div className="progress-bar" style={{ width: 40 }}>
                              <div className="progress bar1" />
                            </div>
                            <div className="progress-bar" style={{ width: 60 }}>
                              <div className="progress bar2" />
                            </div>
                            <div className="progress-bar" style={{ width: 75 }}>
                              <div className="progress bar3" />
                            </div>
                          </div>
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
  );
};

export default Grade;
