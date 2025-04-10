import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const UploadExternal = () => {

  const closeModal = () => {
    const modalElement = document.getElementById("upload");
    if (modalElement) {
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  };

  return (
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
              aria-label="Close"
              onClick={closeModal}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body text-center">
            <div className="upload-box">
              <label style={{ cursor: "pointer" }}>
                <input type="file" style={{ display: "none" }} />
                <img src="assets/upload.png" alt="Upload Icon" />
                <p>Drag & Drop or Choose file to upload</p>
                <span>CSV, Doc, PDF</span>
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
                data-bs-dismiss="modal"
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
  );
};

export default UploadExternal;
