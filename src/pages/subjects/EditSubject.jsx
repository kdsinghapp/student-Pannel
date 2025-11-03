import React, { useState, useEffect } from "react";
import { getDepartments, getSubjectById, updateSubjectById } from "../../utils/authApi";
import { useNavigate, useParams } from "react-router-dom";
import Headers from "../../components/Headers";
import Sidebar from "../../components/Sidebar";

const EditSubject = () => {
  const { id } = useParams(); // Get subject ID from URL
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch all departments for dropdown
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await getDepartments();
        if (res?.data) {
          setDepartments(res.data);
        } else {
          setError("Failed to load departments");
        }
      } catch (err) {
        setError("Failed to fetch departments");
      }
    };
    fetchDepartments();
  }, []);

  // ✅ Fetch subject details by ID
  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await getSubjectById(id);
        // Adjust based on your API structure
        const subject = res?.data?.data || res?.data || null;

        if (subject) {
          setName(subject.name || "");
          setDepartmentId(String(subject.department_id || ""));
        } else {
          setError("Subject not found");
        }
      } catch (err) {
        setError("Failed to fetch subject details");
      } finally {
        setFetching(false);
      }
    };
    fetchSubject();
  }, [id]);

  // ✅ Handle Update
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
      const res = await updateSubjectById(id, payload);

      if (res?.status) {
        setSuccess("Subject updated successfully!");
        setTimeout(() => navigate("/subjects"), 1000);
      } else {
        setError(res?.message || "Failed to update subject");
      }
    } catch (err) {
      setError("Something went wrong while updating subject");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loading view
  if (fetching) {
    return (
      <div id="wrapper" className="wrapper bg-ash">
        <Headers />
        <div className="dashboard-page-one">
          <Sidebar />
          <div className="dashboard-content-one text-center mt-5">
            <h4>Loading subject details...</h4>
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
            <h3>Edit Subject</h3>
            <button
              onClick={() => navigate("/subjects")}
              className="btn btn-sm btn-gradient-blue1 text-white"
            >
              Back to Subjects
            </button>
          </div>

          {/* Edit Subject Form */}
          <div className="card height-auto mt-3">
            <div className="card-body">
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <form className="new-added-form" onSubmit={handleSubmit}>
                <div className="row">
                  {/* Subject Name */}
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

                  {/* Department Dropdown */}
                  <div className="col-xl-6 col-lg-6 col-12 form-group">
                    <label>Department *</label>
                    <select
                      className="form-control"
                      value={departmentId}
                      onChange={(e) => setDepartmentId(e.target.value)}
                    disabled>
                      <option value="">Select Department</option>
                      {departments.map((dep) => (
                        <option key={dep.id} value={dep.id}>
                          {dep.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="col-12 form-group mg-t-8">
                    <button
                      type="submit"
                      className="btn-fill-lg btn-gradient-blue1 btn-hover-bluedark"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Subject"}
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

export default EditSubject;
