import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import shimmer from "../assets/assets/shimmer.png";
import logoLight from "../assets/assets/logo-light.png";
import Select from "react-select";
const baseUrl = "https://server-php-8-3.technorizen.com/gradesphere/api/";

const SignUp = () => {
  return (
    <>
      <SignUpUI />
    </>
  );
};

export default SignUp;

export const SignUpUI = () => {
  const navigate = useNavigate();
  const [curriculums, setCurriculums] = useState([]);
  const [selectedCurriculumId, setSelectedCurriculumId] = useState("");
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [termDates, setTermDates] = useState({});
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    axios.get(`${baseUrl}user/curriculum/get-curriculums`).then((response) => {
      setCurriculums(response.data.data);
    });
  }, []);

  const handleDateChange = (divisionId, termId, type, value) => {
    setTermDates((prev) => {
      const updated = {
        ...prev,
        [divisionId]: {
          ...prev[divisionId],
          [termId]: {
            ...((prev[divisionId] && prev[divisionId][termId]) || {}),
            [type]: value,
          },
        },
      };

      // If editing Division 1, propagate the same term's date to all other divisions for the same term index
      const firstDivisionId = selectedDivisions[0];
      if (divisionId === firstDivisionId && selectedDivisions.length > 1) {
        // Find the term index in Division 1
        const firstDivision = divisions.find((d) => d.division_id === firstDivisionId);
        const termIndex = firstDivision?.terms.findIndex((t) => t.term_id === termId);
        if (termIndex !== undefined && termIndex !== -1) {
          // For each other division, set the same term's date
          for (let i = 1; i < selectedDivisions.length; i++) {
            const otherDivisionId = selectedDivisions[i];
            const otherDivision = divisions.find((d) => d.division_id === otherDivisionId);
            const otherTermId = otherDivision?.terms[termIndex]?.term_id;
            if (otherDivisionId && otherTermId) {
              updated[otherDivisionId] = {
                ...prev[otherDivisionId],
                [otherTermId]: {
                  ...((prev[otherDivisionId] && prev[otherDivisionId][otherTermId]) || {}),
                  [type]: value,
                },
              };
            }
          }
        }
      }
      return updated;
    });
  };
  const selectedCurriculum = curriculums.find(
    (c) => c.curriculum_id === Number(selectedCurriculumId)
  );
  const divisions = selectedCurriculum?.divisions || [];

  // Options for react-select
  const divisionOptions = divisions.map((d) => ({
    value: d.division_id,
    label: d.name,
  }));

  const [schoolLogo, setSchoolLogo] = useState(null);
  const [schoolName, setSchoolName] = useState("");
  const [academicStart, setAcademicStart] = useState("");
  const [academicEnd, setAcademicEnd] = useState("");
  const [selectedYearGroup, setSelectedYearGroup] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [schoolLogoPreview, setSchoolLogoPreview] = useState(null);
  const options = [{ value: "", label: "Select Phone Code", isDisabled: true }];
  const handleSubmit = async (e) => {
    e.preventDefault();
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

    selectedDivisions.forEach((divisionId, divisionIndex) => {
      formData.append(`division_id[${divisionIndex}]`, divisionId);
      const terms = termDates[divisionId] || {};
      Object.keys(terms).forEach((termId, termIndex) => {
        const term = terms[termId];
        formData.append(
          `curriculum_term_id[${divisionIndex}][${termIndex}]`,
          termId
        );
        formData.append(
          `term_start[${divisionIndex}][${termIndex}]`,
          term.start_date
        );
        formData.append(
          `term_end[${divisionIndex}][${termIndex}]`,
          term.end_date
        );
      });
    });

    try {
      const response = await axios.post(
        `${baseUrl}user/school/signup-school`,
        formData
      );

      if (response.data?.status) {
        toast.success("Submitted successfully!");
        navigate("/");
      } else {
        toast.error(response.data.message || "Submission failed.");
        if (Array.isArray(response.data.errors)) {
          response.data.errors.forEach((err) => toast.error(err));
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Server error occurred.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleTermDateChange = (index, field, value) => {
    const updated = [...termDates];
    updated[index][field] = value;
    setTermDates(updated);
  };

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${baseUrl}user/country/get-country`);
        setCountries(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const curriculumOptions = curriculums.map((curriculum) => ({
    value: curriculum.curriculum_id,
    label: curriculum.name,
  }));

  return (
    <>
      {/* Add custom style for select elements */}
      <section className="sign-up-section min-vh-100">
        <div className="container-fluid h-100">
          <div className="row h-100">
            {/* Left Section */}

            <div className="col-lg-6 p-0 d-lg-block">
              <div className="left-section">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <div className="sign-up-title-container">
                        <h3 className="text-white mx-2 my-3 sign-up-title">
                          Sign Up
                        </h3>
                        <img
                          // src="assets/shimmer.png"
                          src={shimmer}
                          alt="shimmer"
                          className="shimmer-img"
                        />
                      </div>
                      <div className="text-center mt-5 d-flex flex-column justify-content-center align-items-center">
                        <img
                          // src="assets/logo-light.png"
                          src={logoLight}
                          alt="logo"
                          className="logo-img img-fluid mb-5"
                        />
                        <h4 className="text-white mt-2 mb-3">
                          Welcome to Schooleo{" "}
                        </h4>
                        <p className="text-white">
                          Login to get started with Schooleo
                          <br />
                          If not yet registered click on sign up
                          <br />
                          to get started
                        </p>
                        {/*  <img src="assets/indicator.png" alt="indicator" class="mt-3 indicator"> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Section */}
            <div className="col-lg-6 col-12">
              <div className="right-section py-4 px-3 px-md-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h1 className="register-title mb-0">Register and Setup</h1>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/")}
                  >
                    Sign In
                  </button>
                </div>

                <form className="setup-form mb-5" onSubmit={handleSubmit}>
                  {/* Form groups */}
                  <div className="logo-upload mb-4">
                    <input
                      type="file"
                      id="schoolLogo"
                      required
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
                          className="img-fluid"
                        />
                      ) : (
                        <>
                          <div className="plus-icon display-4 mb-2">+</div>
                          <span className="text-muted">Add Image</span>
                        </>
                      )}
                    </label>

                    <span className="additional-text d-block mt-2">
                      <b>Select School Logo</b> — File types supported: JPG,
                      PNG, JPEG
                    </span>
                  </div>

                  {/* Form groups with responsive margins */}
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      required
                      className="form-control border"
                      placeholder="School Name"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <h5>Start Date</h5>
                      <input
                        type="date"
                        required
                        style={{ fontSize: "14px" }}
                        className="form-control"
                        placeholder="Academic Start"
                        value={academicStart}
                        onChange={(e) => setAcademicStart(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <h5>End Date</h5>
                      <input
                        type="date"
                        required
                        style={{ fontSize: "14px" }}
                        className="form-control"
                        placeholder="Academic End"
                        value={academicEnd}
                        onChange={(e) => setAcademicEnd(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3 ">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label className="block font-semibold mb-2">
                        Select Curriculum
                      </label>
                      <Select
                        className="w-full"
                        options={curriculumOptions}
                        value={
                          curriculumOptions.find(
                            (option) => option.value === selectedCurriculumId
                          ) || null
                        }
                        onChange={(selectedOption) => {
                          setSelectedCurriculumId(selectedOption?.value || "");
                          setSelectedDivisions([]);
                          setTermDates({});
                        }}
                        placeholder="-- Select Curriculum --"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="block font-semibold mb-2">
                        Select Divisions
                      </label>
                      <Select
                        isMulti
                        name="divisions"
                        options={divisionOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(selected) =>
                          setSelectedDivisions(
                            selected.map((option) => option.value)
                          )
                        }
                        value={divisionOptions.filter((opt) =>
                          selectedDivisions.includes(opt.value)
                        )}
                      />
                    </div>
                  </div>

                  {selectedDivisions.map((divisionId) => {
                    const division = divisions.find(
                      (d) => d.division_id === divisionId
                    );
                    if (!division) return null;

                    return (
                      <div
                        key={division.division_id}
                        className="mb-8 border-t pt-4"
                      >
                        <h3 className="text-lg font-semibold mb-2">
                          {division.name} - Terms
                        </h3>
                        {division.terms.map((term) => (
                          <div
                            key={term.term_id}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
                          >
                            <div className="font-medium">{term.name}</div>
                            <div className="row mb-3">
                              <div className="col-md-6 mb-3 mb-md-0">
                                <h5>Start Date</h5>
                                <input
                                  type="date"
                                  className="form-control"
                                  style={{ fontSize: "14px" }}
                                  value={
                                    termDates[divisionId]?.[term.term_id]
                                      ?.start_date || ""
                                  }
                                  onChange={(e) =>
                                    handleDateChange(
                                      divisionId,
                                      term.term_id,
                                      "start_date",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-md-6">
                                <h5>End Date</h5>
                                <input
                                  type="date"
                                  className="form-control"
                                  style={{ fontSize: "14px" }}
                                  value={
                                    termDates[divisionId]?.[term.term_id]
                                      ?.end_date || ""
                                  }
                                  onChange={(e) =>
                                    handleDateChange(
                                      divisionId,
                                      term.term_id,
                                      "end_date",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <Select
                        options={countries.map((country) => ({
                          value: country.phonecode,
                          label: `${country.name} (${country.phonecode})`,
                        }))}
                        value={
                          phoneCode
                            ? {
                              value: phoneCode,
                              label:
                                countries.find(
                                  (c) => c.phonecode === phoneCode
                                )?.name + ` (${phoneCode})`,
                            }
                            : null
                        }
                        onChange={(selectedOption) =>
                          setPhoneCode(selectedOption.value)
                        }
                        placeholder="Select Phone Code"
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            fontSize: "13px",
                          }),
                          option: (provided) => ({
                            ...provided,
                            fontSize: "13px",
                          }),
                          singleValue: (provided) => ({
                            ...provided,
                            fontSize: "13px",
                          }),
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <input
                        type="number"
                        required
                        className="form-control border"
                        placeholder="Mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <input
                        type="text"
                        required
                        className="form-control border"
                        placeholder="First Name"
                        value={firstName}
                        style={{ fontSize: "14px" }}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3 mb-md-0">
                      <input
                        type="text"
                        required
                        className="form-control border"
                        placeholder="Last Name"
                        value={lastName}
                        style={{ fontSize: "14px" }}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full  mb-3">
                    <input
                      type="email"
                      required
                      className="form-control border"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ fontSize: "14px" }}
                      autoComplete="off"
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <input
                        type="password"
                        required
                        className="form-control border"
                        placeholder="Password"
                        style={{ fontSize: "14px" }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3 mb-md-0">
                      <input
                        type="confirm-password"
                        required
                        className="form-control border"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ fontSize: "14px" }}
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div className="terms-section mt-4 ">
                    <small className="d-block text-center">
                      By continuing you are acknowledging that you have read,
                      understand and agreed to Mentrix's{" "}
                      <a href="#">Terms and Conditions</a> and
                      <a href="#">Privacy Policy</a>
                    </small>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" disabled={isLoading} className="btn btn-primary me-2">
                      {isLoading ? "Submitting..." : "Submit"}
                    </button>

                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
