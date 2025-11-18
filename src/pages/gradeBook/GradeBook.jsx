import React, { useState, useEffect } from "react";
import Headers from "../../components/Headers";
import Sidebar from "../../components/Sidebar";
import * as bootstrap from "bootstrap";
import DownloadTemplate from "../../components/DownloadTemplate";

function GradeBook() {
  const [filters, setFilters] = useState({
    year: "",
    class: "",
    term: "",
    subject: "",
    assessment: "",
    teacher: "",
  });

  const [options, setOptions] = useState({
    years: [],
    classes: [],
    terms: [],
    subjects: [],
    assessments: [],
    teachers: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudentsData();
    // Placeholder options — replace with API calls if available
    setOptions({
      years: ["2023", "2024", "2025"],
      classes: ["Class 1", "Class 2", "Class 3"],
      terms: ["Term 1", "Term 2", "Term 3"],
      subjects: ["Math", "Science", "English"],
      assessments: ["Exam", "Quiz", "Assignment"],
      teachers: ["John Doe", "Jane Smith", "Alex Brown"],
    });
  }, []);

  const fetchStudentsData = async () => {
    try {
      setLoading(true);

      // Get school_curriculum_id from localStorage
      const curriculumId = localStorage.getItem("school_curriculum_id") || "4";

      const response = await fetch(
        `https://server-php-8-3.technorizen.com/gradesphere/api/user/student/get-students?limit=1000&page=1&school_curriculum_id[0]=${curriculumId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch students data");
      }
      const responseData = await response.json();

      // Handle both array and object responses
      const studentsList = Array.isArray(responseData)
        ? responseData
        : responseData.data || [];

      if (!Array.isArray(studentsList)) {
        throw new Error("Invalid response format: expected array of students");
      }

      const transformedRows = studentsList.map((student) => ({
        id: student.student_id,
        name: `${student.first_name} ${student.last_name}`,
        eal: student.category === "ESL" ? "Yes" : "No",
        sen: "No",
        year: student.academic_info?.class_name || "N/A",
        category: student.category,
        assessment1: Math.floor(Math.random() * 50) + 1,
        cols: [
          Math.floor(Math.random() * 50) + 1,
          Math.floor(Math.random() * 50) + 1,
          Math.floor(Math.random() * 50) + 1,
          Math.floor(Math.random() * 50) + 1,
          Math.floor(Math.random() * 50) + 1,
        ],
        progress: [
          Math.floor(Math.random() * 100) + 1,
          Math.floor(Math.random() * 100) + 1,
          Math.floor(Math.random() * 100) + 1,
        ],
        profileImage: student.profile_image_url,
      }));
      setDemoRows(transformedRows);
      setError(null);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      year: "",
      class: "",
      term: "",
      subject: "",
      assessment: "",
      teacher: "",
    });
  };

  const showDownloadModal = () => {
    const modalElement = document.getElementById("download");
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  };

  const exportCSV = () => {
    // Placeholder implementation — replace with real export logic
    alert("Export CSV is not implemented yet.");
  };

  const [demoRows, setDemoRows] = React.useState([]);

  return (
    <>
      <div id="wrapper" className="wrapper bg-ash">
        <Headers />
        <div className="dashboard-page-one">
          <Sidebar />
          <div className="dashboard-content-one">
            <div className="breadcrumbs-area d-flex justify-content-between">
              <h3>GradeBook</h3>
            </div>
            <div className="filter-bar">
              <div className="filter-group form-group">
                <button className="btn btn-light">
                  <i className="fas fa-filter" />
                </button>
                <span className="btn">Filter By</span>
                <select
                  name="year"
                  value={filters.year}
                  onChange={handleFilterChange}
                  className="form-control"
                >
                  <option value="">Year</option>
                  {options.years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <select
                  name="class"
                  value={filters.class}
                  onChange={handleFilterChange}
                  className="form-control"
                >
                  <option value="">Class</option>
                  {options.classes.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <select
                  name="term"
                  value={filters.term}
                  onChange={handleFilterChange}
                  className="form-control"
                >
                  <option value="">Term</option>
                  {options.terms.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <select
                  name="subject"
                  value={filters.subject}
                  onChange={handleFilterChange}
                  className="form-control"
                >
                  <option value="">Subject</option>
                  {options.subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <select
                  name="assessment"
                  value={filters.assessment}
                  onChange={handleFilterChange}
                  className="form-control"
                >
                  <option value="">Assessment</option>
                  {options.assessments.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                <select
                  name="teacher"
                  value={filters.teacher}
                  onChange={handleFilterChange}
                  className="form-control"
                >
                  <option value="">Teacher</option>
                  {options.teachers.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <span
                  className="reset-filter btn"
                  onClick={resetFilters}
                  style={{ cursor: "pointer" }}
                >
                  <i className="fas fa-sync-alt" /> Reset Filter
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  className="btn btn-purple"
                  style={{ color: "white", background: "#501b8d" }}
                  onClick={() => showDownloadModal()}
                >
                  <i className="fas fa-download" />
                </button>
                <button
                  className="btn btn-purple"
                  style={{ color: "white", background: "#501b8d" }}
                  onClick={() => window.print()}
                >
                  <i className="fas fa-print" />
                </button>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-outline-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    More
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          exportCSV();
                        }}
                      >
                        Export CSV
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          showDownloadModal();
                        }}
                      >
                        Download Template
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          window.print();
                        }}
                      >
                        Print
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card height-auto">
              <div className="card-body">
                {loading && (
                  <div className="text-center py-5">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading students data...</p>
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    Error loading data: {error}
                  </div>
                )}
                {!loading && !error && (
                  <div className="table-responsive">
                    <table
                      className="table table-striped"
                      style={{ minWidth: 1100 }}
                    >
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Student Name</th>
                          <th>EAL</th>
                          <th>SEN</th>
                          <th>Year</th>
                          <th>Category</th>
                          <th style={{ background: "#3b82f6", color: "white" }}>
                            Assessment 1
                          </th>
                          <th>2</th>
                          <th>3</th>
                          <th>4</th>
                          <th>5</th>
                          <th>6</th>
                          <th>Overall Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {demoRows.map((r) => (
                          <tr key={r.id}>
                            <td>{r.id}</td>
                            <td
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              {r.profileImage ? (
                                <img
                                  src={r.profileImage}
                                  alt={r.name}
                                  style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                />
                              ) : (
                                <span
                                  style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: "50%",
                                    background: "#f1f1f1",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  ○
                                </span>
                              )}
                              {r.name}
                            </td>
                            <td>{r.eal}</td>
                            <td>{r.sen}</td>
                            <td>{r.year}</td>
                            <td>{r.category}</td>
                            <td
                              style={{
                                background: "#2b6cb0",
                                color: "white",
                                textAlign: "center",
                              }}
                            >
                              {r.assessment1}
                            </td>
                            {r.cols.map((c, i) => (
                              <td key={i} style={{ textAlign: "center" }}>
                                {c}
                              </td>
                            ))}
                            <td>
                              <div
                                style={{
                                  display: "flex",
                                  gap: 8,
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    width: 60,
                                    height: 8,
                                    background: "#e6f0ff",
                                    borderRadius: 8,
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    style={{
                                      position: "absolute",
                                      left: 0,
                                      top: 0,
                                      bottom: 0,
                                      width: `${r.progress[0]}%`,
                                      background: "#6aa0ff",
                                      borderRadius: 8,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    width: 60,
                                    height: 8,
                                    background: "#fffde6",
                                    borderRadius: 8,
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    style={{
                                      position: "absolute",
                                      left: 0,
                                      top: 0,
                                      bottom: 0,
                                      width: `${r.progress[1]}%`,
                                      background: "#e9f871",
                                      borderRadius: 8,
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    width: 60,
                                    height: 8,
                                    background: "#fff0ff",
                                    borderRadius: 8,
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    style={{
                                      position: "absolute",
                                      left: 0,
                                      top: 0,
                                      bottom: 0,
                                      width: `${r.progress[2]}%`,
                                      background: "#c084fc",
                                      borderRadius: 8,
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
             
            </div>
             <div className="d-flex justify-content-center align-items-center mt-3">
                <div>
                  Showing 1 to {demoRows.length} of {demoRows.length} entries
                </div>
                <nav>
                  <ul className="pagination mb-0">
                    <li className="page-item disabled">
                      <button className="page-link">Previous</button>
                    </li>
                    <li className="page-item active">
                      <button className="page-link">1</button>
                    </li>
                    <li className="page-item">
                      <button className="page-link">Next</button>
                    </li>
                  </ul>
                </nav>
              </div>
          </div>
        </div>
      </div>
      <DownloadTemplate />
    </>
  );
}

export default GradeBook;
