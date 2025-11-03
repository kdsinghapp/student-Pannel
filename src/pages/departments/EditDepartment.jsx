import React, { useState, useEffect } from "react";
import { getDepartmentById, updateDepartmentById } from "../../utils/authApi";
import { useNavigate, useParams } from "react-router-dom";
import Headers from "../../components/Headers";
import Sidebar from "../../components/Sidebar";

const EditDepartment = () => {
  const { id } = useParams(); // Get department ID from URL
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch department details by ID
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await getDepartmentById(id);
        if (res?.data) {
          setName(res.data.name || "");
        } else {
          setError("Department not found");
        }
      } catch (err) {
        setError("Failed to fetch department details");
      } finally {
        setFetching(false);
      }
    };
    fetchDepartment();
  }, [id]);

  // Handle update
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
      const res = await updateDepartmentById(id, payload);

      if (res.status) {
        setSuccess("Department updated successfully!");
        setTimeout(() => navigate("/departments"), 1000);
      } else {
        setError(res.message || "Failed to update department");
      }
    } catch (err) {
      setError("Something went wrong while updating department");
    } finally {
      setLoading(false);
    }
  };

  // Loading view
  if (fetching) {
    return (
      <div id="wrapper" className="wrapper bg-ash">
        <Headers />
        <div className="dashboard-page-one">
          <Sidebar />
          <div className="dashboard-content-one text-center mt-5">
            <h4>Loading department details...</h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper" className="wrapper bg-ash">
      <Headers />
      <div className="dashboard-page-one">
        <Sidebar />
        <div className="dashboard-content-one">
          {/* Breadcrumbs */}
          <div className="breadcrumbs-area d-flex justify-content-between align-items-center">
            <h3>Edit Department</h3>
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
                      {loading ? "Updating..." : "Update Department"}
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

export default EditDepartment;
