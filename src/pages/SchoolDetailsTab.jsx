import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const baseUrl = "https://server-php-8-3.technorizen.com/gradesphere/api/";

const SchoolDetailsTab = () => {
  const navigate = useNavigate();

  // Form state
  const [curriculums, setCurriculums] = useState([]);
  const [selectedCurriculumId, setSelectedCurriculumId] = useState("");
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [termDates, setTermDates] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  const [schoolLogo, setSchoolLogo] = useState(null);
  const [schoolLogoPreview, setSchoolLogoPreview] = useState(null);
  const [schoolName, setSchoolName] = useState("");
  const [academicStart, setAcademicStart] = useState("");
  const [academicEnd, setAcademicEnd] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countries, setCountries] = useState([]);

  // Function to populate term dates from API response
  const populateTermDatesFromProfile = (schoolData) => {
    const termDatesData = {};
    
    if (schoolData.curriculums?.length > 0) {
      schoolData.curriculums.forEach(curriculum => {
        const division = curriculum.curriculum_division;
        if (division && division.terms) {
          division.terms.forEach(term => {
            const divisionId = division.id;
            const termId = term.id;
            
            if (!termDatesData[divisionId]) {
              termDatesData[divisionId] = {};
            }
            
            termDatesData[divisionId][termId] = {
              start_date: term.term_start_date || "",
              end_date: term.term_end_date || ""
            };
          });
        }
      });
    }
    
    console.log("📅 Populated term dates:", termDatesData);
    setTermDates(termDatesData);
  };

  // Fetch user profile and school data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log("🔍 Starting profile fetch...");
        
        const token = localStorage.getItem("userTokenStudent");
        console.log("📝 Auth token:", token ? "Present" : "Missing");
        
        if (!token) {
          console.log("❌ No auth token found, skipping profile fetch");
          setProfileLoaded(true);
          setIsEditing(false);
          return;
        }

        console.log("🌐 Making API call to profile endpoint...");
        const response = await axios.get(`${baseUrl}user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        });

        console.log("✅ Profile API response:", response.data);

        if (response.data?.status) {
          console.log("🎯 Profile data received successfully");
          
          if (response.data.data?.school_details?.length > 0) {
            console.log("🏫 School data found, populating form...");
            const schoolData = response.data.data.school_details[0];
            const userData = response.data.data;
            
            // Populate form with existing data
            setIsEditing(true);
            setSchoolName(schoolData.name || "");
            setFirstName(userData.first_name || "");
            setLastName(userData.last_name || "");
            setEmail(userData.email || "");
            setPhoneCode(userData.phonecode || "");
            setMobile(userData.mobile || "");
            
            // Set school logo if exists
            if (schoolData.logo_url) {
              setSchoolLogoPreview(schoolData.logo_url);
            }

            // Handle curriculum and divisions from existing data
            if (schoolData.curriculums?.length > 0) {
              const curriculum = schoolData.curriculums[0];
              const curriculumId = curriculum.curriculum_division?.curriculum_id || "";
              setSelectedCurriculumId(curriculumId);
              setAcademicStart(curriculum.academic_start || "");
              setAcademicEnd(curriculum.academic_end || "");
              
              // Set selected divisions
              const divisionIds = schoolData.curriculums.map(c => c.curriculum_division_id);
              setSelectedDivisions(divisionIds);

              // ✅ FIX: Populate term dates from API response
              populateTermDatesFromProfile(schoolData);

              console.log("📚 Curriculum ID:", curriculumId);
              console.log("🏢 Division IDs:", divisionIds);
            }
          } else {
            console.log("📝 No school data found, setting up new school form");
            setIsEditing(false);
          }
        } else {
          console.log("❌ Profile API returned status false");
          setIsEditing(false);
        }
      } catch (error) {
        console.error("💥 Error fetching profile data:", error);
        console.error("🔧 Error details:", error.response?.data || error.message);
        setIsEditing(false);
        
        if (error.response?.status === 401) {
          console.log("🔐 Unauthorized - token might be invalid");
          localStorage.removeItem("userTokenStudent");
        }
      } finally {
        setProfileLoaded(true);
        console.log("🏁 Profile fetch completed");
      }
    };

    fetchProfileData();
  }, []);

  // Fetch curriculums
  useEffect(() => {
    console.log("📚 Fetching curriculums...");
    axios.get(`${baseUrl}user/curriculum/get-curriculums`)
      .then((res) => {
        console.log("✅ Curriculums fetched:", res.data.data?.length || 0);
        setCurriculums(res.data.data || []);
      })
      .catch((error) => {
        console.error("❌ Error fetching curriculums:", error);
      });
  }, []);

  // Fetch countries
  useEffect(() => {
    console.log("🌍 Fetching countries...");
    axios.get(`${baseUrl}user/country/get-country`)
      .then((res) => {
        console.log("✅ Countries fetched:", res.data.data?.length || 0);
        setCountries(res.data.data || []);
      })
      .catch((error) => {
        console.error("❌ Error fetching countries:", error);
      });
  }, []);

  // Update selected curriculum when it changes
  useEffect(() => {
    if (selectedCurriculumId && curriculums.length > 0) {
      console.log("🔄 Selected curriculum changed:", selectedCurriculumId);
      setSelectedDivisions([]);
      setTermDates({});
    }
  }, [selectedCurriculumId, curriculums]);

  const selectedCurriculum = curriculums.find(
    (c) => c.curriculum_id === Number(selectedCurriculumId)
  );
  
  const divisions = selectedCurriculum?.divisions || [];

  const divisionOptions = divisions.map((d) => ({
    value: d.division_id,
    label: d.name,
  }));

  const curriculumOptions = curriculums.map((c) => ({
    value: c.curriculum_id,
    label: c.name,
  }));

  const countryOptions = countries.map((c) => ({
    value: c.phonecode,
    label: `${c.name} (${c.phonecode})`,
  }));

  const handleDateChange = (divisionId, termId, type, value) => {
    setTermDates((prev) => ({
      ...prev,
      [divisionId]: {
        ...prev[divisionId],
        [termId]: {
          ...((prev[divisionId] && prev[divisionId][termId]) || {}),
          [type]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isEditing) {
      await handleUpdateProfile(e);
    } else {
      await handleCreateSchool(e);
    }
  };

  const handleCreateSchool = async (e) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!selectedCurriculumId) {
      alert("Please select a curriculum!");
      return;
    }

    if (selectedDivisions.length === 0) {
      alert("Please select at least one division!");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("school_logo", schoolLogo);
    formData.append("name", schoolName);
    formData.append("curriculum_id", selectedCurriculumId);
    formData.append("academic_start", academicStart);
    formData.append("academic_end", academicEnd);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);
    formData.append("phonecode", phoneCode);
    formData.append("mobile", mobile);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);

    selectedDivisions.forEach((divisionId, idx) => {
      formData.append(`division_id[${idx}]`, divisionId);
      const terms = termDates[divisionId] || {};
      Object.keys(terms).forEach((termId, termIdx) => {
        const term = terms[termId];
        formData.append(`curriculum_term_id[${idx}][${termIdx}]`, termId);
        formData.append(`term_start[${idx}][${termIdx}]`, term.start_date);
        formData.append(`term_end[${idx}][${termIdx}]`, term.end_date);
      });
    });

    try {
      console.log("🚀 Creating school...");
      const response = await axios.post(
        `${baseUrl}user/school/signup-school`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      if (response.data?.status) {
        alert("School created successfully!");
        navigate("/");
      } else {
        alert(response.data.message || "Submission failed.");
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("Server error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("userTokenStudent");
      if (!token) {
        alert("No authentication token found. Please login again.");
        return;
      }

      const formData = new FormData();
      
      if (schoolLogo) formData.append("school_logo", schoolLogo);
      formData.append("name", schoolName);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("phonecode", phoneCode);
      formData.append("mobile", mobile);
      formData.append("academic_start", academicStart);
      formData.append("academic_end", academicEnd);

      selectedDivisions.forEach((divisionId, idx) => {
        formData.append(`division_id[${idx}]`, divisionId);
        const terms = termDates[divisionId] || {};
        Object.keys(terms).forEach((termId, termIdx) => {
          const term = terms[termId];
          formData.append(`curriculum_term_id[${idx}][${termIdx}]`, termId);
          formData.append(`term_start[${idx}][${termIdx}]`, term.start_date);
          formData.append(`term_end[${idx}][${termIdx}]`, term.end_date);
        });
      });

      console.log("🔄 Updating profile...");
      const response = await axios.post(
        `${baseUrl}user/school/update-profile`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.status) {
        alert("Profile updated successfully!");
      } else {
        alert(response.data.message || "Update failed.");
      }
    } catch (error) {
      console.error("❌ Update error:", error);
      alert("Server error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      window.location.reload();
    } else {
      setSchoolName("");
      setAcademicStart("");
      setAcademicEnd("");
      setSchoolLogo(null);
      setSchoolLogoPreview(null);
      setSelectedCurriculumId("");
      setSelectedDivisions([]);
      setTermDates({});
      setPhoneCode("");
      setMobile("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  if (!profileLoaded) {
    return (
      <div id="schoolDetails" className="tabcontent">
        <div className="position-relative">
          <h4 className="mb-0">School Profile</h4>
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading profile data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="schoolDetails" className="tabcontent">
      <div className="position-relative">
        <h4 className="mb-0">School Profile</h4>
        <p>
          {isEditing 
            ? "Please update your school profile settings here" 
            : "Please complete your school profile setup"
          }
        </p>
        <hr />

        <form onSubmit={handleSubmit}>
          {/* Logo Upload */}
          <div className="logo-upload mb-4">
            <input
              type="file"
              id="schoolLogo"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSchoolLogo(file);
                  setSchoolLogoPreview(URL.createObjectURL(file));
                }
              }}
            />
            <label
              htmlFor="schoolLogo"
              className="upload-area d-flex flex-column align-items-center justify-content-center border rounded p-4 text-center cursor-pointer"
              style={{ borderStyle: "dashed", minHeight: "150px" }}
            >
              {schoolLogoPreview ? (
                <img
                  src={schoolLogoPreview}
                  alt="School Logo Preview"
                  style={{ maxHeight: "120px", objectFit: "contain" }}
                />
              ) : (
                <>
                  <div className="plus-icon display-4 mb-2">+</div>
                  <span className="text-muted">
                    {isEditing ? "Change Logo" : "Add School Logo"}
                  </span>
                </>
              )}
            </label>
          </div>

          {/* School Name */}
          <div className="mb-3">
            <label className="form-label">School Name *</label>
            <input
              type="text"
              required
              placeholder="School Name"
              className="form-control"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
            />
          </div>

          {/* Academic Dates */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Academic Start Date *</label>
              <input
                type="date"
                required
                className="form-control"
                value={academicStart}
                onChange={(e) => setAcademicStart(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Academic End Date *</label>
              <input
                type="date"
                required
                className="form-control"
                value={academicEnd}
                onChange={(e) => setAcademicEnd(e.target.value)}
              />
            </div>
          </div>

          {/* Curriculum & Divisions */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Select Curriculum *</label>
              <Select
                options={curriculumOptions}
                value={curriculumOptions.find(
                  (opt) => opt.value === selectedCurriculumId
                )}
                onChange={(option) => {
                  setSelectedCurriculumId(option?.value || "");
                }}
                placeholder="-- Select Curriculum --"
                isDisabled={isEditing}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Select Divisions *</label>
              <Select
                isMulti
                options={divisionOptions}
                value={divisionOptions.filter((opt) =>
                  selectedDivisions.includes(opt.value)
                )}
                onChange={(selected) =>
                  setSelectedDivisions(selected.map((opt) => opt.value))
                }
                placeholder="-- Select Divisions --"
                isDisabled={isEditing || !selectedCurriculumId}
              />
              {!selectedCurriculumId && (
                <div className="form-text text-warning">
                  Please select a curriculum first
                </div>
              )}
            </div>
          </div>

          {/* Terms */}
          {selectedDivisions.map((divisionId) => {
            const division = divisions.find((d) => d.division_id === divisionId);
            if (!division) return null;

            return (
              <div key={divisionId} className="mb-3 border-top pt-4">
                <h5>{division.name} - Terms</h5>
                {division.terms?.map((term) => (
                  <div key={term.term_id} className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">{term.name} Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={termDates[divisionId]?.[term.term_id]?.start_date || ""}
                        onChange={(e) =>
                          handleDateChange(divisionId, term.term_id, "start_date", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">{term.name} End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={termDates[divisionId]?.[term.term_id]?.end_date || ""}
                        onChange={(e) =>
                          handleDateChange(divisionId, term.term_id, "end_date", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

          {/* Contact Information */}
          <div className="row mb-3">
<div className="col-md-6">
  <label className="form-label">Country Code *</label>
  <Select
    isDisabled={true}
    options={countryOptions}
    value={countryOptions.find(opt => opt.value === phoneCode)}
    onChange={(option) => setPhoneCode(option?.value || "")}
    placeholder="-- Select Country --"
  />
</div>
            <div className="col-md-6">
              <label className="form-label">Mobile Number *</label>
              <input
                type="tel"
                required
                className="form-control"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                 disabled={true}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                required
                placeholder="First Name"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                 disabled={true}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                required
                placeholder="Last Name"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                 disabled={true}
              />
            </div>
          </div>

          {/* Email - Only show for new school creation */}
          {!isEditing && (
            <div className="mb-3">
              <label className="form-label">Email *</label>
              <input
                type="email"
                required
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 disabled={true}
              />
            </div>
          )}

          {/* Password - Only show for new school creation */}
          {!isEditing && (
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Confirm Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Confirm Password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary br20"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </span>
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  {isEditing ? "Update Profile" : "Create School"} 
                  <i className="fa fa-check ms-2" />
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary br20 ms-2"
              onClick={handleCancel}
              disabled={isLoading}
            >
              {isEditing ? "Reset" : "Cancel"} 
              <i className="fa fa-times ms-2" />
            </button>
          </div>
        </form>

        <div className="position-absolute" style={{ top: 20, right: 20 }}>
          <i
            className="tooltip-icon fas fa-info-circle"
            data-toggle="tooltip"
            data-placement="left"
            title={
              isEditing 
                ? "Update your school profile information here." 
                : "Complete your school profile setup to get started."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SchoolDetailsTab;