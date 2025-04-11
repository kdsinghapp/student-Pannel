import React, { useState,useEffect } from "react";
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
  addStudents,getCountryList,getReligionsList,getAllClasses} from "../../utils/authApi";
import { useNavigate } from "react-router-dom";


function AddStudentDetails() {
  return (<>
  <AddStudentsUI/>
  </>)
}

export default AddStudentDetails;


const AddStudentsUI = () => {
  const [countries, setCountries] = useState([]);
  const [religions, setReligions] = useState([]);
   const [classData, setClassData] = useState([]);
  // const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  // const navigate = useNavigate();
  
  const [sturdentFormData,setStudentFormData] = useState({
    first_name:"",
    last_name:"",
    class_id:"",
    country_id:"",
    country_of_birth_id:"",
    date_of_birth:"",
    religion_id:"",
    status:"",
    gender:"",
    profile_image:"",
    progress:"",
    category:"",
    school_code:"",
    year_group_id:"",
    academic_class_id:"",
    school_division:"",
    sen:"",
    g_and_t:"",
    eal:""
  });
  const [academic,setStudentAcademic] = useState({})
 
   const getCountryData = async () => {
      try {
        const res = await getCountryList();
        console.log("country-list",res)
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
        console.log("religion-list",res)
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
          console.log("class-list",res)
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
  const handleStudentFormChange=(e)=>{
    // e.preventDefault();
    const { name, value } = e.target;
    console.log("name/value",name, value)
    setStudentFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleStudentFormSubbmit=async (e)=>{
    e.preventDefault();
    console.log("sturdentFormData",sturdentFormData);
     e.preventDefault();
     // Call API or update state to add the class
        try {
          const res = await addStudents(sturdentFormData);
          console.log("class-list",res)
          if(!res.status){
            // setToastData({ message: "Class not added", type: "denger" });
        // setShowToast(true);
          }
          if (res.status) {
            // setData(res.data);
            alert("student added successfully");
          }
    
        } catch (error) {
          console.error("Error add class data:", error);
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
  }

  return (
    <>
      <div id="wrapper" className="wrapper bg-ash">
        <Headers />
        <div className="dashboard-page-one">
          <Sidebar />
          <div className="dashboard-content-one">
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
                      <form  className="new-added-form">
                        <div className="row">
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>Firstname *</label>
                            <input
                              type="text"
                              name="first_name"
                              value={sturdentFormData.first_name}
                              placeholder="Enter Firstname"
                              onChange={handleStudentFormChange}
                              className="form-control"
                            />
                          </div>
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>Surname*</label>
                            <input
                              type="text"
                              placeholder="Enter Surname"
                              name="last_name"
                              value={sturdentFormData.last_name}
                              onChange={handleStudentFormChange}
                              className="form-control"
                            />
                          </div>
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>Date Of Birth *</label>
                            <input
                              type="date"
                              placeholder="dd/mm/yyyy"
                              name="date_of_birth"
                              value={sturdentFormData.date_of_birth}
                              onChange={handleStudentFormChange}
                              className="form-control air-datepicker"
                            />
                            <i className="far fa-calendar-alt" />
                          </div>
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>Nationality </label>
                            <select 
                            name="country_id"
                            value={sturdentFormData.country_id}
                            onChange={handleStudentFormChange}
                             className="select2 form-control">
                              <option value="">Nationality *</option>
                              {countries&&countries.map(contry=>{
                                return(<option key={contry.id} value={contry.id}>{contry.name}</option>)
                              })}
                            </select>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>Birth Country</label>
                            <select 
                             name="country_of_birth_id"
                             value={sturdentFormData.country_of_birth_id}
                             onChange={handleStudentFormChange}
                             className="select2 form-control">
                              <option value="">Nationality *</option>
                              {countries&&countries.map(contry=>{
                                return(<option key={contry.id} value={contry.id}>{contry.name}</option>)
                              })}
                            </select>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>Religion *</label>
                            <select 
                             name="religion_id"
                             value={sturdentFormData.religion_id}
                             onChange={handleStudentFormChange}
                            className="select2 form-control">
                              <option value="">Please Select Religion *</option>
                           {religions&&religions.map(dharma=>{
                              return(<option key={dharma.id} value={dharma.id}>{dharma.name}</option>)
                            })}
                           
                            </select>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>Gender *</label>
                            <select 
                             name="gender"
                             value={sturdentFormData.gender}
                             onChange={handleStudentFormChange}
                            className="select2 form-control">
                              <option value="">Please Select Gender *</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Others">Others</option>
                            </select>
                          </div>
                          <div className="col-lg-8 col-12 form-group mg-t-30">
                            <label className="text-dark-medium">
                              Upload Student Photo (150px X 150px)
                            </label>
                            <input type="file" className="form-control-file" />
                          </div>
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
                      <form onSubmit={handleStudentFormSubbmit} className="new-added-form">
                        <div className="row">
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>School Code*</label>
                            <input
                              type="text"
                              placeholder="Enter Forename"
                              name="school_code"
                            value={sturdentFormData.school_code}
                            onChange={handleStudentFormChange}
                              className="form-control"
                            />
                          </div>
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>Year Group*</label>
                            <select 
                            name="year_group_id"
                            value={sturdentFormData.year_group_id}
                            onChange={handleStudentFormChange}
                            className="select2 form-control">
                              <option value="">Year Group*</option>
                              <option value={1}>2K21</option>
                              <option value={2}>2K22</option>
                              <option value={3}>2K23</option>
                            </select>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>Class*</label>
                            <select 
                            name="class_id"
                            value={sturdentFormData.class_id}
                            onChange={handleStudentFormChange}
                            className="select2 form-control">
                              <option value="">Please Select Class *</option>
                              {classData&&classData.map(clas=>{
                              return(<option key={clas.id} value={clas.id}>{clas.name}</option>)
                            })}
                            </select>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>School Division*</label>
                            <select 
                            name="school_division"
                            value={sturdentFormData.school_division}
                            onChange={handleStudentFormChange}
                            className="select2 form-control">
                              <option value="">Pleasec School Division *</option>
                              <option value="AMORG91731">Indore Division</option>
                            </select>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>SEN*</label>
                            <select 
                            name="sen"
                            value={sturdentFormData.sen}
                            onChange={handleStudentFormChange}
                            className="select2 form-control">
                               <option value="">Pleasec Select SEN</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>G &amp; T*</label>
                            <select 
                            name="g_and_t"
                            value={sturdentFormData.g_and_t}
                            onChange={handleStudentFormChange}
                            className="select2 form-control">
                              <option value="">Pleasec Select G&T</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>EAL*</label>
                            <select 
                            name="eal"
                            value={sturdentFormData.eal}
                            onChange={handleStudentFormChange}
                            className="select2 form-control">
                              <option value="">Pleasec Select EAL</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>Academic Class</label>
                            <select 
                            name="academic_class_id"
                            value={sturdentFormData.academic_class_id}
                            onChange={handleStudentFormChange}
                            className="select2 form-control">
                              <option value="">Please Select Class *</option>
                              {classData&&classData.map(clas=>{
                              return(<option key={clas.id} value={clas.id}>{clas.name}</option>)
                            })}
                            </select>
                           
                          </div>
                          <div className="col-xl-4 col-lg-6 col-12 form-group">
                            <label>Category</label>
                            <select 
                            name="category"
                            value={sturdentFormData.category}
                            onChange={handleStudentFormChange}
                            className="select2 form-control">
                              <option value="">Please Select</option>
                              <option value="ESL">ESL</option>
                              <option value="ESL">GEN</option>
                            </select>
                          </div>
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
            {/* Class Table Area End Here */}
          </div>
         
        </div>
        {/* Page Area End Here */}
      </div>
     
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
    </>
  );
};