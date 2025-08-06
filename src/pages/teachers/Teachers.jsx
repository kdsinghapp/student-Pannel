import React, { useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Headers from "../../components/Headers";
import Sidebar from "../../components/Sidebar";
import * as bootstrap from "bootstrap";
import DownloadTemplate from "../../components/DownloadTemplate";
import EditTeacher from "./EditTeacher";
import TeacherViewModal from "./TeacherViewModal";
import { useNavigate } from "react-router-dom";
import studentId from "../../assets/assets/icon/fi_list.png";
import studentPh from "../../assets/assets/icon/ph_student.png";
import studentCat from "../../assets/assets/icon/category.png";
import studentClass from "../../assets/assets/icon/class.png";
import studentProg from "../../assets/assets/icon/tabler_progress.png";
import studentStat from "../../assets/assets/icon/lets-icons_status.png";
import studentEdit from "../../assets/assets/icon/tabler_edit.png";
import { deleteTeacherById, getAllTeachers} from "../../utils/authApi";


const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllTeachers();
        setTeachers(data?.data || []);
      } catch (err) {
        setError("Failed to fetch teachers");
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  // Sorting logic
  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedData = [...teachers].sort((a, b) => {
      const aValue = a[key] || (a[key]?.name ?? "");
      const bValue = b[key] || (b[key]?.name ?? "");
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setTeachers(sortedData);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc"
        ? "fas fa-sort-up"
        : "fas fa-sort-down";
    }
    return "fas fa-sort";
  };

  // Pagination logic
  const indexOfLastTeacher = currentPage * itemsPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - itemsPerPage;
  const currentTeachers = teachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
  const totalPages = Math.ceil(teachers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (teacher) => {
    setSelectedTeacher(teacher);
    setEditModalOpen(true);
  };

  const handleViewClick = (teacher) => {
    setSelectedTeacher(teacher);
    setViewModalOpen(true);
  };
  const navigate = useNavigate();
  const navigateToAddStudents = () => {
    navigate("/add-teacher")
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        const res = await deleteTeacherById(id);
        if (res.status) {
          // Refresh teacher list
          const data = await getAllTeachers();
          setTeachers(data?.data || []);
          alert("Teacher deleted successfully!");
        } else {
          alert(res.message || "Failed to delete teacher");
        }
      } catch (err) {
        alert("Error deleting teacher");
      }
    }
  };

  const handleUpdate = (updatedData) => {
    setTeachers(teachers.map(t => t.id === selectedTeacher.id ? { ...t, ...updatedData } : t));
    setEditModalOpen(false);
    setSelectedTeacher(null);
  };

  return (
    <>
      <div id="wrapper" className="wrapper bg-ash">
        <Headers />
        <div className="dashboard-page-one">
          <Sidebar />
          <div className="dashboard-content-one">
            <div className="breadcrumbs-area d-flex justify-content-between">
              <h3>Teacher Lists</h3>
            </div>
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
            {/* Teacher Table */}
            <div className="card height-auto">
              <div className="card-body p-0">
                {loading && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                    <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                <div className="table-responsive" style={{ display: loading ? 'none' : 'block' }}>
                  <table className="table display data-table">
                    <thead style={{ lineHeight: "35px", fontSize: "15px" }}>
                      <tr>
                        <th onClick={() => sortData("id")}> <img src={studentId} alt="id" /> Teacher Id <i className={getSortIcon("id")} /></th>
                        <th onClick={() => sortData("first_name")}> <img src={studentPh} alt="name" /> Teacher Name <i className={getSortIcon("first_name")} /></th>
                        <th onClick={() => sortData("department")}> <img src={studentCat} alt="department" /> Department <i className={getSortIcon("department")} /></th>
                        <th> <img src={studentProg} alt="subject" /> Subject </th>
                        <th> <img src={studentStat} alt="email" /> Email </th>
                        <th> Year Group </th>
                        <th> <img src={studentClass} alt="class" /> Class </th>
                        <th> Role </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTeachers.length === 0 ? (
                        <tr><td colSpan="9" className="text-center">No teachers found.</td></tr>
                      ) : (
                        currentTeachers.map((teacher) => (
                          <tr key={teacher.id} style={{ lineHeight: "35px", fontSize: "15px" }}>
                            <td>{teacher.id}</td>
                            <td>{teacher.first_name} {teacher.last_name}</td>
                            <td>{teacher.department?.name || ''}</td>
                            <td>{Array.isArray(teacher.assigned_subjects) ? teacher.assigned_subjects.map(s => s.name).filter(Boolean).join(', ') : ''}</td>
                            <td>{teacher.email}</td>
                            <td>{/* No year_group in API, leave blank or add if available */}</td>
                            <td>{Array.isArray(teacher.assigned_classes) ? teacher.assigned_classes.map(c => c.name).filter(Boolean).join(', ') : ''}</td>
                            <td>{teacher.role?.name || teacher.teachersrole?.name || ''}</td>
                            <td className="action-icons">
                              <a href="#" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => handleEditClick(teacher)}><i className="fas fa-edit" /></a>
                              <a href="#" data-bs-toggle="modal" data-bs-target="#viewModal" onClick={() => handleViewClick(teacher)}><i className="fas fa-eye" /></a>
                              <a href="#" onClick={() => handleDelete(teacher.id)}><i className="fas fa-trash" /></a>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Pagination Controls */}
            {teachers.length > itemsPerPage && (
              <nav aria-label="Teacher table pagination" className="mt-3">
                <ul className="pagination justify-content-center">
                  <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i + 1} className={`page-item${currentPage === i + 1 ? ' active' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
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
      <div className="modal fade" id="upload" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add new file!</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                <button type="button" className="btn btn-outline" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-success" onClick={() => {}}>Upload</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="deleteconfirm" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <h4>Are you sure you want to delete this?</h4>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button type="button" className="btn btn-outline" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger">Delete Now</button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Teacher</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Show success message after update */}
              {editModalOpen && !selectedTeacher && (
                <div className="alert alert-success text-center">Teacher updated successfully!</div>
              )}
              {selectedTeacher && <EditTeacher teacher={selectedTeacher} handleUpdate={handleUpdate} />}
            </div>
          </div>
        </div>
      </div>
      {/* View Modal */}
      <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
         <TeacherViewModal teacher={selectedTeacher} />
      </div>
    </>
  );
};

export default Teachers;
