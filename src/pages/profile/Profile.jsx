import React, { useEffect, useState } from "react";
import Headers from "../../components/Headers";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../../utils/authApi";

const Profile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // ✅ Fetch user data on mount
  useEffect(() => {
    getUserProfile()
      .then((res) => {
        if (res.status) {
          const user = res.data;
          setFormData({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            mobile: user.mobile,
          });
        } else {
          setError("Failed to load user profile");
        }
      })
      .catch(() => setError("Network error while loading profile"));
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    updateUserProfile(formData)
      .then((res) => {
        if (res.status) {
          setSuccess("Profile updated successfully!");
        } else {
          setError(res.error || "Something went wrong");
        }
      })
      .catch(() => setError("Network error while updating profile"))
      .finally(() => setLoading(false));
  };

  return (
    <div id="wrapper" className="wrapper bg-ash">
      <Headers />
      <div className="dashboard-page-one">
        <Sidebar />
        <div className="dashboard-content-one">
          {/* Breadcrumbs */}
          <div className="breadcrumbs-area d-flex justify-content-between">
            <h3>User Profile</h3>
            <button
              className="btn btn-purple"
              style={{ color: "white", background: "#501b8d" }}
              onClick={() => navigate(-1)}
            >
              <i className="fas fa-arrow-left" /> Back
            </button>
          </div>

          {/* Form Card */}
          <div className="card height-auto mt-4">
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* First Name */}
                  <div className="form-group mb-3 col-md-6">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      className="form-control"
                      placeholder="Enter first name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div className="form-group mb-3 col-md-6">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      className="form-control"
                      placeholder="Enter last name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group mb-3 col-md-6">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Mobile */}
                  <div className="form-group mb-3 col-md-6">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="mobile"
                      className="form-control"
                      placeholder="Enter phone number"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-purple"
                  style={{ color: "white", background: "#501b8d" }}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Profile"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
