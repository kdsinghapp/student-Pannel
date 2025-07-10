import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Headers from "../../components/Headers";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import studentId from "../../assets/assets/icon/fi_list.png";
import studentPh from "../../assets/assets/icon/ph_student.png";
import studentCat from "../../assets/assets/icon/category.png";
import studentClass from "../../assets/assets/icon/class.png";
import studentProg from "../../assets/assets/icon/tabler_progress.png";
import studentStat from "../../assets/assets/icon/lets-icons_status.png";
import studentEdit from "../../assets/assets/icon/tabler_edit.png";
import Sidebar from "../../components/Sidebar";
import * as bootstrap from "bootstrap";
import DownloadTemplate from "../../components/DownloadTemplate";
import EditTeacher from "./EditTeacher";
import TeacherViewModal from "./TeacherViewModal";
import { useNavigate } from "react-router-dom";

const mockTeachers = [
  {
    id: 1,
    forename: "John",
    surname: "Doe",
    email: "john.doe@example.com",
    department: "Mathematics",
    subject: "Math",
    year_group: "Year 1",
    class: "A",
    role: "Teacher",
    photo_url: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    forename: "Jane",
    surname: "Smith",
    email: "jane.smith@example.com",
    department: "Science",
    subject: "Physics",
    year_group: "Year 2",
    class: "B",
    role: "Head of Department",
    photo_url: "https://randomuser.me/api/portraits/women/2.jpg"
  }
];

const Teachers = () => {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter(t => t.id !== id));
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
        {/* Header Menu Area End Here */}
        {/* Page Area Start Here */}
        <div className="dashboard-page-one">
          {/* Sidebar Area Start Here */}
          <Sidebar />
          {/* Sidebar Area End Here */}
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
      {/* Edit Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Teacher</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedTeacher && <EditTeacher teacher={selectedTeacher} handleUpdate={handleUpdate} />}
            </div>
          </div>
        </div>
      </div>
      {/* View Modal */}
      <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
        {selectedTeacher && <TeacherViewModal teacher={selectedTeacher} />}
      </div>

    </>
  );
};

export default Teachers;
