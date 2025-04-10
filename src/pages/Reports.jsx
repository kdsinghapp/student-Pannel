import React, { useEffect, useState } from "react";
import Headers from "../components/Headers";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import NewReport from "../components/ReportsData/NewReport";
import ProgressReview from "../components/ReportsData/ProgressReview";
import Overall from "../components/ReportsData/Overall";
import GroupOverview from "../components/ReportsData/GroupOverview";
import SubOverview from "../components/ReportsData/SubOverview";
import Sidebar from "../components/Sidebar";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    console.log("Active Tab Changed:", activeTab);
  }, [activeTab]);
  
  return (
    <div id="wrapper" className="wrapper bg-ash">
      <Headers />
      <div className="dashboard-page-one">
        <Sidebar />
        <div className="dashboard-content-one">
          <div className="breadcrumbs-area d-flex justify-content-between">
            <h3>Reports</h3>
            <div></div>
          </div>
          <div className="card height-auto reports">
            <div className="d-flex justify-content-between flex-wrap pl-4 pr-5">
              <div className="tab mb-2">
                <button
                  className={`tablinks ${activeTab === "1" ? "active" : ""}`}
                  onClick={() => setActiveTab("1")}
                >
                  Subject Overview
                </button>
                <button
                  className={`tablinks ${activeTab === "2" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("2");
                    console.log(
                      "Clicked Group Overview, Active Tab:",
                      activeTab
                    );
                  }}
                >
                  Group Overview
                </button>
                <button
                  className={`tablinks ${activeTab === "3" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("3");
                    console.log("Clicked Overall, Active Tab:", activeTab);
                  }}
                >
                  Overall
                </button>
                <button
                  className={`tablinks ${activeTab === "4" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("4");
                    console.log(
                      "Clicked Progress Overview, Active Tab:",
                      activeTab
                    );
                  }}
                >
                  Progress Overview
                </button>
                <button
                  className={`tablinks ${activeTab === "5" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("5");
                    console.log("Clicked New Report, Active Tab:", activeTab);
                  }}
                >
                  New Report
                </button>
              </div>
              <div>
                <button
                  className="btn btn-purple"
                  style={{ padding: "7px 10px" }}
                >
                  <i className="fas fa-print" style={{ fontSize: 20 }} />
                </button>
              </div>
            </div>

            {activeTab === "1" ? <SubOverview key={activeTab} /> : null}
            {activeTab === "2" && <GroupOverview />}
            {activeTab === "3" && <Overall />}
            {activeTab === "4" && <ProgressReview />}
            {activeTab === "5" && <NewReport />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
