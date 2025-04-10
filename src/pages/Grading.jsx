import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import * as bootstrap from "bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import Headers from "../components/Headers";
import Sidebar from "../components/Sidebar";
import DownloadTemplate from "../components/DownloadTemplate";

const Grading = () => {
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
              <h3>Grading Setup</h3>
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
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Grade Category *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Input Grading"
                        />
                        <div className="tag mt-2">
                          Attitude to Learning <i className="fas fa-times" />
                        </div>
                      </div>
                      <div className="mb-3 d-flex">
                        <div className="mr-1">
                          <label className="form-label">Grade Value *</label>
                          <input
                            type="text"
                            className="form-control mr-2"
                            placeholder="Value"
                          />
                        </div>
                        <div>
                          <label className="form-label">Main(%)</label>
                          <div className="d-flex">
                            <input
                              type="number"
                              className="form-control mr-2"
                              placeholder="Min (%)"
                            />
                            <input
                              type="number"
                              className="form-control mr-2"
                              placeholder="Max (%)"
                            />
                          </div>
                        </div>
                        <div className="position-relative">
                          <label className="form-label">Color</label>
                          <div
                            className="color-picker-container"
                            onclick="document.getElementById('colorInput').click();"
                            id="colorBox"
                          >
                            <img
                              src="img/mdi_color.png"
                              alt="Color Palette"
                              id="colorIcon"
                            />
                          </div>
                          <input
                            type="color"
                            id="colorInput"
                            className="color-picker"
                            onchange="changeColor(this)"
                          />
                          <input
                            type="hidden"
                            id="colorCode"
                            className="color-code form-control mt-2 text-center"
                            placeholder="#FFFFFF"
                            defaultValue=""
                            readOnly=""
                          />
                          {/*<input type="text" id="colorCode" class="color-code form-control mt-2 text-center" placeholder="#FFFFFF" value="" readonly>*/}
                          {/*<img src="img/mdi_color.png" class="position-absolute"/>*/}
                        </div>
                      </div>
                      <div className="mb-3">
                        <span className="tag text-success bg-succ">
                          Good - 50% <i className="fas fa-times" />
                        </span>
                        <span className="tag text-danger bg-dang">
                          Poor - 10% <i className="fas fa-times" />
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input
                          type="text"
                          className="form-control mt-3"
                          placeholder="e.g., Excellent, Needs Improvement"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Weightage (Optional)
                        </label>
                        <input
                          type="text"
                          className="form-control mt-2"
                          placeholder="Value"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-primary w-100 mt-3 mb-3 p-3 br10"
                        >
                          Add Grade Value
                        </button>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Optional1</label>
                        <input
                          type="text"
                          className="form-control mt-3"
                          placeholder="Optional1"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Optional2</label>
                        <input
                          type="text"
                          className="form-control mt-3"
                          placeholder="Optional2"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Progress Category *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., 'Above Expected'"
                      />
                      <div className="tag mt-2">
                        Attitude to Learning <i className="fas fa-times" />
                      </div>
                      <div className="mt-3 d-flex">
                        <div className="mr-2">
                          <label className="form-label">
                            Minimum Progress (%)
                          </label>
                          <input
                            type="number"
                            className="form-control mr-2"
                            placeholder="Min Progress (%)"
                          />
                        </div>
                        <div className="mr-2">
                          <label className="form-label">
                            Maximum Progress (%)
                          </label>
                          <input
                            type="number"
                            className="form-control mr-2"
                            placeholder="Max Progress (%)"
                          />
                        </div>
                        <div>
                          <label className="form-label">Color</label>
                          {/*<input type="color" class="" style="height:45px">*/}
                          <div
                            className="color-picker-container"
                            onclick="document.getElementById('colorInput1').click();"
                            id="colorBox1"
                          >
                            <img
                              src="img/mdi_color.png"
                              alt="Color Palette"
                              id="colorIcon1"
                            />
                          </div>
                          <input
                            type="color"
                            id="colorInput1"
                            className="color-picker"
                            onchange="changeColor1(this)"
                          />
                          <input
                            type="hidden"
                            id="colorCode1"
                            className="color-code form-control mt-2 text-center"
                            placeholder="#FFFFFF"
                            defaultValue=""
                            readOnly=""
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="tag text-success bg-succ">
                          Good - 50% <i className="fas fa-times" />
                        </span>
                        <span className="tag text-danger bg-dang">
                          Poor - 10% <i className="fas fa-times" />
                        </span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-primary w-100 mt-3 mb-3 p-3 br10"
                      >
                        Add Grade Value
                      </button>
                      <div className="mt-2">
                        <label className="form-label">Description</label>
                        <input
                          type="text"
                          className="form-control mt-3"
                          placeholder="Description"
                        />
                      </div>
                      <div className="mt-2">
                        <label className="form-label">Grade Description</label>
                        <input
                          type="text"
                          className="form-control mt-2"
                          placeholder="Grade Description"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-5 text-center">
                    <button
                      type="submit"
                      className="btn-fill-lg btn-gradient-blue1 btn-hover-bluedark"
                    >
                      Save Grading Scheme
                    </button>
                  </div>
                </form>
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

export default Grading;
