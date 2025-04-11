import React from 'react'

function StudentViewModal({student}) {
  return (<>
   <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="viewModalLabel"
                style={{ fontSize: "25px" }}
              >
                View Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: "14px" }}>Item ID: {student?.id}</p>
              <p style={{ fontSize: "14px" }}>Name: {student?.first_name} {student?.last_name}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{ fontSize: "12px" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
  </>)
}

export default StudentViewModal