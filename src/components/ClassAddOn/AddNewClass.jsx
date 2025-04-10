import React from "react";

const AddNewClass = () => {
  return (
    <div
      className="modal fade"
      id="addclass"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <img src="assets/icon/circle-round.png" /> Add New Class
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Year Group</label>
              <select className="form-control">
                <option>FSI</option>
              </select>
            </div>
            <div className="form-group" id="class-fields">
              <label>Class Name</label>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control mr-3"
                  defaultValue="FSI"
                />
                <div className="input-group-append">
                  <button
                    className="btn  add-class text-dark ml-2"
                    type="button"
                    onclick="addClass()"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewClass;
