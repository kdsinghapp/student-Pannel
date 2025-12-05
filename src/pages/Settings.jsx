import React, { useState } from "react";
import Headers from "../components/Headers";
import Sidebar from "../components/Sidebar";
import SchoolDetailsTab from "./SchoolDetailsTab";
import PermissionTab from "./PermissionTab";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("schoolDetails");

  return (
    <div id="wrapper" className="wrapper bg-ash">
      <Headers />
      <div className="dashboard-page-one">
        <Sidebar />
        <div className="dashboard-content-one">
          <div className="breadcrumbs-area d-flex justify-content-between">
            <h3>Settings</h3>
          </div>

          <div className="card height-auto">
            <div className="tab d-flex">
              <button
                className={`tablinks ${activeTab === "schoolDetails" ? "active" : ""}`}
                onClick={() => setActiveTab("schoolDetails")}
              >
                School Details
              </button>
              <button
                className={`tablinks ${activeTab === "permission" ? "active" : ""}`}
                onClick={() => setActiveTab("permission")}
              >
                Permission
              </button>
            </div>

            {activeTab === "schoolDetails" ? <SchoolDetailsTab /> : <PermissionTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
