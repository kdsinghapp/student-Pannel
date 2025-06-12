// Optimized AddStudentDetails with improved structure and modular state management
import React, { useState, useEffect } from "react";
import Headers from "../../components/Headers";
import Sidebar from "../../components/Sidebar";
import DownloadTemplate from "../../components/DownloadTemplate";
import * as bootstrap from "bootstrap";
import {
  addStudents,
  getCountryList,
  getReligionsList,
  getAllClasses,
} from "../../utils/authApi";
import { useForm } from "react-hook-form";

const AddStudentDetails = () => <AddStudentsUI />;
export default AddStudentDetails;

const AddStudentsUI = () => {
  // State for dropdowns and data
  const [countries, setCountries] = useState([]);
  const [religions, setReligions] = useState([]);
  const [classData, setClassData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDivisionId, setSelectedDivisionId] = useState("");

  // Get user/school/curriculum info
  const userDataString = localStorage.getItem("userData");
  let school = null;
  let groupedCurriculums = {};
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    if (
      userData &&
      userData.user &&
      userData.user.school_details &&
      userData.user.school_details.length > 0
    ) {
      school = userData.user.school_details[0];
      groupedCurriculums = school.grouped_curriculums || {};
    }
  }

  // Years and divisions
  const years = Object.keys(groupedCurriculums);
  const divisions =
    selectedYear && groupedCurriculums[selectedYear]
      ? groupedCurriculums[selectedYear].map((item) => ({
          id: item.curriculum_division.id,
          name: item.curriculum_division.name,
          classes: item.curriculum_division.classes,
        }))
      : [];
  const classes =
    selectedDivisionId && divisions.length
      ? divisions.find((div) => String(div.id) === String(selectedDivisionId))
          ?.classes || []
      : [];

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  // Fetch dropdown data
  useEffect(() => {
    (async () => {
      try {
        const [countryRes, religionRes, classRes] = await Promise.all([
          getCountryList(),
          getReligionsList(),
          getAllClasses(),
        ]);
        if (countryRes.status) setCountries(countryRes.data);
        if (religionRes.status) setReligions(religionRes.data);
        if (classRes.status) setClassData(classRes.data);
      } catch (error) {
        alert("Error loading dropdown data");
      }
    })();
  }, []);

  // Set selectedYear from localStorage or default
  useEffect(() => {
    let yearFromStorage = localStorage.getItem("selectedYear");
    if (!yearFromStorage && years.length > 0) yearFromStorage = years[0];
    if (yearFromStorage && years.includes(yearFromStorage))
      setSelectedYear(yearFromStorage);
    else if (years.length > 0) setSelectedYear(years[0]);
  }, [userDataString]);

  // Reset division when year changes
  useEffect(() => {
    setSelectedDivisionId("");
  }, [selectedYear]);

  // Form submit handler
  const handleStudentFormSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (key === "profile_image") {
          formData.append("profile_image", data.profile_image[0]);
        } else {
          formData.append(key, data[key]);
        }
      }
      formData.append("school_division_id", selectedDivisionId);
      const res = await addStudents(formData);
      if (res.status) {
        alert("Student added successfully");
        reset();
      } else {
        alert("Student not added");
      }
    } catch (error) {
      alert("Error adding student");
    }
  };

  // UI
  return (
    <div id="wrapper" className="wrapper bg-ash">
      <Headers />
      <div className="dashboard-page-one">
        <Sidebar />
        <div className="dashboard-content-one">
          {/* Breadcrumbs and actions */}
          <div className="breadcrumbs-area d-flex  justify-content-between ">
            <h3>Add Student details</h3>
            <div>
              {/* <button
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
              </button> */}
              <button
                className="btn btn-purple modal-trigger"
                style={{ color: "white", background: "#501b8d" }}
              >
                <i className="fas fa-plus" /> Add New
              </button>
            </div>
          </div>
          {/* Accordion for forms */}
          <div className="card height-auto">
            <div className="card-body">
              <div className="accordion" id="customAccordion">
                {/* Personal Info */}
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
                            <label>Firstname *</label>
                            <input
                              type="text"
                              placeholder="Enter Firstname"
                              {...register("first_name", {
                                required: "Firstname is required",
                                minLength: {
                                  value: 3,
                                  message:
                                    "FirstName must be at least 3 characters",
                                },
                              })}
                              className="form-control"
                            />
                            {errors.first_name && (
                              <p className="text-danger">
                                {errors.first_name.message}
                              </p>
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
                                  message:
                                    "Surname must be at least 3 characters",
                                },
                              })}
                              className="form-control"
                            />
                            {errors.last_name && (
                              <p className="text-danger">
                                {errors.last_name.message}
                              </p>
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
                            {errors.date_of_birth && (
                              <p className="text-danger">
                                {errors.date_of_birth.message}
                              </p>
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
                              <p className="text-danger">
                                {errors.country_id.message}
                              </p>
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
                              <p className="text-danger">
                                {errors.country_of_birth_id.message}
                              </p>
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
                              <p className="text-danger">
                                {errors.religion_id.message}
                              </p>
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
                              <p className="text-danger">
                                {errors.gender.message}
                              </p>
                            )}
                          </div>
                          {/* File Uploads */}
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
                              <p className="text-danger">
                                {errors.profile_image.message}
                              </p>
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
                              <p className="text-danger">
                                {errors.student_photo.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* Academic Info */}
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
                    </p>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#customAccordion"
                  >
                    <div className="accordion-body">
                      <form
                        onSubmit={handleSubmit(handleStudentFormSubmit)}
                        className="new-added-form"
                      >
                        <div className="row">
                          {/* School Code */}
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>School Code*</label>
                            <input
                              type="text"
                              placeholder="Enter School Code"
                              className="form-control"
                              {...register("school_code", {
                                required: "School Code is required",
                              })}
                            />
                            {errors.school_code && (
                              <span className="text-danger">
                                {errors.school_code.message}
                              </span>
                            )}
                          </div>
                          {/* Curriculum Division */}
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>Curriculum Division</label>
                            <select
                              className="form-control"
                              value={selectedDivisionId}
                              onChange={(e) => setSelectedDivisionId(e.target.value)}
                              disabled={!selectedYear}
                            >
                              <option value="">Select Division</option>
                              {divisions.map((div) => (
                                <option key={div.id} value={div.id}>
                                  {div.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* Year Group */}
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>Year Group</label>
                            <select
                              className="form-control"
                              {...register("school_class_id", { required: "Class is required" })}
                              disabled={!selectedDivisionId}
                            >
                              <option value="">Select Year Group</option>
                              {classes.map((cls) => (
                                <option key={cls.id} value={cls.id}>
                                  {cls.name}
                                </option>
                              ))}
                            </select>
                            {errors.school_class_id && (
                              <span className="text-danger">{errors.school_class_id.message}</span>
                            )}
                          </div>
                          {/* Academic Class */}
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>Class</label>
                            <select
                              className="select2 form-control"
                              {...register("academic_school_class_id")}
                            >
                              <option value="">
                                Please Select Academic Class
                              </option>
                              {classData &&
                                classData.map((clas) => (
                                  <option key={clas.id} value={clas.id}>
                                    {clas.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                          {/* SEN */}
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>SEN*</label>
                            <select
                              className="select2 form-control"
                              {...register("sen", {
                                required: "SEN is required",
                              })}
                            >
                              <option value="">Please Select SEN</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                            {errors.sen && (
                              <span className="text-danger">
                                {errors.sen.message}
                              </span>
                            )}
                          </div>
                          {/* G & T */}
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>G & T*</label>
                            <select
                              className="select2 form-control"
                              {...register("g_and_t", {
                                required: "G & T is required",
                              })}
                            >
                              <option value="">Please Select G&T</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                            {errors.g_and_t && (
                              <span className="text-danger">
                                {errors.g_and_t.message}
                              </span>
                            )}
                          </div>
                          {/* EAL */}
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>EAL*</label>
                            <select
                              className="select2 form-control"
                              {...register("eal", {
                                required: "EAL is required",
                              })}
                            >
                              <option value="">Please Select EAL</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                            {errors.eal && (
                              <span className="text-danger">
                                {errors.eal.message}
                              </span>
                            )}
                          </div>
                          {/* Category */}
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>Category</label>
                            <select
                              className="select2 form-control"
                              {...register("category")}
                            >
                              <option value="">Please Select</option>
                              <option value="ESL">ESL</option>
                              <option value="GEN">GEN</option>
                            </select>
                          </div>
                          {/* Submit */}
                          <div className="col-12 form-group mg-t-8">
                            <button
                              type="submit"
                              className="btn-fill-lg btn-gradient-blue1 btn-hover-bluedark"
                            >
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
        </div>
      </div>
      <DownloadTemplate />
      {/* ...modals for upload/delete... */}
    </div>
  );
};
