import React, { useState } from "react";
import { addDepartment } from "../../utils/authApi";
import { useNavigate } from "react-router-dom";
import Headers from "../../components/Headers";
import Sidebar from "../../components/Sidebar";

const AddDepartment = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name) {
      setError("Please enter department name");
      return;
    }

    setLoading(true);
    try {
      const payload = { name };
      const res = await addDepartment(payload);

      if (res.status) {
        setSuccess("Department added successfully!");
        setName("");
        setTimeout(() => navigate("/departments"), 1000);
      } else {
        setError(res.message || "Failed to add department");
      }
    } catch (err) {
      setError("Something went wrong while adding department");
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
            <h3>Add Department</h3>
            <button
              onClick={() => navigate("/departments")}
              className="btn btn-sm btn-gradient-blue1 text-white"
            >
              Back to Departments
            </button>
          </div>

          {/* Form Card */}
          <div className="card height-auto mt-3">
            <div className="card-body">
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <form className="new-added-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 form-group">
                    <label>Department Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Department Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="col-12 form-group mg-t-8">
                    <button
                      type="submit"
                      className="btn-fill-lg btn-gradient-blue1 btn-hover-bluedark"
                      disabled={loading}
                    >
                      {loading ? "Adding..." : "Add Department"}
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

export default AddDepartment;
