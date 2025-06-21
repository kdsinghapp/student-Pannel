import React, { useState,useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Headers from "../../components/Headers";
import studentId from "../../assets/assets/icon/fi_list.png";
// import studentId from "";
import studentPh from "../../assets/assets/icon/ph_student.png";
import studentCat from "../../assets/assets/icon/category.png";
import studentClass from "../../assets/assets/icon/class.png";
import studentProg from "../../assets/assets/icon/tabler_progress.png";
import studentStat from "../../assets/assets/icon/lets-icons_status.png";
import studentEdit from "../../assets/assets/icon/tabler_edit.png";
import Sidebar from "../../components/Sidebar";
import * as bootstrap from "bootstrap";
import DownloadTemplate from "../../components/DownloadTemplate";
import {
  getAllStudents,getStudentById,deleteStudentById,updateStudentById,addStudents} from "../../utils/authApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EditStudent from "./EditStudent";
import { Modal } from 'bootstrap';
import StudentViewModal from "./StudentViewModal";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedItem, setSelectedItem] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "" });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
  };
  const handleEditClick = (student) => {
    // setShowModal(true)
    console.log("handleEditClick-edit",student)
    setSelectedItem(student);
    // setEditFormData({ name: item.name });
  };
   const handleUpdate = async (editFormData,profileImageFile) => {
    console.log("handleUpdate-editFormData",editFormData,profileImageFile)
    // delete editFormData.profile_image

      if (selectedItem) {
        try {
          const formData = new FormData();
          // Append all required fields for update
          formData.append("first_name", editFormData.first_name);
          formData.append("last_name", editFormData.last_name);
          formData.append("school_class_id", editFormData.school_class_id);
          formData.append("country_id", editFormData.country_id);
          formData.append("country_of_birth_id", editFormData.country_of_birth_id);
          formData.append("date_of_birth", editFormData.date_of_birth);
          formData.append("religion_id", editFormData.religion_id);
          formData.append("status", editFormData.status || "");
          formData.append("gender", editFormData.gender);
          formData.append("progress", editFormData.progress);
          formData.append("category", editFormData.category);
          formData.append("school_code", editFormData.school_code);
          formData.append("year_group_id", editFormData.year_group_id);
          formData.append("academic_class_id", editFormData.academic_class_id);
          formData.append("sen", editFormData.sen);
          formData.append("g_and_t", editFormData.g_and_t);
          formData.append("eal", editFormData.eal);
          formData.append("school_division_id", editFormData.school_division_id);
          formData.append("student_id", selectedItem.student_id);
          if (profileImageFile) {
            formData.set("profile_image", profileImageFile);
          } else if (!profileImageFile) {
            formData.delete("profile_image");
          }
          if (editFormData.profile_image_2) {
            formData.set("profile_image_2", editFormData.profile_image_2);
          }

          // Debug: log the payload
          const payload = {};
          formData.forEach((value, key) => {
            payload[key] = value;
          });
          console.log("Student Update Payload:", payload);

          const res = await updateStudentById(selectedItem.student_id, formData);
         
          console.log("update-res",res)
          
          const modal = Modal.getInstance(document.getElementById('editModal'));
          console.log("bootstrap-modal",modal)
          modal?.hide();
          modal?.dispose();
          document.getElementById("closeEditModal")?.click();
          getStudentsData();
          setSelectedItem();
        } catch (error) {
          console.error("Error updating class:", error);
          const modal = Modal.getInstance(document.getElementById('editModal'));
          modal?.hide();
          modal?.dispose();
          document.getElementById("closeEditModal")?.click();
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
            const res = await deleteStudentById(id);
            // setData((prevData) => prevData.filter((item) => item.id !== id));
            Swal.fire("Deleted!", "The student has been deleted.", "success");
            getStudentsData();
          } catch (error) {
            Swal.fire("Error!", "Failed to delete the class.", "error");
          }
        }
      });
    };

  return (
    <>
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
        <h5 className="modal-title" id="editModalLabel">Edit Student</h5>
        <button  id="closeEditModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">x</button>
      </div>
      <div className="modal-body">
        {selectedItem&&<EditStudent student={selectedItem} handleUpdate={handleUpdate} />}
      </div>
    </div>
  </div>
</div>

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
            {/* Student Table Area Start Here */}
            <div className="card height-auto">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table display data-table">
                    <thead style={{ lineHeight: "35px", fontSize:"15px" }}>
                      <tr >
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
                      {(!students || !students.length)&&(<tr style={{ lineHeight: "35px", fontSize:"15px" }}><td>No Data Found</td></tr>) }
                      {students&&students.map((student) => (
                        <tr key={student.student_id} style={{ lineHeight: "35px", fontSize:"15px" }}>
                          <td>{student.student_id}</td>
                          <td>{student.first_name }  {student.last_name }</td>
                          <td>{student.category}</td>
                          <td>{student?.academic_info?.class_name}</td>
                          <td className="progress-indicator">
                            {student.progress}%{" "}
                            <span
                              className={`progress-circle progress-${
                                student.progress >= 99.9
                                  ? "green"
                                  : student.progress >= 50
                                  ? "orange"
                                  : "red"
                              }`}
                            />
                          </td>
                          <td>{student.country.name}</td>
                          <td className="action-icons">
                          <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#editModal"
                                onClick={() => handleEditClick(student)}
                              >
                            <i className="fas fa-edit" />
                            </a>
                            <a
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#viewModal"
                                onClick={() => setSelectedItem(student)}
                              >
                                <i className="fas fa-eye" />
                              </a>
                              <a href="#" onClick={() => { console.log('Delete user id:', student.student_id); handleDelete(student.student_id); }}>
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
       {/* {showModal && <div className="modal-backdrop fade show"></div>} */}
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
       {/* View Info Model */}
       <div
        className="modal fade"
        id="viewModal"
        tabIndex="-1"
        aria-labelledby="viewModalLabel"
        aria-hidden="true"
      >
       <StudentViewModal student={selectedItem} />
      </div>
    </>
  );
};

export default Students;
