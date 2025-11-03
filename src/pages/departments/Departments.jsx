import React, { useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Headers from "../../components/Headers";
import departmentIcon from "../../assets/assets/icon/category.png";
import createdDate from "../../assets/assets/icon/class.png";
import Sidebar from "../../components/Sidebar";
import * as bootstrap from "bootstrap";
import DownloadTemplate from "../../components/DownloadTemplate";
import { getDepartments, deleteDepartmentById } from "../../utils/authApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const getDepartmentsData = async () => {
    setLoading(true);
    try {
      const res = await getDepartments();
      console.log("department-list", res);
      if (res.status) {
        setDepartments(res.data);
      }
    } catch (error) {
      console.error("Error fetching department data:", error);
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
    getDepartmentsData();
  }, []);

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...departments].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setDepartments(sortedData);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc"
        ? "fas fa-sort-up"
        : "fas fa-sort-down";
    }
    return "fas fa-sort";
  };

  const navigateToAddDepartment = () => {
    navigate("/add-department");
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
          await deleteDepartmentById(id);
          Swal.fire("Deleted!", "The department has been deleted.", "success").then(
            () => {
              window.location.reload();
            }
          );
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the department.", "error");
        }
      }
    });
  };

  // Pagination logic
  const indexOfLastDepartment = currentPage * itemsPerPage;
  const indexOfFirstDepartment = indexOfLastDepartment - itemsPerPage;
  const currentDepartments = departments.slice(
    indexOfFirstDepartment,
    indexOfLastDepartment
  );
  const totalPages = Math.ceil(departments.length / itemsPerPage);

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
            {/* Breadcrumbs */}
            <div className="breadcrumbs-area d-flex justify-content-between">
              <h3>Department Lists</h3>
              <div></div>
            </div>

            {/* Filter and Buttons */}
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
                  onClick={navigateToAddDepartment}
                >
                  <i className="fas fa-plus" /> Add New
                </button>
              </div>
            </div>

            {/* Department Table */}
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
                        <th onClick={() => sortData("name")}>
                          <img src={departmentIcon} alt="Department" /> Department Name{" "}
                          <i className={getSortIcon("name")} />
                        </th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(!departments || !departments.length) && (
                        <tr style={{ lineHeight: "35px", fontSize: "15px" }}>
                          <td colSpan="3" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      )}
                      {currentDepartments &&
                        currentDepartments.map((department) => (
                          <tr
                            key={department.id}
                            style={{ lineHeight: "35px", fontSize: "15px" }}
                          >
                            <td>{department.name}</td>

                            <td className="action-icons">
                              <a
                                href="#"
                                onClick={() =>
                                  navigate(`/edit-department/${department.id}`)
                                }
                              >
                                <i className="fas fa-edit" title="Edit Department" />
                              </a>
                              <a
                                href="#"
                                onClick={() => handleDelete(department.id)}
                              >
                                <i
                                  className="fas fa-trash"
                                  title="Delete Department"
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

            {/* Pagination */}
            {departments.length > itemsPerPage && (
              <nav aria-label="Department pagination" className="mt-3">
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
      </div>

      <DownloadTemplate />

      {/* Upload Modal */}
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

export default Departments;
