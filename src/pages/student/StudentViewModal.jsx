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
            <div clasName="d-flex mb-2 justify-center" style={{margin:"auto"}}>
              <div className="m-auto justify-center" >
                  <img src={student?.profile_image} style={{ width:"10em" ,height:"10em", borderRadius:"50%"}}/>
                 
              </div>
              
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