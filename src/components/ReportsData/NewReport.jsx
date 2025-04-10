import React from "react";

const NewReport = () => {
  return (
    <div id={5} className="">
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
    <div className="card-body">
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
          Year 3 Reading 28 Pupils in Year 3, in Class 3A
        </h5>
      </div>
      <div className="table-responsive">
        <table className="table tablereport tablereport border mt-3">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Full Name</th>
              <th>Pupil EAL</th>
              <th>Pupil SEN</th>
              <th>2020/21 Spr Reading Rising Star</th>
              <th>2020/21 Spr Reading Age</th>
              <th>2020/21 Spr Reading Main Assessment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PKS122594</td>
              <td className="highlight-text">Marc Johansson</td>
              <td>Yes</td>
              <td>No</td>
              <td className="status-green">96</td>
              <td className="status-green">8y 9m [+1m]</td>
              <td className="status-green">Gtr. Depth</td>
            </tr>
            <tr>
              <td>PKS122594</td>
              <td className="highlight-text">Sandra Martin</td>
              <td>No</td>
              <td>No</td>
              <td className="status-green">140</td>
              <td className="status-orange">8y 9m [+6m]</td>
              <td className="status-green">On-Track</td>
            </tr>
            <tr>
              <td>PKS122594</td>
              <td className="highlight-text">Fatima Gboho</td>
              <td>No</td>
              <td>No</td>
              <td className="status-green">107</td>
              <td className="status-green">8y 9m [+3m]</td>
              <td className="status-green">Gtr. Depth</td>
            </tr>
            <tr>
              <td>PKS122594</td>
              <td className="highlight-text">Gavreal Adimbola</td>
              <td>No</td>
              <td>No</td>
              <td className="status-red">82</td>
              <td className="status-orange">8y 9m [-1m]</td>
              <td className="status-orange">Just Below</td>
            </tr>
            <tr>
              <td>PKS122594</td>
              <td className="highlight-text">Tawana Chizimu</td>
              <td>No</td>
              <td>No</td>
              <td className="status-red">96</td>
              <td className="status-green">8y 9m [+6m]</td>
              <td className="status-green">Gtr. Depth</td>
            </tr>
            <tr>
              <td>PKS122594</td>
              <td className="highlight-text">Helen Jackson</td>
              <td>No</td>
              <td>No</td>
              <td className="status-orange">90</td>
              <td className="status-orange">8y 9m [-1m]</td>
              <td className="status-green">On-Track</td>
            </tr>
            <tr>
              <td>PKS122594</td>
              <td className="highlight-text">Tanya Lai</td>
              <td>No</td>
              <td>No</td>
              <td className="status-orange">94</td>
              <td className="status-orange">8y 9m [+1m]</td>
              <td className="status-orange">Just Below</td>
            </tr>
            <tr>
              <td>PKS122594</td>
              <td className="highlight-text">Lucia Martinez</td>
              <td>No</td>
              <td>No</td>
              <td className="status-red">75</td>
              <td className="status-green">8y 9m [-6m]</td>
              <td className="status-orange">Just Below</td>
            </tr>
            <tr>
              <td>PKS122594</td>
              <td className="highlight-text">
                María Fernanda Romero
              </td>
              <td>No</td>
              <td>No</td>
              <td className="status-green">105</td>
              <td className="status-green">8y 9m [+6m]</td>
              <td className="status-green">Gtr. Depth</td>
            </tr>
            <tr>
              <td>PKS122594</td>
              <td className="highlight-text">Naquan Adimbola</td>
              <td>No</td>
              <td>No</td>
              <td className="status-green">95</td>
              <td className="status-orange">8y 9m [+1m]</td>
              <td className="status-orange">Just Below</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default NewReport;
