import React, { useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Headers from "../../components/Headers";
import subjectId from "../../assets/assets/icon/fi_list.png";
import subjectName from "../../assets/assets/icon/ph_student.png";
import departmentIcon from "../../assets/assets/icon/category.png";
import createdDate from "../../assets/assets/icon/class.png";
import Sidebar from "../../components/Sidebar";
import * as bootstrap from "bootstrap";
import DownloadTemplate from "../../components/DownloadTemplate";
import { getAllSubjects, deleteSubjectById } from "../../utils/authApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const getSubjectsData = async () => {
    setLoading(true);
    try {
      const res = await getAllSubjects();
      console.log("subject-list", res);
      if (res.status) {
        setSubjects(res.data);
      }
    } catch (error) {
      console.error("Error fetching subject data:", error);
      if (error.message) {
        console.error("Response Error:", error.response?.data);
        alert(
          `Error: ${error.response?.data?.message || "Something went wrong"}`
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

  useEffect(() => {
    getSubjectsData();
  }, []);

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...subjects].sort((a, b) => {
      // Safely handle nested or null/undefined values
      const aVal = (key === "department" ? (a.department?.name ?? a.department_id) : (a[key] ?? "")).toString();
      const bVal = (key === "department" ? (b.department?.name ?? b.department_id) : (b[key] ?? "")).toString();

      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setSubjects(sortedData);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc"
        ? "fas fa-sort-up"
        : "fas fa-sort-down";
    }
    return "fas fa-sort";
  };

  const navigateToAddSubject = () => {
    navigate("/add-subject");
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
          await deleteSubjectById(id);
          Swal.fire(
            "Deleted!",
            "The subject has been deleted.",
            "success"
          ).then(() => {
            // Reload the page after delete
            window.location.reload();
          });
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the subject.", "error");
        }
      }
    });
  };

  // Calculate paginated subjects
  const indexOfLastSubject = currentPage * itemsPerPage;
  const indexOfFirstSubject = indexOfLastSubject - itemsPerPage;
  const currentSubjects = subjects.slice(
    indexOfFirstSubject,
    indexOfLastSubject
  );
  const totalPages = Math.ceil(subjects.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div id="wrapper" className="wrapper bg-ash">
        <Headers />
        <div className="dashboard-page-one">
          <Sidebar />
          <div className="dashboard-content-one">
            {/* Breadcubs Area Start Here */}
            <div className="breadcrumbs-area d-flex justify-content-between">
              <h3>Subject Lists</h3>
              <div></div>
            </div>
            {/* Breadcubs Area End Here */}
            <div className="filter-bar">
              <div className="filter-group form-group">
                <button className="btn btn-light">
                  <i className="fas fa-filter" />
                </button>
                <span className="btn">Filter By</span>
                <select className="form-control">
                  <option>Department</option>
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
                  onClick={navigateToAddSubject}
                >
                  <i className="fas fa-plus" /> Add New
                </button>
              </div>
            </div>
            {/* Subject Table Area Start Here */}

            {/* Add a Loadera */}
            <div className="card height-auto">
              <div className="card-body p-0">
                {loading && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "300px",
                    }}
                  >
                    <div
                      className="spinner-border text-primary"
                      role="status"
                      style={{ width: "4rem", height: "4rem" }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                <div
                  className="table-responsive"
                  style={{ display: loading ? "none" : "block" }}
                >
                  <table className="table display data-table">
                    <thead style={{ lineHeight: "35px", fontSize: "15px" }}>
                      <tr>
                        <th onClick={() => sortData("id")}>
                          <img src={subjectId} alt="ID" /> Subject ID{" "}
                          <i className={getSortIcon("id")} />
                        </th>
                        <th onClick={() => sortData("name")}>
                          <img src={subjectName} alt="Name" /> Subject Name{" "}
                          <i className={getSortIcon("name")} />
                        </th>
                        <th>
                          <img src={departmentIcon} alt="Department" />{" "}
                          Department
                        </th>
                        <th onClick={() => sortData("created_at")}>
                          <img src={createdDate} alt="Created" /> Created Date{" "}
                          <i className={getSortIcon("created_at")} />
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(!subjects || !subjects.length) && (
                        <tr style={{ lineHeight: "35px", fontSize: "15px" }}>
                          <td colSpan="5" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      )}
                      {currentSubjects &&
                        currentSubjects.map((subject) => (
                          <tr
                            key={subject.id}
                            style={{ lineHeight: "35px", fontSize: "15px" }}
                          >
                            <td>{subject.id}</td>
                            <td>{subject.name}</td>
                            <td>{subject.department?.name || subject.department_id || "N/A"}</td>
                            <td>
                              {new Date(
                                subject.created_at
                              ).toLocaleDateString()}
                            </td>

                            <td className="action-icons">
                              <a
                                href="#"
                                onClick={() =>
                                  navigate(`/edit-subject/${subject.id}`)
                                }
                              >
                                <i
                                  className="fas fa-edit"
                                  title="Edit Subject"
                                />
                              </a>
                              <a
                                href="#"
                                onClick={() => {
                                  console.log("Delete subject id:", subject.id);
                                  handleDelete(subject.id);
                                }}
                              >
                                <i
                                  className="fas fa-trash"
                                  title="Delete Subject"
                                />
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Subject Table Area End Here */}
            {/* Pagination Controls */}
            {subjects.length > itemsPerPage && (
              <nav aria-label="Subject table pagination" className="mt-3">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item${
                      currentPage === 1 ? " disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i + 1}
                      className={`page-item${
                        currentPage === i + 1 ? " active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item${
                      currentPage === totalPages ? " disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
        {/* Page Area End Here */}
      </div>

      <DownloadTemplate />
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
                <button type="button" className="btn btn-success">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subjects;
