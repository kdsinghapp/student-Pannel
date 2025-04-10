import React, { useState } from "react";
import Headers from "../Headers";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddExternalAssessment = () => {
  const [formData, setFormData] = useState({
    subjectGroup: "",
    departmentName: "",
    subjectName: "",
    year: "",
    className: "",
    teacher: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submission=====>>>>>", formData);

    if (
      !formData.subjectGroup ||
      !formData.departmentName ||
      !formData.subjectName ||
      !formData.className ||
      !formData.teacher
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all required fields!",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "External assessment added successfully!",
    });

    setFormData({
      subjectGroup: "",
      departmentName: "",
      subjectName: "",
      year: "",
      className: "",
      teacher: "",
    });
  };

  return (
    <div id="wrapper" className="wrapper bg-ash">
      <Headers />
      <div className="dashboard-page-one">
        <Sidebar />
        <div className="dashboard-content-one">
          <div className="breadcrumbs-area d-flex justify-content-between">
            <h3>Add External Assessment</h3>
            <div>
              <button className="btn btn-purple">
                <i className="fas fa-download" /> Template
              </button>
              <button className="btn btn-purple">
                <i className="fas fa-upload" /> Upload
              </button>
              <Link
                to="/external-assessment"
                className="btn btn-purple text-white"
              >
                <i className="fas fa-eye" /> View All
              </Link>
            </div>
          </div>
          <div className="card height-auto">
            <div className="card-body">
              <h5>External Assessment Configuration</h5>
              <form className="new-added-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-12 form-group">
                    <label>Subject Group*</label>
                    <select
                      className="select2 form-control"
                      name="subjectGroup"
                      value={formData.subjectGroup}
                      onChange={handleChange}
                    >
                      <option value="">Select Subject Group</option>
                      <option value="Science">Science</option>
                      <option value="Math">Math</option>
                      <option value="Social Science">Social Science</option>
                    </select>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-12 form-group">
                    <label>Department Name *</label>
                    <select
                      className="select2 form-control"
                      name="departmentName"
                      value={formData.departmentName}
                      onChange={handleChange}
                    >
                      <option value="">Department Name</option>
                      <option value="Science">Science</option>
                      <option value="Math">Math</option>
                      <option value="Social Science">Social Science</option>
                    </select>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-12 form-group">
                    <label>Subject Name *</label>
                    <input
                      type="text"
                      placeholder="Subject Name"
                      className="form-control"
                      name="subjectName"
                      value={formData.subjectName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-12 form-group">
                    <label>Year</label>
                    <select
                      className="select2 form-control"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                    >
                      <option value="">Year</option>
                      <option value="FY21">FY21</option>
                      <option value="FY22">FY22</option>
                    </select>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-12 form-group">
                    <label>Class *</label>
                    <select
                      className="select2 form-control"
                      name="className"
                      value={formData.className}
                      onChange={handleChange}
                    >
                      <option value="">Class</option>
                      <option value="10A">10A</option>
                      <option value="11A">11A</option>
                      <option value="12B">12B</option>
                    </select>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-12 form-group">
                    <label>Teacher *</label>
                    <select
                      className="select2 form-control"
                      name="teacher"
                      value={formData.teacher}
                      onChange={handleChange}
                    >
                      <option value="">Teacher</option>
                      <option value="Rahul Pratap">Rahul Pratap</option>
                      <option value="Mithon Idpee">Mithon Idpee</option>
                      <option value="Rohir Khsn">Rohir Khsn</option>
                    </select>
                  </div>
                  <div className="col-12 form-group mg-t-8 text-center">
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
  );
};

export default AddExternalAssessment;
