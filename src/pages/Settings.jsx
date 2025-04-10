import React, { useEffect, useState } from "react";
import Headers from "../components/Headers";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import Sidebar from "../components/Sidebar";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("schoolDetails");

  useEffect(() => {
    console.log("Active tab is now:", activeTab);
  }, [activeTab]);

  return (
    <div id="wrapper" className="wrapper bg-ash">
      <Headers />
      {/* Page Area Start Here */}
      <div className="dashboard-page-one">
        {/* Sidebar Area Start Here */}
        <Sidebar />
        {/* Sidebar Area End Here */}
        <div className="dashboard-content-one">
          {/* Breadcubs Area Start Here */}
          <div className="breadcrumbs-area d-flex justify-content-between">
            <h3>Settings</h3>
            <div></div>
          </div>
          {/* Breadcubs Area End Here */}
          {/* Class Table Area Start Here */}
          <div className="card height-auto">
            <div className="tab d-flex">
              {/* <button
                className={`tablinks ${
                  activeTab === "schoolDetails" ? "active" : ""
                }`}
                onClick={() => {
                  console.log("Active tab is " + activeTab);
                  setActiveTab("schoolDetails");
                }}
              >
                School Details
              </button>
              <button
                className={`tablinks ${
                  activeTab === "permission" ? "active" : ""
                }`}
                onClick={() => {
                  console.log("Active tab is " + activeTab);
                  setActiveTab("permission");
                }}
              >
                Permission
              </button> */}
              <button
                className={`tablinks ${
                  activeTab === "schoolDetails" ? "active" : ""
                }`}
                onClick={() => setActiveTab("schoolDetails")}
              >
                School Details
              </button>
              <button
                className={`tablinks ${
                  activeTab === "permission" ? "active" : ""
                }`}
                onClick={() => setActiveTab("permission")}
              >
                Permission
              </button>
            </div>
            {activeTab === "schoolDetails" ? (
              <div id="schoolDetails" className="tabcontent">
                <div className="card-body position-relative">
                  <h4 className="mb-0">School Profile</h4>
                  <p>Please update your school profile settings here</p>
                  <hr />
                  {/* Profile Picture Section */}
                  <div className="mb-3 row mt-2">
                    <label className="col-lg-3">Profile Picture</label>
                    <div className="profile-container col-lg-7">
                      <img
                        src="img/figure/admin.jpg"
                        alt="Profile Picture"
                        className="profile-picture"
                      />
                      <button className="btn btn-primary">Edit</button>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-lg-3">School Name</label>
                    <div className="col-lg-7">
                      {" "}
                      <input
                        type="text"
                        className="form-control br20"
                        placeholder="School Name"
                      />
                    </div>
                    <div className="col-lg-12">
                      <hr />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-lg-3">Academic Year</label>
                    <div className="col-lg-7">
                      {" "}
                      <input
                        type="text"
                        className="form-control br20"
                        placeholder="FY2021"
                      />
                    </div>
                    <div className="col-lg-12">
                      <hr />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-lg-3">Curriculum</label>
                    <div className="col-lg-7">
                      {" "}
                      <input
                        type="text"
                        className="form-control br20"
                        placeholder="International B"
                      />
                    </div>
                    <div className="col-lg-12">
                      <hr />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-lg-3">School Term</label>
                    <div className="col-lg-2">
                      {" "}
                      <input
                        type="text"
                        className="form-control br20"
                        placeholder="Term 1"
                      />
                    </div>
                    <div className="col-lg-2">
                      {" "}
                      <input
                        type="text"
                        className="form-control br20"
                        placeholder="Term 2"
                      />
                    </div>
                    <div className="col-lg-2">
                      {" "}
                      <input
                        type="text"
                        className="form-control br20"
                        placeholder="Term 3"
                      />
                    </div>
                    <div className="col-lg-12">
                      <hr />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-lg-3">School Term Date</label>
                    <div className="col-lg-7">
                      {" "}
                      <input type="date" className="form-control br20" />
                    </div>
                    <div className="col-lg-12">
                      <hr />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-lg-3">School Division</label>
                    <div className="col-lg-3">
                      {" "}
                      <input
                        type="text"
                        className="form-control br20"
                        placeholder="School Division"
                      />
                    </div>
                    <div className="col-lg-3">
                      {" "}
                      <input
                        type="text"
                        className="form-control br20 ml-2"
                        placeholder="School Division"
                      />
                    </div>
                    <div className="col-lg-12">
                      <hr />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-lg-3">Year Group</label>
                    <div className="col-lg-7">
                      {" "}
                      <input
                        type="text"
                        className="form-control br20"
                        placeholder="elementary221b"
                      />
                    </div>
                    <div className="col-lg-12">
                      <hr />
                    </div>
                  </div>
                  <div className="text-right col-lg-10">
                    <button className="btn btn-outline-secondary mr-2 br20">
                      Cancel <i className="fa fa-times" />
                    </button>
                    <button className="btn btn-primary br20">
                      Save <i className="fa fa-check" />
                    </button>
                  </div>
                  <div
                    className="position-absolute"
                    style={{ top: 20, right: 20 }}
                  >
                    <i
                      className="tooltip-icon fas fa-info-circle"
                      data-toggle="tooltip"
                      data-placement="left"
                      title="Tooltip Title: Tooltip display informative text when users hover over, focus on, or tap an element."
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div id="permission" className="tabcontent">
                <div className="card-body">
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
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />
                          </td>
                          <td>
                            <i className="flaticon-user" /> Kristin Watson
                          </td>
                          <td>
                            <span className="status-badge teacher">
                              Teacher
                            </span>
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />{" "}
                            No
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                              defaultChecked=""
                            />{" "}
                            Yes
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />{" "}
                            No
                          </td>
                          <td>
                            <i className="fas fa-edit action-icons text-primary" />
                            <i className="fas fa-trash action-icons text-danger" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />
                          </td>
                          <td>
                            <i className="flaticon-user" /> Floyd Miles
                          </td>
                          <td>
                            <span className="status-badge admin">Admin</span>{" "}
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />{" "}
                            No
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                              defaultChecked=""
                            />{" "}
                            Yes
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />{" "}
                            No
                          </td>
                          <td>
                            <i className="fas fa-edit action-icons text-primary" />
                            <i className="fas fa-trash action-icons text-danger" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />
                          </td>
                          <td>
                            <i className="flaticon-user" /> John doe
                          </td>
                          <td>
                            <span className="status-badge hod">HOD</span>
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />{" "}
                            No
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                              defaultChecked=""
                            />{" "}
                            Yes
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />{" "}
                            No
                          </td>
                          <td>
                            <i className="fas fa-edit action-icons text-primary" />
                            <i className="fas fa-trash action-icons text-danger" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />
                          </td>
                          <td>
                            <i className="flaticon-user" /> Maxwell taneha
                          </td>
                          <td>
                            <span className="status-badge super-admin">
                              Super Admin
                            </span>
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />{" "}
                            No
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                              defaultChecked=""
                            />{" "}
                            Yes
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />{" "}
                            No
                          </td>
                          <td>
                            <i className="fas fa-edit action-icons text-primary" />
                            <i className="fas fa-trash action-icons text-danger" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />
                          </td>
                          <td>
                            <i className="flaticon-user" /> Gomes makhani
                          </td>
                          <td>
                            <span className="status-badge admin">Admin</span>
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />{" "}
                            No
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                              defaultChecked=""
                            />{" "}
                            Yes
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />{" "}
                            No
                          </td>
                          <td>
                            <i className="fas fa-edit action-icons text-primary" />
                            <i className="fas fa-trash action-icons text-danger" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />
                          </td>
                          <td>
                            <i className="flaticon-user" /> Robin bhasin
                          </td>
                          <td>
                            <span className="status-badge teacher">
                              Teacher
                            </span>
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />{" "}
                            No
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                              defaultChecked=""
                            />{" "}
                            Yes
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                            />{" "}
                            No
                          </td>
                          <td>
                            <i className="fas fa-edit action-icons text-primary" />
                            <i className="fas fa-trash action-icons text-danger" />
                          </td>
                        </tr>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
