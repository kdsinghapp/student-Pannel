import React from 'react';

function TeacherViewModal({ teacher }) {
  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="viewModalLabel" style={{ fontSize: "25px" }}>
            View Teacher Details
          </h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="d-flex mb-2 justify-center" style={{ margin: "auto" }}>
          <div className="m-auto justify-center">
            {teacher?.photo_url && (
              <img src={teacher.photo_url} style={{ width: "10em", height: "10em", borderRadius: "50%" }} alt="Teacher" />
            )}
          </div>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: "14px" }}>Name: {teacher?.forename} {teacher?.surname}</p>
          <p style={{ fontSize: "14px" }}>Email: {teacher?.email}</p>
          <p style={{ fontSize: "14px" }}>Department: {teacher?.department}</p>
          <p style={{ fontSize: "14px" }}>Subject: {teacher?.subject}</p>
          <p style={{ fontSize: "14px" }}>Year Group: {teacher?.year_group}</p>
          <p style={{ fontSize: "14px" }}>Class: {teacher?.class}</p>
          <p style={{ fontSize: "14px" }}>Role: {teacher?.role}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{ fontSize: "12px" }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherViewModal; 