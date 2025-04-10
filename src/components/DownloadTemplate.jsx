import React, { useEffect } from "react";
import * as bootstrap from "bootstrap";

const DownloadTemplate = () => {
  
  useEffect(() => {
    const modalElement = document.getElementById("download");
    if (modalElement) {
      new bootstrap.Modal(modalElement);
    }
  }, []);

  const closeModal = () => {
    const modalElement = document.getElementById("download");
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  };

  return (
    <div
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
              onClick={closeModal}
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
                onClick={closeModal}
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
    </div>
  );
};

export default DownloadTemplate;
