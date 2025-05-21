import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import shimmer from "../assets/assets/shimmer.png";
import logoLight from "../assets/assets/logo-light.png";
import Select from 'react-select';
const baseUrl = "https://server-php-8-3.technorizen.com/gradesphere/api/";
// console.log('baseUrl', baseUrl);

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

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [curriculums, setCurriculums] = useState([]);
  const [selectedCurriculums, setSelectedCurriculums] = useState([]);
  const [termInputs, setTermInputs] = useState([]);

  useEffect(() => {
    axios
      .get('https://server-php-8-3.technorizen.com/gradesphere/api/admin/curriculum/get-curriculums')
      .then((res) => {
        const responseData = res.data?.data || [];
        setData(responseData);

        const categoryOptions = responseData.map((item) => ({
          value: item.curriculum_category.id,
          label: item.curriculum_category.name,
          curriculums: item.curriculum_category.curriculums
        }));
        setCategories(categoryOptions);
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  const handleCategoryChange = (selected) => {
    setSelectedCategory(selected);
    setSelectedCurriculums([]);
    setTermInputs([]);
    if (selected) {
      const options = selected.curriculums.map((curr) => ({
        value: curr.curriculum_id,
        label: curr.name,
        curriculum_terms: curr.curriculum_terms
      }));
      setCurriculums(options);
    } else {
      setCurriculums([]);
    }
  };

  const handleCurriculumChange = (selectedOptions) => {
    setSelectedCurriculums(selectedOptions);

    const termsWithDates = selectedOptions.flatMap((curr) =>
      curr.curriculum_terms.map((term) => ({
        term_id: term.curriculum_term_id,
        term_name: term.name,
        curriculum_id: curr.value,
        curriculum_name: curr.label,
        start_date: '',
        end_date: ''
      }))
    );

    setTermInputs(termsWithDates);
  };

  const handleDateChange = (index, field, value) => {
    const updated = [...termInputs];
    updated[index][field] = value;
    setTermInputs(updated);
  };


  const [schoolLogo, setSchoolLogo] = useState(null);
  const [schoolName, setSchoolName] = useState("");
  const [academicStart, setAcademicStart] = useState("");
  const [academicEnd, setAcademicEnd] = useState("");
  const [selectedCurriculum, setSelectedCurriculum] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedYearGroup, setSelectedYearGroup] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const options = [
    { value: '', label: 'Select Phone Code', isDisabled: true },
  ]
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Add school logo file (example)
    // if (schoolLogo) {
    //   formData.append("school_logo", schoolLogo);
    // }

    // Add other fields like name, curriculum etc.
    formData.append("name", schoolName);
    formData.append("curriculum_id", selectedCurriculum);
    formData.append("academic_start", academicStart);
    formData.append("academic_end", academicEnd);
    formData.append("division_id", selectedDivision);
    formData.append("year_group_id", selectedYearGroup);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phonecode", phoneCode);
    formData.append("mobile", mobile);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);

    console.log("Submitting form with values:");
    console.log("school_logo:", schoolLogo);
    console.log("name:", schoolName);
    console.log("curriculum_id:", selectedCurriculum);
    console.log("academic_start:", academicStart);
    console.log("academic_end:", academicEnd);
    console.log("division_id:", selectedDivision);
    console.log("year_group_id:", selectedYearGroup);
    console.log("email:", email);
    console.log("password:", password);
    console.log("phonecode:", phoneCode);
    console.log("mobile:", mobile);
    console.log("first_name:", firstName);
    console.log("last_name:", lastName);

    // Append term dates using indexed keys
    termDates.forEach((term, index) => {
      if (term.startDate)
        formData.append(`term_start[${index}]`, term.startDate);
      console.log(`term_start[${index}]`, term.startDate);
    });
    termDates.forEach((term, index) => {
      if (term.endDate) formData.append(`term_end[${index}]`, term.endDate);
      console.log(`term_end[${index}]`, term.endDate);
    });
    termDates.forEach((term, index) => {
      if (term.termId)
        formData.append(`curriculum_term_id[${index}]`, term.termId);
      console.log(`curriculum_term_id[${index}]`, term.termId);
    });

    try {
      const response = await axios.post(
        `${baseUrl}admin/school/signup-school`,
        formData
      );
      console.log("handleSubmit response:", response);
      if (response.data?.status === false) {
        // Show main message
        if (response.data.message) {
          toast.error(response.data.message);
        }

        // Show all detailed validation errors if available
        if (Array.isArray(response.data.errors)) {
          response.data.errors.forEach((err) => {
            toast.error(err);
          });
        }
      }

      if (response.data?.status === true) {
        toast.success("Submitted successfully!");
        // Reset form state here
        setSchoolLogo(null);
        setSchoolName("");
        setAcademicStart("");
        setAcademicEnd("");
        setSelectedCurriculum("");
        setSelectedDivision("");
        setSelectedYearGroup("");
        setEmail("");
        setPassword("");
        setPhoneCode("");
        setMobile("");
        setFirstName("");
        setLastName("");
        setTermDates([]);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error handleSubmit:", error);
    }
  };

  const [termDates, setTermDates] = useState([]);


  const handleTermDateChange = (index, field, value) => {
    const updated = [...termDates];
    updated[index][field] = value;
    setTermDates(updated);
  };


  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${baseUrl}admin/country/get-country`);
        setCountries(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

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
                <h1 className="register-title">Register and Setup</h1>
                <form className="setup-form mb-5" onSubmit={handleSubmit}>
                  {/* Form groups */}
                  <div className="logo-upload mb-4">
                    <input
                      type="file"
                      id="schoolLogo"
                      required
                      accept="image/*"
                      hidden
                      onChange={(e) => setSchoolLogo(e.target.files[0])}
                    />

                    <label
                      htmlFor="schoolLogo"
                      className="upload-area d-flex flex-column align-items-center justify-content-center border rounded p-4 text-center cursor-pointer"
                      style={{ borderStyle: 'dashed', minHeight: '150px' }}
                    >
                      <div className="plus-icon display-4 mb-2">+</div>
                      <span className="text-muted">Add Image</span>
                    </label>

                    <span className="additional-text d-block mt-2">
                      <b>Select School Logo</b> — File types supported: JPG, PNG, JPEG
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
                        style={{ fontSize: '14px' }}
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
                        style={{ fontSize: '14px' }}
                        className="form-control"
                        placeholder="Academic End"
                        value={academicEnd}
                        onChange={(e) => setAcademicEnd(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3 ">
                    <div className="col-md-6 mb-3 mb-md-0">
                      {/* <select
                        name="curriculum"
                        required
                        style={{ fontSize: '14px' }}
                        className="form-select select-with-icon"
                        value={selectedCurriculum}
                        onChange={(e) => setSelectedCurriculum(e.target.value)}
                      >
                        <option value="" disabled>
                          School Curriculum
                        </option>
                        {categories.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select> */}
                      <Select
                        options={categories}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        placeholder="Select Curriculum Category"
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            fontSize: '12px',
                          }),
                          option: (provided) => ({
                            ...provided,
                            fontSize: '12px',
                          }),
                          singleValue: (provided) => ({
                            ...provided,
                            fontSize: '12px',
                          }),
                        }}
                      />

                    </div>
                    <div className="col-md-6">
                      <Select
                        isMulti
                        options={curriculums}
                        value={selectedCurriculums}
                        onChange={handleCurriculumChange}
                        placeholder="Select Curriculums"
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            fontSize: '12px',
                          }),
                          option: (provided) => ({
                            ...provided,
                            fontSize: '12px',
                          }),
                          singleValue: (provided) => ({
                            ...provided,
                            fontSize: '12px',
                          }),
                        }}
                      />
                    </div>

                  </div>

                  {termInputs.length > 0 && (
                    <div>
                      <h5>Curriculum Terms & Dates</h5>
                      {termInputs.map((term, index) => (
                        <div
                          key={`${term.term_id}-${index}`}
                          style={{
                            border: '1px solid #ddd',
                            borderRadius: 6,
                            padding: 10,
                            marginBottom: 10,
                            backgroundColor: '#f9f9f9'
                          }}
                        >
                          <strong>
                            {term.curriculum_name} - {term.term_name}
                          </strong>
                          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                            <div>
                              <label>Start Date</label>
                              <input
                                type="date"
                                value={term.start_date}
                                onChange={(e) => handleDateChange(index, 'start_date', e.target.value)}
                              />
                            </div>
                            <div>
                              <label>End Date</label>
                              <input
                                type="date"
                                value={term.end_date}
                                onChange={(e) => handleDateChange(index, 'end_date', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <input
                        type="email"
                        required
                        className="form-control border"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ fontSize: '14px' }}
                        autoComplete="off"
                      />
                    </div>
                    <div className="col-md-6 mb-3 mb-md-0">
                      <input
                        type="password"
                        required
                        className="form-control border"
                        placeholder="Password"
                        style={{ fontSize: '14px' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <Select
                        options={countries.map((country) => ({
                          value: country.phone_code,
                          label: `${country.name} (${country.phone_code})`,
                        }))}
                        value={
                          phoneCode
                            ? {
                              value: phoneCode,
                              label: countries.find((c) => c.phone_code === phoneCode)?.name + ` (${phoneCode})`,
                            }
                            : null
                        }
                        onChange={(selectedOption) => setPhoneCode(selectedOption.value)}
                        placeholder="Select Phone Code"
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            fontSize: '13px',
                          }),
                          option: (provided) => ({
                            ...provided,
                            fontSize: '13px',
                          }),
                          singleValue: (provided) => ({
                            ...provided,
                            fontSize: '13px',
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

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        required
                        className="form-control border"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <input
                        type="text"
                        required
                        className="form-control border"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="terms-section">
                    <small className="d-block text-center">
                      By continuing you are acknowledging that you have read,
                      understand and agreed to Mentrix's{" "}
                      <a href="#">Terms and Conditions</a> and
                      <a href="#">Privacy Policy</a>
                    </small>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary w-50 w-md-50 enter-btn"
                    >
                      Enter
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

