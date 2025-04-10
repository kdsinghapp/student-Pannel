import React from "react";

const Overall = () => {
  return (
    <div id={3} className="">
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
            Attainment Overall for Year Group
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
      <div className="card-body">
        <div className="mt-3">
          <div className="row">
            <div className="col-lg-3">
              <div className="table-responsive">
                <table className="table  tablereport border text-center">
                  <thead className="thead-light">
                    <tr>
                      <th colSpan={3} className="p-0">
                        {" "}
                        Reading
                      </th>
                    </tr>
                    <tr>
                      <th>All Pupil</th>
                      <th>Count</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong style={{ fontWeight: 600, color: "#000" }}>
                          Boys
                        </strong>
                      </td>
                      <td>59 Pipils</td>
                      <td>
                        <p className="text-success mb-0">Above</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ fontWeight: 600, color: "#000" }}>
                          Girls
                        </strong>
                      </td>
                      <td>59 Pipils</td>
                      <td>
                        <p className="text-yellow mb-0">Below</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ fontWeight: 600, color: "#000" }}>
                          SEN
                        </strong>
                      </td>
                      <td>59 Pipils</td>
                      <td>
                        <p className="text-warning mb-0">Just At</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ fontWeight: 600, color: "#000" }}>
                          EAL
                        </strong>
                      </td>
                      <td>59 Pipils</td>
                      <td>
                        <p className="text-yellow mb-0">Below</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ fontWeight: 600, color: "#000" }}>
                          G &amp; T
                        </strong>
                      </td>
                      <td>59 Pipils</td>
                      <td>
                        <p className="text-warning mb-0">Just At</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ fontWeight: 600, color: "#000" }}>
                          Emirati
                        </strong>
                      </td>
                      <td>59 Pipils</td>
                      <td>
                        <p className="text-yellow mb-0">Below</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ fontWeight: 600, color: "#000" }}>
                          Non Emirati
                        </strong>
                      </td>
                      <td>59 Pipils</td>
                      <td>
                        <p className="text-warning mb-0">Just At</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="table-responsive">
                <table className="table  tablereport border text-center">
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="row">
            <div className="col-lg-3">
              <div>
                <table className="table  tablereport border text-center">
                  <thead className="thead-light">
                    <tr>
                      <th colSpan={3} className="p-0">
                        {" "}
                        Reading
                      </th>
                    </tr>
                    <tr>
                      <th>All Pupil</th>
                      <th>Count</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong style={{ fontWeight: 600, color: "#000" }}>
                          Boys
                        </strong>
                      </td>
                      <td>59 Pipils</td>
                      <td>
                        <p className="text-success mb-0">Above</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ fontWeight: 600, color: "#000" }}>
                          Girls
                        </strong>
                      </td>
                      <td>59 Pipils</td>
                      <td>
                        <p className="text-yellow mb-0">Below</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ fontWeight: 600, color: "#000" }}>
                          SEN
                        </strong>
                      </td>
                      <td>59 Pipils</td>
                      <td>
                        <p className="text-warning mb-0">Just At</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ fontWeight: 600, color: "#000" }}>
                          EAL
                        </strong>
                      </td>
                      <td>59 Pipils</td>
                      <td>
                        <p className="text-yellow mb-0">Below</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ fontWeight: 600, color: "#000" }}>
                          G &amp; T
                        </strong>
                      </td>
                      <td>59 Pipils</td>
                      <td>
                        <p className="text-warning mb-0">Just At</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ fontWeight: 600, color: "#000" }}>
                          Emirati
                        </strong>
                      </td>
                      <td>59 Pipils</td>
                      <td>
                        <p className="text-yellow mb-0">Below</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong style={{ fontWeight: 600, color: "#000" }}>
                          Non Emirati
                        </strong>
                      </td>
                      <td>59 Pipils</td>
                      <td>
                        <p className="text-warning mb-0">Just At</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="table-responsive">
                <table className="table  tablereport border text-center">
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
                  </tbody>
                </table>
              </div>
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
    </div>
  );
};

export default Overall;
