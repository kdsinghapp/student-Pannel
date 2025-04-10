import React from "react";

const ProgressReview = () => {
  return (
    <div id={4} className="">
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
            Reading Progress Matrix for 28 Pupils in Year 3, in class 3A
          </h5>
          <div>
            <button className="btn btn-light">
              <i className="fas fa-download" /> Download
            </button>
            <button className="btn btn-danger">
              <i className="fas fa-print" /> Print
            </button>
          </div>
        </div>
        <div className="col-lg-12 mt-5 mb-5">
          <div className="row">
            <div className="col-lg-4 text-center p-0">
              <div className="light-gray">
                Report Date: <b>30-Jan-2023</b>
              </div>
            </div>
            <div className="col-lg-4 text-center p-0">
              <div className="bg-white light-gray">
                Class: <b>3A</b>
              </div>
            </div>
            <div className="col-lg-4 text-center p-0">
              <div className="light-gray">
                Year Group: <b>3</b>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h5 className="mb-4" style={{ fontWeight: 600 }}>
            Matrix{" "}
          </h5>
          <div className="table-responsive">
            <table className="table tablereport border text-center mt-3">
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#FAFAFA" }} />
                  <th className="bg-graylight text-dark">No Assessment</th>
                  <th className="bg-danger text-white">Significantly</th>
                  <th className="bg-warning text-white">Below</th>
                  <th className="bg-orange text-white">Just At</th>
                  <th className="bg-lightgreen text-white">Securely At</th>
                  <th className="bg-success text-white">Above</th>
                  <th className="bg-lightpurple text-white">
                    Significantly Above
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="bg-graylight text-dark">No Assessment</th>
                  <td>2</td>
                  <td>2</td>
                  <td>2</td>
                  <td>2</td>
                  <td>2</td>
                  <td>7</td>
                  <td>2</td>
                </tr>
                <tr>
                  <th className="bg-danger text-white">Significantly</th>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr>
                  <th className="bg-warning text-white">Below</th>
                  <td>2</td>
                  <td>2</td>
                  <td>2</td>
                  <td>2</td>
                  <td className="bg-success text-white">7</td>
                  <td>2</td>
                  <td>2</td>
                </tr>
                <tr>
                  <th className="bg-orange text-white">Just At</th>
                  <td>2</td>
                  <td>2</td>
                  <td>2</td>
                  <td>2</td>
                  <td>7</td>
                  <td>2</td>
                  <td>2</td>
                </tr>
                <tr>
                  <th className="bg-lightgreen text-white">Securely At</th>
                  <td>2</td>
                  <td>2</td>
                  <td>2</td>
                  <td>2</td>
                  <td>7</td>
                  <td>2</td>
                  <td>2</td>
                </tr>
                <tr>
                  <th className="bg-success text-white">Above</th>
                  <td>2</td>
                  <td>2</td>
                  <td>2</td>
                  <td>2</td>
                  <td>7</td>
                  <td>2</td>
                  <td>2</td>
                </tr>
                <tr>
                  <th className="bg-lightpurple text-white">
                    Significantly Above
                  </th>
                  <td>2</td>
                  <td>2</td>
                  <td>2</td>
                  <td>2</td>
                  <td>7</td>
                  <td>2</td>
                  <td>2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-5">
          <h5 className="mb-4" style={{ fontWeight: 600 }}>
            Legends{" "}
          </h5>
          <div className="row mt-3">
            <div className="col-lg-2 col-4">
              <div className="axis">X-AXIS</div>
            </div>
            <div className="col-lg-10 col-8">
              <div className="table-responsive">
                <table className="table tablereport border text-center">
                  <thead>
                    <tr>
                      <th className="bg-graylight text-dark">No Assessment</th>
                      <th className="bg-danger text-white">Significantly</th>
                      <th className="bg-warning text-white">Below</th>
                      <th className="bg-orange text-white">Just At</th>
                      <th className="bg-lightgreen text-white">Securely At</th>
                      <th className="bg-success text-white">Above</th>
                      <th className="bg-lightpurple text-white">
                        Significantly Above
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
                      <td>7</td>
                      <td>2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2 col-4">
              <div className="axis">Y- AXIS</div>
            </div>
            <div className="col-lg-10 col-8">
              <div className="table-responsive">
                <table className="table tablereport border text-center">
                  <thead>
                    <tr>
                      <th className="bg-graylight text-dark">No Assessment</th>
                      <th className="bg-danger text-white">Significantly</th>
                      <th className="bg-warning text-white">Below</th>
                      <th className="bg-orange text-white">Just At</th>
                      <th className="bg-lightgreen text-white">Securely At</th>
                      <th className="bg-success text-white">Above</th>
                      <th className="bg-lightpurple text-white">
                        Significantly Above
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
                      <td>7</td>
                      <td>2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-12 mt-3">
              <table className="table tablereport border">
                <thead>
                  <tr>
                    <th
                      style={{
                        backgroundColor: "#E0E0E0",
                        width: "20%",
                      }}
                    >
                      Sr#
                    </th>
                    <th style={{ backgroundColor: "#E0E0E0" }}>Pupil Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ width: "20%" }}>1</td>
                    <td style={{ width: "80%" }}>Mayank Ram</td>
                  </tr>
                  <tr>
                    <td style={{ width: "20%" }}>2</td>
                    <td>Ravi Paul</td>
                  </tr>
                  <tr>
                    <td style={{ width: "20%" }}>3</td>
                    <td>Sachin Bajaj</td>
                  </tr>
                  <tr>
                    <td style={{ width: "20%" }}>4</td>
                    <td>Amit Khare</td>
                  </tr>
                  <tr>
                    <td style={{ width: "20%" }}>5</td>
                    <td>Aranb Sudele</td>
                  </tr>
                  <tr>
                    <td style={{ width: "20%" }}>6</td>
                    <td>Rajesh Parkar</td>
                  </tr>
                  <tr>
                    <td style={{ width: "20%" }}>7</td>
                    <td>Arjul Dev</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressReview;
