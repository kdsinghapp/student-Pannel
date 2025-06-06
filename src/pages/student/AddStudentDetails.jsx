import React, { useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Headers from "../../components/Headers";
// import studentId from "../assets/assets/icon/fi_list.png";
// import studentPh from "../assets/assets/icon/ph_student.png";
// import studentCat from "../assets/assets/icon/category.png";
// import studentClass from "../assets/assets/icon/class.png";
// import studentProg from "../assets/assets/icon/tabler_progress.png";
// import studentStat from "../assets/assets/icon/lets-icons_status.png";
// import studentEdit from "../assets/assets/icon/tabler_edit.png";
import Sidebar from "../../components/Sidebar";
import * as bootstrap from "bootstrap";
import DownloadTemplate from "../../components/DownloadTemplate";
import {
  addStudents, getCountryList, getReligionsList, getAllClasses
} from "../../utils/authApi";
// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function AddStudentDetails() {
  return (<>
    <AddStudentsUI />
  </>)
}

export default AddStudentDetails;


const AddStudentsUI = () => {
const userDataString = localStorage.getItem("userData");
let school = null;
let groupedCurriculums = {};
if (userDataString) {
  const userData = JSON.parse(userDataString);
  console.log("live Data Fetch Ho Raha Haia", userData);
  if (
    userData &&
    userData.user &&
    userData.user.school_details &&
    userData.user.school_details.length > 0
  ) {
    school = userData.user.school_details[0];
    groupedCurriculums = school.grouped_curriculums || {};
  }
} else {
  console.log("No user data found in localStorage");
}
  const [countries, setCountries] = useState([]);
  const [religions, setReligions] = useState([]);
  const [classData, setClassData] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
  const [selectedDivisionId, setSelectedDivisionId] = useState("");
   const years = Object.keys(groupedCurriculums);

     const divisions =
    selectedYear && groupedCurriculums[selectedYear]
      ? groupedCurriculums[selectedYear].map((item) => ({
          id: item.curriculum_division.id,
          name: item.curriculum_division.name,
          classes: item.curriculum_division.classes,
        }))
      : [];

  // Get classes for selected division
  const classes =
    selectedDivisionId && divisions.length
      ? divisions.find((div) => String(div.id) === String(selectedDivisionId))?.classes || []
      : [];
  // const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  // const navigate = useNavigate();

  // const [sturdentFormData,setStudentFormData] = useState({
  //   first_name:"",
  //   last_name:"",
  //   class_id:"",
  //   country_id:"",
  //   country_of_birth_id:"",
  //   date_of_birth:"",
  //   religion_id:"",
  //   status:"",
  //   gender:"",
  //   profile_image:"",
  //   progress:"",
  //   category:"",
  //   school_code:"",
  //   year_group_id:"",
  //   academic_class_id:"",
  //   school_division:"",
  //   sen:"",
  //   g_and_t:"",
  //   eal:""
  // });
  // const [academic,setStudentAcademic] = useState({})
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // This is for resetting the form if needed
  } = useForm({ mode: "onBlur" });
  const getCountryData = async () => {
    try {
      const res = await getCountryList();
      console.log("country-list", res)
      if (res.status) {
        setCountries(res.data);
      }
    } catch (error) {
      console.error("Error fetching country data:", error);
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
  const getReligionData = async () => {
    try {
      const res = await getReligionsList();
      console.log("religion-list", res)
      if (res.status) {
        setReligions(res.data);
      }
    } catch (error) {
      console.error("Error fetching religion data:", error);
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

  const getClassData = async () => {
    try {
      const res = await getAllClasses();
      console.log("class-list", res)
      if (res.status) {
        setClassData(res.data);
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
    getCountryData();
    getReligionData();
    getClassData();
  }, []);


  // const navigateToAddStudents = () => {
  //   navigate("/add-student-details")
  // }
  // const handleStudentFormChange=(e)=>{
  //   // e.preventDefault();
  //   const { name, value } = e.target;
  //   console.log("name/value",name, value)
  //   setStudentFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // }
  // const handleStudentFormSubbmit=async (e)=>{
  //   e.preventDefault();
  //   console.log("sturdentFormData",sturdentFormData);
  //    e.preventDefault();
  //    // Call API or update state to add the class
  //       try {
  //         const res = await addStudents(sturdentFormData);
  //         console.log("class-list",res)
  //         if(!res.status){
  //           // setToastData({ message: "Class not added", type: "denger" });
  //       // setShowToast(true);
  //         }
  //         if (res.status) {
  //           // setData(res.data);
  //           alert("student added successfully");
  //         }

  //       } catch (error) {
  //         console.error("Error add class data:", error);
  //         if (error.message) {
  //           console.error("Response Error:", error.response.data);
  //           alert(
  //             `Error: ${error.response.data.message || "Something went wrong"}`
  //           );
  //         } else if (error.request) {
  //           console.error("Network Error:", error.request);
  //           alert("Network error. Please check your internet connection.");
  //         } else {
  //           console.error("Unexpected Error:", error.message);
  //           alert("An unexpected error occurred. Please try again.");
  //         }
  //       }
  // }

  const handleStudentFormSubmit = async (data) => {
    console.log("Form Data:", data);

    try {
      const formData = new FormData();
      // Append all form fields to FormData
      for (const key in data) {
        if (key === "profile_image") {
          formData.append("profile_image", data.profile_image[0]); // Get first file from FileList
        }
        else {
          formData.append(key, data[key]);
        }
      }
      const res = await addStudents(formData);
      console.log("Response:", res);

      if (res.status) {
        alert("Student added successfully");
        reset(); // Reset the form after successful submission
      } else {
        alert("Student not added");
      }
    } catch (error) {
      console.error("Error adding student:", error);

      if (error.response) {
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



  // Dropdowns for Year, Division, and Class
  return (
    <>
      <div id="wrapper" className="wrapper bg-ash">
        <Headers />
        <div className="dashboard-page-one">
          <Sidebar />
          <div className="dashboard-content-one">
            {/* --- DROPDOWNS FOR YEAR, DIVISION, CLASS --- */}
          
            {/* Breadcubs Area Start Here */}
            <div className="breadcrumbs-area d-flex felx-col-2 justify-content-between ">
              <h3>Add Student details</h3>
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
                // onClick={navigateToAddStudents}
                >
                  <i className="fas fa-plus" /> Add New
                </button>

              </div>
              <div>

              </div>
            </div>
            {/* Breadcubs Area End Here */}

            {/* Class Table Area Start Here */}
            <div className="card height-auto">
              <div className="card-body">
                <div className="accordion" id="customAccordion">
                  {/* Item 1 */}
                  <div className="accordion-item mb-5">
                    <h2 className="accordion-header" id="headingOne">
                      <p
                        className="accordion-button d-flex align-items-center"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                        style={{ fontSize: 20 }}
                      >
                        Student Personal Information:
                        {/* <i className="fa fa-chevron-down ms-auto" /> */}
                      </p>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#customAccordion"
                    >
                      <div className="accordion-body">
                        <form className="new-added-form">
                          <div className="row">
                            {/* Firstname */}
                              <div className="col-xl-4 col-lg-6 col-12 form-group">
                              <label>School Code*</label>
                              <input
                                type="text"
                                placeholder="Enter School Code"
                                className="form-control"
                                {...register("school_code", { required: "School Code is required" })}
                              />
                              {errors.school_code && <span className="text-danger">{errors.school_code.message}</span>}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-12 form-group">
                              <label>Firstname *</label>
                              <input
                                type="text"
                                placeholder="Enter Firstname"
                                {...register("first_name", {
                                  required: "Firstname is required",
                                  minLength: {
                                    value: 3,
                                    message: "FirstName must be at least 3 characters",
                                  },
                                })}
                                className="form-control"
                              />
                              {errors.first_name && (
                                <p className="text-danger">{errors.first_name.message}</p>
                              )}
                            </div>

                            {/* Surname */}
                            <div className="col-xl-4 col-lg-6 col-12 form-group">
                              <label>Surname *</label>
                              <input
                                type="text"
                                placeholder="Enter Surname"
                                {...register("last_name", {
                                  required: "Surname is required",
                                  minLength: {
                                    value: 3,
                                    message: "Surname must be at least 3 characters",
                                  },
                                })}
                                className="form-control"
                              />
                              {errors.last_name && (
                                <p className="text-danger">{errors.last_name.message}</p>
                              )}
                            </div>

                            {/* Date of Birth */}
                            <div className="col-xl-4 col-lg-6 col-12 form-group">
                              <label>Date Of Birth *</label>
                              <input
                                type="date"
                                placeholder="dd/mm/yyyy"
                                {...register("date_of_birth", {
                                  required: "Date of Birth is required",
                                })}
                                className="form-control air-datepicker"
                              />
                              <i className="far fa-calendar-alt" />
                              {errors.date_of_birth && (
                                <p className="text-danger">{errors.date_of_birth.message}</p>
                              )}
                            </div>

                            {/* Nationality */}
                            <div className="col-xl-4 col-lg-6 col-12 form-group">
                              <label>Nationality *</label>
                              <select
                                {...register("country_id", {
                                  required: "Nationality is required",
                                })}
                                className="select2 form-control"
                              >
                                <option value="">Select Nationality</option>
                                {countries &&
                                  countries.map((contry) => (
                                    <option key={contry.id} value={contry.id}>
                                      {contry.name}
                                    </option>
                                  ))}
                              </select>
                              {errors.country_id && (
                                <p className="text-danger">{errors.country_id.message}</p>
                              )}
                            </div>

                            {/* Birth Country */}
                            <div className="col-xl-4 col-lg-6 col-12 form-group">
                              <label>Birth Country *</label>
                              <select
                                {...register("country_of_birth_id", {
                                  required: "Birth Country is required",
                                })}
                                className="select2 form-control"
                              >
                                <option value="">Select Birth Country</option>
                                {countries &&
                                  countries.map((contry) => (
                                    <option key={contry.id} value={contry.id}>
                                      {contry.name}
                                    </option>
                                  ))}
                              </select>
                              {errors.country_of_birth_id && (
                                <p className="text-danger">{errors.country_of_birth_id.message}</p>
                              )}
                            </div>

                            {/* Religion */}
                            <div className="col-xl-4 col-lg-6 col-12 form-group">
                              <label>Religion *</label>
                              <select
                                {...register("religion_id", {
                                  required: "Religion is required",
                                })}
                                className="select2 form-control"
                              >
                                <option value="">Select Religion</option>
                                {religions &&
                                  religions.map((dharma) => (
                                    <option key={dharma.id} value={dharma.id}>
                                      {dharma.name}
                                    </option>
                                  ))}
                              </select>
                              {errors.religion_id && (
                                <p className="text-danger">{errors.religion_id.message}</p>
                              )}
                            </div>

                            {/* Gender */}
                            <div className="col-xl-4 col-lg-6 col-12 form-group">
                              <label>Gender *</label>
                              <select
                                {...register("gender", {
                                  required: "Gender is required",
                                })}
                                className="select2 form-control"
                              >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                              </select>
                              {errors.gender && (
                                <p className="text-danger">{errors.gender.message}</p>
                              )}
                            </div>

                            {/* File Upload */}
                            <div className="col-lg-8 col-12 form-group mg-t-30">
                              <label className="text-dark-medium">
                                Upload Student Photo (150px X 150px)
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                {...register("profile_image", {
                                  required: "Photo is required",

                                })}
                                className="form-control-file"
                              />
                              {errors.profile_image && (
                                <p className="text-danger">{errors.profile_image.message}</p>
                              )}
                            </div>
                            <div className="col-lg-8 col-12 form-group mg-t-30">
                              <label className="text-dark-medium">
                                Upload Student Photo (150px X 150px)
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                {...register("student_photo", {
                                  required: "Photo is required",
                                })}
                                className="form-control-file"
                              />
                              {errors.student_photo && (
                                <p className="text-danger">{errors.student_photo.message}</p>
                              )}
                            </div>

                            {/* Submit Button */}
                            {/* <div className="col-12 form-group mg-t-8">
                          <button
                            type="submit"
                            className="btn-fill-lg btn-gradient-blue1 btn-hover-bluedark"
                          >
                            Submit
                          </button>
                        </div> */}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* Item 2 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <p
                        className="accordion-button collapsed d-flex align-items-center"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                        style={{ fontSize: 20 }}
                      >
                        Student Academic Information
                        {/* <i className="fa fa-chevron-down ms-auto" /> */}
                      </p>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#customAccordion"
                    >
                      <div className="accordion-body">
                        <form onSubmit={handleSubmit(handleStudentFormSubmit)} className="new-added-form">
                          <div className="row">
                          
                            <div className="col-md-4">
                <label>Year</label>
                <select
                  className="form-control"
                  value={selectedYear}
                  onChange={e => {
                    setSelectedYear(e.target.value);
                    setSelectedDivisionId(""); // reset division
                  }}
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

                             <div className="col-md-4">
                <label>Curriculum Division</label>
                <select
                  className="form-control"
                  value={selectedDivisionId}
                  onChange={e => setSelectedDivisionId(e.target.value)}
                  disabled={!selectedYear}
                >
                  <option value="">Select Division</option>
                  {divisions.map(div => (
                    <option key={div.id} value={div.id}>{div.name}</option>
                  ))}
                </select>
              </div>

                              <div className="col-md-4">
                <label>Class</label>
                <select
                  className="form-control"
                  disabled={!selectedDivisionId}
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>



                            <div className="col-xl-4 col-lg-6 col-12 form-group">
                              <label>SEN*</label>
                              <select
                                className="select2 form-control"
                                {...register("sen", { required: "SEN is required" })}
                              >
                                <option value="">Please Select SEN</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              {errors.sen && <span className="text-danger">{errors.sen.message}</span>}
                            </div>

                            <div className="col-xl-4 col-lg-6 col-12 form-group">
                              <label>G & T*</label>
                              <select
                                className="select2 form-control"
                                {...register("g_and_t", { required: "G & T is required" })}
                              >
                                <option value="">Please Select G&T</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              {errors.g_and_t && <span className="text-danger">{errors.g_and_t.message}</span>}
                            </div>

                            <div className="col-xl-4 col-lg-6 col-12 form-group">
                              <label>EAL*</label>
                              <select
                                className="select2 form-control"
                                {...register("eal", { required: "EAL is required" })}
                              >
                                <option value="">Please Select EAL</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              {errors.eal && <span className="text-danger">{errors.eal.message}</span>}
                            </div>

                            <div className="col-xl-4 col-lg-6 col-12 form-group">
                              <label>Academic Class</label>
                              <select className="select2 form-control" {...register("academic_class_id")}>
                                <option value="">Please Select Academic Class</option>
                                {classData && classData.map(clas => (
                                  <option key={clas.id} value={clas.id}>{clas.name}</option>
                                ))}
                              </select>
                            </div>

                            <div className="col-xl-4 col-lg-6 col-12 form-group">
                              <label>Category</label>
                              <select className="select2 form-control" {...register("category")}>
                                <option value="">Please Select</option>
                                <option value="ESL">ESL</option>
                                <option value="GEN">GEN</option>
                              </select>
                            </div>

                            <div className="col-12 form-group mg-t-8">
                              <button type="submit" className="btn-fill-lg btn-gradient-blue1 btn-hover-bluedark">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Class Table Area End Here */}
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