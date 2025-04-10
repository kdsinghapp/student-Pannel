import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Headers from "../components/Headers";
import studentsTotal from "../assets/img/d1.png";
import reportsTotal from "../assets/img/d2.png";
import subjectsTotal from "../assets/img/d3.png";
import statsTotal from "../assets/img/d4.png";
import studentId from "../assets/assets/icon/fi_list.png";
import studentPh from "../assets/assets/icon/ph_student.png";
import studentCat from "../assets/assets/icon/category.png";
import studentClass from "../assets/assets/icon/class.png";
import studentProg from "../assets/assets/icon/tabler_progress.png";
import studentStat from "../assets/assets/icon/lets-icons_status.png";
import studentEdit from "../assets/assets/icon/tabler_edit.png";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("userTokenStudent");
    const userData = localStorage.getItem("userStudentData");

    if (!token || !userData) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["ELA", "SEN", "G&T"],
        datasets: [
          {
            data: [61, 23, 16],
            backgroundColor: ["#316FF6", "#4A90E2", "#A1C4FD"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      chartInstance.current.destroy();
    };
  }, []);

  // State for each counter
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalReports, setTotalReports] = useState(0);
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [totalStats, setTotalStats] = useState(0);

  // Target numbers
  const targetStudents = 0;
  const targetReports = 1;
  const targetSubjects = 2;
  const targetStats = 3;

  // Animation duration in milliseconds
  const animationDuration = 2000; // 2 seconds
  const intervalDuration = 20; // Update every 20ms

  useEffect(() => {
    // Function to animate the counter
    const animateCounter = (setter, target) => {
      let start = 0;
      const increment = target / (animationDuration / intervalDuration);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.ceil(start));
        }
      }, intervalDuration);

      return timer;
    };

    // Start animations
    const timer1 = animateCounter(setTotalStudents, targetStudents);
    const timer2 = animateCounter(setTotalReports, targetReports);
    const timer3 = animateCounter(setTotalSubjects, targetSubjects);
    const timer4 = animateCounter(setTotalStats, targetStats);

    // Cleanup intervals on unmount
    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
      clearInterval(timer3);
      clearInterval(timer4);
    };
  }, [targetStudents, targetReports, targetSubjects, targetStats]);

  return (
    <div id="wrapper" className="wrapper bg-ash">
      <Headers />
      <div className="dashboard-page-one">
        <Sidebar />
        <div className="dashboard-content-one">
          <div className="breadcrumbs-area">
            <h3>Dashboard</h3>
          </div>
          <div className="row gutters-20">
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="dashboard-summery-one mg-b-20">
                <div className="row align-items-center">
                  <div className="col-8">
                    <div className="item-content">
                      <div className="item-title">Total Students</div>
                      <div className="item-number">
                        <span className="counter">
                          {totalStudents.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <img src={studentsTotal} alt="Total Students" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="dashboard-summery-one mg-b-20">
                <div className="row align-items-center">
                  <div className="col-8">
                    <div className="item-content">
                      <div className="item-title">Total Reports</div>
                      <div className="item-number">
                        <span className="counter">
                          {totalReports.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <img src={reportsTotal} alt="Total Reports" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="dashboard-summery-one mg-b-20">
                <div className="row align-items-center">
                  <div className="col-8">
                    <div className="item-content">
                      <div className="item-title">Total Subjects</div>
                      <div className="item-number">
                        <span className="counter">
                          {totalSubjects.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <img src={subjectsTotal} alt="Total Subjects" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="dashboard-summery-one mg-b-20">
                <div className="row align-items-center">
                  <div className="col-8">
                    <div className="item-content">
                      <div className="item-title">Total Stats</div>
                      <div className="item-number">
                        <span className="counter">
                          {totalStats.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <img src={statsTotal} alt="Total Stats" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Dashboard summery End Here */}
          {/* Dashboard Content Start Here */}
          <div className="row gutters-20">
            <div className="col-12 col-xl-7">
              <div className="card dashboard-card-one pd-b-20">
                <div className="card-body" style={{ borderRadius: 15 }}>
                  <div className="chart-container flex-wrap">
                    <div className="bar-chart mb-3">
                      <div className="bar-container">
                        <div className="bar" style={{ height: 150 }}>
                          <span>68%</span>
                        </div>
                        <div className="group-label">Group 1</div>
                      </div>
                      <div className="bar-container">
                        <div className="bar" style={{ height: 125 }}>
                          <span>44%</span>
                        </div>
                        <div className="group-label">Group 2</div>
                      </div>
                      <div className="bar-container">
                        <div className="bar" style={{ height: 230 }}>
                          <span>95%</span>
                        </div>
                        <div className="group-label">Group 3</div>
                      </div>
                      <div className="bar-container">
                        <div className="bar" style={{ height: 135 }}>
                          <span>57%</span>
                        </div>
                        <div className="group-label">Group 4</div>
                      </div>
                      <div className="bar-container">
                        <div className="bar" style={{ height: 115 }}>
                          <span>40%</span>
                        </div>
                        <div className="group-label">Group 5</div>
                      </div>
                    </div>
                    <div className="stats">
                      <h4 className="mb-2">Progress statistics</h4>
                      <div className="mb-3">
                        <button className="group-btn">Group 1</button> Number of
                        students: 15
                      </div>
                      <div className="mb-3">
                        <button className="group-btn">Group 2</button> Number of
                        students: 11
                      </div>
                      <div className="mb-3">
                        <button className="group-btn">Group 3</button> Number of
                        students: 10
                      </div>
                      <div className="mb-3">
                        <button className="group-btn">Group 4</button> Number of
                        students: 14
                      </div>
                      <div className="mb-3">
                        <button className="group-btn">Group 5</button> Number of
                        students: 17
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-5">
              <div className="card dashboard-card-two pd-b-20">
                <div className="card-body" style={{ borderRadius: 15 }}>
                  <h4 className="mb-2" style={{ textAlign: "center" }}>
                    Categories
                  </h4>
                  <div className="chart-container p-4 align-items-center">
                    <div className="chart">
                      <canvas ref={chartRef} />
                    </div>
                    <div className="legend">
                      <div className="legend-item">
                        <span
                          className="legend-color"
                          style={{ backgroundColor: "#316FF6" }}
                        />
                        <span>ELA</span> <span className="ml-auto">61%</span>
                      </div>
                      <div className="legend-item">
                        <span
                          className="legend-color"
                          style={{ backgroundColor: "#4A90E2" }}
                        />
                        <span>SEN</span> <span className="ml-auto">23%</span>
                      </div>
                      <div className="legend-item">
                        <span
                          className="legend-color"
                          style={{ backgroundColor: "#A1C4FD" }}
                        />
                        <span>G&amp;T</span>{" "}
                        <span className="ml-auto">16%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-12">
              <div className="card dashboard-card-three pd-b-20">
                <div className="card-body">
                  <div className="heading-layout1">
                    <div className="item-title">
                      <h3>Recent Students</h3>
                    </div>
                    <div className="dropdown">
                      <select className="form-control w-auto">
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                      </select>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table display data-table text-nowrap">
                      <thead>
                        <tr>
                          <th>
                            <img src={studentId} /> Student Id{" "}
                          </th>
                          <th>
                            <img src={studentPh} /> Student Name{" "}
                          </th>
                          <th>
                            <img src={studentCat} /> Category{" "}
                          </th>
                          <th>
                            <img src={studentClass} /> Class{" "}
                          </th>
                          <th>
                            <img src={studentProg} /> Progress{" "}
                          </th>
                          <th>
                            <img src={studentStat} /> Nationality{" "}
                          </th>
                          <th>
                            <img src={studentEdit} /> Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1010</td>
                          <td>George Martin</td>
                          <td>ESL</td>
                          <td>Class 10A</td>
                          <td className="progress-indicator">
                            57%{" "}
                            <span className="progress-circle progress-orange" />
                          </td>
                          <td>Indian</td>
                          <td className="action-icons">
                            <a href="#">
                              <i className="fas fa-edit" />
                            </a>
                            <a href="#">
                              <i className="fas fa-eye" />
                            </a>
                            <a href="#">
                              <i className="fas fa-trash" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>1010</td>
                          <td>George Martin</td>
                          <td>ESL</td>
                          <td>Class 10A</td>
                          <td className="progress-indicator">
                            81%{" "}
                            <span className="progress-circle progress-green" />
                          </td>
                          <td>Indian</td>
                          <td className="action-icons">
                            <a href="#">
                              <i className="fas fa-edit" />
                            </a>
                            <a href="#">
                              <i className="fas fa-eye" />
                            </a>
                            <a href="#">
                              <i className="fas fa-trash" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>1010</td>
                          <td>George Martin</td>
                          <td>ESL</td>
                          <td>Class 10A</td>
                          <td className="progress-indicator">
                            10%{" "}
                            <span className="progress-circle progress-red" />
                          </td>
                          <td>Indian</td>
                          <td className="action-icons">
                            <a href="#">
                              <i className="fas fa-edit" />
                            </a>
                            <a href="#">
                              <i className="fas fa-eye" />
                            </a>
                            <a href="#">
                              <i className="fas fa-trash" />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>1010</td>
                          <td>George Martin</td>
                          <td>ESL</td>
                          <td>Class 10A</td>
                          <td className="progress-indicator">
                            10%{" "}
                            <span className="progress-circle progress-red" />
                          </td>
                          <td>Indian</td>
                          <td className="action-icons">
                            <a href="#">
                              <i className="fas fa-edit" />
                            </a>
                            <a href="#">
                              <i className="fas fa-eye" />
                            </a>
                            <a href="#">
                              <i className="fas fa-trash" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
