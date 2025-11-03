import React, { useState, useEffect } from "react";
import { getDepartments, addSubject } from "../../utils/authApi";
import { useNavigate } from "react-router-dom";
import Headers from "../../components/Headers";
import Sidebar from "../../components/Sidebar";

const AddSubject = () => {
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await getDepartments();
        setDepartments(res.data || []);
      } catch (err) {
        setError("Failed to fetch departments");
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !departmentId) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const payload = { name, department_id: departmentId };
      const res = await addSubject(payload);

      if (res.status) {
        setSuccess("Subject added successfully!");
        setName("");
        setDepartmentId("");
        setTimeout(() => navigate("/subjects"), 1000);
      } else {
        setError(res.message || "Failed to add subject");
      }
    } catch (err) {
      setError("Something went wrong while adding subject");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="wrapper" className="wrapper bg-ash">
      <Headers />
      <div className="dashboard-page-one">
        <Sidebar />
        <div className="dashboard-content-one">
          {/* Breadcrumbs */}
          <div className="breadcrumbs-area d-flex justify-content-between align-items-center">
            <h3>Add Subject</h3>
            <button
              onClick={() => navigate("/subjects")}
              className="btn btn-sm btn-gradient-blue1 text-white"
            >
              Back to Subjects
            </button>
          </div>

          {/* Form Card */}
          <div className="card height-auto mt-3">
            <div className="card-body">
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <form className="new-added-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-12 form-group">
                    <label>Subject Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Subject Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="col-xl-6 col-lg-6 col-12 form-group">
                    <label>Department *</label>
                    <select
                      className="form-control"
                      value={departmentId}
                      onChange={(e) => setDepartmentId(e.target.value)}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dep) => (
                        <option key={dep.id} value={dep.id}>
                          {dep.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 form-group mg-t-8">
                    <button
                      type="submit"
                      className="btn-fill-lg btn-gradient-blue1 btn-hover-bluedark"
                      disabled={loading}
                    >
                      {loading ? "Adding..." : "Add Subject"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubject;
