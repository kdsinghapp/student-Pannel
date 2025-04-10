import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import * as bootstrap from "bootstrap";
import Headers from "../components/Headers";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import calci from "../assets/assets/icon/calculator.png";
import books from "../assets/assets/icon/book.png";
import lab from "../assets/assets/icon/lab.png";
import chip from "../assets/assets/icon/chip.png";
import home from "../assets/assets/icon/home.png";
import web from "../assets/assets/icon/web.png";
import art from "../assets/assets/icon/art.png";
import music from "../assets/assets/icon/music.png";
import imgPerson from "../assets/assets/icon/peron.png";
import laptop from "../assets/assets/icon/laptop.png";
import language from "../assets/assets/icon/language.png";
import add from "../assets/assets/icon/add.png";
import Sidebar from "../components/Sidebar";
import DownloadTemplate from '../components/DownloadTemplate'
const CurriculumSetup = () => {
  return (
    <>
      <div id="wrapper" className="wrapper bg-ash">
        <Headers />
        <div className="dashboard-page-one">
          <Sidebar />
          {/* Sidebar Area End Here */}
          <div className="dashboard-content-one">
            {/* Breadcubs Area Start Here */}
            <div className="breadcrumbs-area d-flex justify-content-between">
              <h3>Add Curriculum Mapping</h3>
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
>
  <i className="fas fa-download" /> Template
</button>
                <button
                  className="btn btn-purple modal-trigger mb-0"
                  data-toggle="modal"
                  data-target="#upload"
                >
                  <i className="fas fa-upload" /> Upload
                </button>
                <a className="btn btn-purple text-white">
                  <i className="fas fa-plus" /> Add New
                </a>
              </div>
            </div>
            {/* Breadcubs Area End Here */}
            {/* Class Table Area Start Here */}
            <div className="card height-auto">
              <div className="card-body">
                <div className="row main-mapping-container justify-content-between">
                  <div className="col-lg-8 col-md-12 subject-container-row">
                    <p className="subject-title">Compulsory Subjects</p>
                    <div className="row mb-2">
                      <div className="col-lg-4 col-md-4 col-sm-6 subject-container mb-2">
                        <img
                          src={calci}
                          alt="subject-icon"
                          width="12px"
                          height="16px"
                        />
                        <p className="mb-0">Mathematics</p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 subject-container mb-2">
                        <img
                          src={books}
                          alt="subject-icon"
                          width="12px"
                          height="16px"
                        />
                        <p className="mb-0">English</p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 subject-container mb-2">
                        <img
                          src={lab}
                          alt="subject-icon"
                          width="12px"
                          height="16px"
                        />
                        <p className="mb-0">Science</p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-lg-4 col-md-4 col-sm-6 subject-container mb-2">
                        <img
                          src={chip}
                          alt="subject-icon"
                          width="12px"
                          height="16px"
                        />
                        <p className="mb-0">Technology</p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 subject-container mb-2">
                        <img
                          src={home}
                          alt="subject-icon"
                          width="12px"
                          height="16px"
                        />
                        <p className="mb-0">History</p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 subject-container mb-2">
                        <img
                          src={web}
                          alt="subject-icon"
                          width="12px"
                          height="16px"
                        />
                        <p className="mb-0">Geography</p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-lg-4 col-md-4 col-sm-6 subject-container mb-2">
                        <img
                          src={art}
                          alt="subject-icon"
                          width="12px"
                          height="16px"
                        />
                        <p className="mb-0">Art &amp; Design</p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 subject-container mb-2">
                        <img
                          src={music}
                          alt="subject-icon"
                          width="12px"
                          height="16px"
                        />
                        <p className="mb-0">Music</p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 subject-container mb-2">
                        <img
                          src={imgPerson}
                          alt="subject-icon"
                          width="12px"
                          height="16px"
                        />
                        <p className="mb-0">Physical Education</p>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-lg-4 col-md-4 col-sm-6 subject-container mb-2">
                        <img
                          src={laptop}
                          alt="subject-icon"
                          width="12px"
                          height="16px"
                        />
                        <p className="mb-0">Computing</p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 subject-container mb-2">
                        <img
                          src={language}
                          alt="subject-icon"
                          width="12px"
                          height="16px"
                        />
                        <p className="mb-0">Languages</p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 subject-container mb-2">
                        <img
                          src={add}
                          alt="subject-icon"
                          width="15px"
                          height="15px"
                        />
                        <a href="#" className="mb-0 add-more-subject">
                          Add More
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 new-subject-container-row px-4">
                    <p className="subject-title">Subjects</p>
                    <div className="col-lg-12 px-0">
                      <lable className="form-label">Department</lable>
                      <input
                        type="text"
                        className="form-control"
                        id="drpartmentName"
                        required=""
                      />
                    </div>
                    <div className="row mt-3">
                      <div className="col-lg-4">
                        <lable className="form-label">Code</lable>
                        <input
                          type="text"
                          className="form-control"
                          id="drpartmentName"
                          required=""
                        />
                      </div>
                      <div className="col-lg-8">
                        <lable className="form-label">Name</lable>
                        <input
                          type="text"
                          className="form-control"
                          id="drpartmentName"
                          required=""
                        />
                      </div>
                    </div>
                  </div>
                  {/* New Curriculum Mapping Section */}
                  <div className="col-lg-12 section curriculum-mapping-new mt-4">
                    <div className="row mb-4">
                      <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                        <label className="form-label">
                          Department/Subject Group
                        </label>
                        <select className="form-select form-control">
                          <option value="">Type or select department...</option>
                          <option value="science">Science</option>
                          <option value="mathematics">Mathematics</option>
                          <option value="english">English</option>
                          <option value="arts">Arts</option>
                          {/* Add more options as needed */}
                        </select>
                        {/* Selected Pills */}
                        <div className="selected-pills mt-2">
                          <span className="badge bg-light text-dark badge-primary">
                            Science <i className="fas fa-times" />
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 d-flex flex-column">
                        <label>Subject</label>
                        <select className="form-select form-control">
                          <option>Select subject...</option>
                        </select>
                        {/* Selected Pills */}
                        <div className="selected-pills mt-2">
                          <span className="badge bg-light text-dark badge-secondary">
                            Biology
                            <i className="fas fa-times" />
                          </span>
                          <span className="badge bg-light text-dark badge-secondary">
                            Chemistry
                            <i className="fas fa-times" />
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12 d-flex flex-column">
                        <label>Year Groups</label>
                        <select className="form-select form-control">
                          <option>Select year...</option>
                        </select>
                        {/* Selected Pills */}
                        <div className="selected-pills mt-2">
                          <span className="badge bg-light text-dark badge-primary">
                            FS1 <i className="fas fa-times" />
                          </span>
                          <span className="badge bg-light text-dark badge-primary">
                            FS2 <i className="fas fa-times" />
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Teacher Search */}
                    <div className="row mb-4">
                      <div className="col-lg-12">
                        <div className="search-container">
                          <i className="fas fa-search search-icon" />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search teachers..."
                          />
                        </div>
                        {/* Selected Teachers */}
                        <div className="selected-teachers mt-2">
                          <span className="badge bg-light text-dark badge-tertiary">
                            <img
                              src="https://www.bootdey.com/img/Content/avatar/avatar1.png"
                              className="avatar"
                              alt="John Smith"
                            />
                            John Smith <i className="fas fa-times" />
                          </span>
                          <span className="badge bg-light text-dark badge-tertiary">
                            <img
                              src="https://www.bootdey.com/img/Content/avatar/avatar2.png"
                              className="avatar"
                              alt="Sarah Johnson"
                            />
                            Sarah Johnson <i className="fas fa-times" />
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Add/Curriculum Mapping Button */}
                    <div className="row mb-4">
                      <div className="col-lg-12 text-center">
                      <button
  className="btn btn-purple modal-trigger"
  onClick={() => {
    const modalElement = document.getElementById("download");
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }}
>
  <i className="fas fa-download" /> Template
                      </button>
                      </div>
                    </div>
                    {/* Grade Mapping Table */}
                    <div className="row">
                      <div className="col-lg-12">
                        <h6>Grade Mapping</h6>
                        <div id="assessment-container">
                          {/* Default Row (Cannot be removed) */}
                          <div className="row g-2 mb-2 assessment-row default-row">
                            <div className="col-md-3">
                              <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Assessment Name"
                              />
                            </div>
                            <div className="col-md-3">
                              <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Assessment Type"
                              />
                            </div>
                            <div className="col-md-3">
                              <select className="form-select form-control mb-2">
                                <option selected="" disabled="">
                                  Grading Scheme
                                </option>
                                <option value="A-F">A-F</option>
                                <option value="Percentage">Percentage</option>
                                <option value="Pass/Fail">Pass/Fail</option>
                              </select>
                            </div>
                            <div className="col-md-2">
                              <input
                                type="number"
                                className="form-control mb-2"
                                placeholder="Weightage (%)"
                              />
                            </div>
                            <div className="col-md-1 d-flex">
                              <span className="input-group-text btn btn-light mr-2 btn-sm remove-row disabled">
                                <i className="fas fa-minus" />
                              </span>
                              <span className="input-group-text btn btn-light btn-sm add-row ms-2">
                                <i className="fas fa-plus" />
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-danger mt-3">Add</button>
                      </div>
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
                  onclick="openModal()"
                >
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

export default CurriculumSetup;
