import React from "react";

const PermissionTab = () => {
  return (
    <div id="permission" className="tabcontent">
      <div className="">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th />
                <th>Full Name</th>
                <th>Status</th>
                <th>Read</th>
                <th>Write</th>
                <th>All</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Example rows */}
              <tr>
                <td>
                  <input type="checkbox" className="custom-checkbox" />
                </td>
                <td>
                  <i className="flaticon-user" /> Kristin Watson
                </td>
                <td>
                  <span className="status-badge teacher">Teacher</span>
                </td>
                <td>
                  <input type="checkbox" className="custom-checkbox" /> No
                </td>
                <td>
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    defaultChecked
                  />{" "}
                  Yes
                </td>
                <td>
                  <input type="checkbox" className="custom-checkbox" /> No
                </td>
                <td>
                  <i className="fas fa-edit action-icons text-primary" />
                  <i className="fas fa-trash action-icons text-danger" />
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
        <div className="text-right col-lg-12">
          <button className="btn btn-outline-secondary mr-2 br20">
            Cancel <i className="fa fa-times" />
          </button>
          <button className="btn btn-primary br20">
            Save <i className="fa fa-check" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionTab;
