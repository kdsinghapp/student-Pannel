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
            {teacher?.profile_image && (
              <img src={teacher.profile_image} style={{ width: "10em", height: "10em", borderRadius: "50%" }} alt="Teacher" />
            )}
          </div>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-12 mb-2">
              <strong>Name:</strong> {teacher?.first_name} {teacher?.last_name}
            </div>
            <div className="col-12 mb-2">
              <strong>Email:</strong> {teacher?.email}
            </div>
            <div className="col-12 mb-2">
              <strong>Status:</strong> {teacher?.status}
            </div>
            <div className="col-12 mb-2">
              <strong>Department:</strong> {teacher?.department?.name}
            </div>
            <div className="col-12 mb-2">
              <strong>Role:</strong> {teacher?.teachersrole?.name || teacher?.role?.name}
            </div>
            <div className="col-12 mb-2">
              <strong>Assigned Classes:</strong> {teacher?.assigned_classes?.filter(cls => cls.name).map(cls => cls.name).join(", ") || "-"}
            </div>
            <div className="col-12 mb-2">
              <strong>Assigned Subjects:</strong> {teacher?.assigned_subjects?.map(sub => sub.name).join(", ") || "-"}
            </div>
          </div>
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