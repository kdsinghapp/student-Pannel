import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SubOverview = () => {
  const handleDownload = () => {
    const element = document.getElementById("download-content");
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("subject-overview.pdf");
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id={1} className="">
      <div className="filter-bar report mt-2">
        <div className="filter-group form-group">
          <button className="btn btn-light">
            <i className="fas fa-filter" />
          </button>
          <span className="btn">Filter By</span>
          <select className="form-control">
            <option>Year</option>
          </select>
          <select className="form-control">
            <option>Term</option>
          </select>
          <select className="form-control">
            <option>Group By</option>
          </select>
          <select className="form-control">
            <option>Assessment</option>
          </select>
          <select
            className="form-control"
            style={{ borderRight: "none !important" }}
          >
            <option>Subject</option>
          </select>
        </div>
      </div>
      <div className="card-body mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <span
              style={{
                background: "#501B8D",
                borderRadius: 5,
                height: 50,
                width: 60,
              }}
            >
              &nbsp;&nbsp;
            </span>{" "}
            Attainment Overview for Subjects
          </h5>
          <div>
            <button className="btn btn-light" onClick={handleDownload}>
              <i className="fas fa-download" /> Download
            </button>
            <button className="btn btn-danger" onClick={handlePrint}>
              <i className="fas fa-print" /> Print
            </button>
          </div>
        </div>
        <div className="mt-3 d-flex">
          <div className="mr-3">
            {" "}
            <span
              className="badge badge-success p-3 pl-3 pr-3"
              style={{ borderRadius: "10px !important" }}
            >
              English
            </span>
          </div>
          <div>
            {" "}
            <span>English &gt; 2020-21 Spring &gt; Year 5 &gt; Formative</span>
            <br />
            <select style={{ border: "none" }}>
              <option>10XEN2</option>
            </select>
          </div>
        </div>
      </div>
      <div className="card-body" id="print-section download-content">
        <div className="mt-3">
          <div className="row">
            <div className="col-lg-2">
              <div>
                <table className="table  tablereport border">
                  <thead className="thead-light">
                    <tr>
                      <th>
                        &nbsp;&nbsp;
                        <br />
                        &nbsp;&nbsp;
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong style={{ fontWeight: 600, color: "#000" }}>
                          Reading
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ fontWeight: 600, color: "#000" }}>
                          Writing
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {" "}
                        <strong style={{ fontWeight: 600, color: "#000" }}>
                          Mathematics
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="table-responsive">
                <table className="table  tablereport border">
                  <thead className="thead-light">
                    <tr>
                      <th className="bg-danger text-white">
                        Significantly <br />
                        Below
                      </th>
                      <th className="bg-warning text-white">Below</th>
                      <th className="bg-orange text-white">Just At</th>
                      <th className="bg-lightgreen text-white">Securely At</th>
                      <th className="bg-success text-white">Above</th>
                      <th className="bg-lightpurple text-white">
                        Significantly <br />
                        Above
                      </th>
                      <th
                        className="bg-graylight text-dark"
                        style={{ berderRadius: "0px 10px 0px 0px" }}
                      >
                        No Assessment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        4% <span className="bg-danger text-white">1</span>
                      </td>
                      <td>
                        12% <span className="bg-warning text-white">3</span>
                      </td>
                      <td>
                        20% <span className="bg-orange text-white">5</span>
                      </td>
                      <td>
                        48% <span className="bg-lightgreen text-white">12</span>
                      </td>
                      <td>
                        12% <span className="bg-success text-white">3</span>
                      </td>
                      <td>
                        0.00%{" "}
                        <span className="bg-lightpurple text-white">3</span>
                      </td>
                      <td>
                        0.00 <span className="bg-graylight text-white">0</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        4% <span className="bg-danger text-white">1</span>
                      </td>
                      <td>
                        8% <span className="bg-warning text-white">2</span>
                      </td>
                      <td>
                        20% <span className="bg-orange text-white">5</span>
                      </td>
                      <td>
                        56% <span className="bg-lightgreen text-white">14</span>
                      </td>
                      <td>
                        12% <span className="bg-success text-white">3</span>
                      </td>
                      <td>
                        0% <span className="bg-lightpurple text-white">3</span>
                      </td>
                      <td>
                        0% <span className="bg-graylight text-white">0</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        4% <span className="bg-danger text-white">1</span>
                      </td>
                      <td>
                        20.8% <span className="bg-warning text-white">5</span>
                      </td>
                      <td>
                        8.3% <span className="bg-orange text-white">2</span>
                      </td>
                      <td>
                        54.2%{" "}
                        <span className="bg-lightgreen text-white">13</span>
                      </td>
                      <td>
                        12.5% <span className="bg-success text-white">3</span>
                      </td>
                      <td>
                        0% <span className="bg-lightpurple text-white">3</span>
                      </td>
                      <td>
                        4% <span className="bg-graylight text-white">1</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="legend-bar">
            <div className="legend-item">
              <span
                className="legend-circle"
                style={{ backgroundColor: "#B0B0B0" }}
              />{" "}
              No Assessment
            </div>
            <div className="legend-item">
              <span
                className="legend-circle"
                style={{ backgroundColor: "#E74C3C" }}
              />{" "}
              Significantly Below
            </div>
            <div className="legend-item">
              <span
                className="legend-circle"
                style={{ backgroundColor: "#F1C40F" }}
              />{" "}
              Below
            </div>
            <div className="legend-item">
              <span
                className="legend-circle"
                style={{ backgroundColor: "#E67E22" }}
              />{" "}
              Just Below
            </div>
            <div className="legend-item">
              <span
                className="legend-circle"
                style={{ backgroundColor: "#2ECC71" }}
              />{" "}
              Securely at
            </div>
            <div className="legend-item">
              <span
                className="legend-circle"
                style={{ backgroundColor: "#16A085" }}
              />{" "}
              Above
            </div>
            <div className="legend-item">
              <span
                className="legend-circle"
                style={{ backgroundColor: "#8E44AD" }}
              />{" "}
              Significantly Above
            </div>
          </div>
        </div>
        <div className="mb-5">
          <h5 className="mt-4">
            <span
              style={{
                background: "#501B8D",
                borderRadius: 5,
                height: 50,
                width: 60,
              }}
            >
              &nbsp;&nbsp;
            </span>{" "}
            Attainment Overview for Subjects
          </h5>
          <div>
            <strong>Reading</strong>
            <div className="progress">
              <div className="progress-bar bg-warning" style={{ width: "12%" }}>
                12%
              </div>
              <div className="progress-bar bg-danger" style={{ width: "4%" }}>
                4%
              </div>
              <div className="progress-bar bg-success" style={{ width: "10%" }}>
                10%
              </div>
              <div
                className="progress-bar bg-lightpurple"
                style={{ width: "74%" }}
              >
                74%
              </div>
            </div>
          </div>
          <div className="mt-3">
            <strong>Writing</strong>
            <div className="progress">
              <div className="progress-bar bg-danger" style={{ width: "4%" }}>
                4%
              </div>
              <div className="progress-bar bg-warning" style={{ width: "2%" }}>
                2%
              </div>
              <div className="progress-bar bg-orange" style={{ width: "15%" }}>
                15%
              </div>
              <div className="progress-bar bg-success" style={{ width: "18%" }}>
                18%
              </div>
              <div
                className="progress-bar bg-lightpurple"
                style={{ width: "61%" }}
              >
                61%
              </div>
            </div>
          </div>
          <div className="mt-3">
            <strong>Mathematics</strong>
            <div className="progress">
              <div
                className="progress-bar bg-graylight"
                style={{ width: "4%" }}
              >
                0%
              </div>
              <div className="progress-bar bg-danger" style={{ width: "8%" }}>
                4%
              </div>
              <div className="progress-bar bg-warning" style={{ width: "12%" }}>
                12%
              </div>
              <div className="progress-bar bg-orange" style={{ width: "20%" }}>
                20%
              </div>
              <div
                className="progress-bar bg-lightgreen"
                style={{ width: "48%" }}
              >
                48%
              </div>
              <div className="progress-bar bg-warning" style={{ width: "16%" }}>
                16%
              </div>
              <div
                className="progress-bar bg-lightpurple"
                style={{ width: "4%" }}
              >
                00.0%
              </div>
            </div>
          </div>
          <div className="mt-3">
            <strong>Reading</strong>
            <div className="progress">
              <div className="progress-bar bg-warning" style={{ width: "12%" }}>
                12%
              </div>
              <div className="progress-bar bg-danger" style={{ width: "4%" }}>
                4%
              </div>
              <div className="progress-bar bg-success" style={{ width: "10%" }}>
                10%
              </div>
              <div
                className="progress-bar bg-lightpurple"
                style={{ width: "74%" }}
              >
                74%
              </div>
            </div>
          </div>
          <div className="mt-3">
            <strong>Mathematics</strong>
            <div className="progress">
              <div
                className="progress-bar bg-graylight"
                style={{ width: "4%" }}
              >
                0%
              </div>
              <div className="progress-bar bg-danger" style={{ width: "8%" }}>
                4%
              </div>
              <div className="progress-bar bg-warning" style={{ width: "12%" }}>
                12%
              </div>
              <div className="progress-bar bg-orange" style={{ width: "20%" }}>
                20%
              </div>
              <div
                className="progress-bar bg-lightgreen"
                style={{ width: "48%" }}
              >
                48%
              </div>
              <div className="progress-bar bg-warning" style={{ width: "16%" }}>
                16%
              </div>
              <div
                className="progress-bar bg-lightpurple"
                style={{ width: "4%" }}
              >
                00.0%
              </div>
            </div>
          </div>
          <div className="mt-3 d-flex justify-content-between">
            <span>0%</span>
            <span>20%</span>
            <span>40%</span>
            <span>60%</span>
            <span>100%</span>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-12 mb-3">
            <h5>
              <span
                style={{
                  background: "#501B8D",
                  borderRadius: 5,
                  height: 50,
                  width: 60,
                }}
              >
                &nbsp;&nbsp;
              </span>{" "}
              Combined Attainment for Subjects
            </h5>
          </div>
          <div className="col-lg-4">
            <div className="card border p-2">
              <h6 className="text-center">At/Above Expected</h6>
              <canvas id="chart1" />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border p-2">
              <h6 className="text-center">Above Expected</h6>
              <canvas id="chart2" />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border p-2">
              <h6 className="text-center">Below</h6>
              <canvas id="chart3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubOverview;
