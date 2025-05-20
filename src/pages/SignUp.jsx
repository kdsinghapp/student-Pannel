import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import shimmer from "../assets/assets/shimmer.png";
import logoLight from "../assets/assets/logo-light.png";
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
  const [curriculums, setCurriculums] = useState([]);

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}admin/curriculum/get-curriculums`
        );
        const categories = response.data?.data || [];

        const allCurriculums = categories.flatMap(
          (cat) => cat.curriculum_category?.curriculums || []
        );
        setCurriculums(allCurriculums); // Full objects with curriculum_terms
      } catch (error) {
        console.error("Error fetching curriculums:", error);
      }
    };

    fetchCurriculums();
  }, []);

  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}admin/school-division/get-school-divisions`
        );
        setDivisions(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching divisions:", error);
      }
    };

    fetchDivisions();
  }, []);

  const [yearGroups, setYearGroups] = useState([]);

  useEffect(() => {
    const fetchYearGroups = async () => {
      try {
        const response = await axios.get(`${baseUrl}admin/year/get-year-group`);
        setYearGroups(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching year groups:", error);
      }
    };

    fetchYearGroups();
  }, []);

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
      console.log(`term_start[${index}]` , term.startDate);
    });
    termDates.forEach((term, index) => {
      if (term.endDate) formData.append(`term_end[${index}]`, term.endDate);
      console.log(`term_end[${index}]` , term.endDate);
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

  useEffect(() => {
    const selected = curriculums.find(
      (c) => c.curriculum_id === Number(selectedCurriculum)
    );
    if (selected && selected.curriculum_terms) {
      const dates = selected.curriculum_terms.map((term) => ({
        termId: term.curriculum_term_id,
        termName: term.name,
        startDate: "",
        endDate: "",
      }));
      setTermDates(dates);
    }
  }, [selectedCurriculum]);

  const handleTermDateChange = (index, field, value) => {
    const updated = [...termDates];
    updated[index][field] = value;
    setTermDates(updated);
  };

  // const [schoolTerms, setSchoolTerms] = useState([]);

  // // Update terms when curriculum changes
  // useEffect(() => {
  //   const selected = curriculums.find((c) => c.id == selectedCurriculum);
  //   if (selected && selected.curriculum_terms) {
  //     setSchoolTerms(selected.curriculum_terms);
  //   } else {
  //     setSchoolTerms([]);
  //   }
  // }, [selectedCurriculum, curriculums]);
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
                      hidden=""
                      onChange={(e) => setSchoolLogo(e.target.files[0])}
                    />
                    <label
                      htmlFor="schoolLogo"
                      className="upload-area d-flex flex-column align-items-center"
                    >
                      <div className="plus-icon">+</div>
                      <span>Add Image</span>
                    </label>
                    <span className="additional-text d-block mt-2">
                      <b>Select School Logo</b> File Supported JPG, PNG, JPEG
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
                  <div className="form-group mb-3 select-wrapper">
                    <select
                      name="curriculum"
                      required
                      className="form-select select-with-icon"
                      value={selectedCurriculum}
                      onChange={(e) => setSelectedCurriculum(e.target.value)}
                    >
                      <option value="" disabled selected>
                        School Curriculum
                      </option>
                      {curriculums.map((item) => (
                        <option
                          key={item.curriculum_id}
                          value={item.curriculum_id}
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <input
                        type="date"
                        required
                        className="form-control"
                        placeholder="Academic Start"
                        value={academicStart}
                        onChange={(e) => setAcademicStart(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="date"
                        required
                        className="form-control"
                        placeholder="Academic End"
                        value={academicEnd}
                        onChange={(e) => setAcademicEnd(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* <div className="school-terms-container">
                    <div className="form-group term-group">
                      <div className="d-flex align-items-center">
                        <div className="select-wrapper">
                          <select
                            name="terms"
                            required
                            className="select-with-icon mr-2"
                            value={selectedSchoolTerms}
                            onChange={(e) =>
                              setSelectedSchoolTerms(e.target.value)
                            }
                          >
                            <option value="" selected="" disabled="">
                              School Terms
                            </option>
                            {schoolTerms.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.terms_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {termDates.map((term, index) => (
                    <div key={term.termId} className="form-row">
                      <div className="form-group col-md-6">
                        <label>{term.termName} Start Date</label>
                        <input
                          type="date"
                          required
                          className="form-control"
                          value={term.startDate}
                          onChange={(e) =>
                            handleTermDateChange(
                              index,
                              "startDate",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label>{term.termName} End Date</label>
                        <input
                          type="date"
                          required
                          className="form-control"
                          value={term.endDate}
                          onChange={(e) =>
                            handleTermDateChange(
                              index,
                              "endDate",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <div className="form-group select-wrapper">
                    <select
                      name="division"
                      required
                      className="select-with-icon"
                      value={selectedDivision}
                      onChange={(e) => setSelectedDivision(e.target.value)}
                    >
                      <option value="" disabled selected>
                        School Division
                      </option>
                      {divisions.map((division) => (
                        <option key={division.id} value={division.id}>
                          {division.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group select-wrapper">
                    <select
                      name="year"
                      required
                      className="select-with-icon"
                      value={selectedYearGroup}
                      onChange={(e) => setSelectedYearGroup(e.target.value)}
                    >
                      <option value="" disabled>
                        Year Group
                      </option>
                      {yearGroups.map((year) => (
                        <option key={year.id} value={year.id}>
                          {year.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      required
                      className="form-control border"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      required
                      className="form-control border"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <select
                      required
                      className="form-select col-md-6"
                      value={phoneCode}
                      onChange={(e) => setPhoneCode(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Phone Code
                      </option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.phone_code}>
                          {country.name} ({country.phone_code})
                        </option>
                      ))}
                    </select>
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

// const Old=()=>{
//   return (
//     <section className="sign-up-section min-vh-100">
//       <div className="container-fluid h-100">
//         <div className="row h-100">
//           <div className="col-lg-6 p-0 d-lg-block">
//             <div className="left-section">
//               <div className="container">
//                 <div className="row">
//                   <div className="col-12">
//                     <div className="sign-up-title-container">
//                       <h3 className="text-white mx-2 my-3 sign-up-title">
//                         Sign Up
//                       </h3>
//                       <img src={shimer} alt="shimmer" className="shimmer-img" />
//                     </div>
//                     <div className="text-center mt-5 d-flex flex-column justify-content-center align-items-center">
//                       <img
//                         src={logo}
//                         alt="logo"
//                         className="logo-img img-fluid mb-5"
//                       />
//                       <h4 className="text-white mt-2 mb-3">
//                         Welcome to Schooleo{" "}
//                       </h4>
//                       <p className="text-white">
//                         Login to get started with Schooleo
//                         <br />
//                         If not yet registered click on sign up
//                         <br />
//                         to get started
//                       </p>
//                       {/*  <img src="assets/indicator.png" alt="indicator" class="mt-3 indicator"> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Right Section */}
//           <div className="col-lg-6 col-12">
//             <div className="right-section py-4 px-3 px-md-5">
//               <h1 className="register-title">Register and Setup</h1>
//               <form className="setup-form mb-5">
//                 {/* Form groups */}
//                 <div className="logo-upload mb-4">
//                   {/* <input
//                     type="file"
//                     id="schoolLogo"
//                     accept="image/*"
//                     hidden=""
//                   /> */}
//                   <label
//                     htmlFor="schoolLogo"
//                     className="upload-area d-flex flex-column align-items-center"
//                   >
//                     <div className="plus-icon">+</div>
//                     <span>Add Image</span>
//                   </label>
//                   <span className="additional-text d-block mt-2">
//                     <b>Select School Logo</b> File Supported JPG, PNG, JPEG
//                   </span>
//                 </div>
//                 <div className="form-group mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="School Name"
//                   />
//                 </div>
//                 <div className="form-group mb-3 select-wrapper">
//                   <select
//                     name="curriculum"
//                     className="form-select select-with-icon"
//                   >
//                     <option value="" selected="" disabled="">
//                       School Curriculum
//                     </option>
//                     <option value="international-b">International B</option>
//                   </select>
//                 </div>
//                 <div className="row mb-3">
//                   <div className="col-md-6 mb-3 mb-md-0">
//                     <input
//                       type="date"
//                       className="form-control"
//                       placeholder="Academic Start"
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <input
//                       type="date"
//                       className="form-control"
//                       placeholder="Academic End"
//                     />
//                   </div>
//                 </div>
//                 <div className="school-terms-container">
//                   <div className="form-group term-group">
//                     <div className="d-flex align-items-center">
//                       <div className="select-wrapper">
//                         <select name="terms" className="select-with-icon mr-2">
//                           <option value="" selected="" disabled="">
//                             School Terms
//                           </option>
//                           {/* Add options */}
//                         </select>
//                       </div>
//                       <button
//                         type="button"
//                         className="btn btn-primary add-term"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="form-row">
//                   <div className="form-group col-md-6">
//                     <input
//                       type="date"
//                       className="form-control"
//                       placeholder="Start Date"
//                     />
//                   </div>
//                   <div className="form-group col-md-6">
//                     <input
//                       type="date"
//                       className="form-control"
//                       placeholder="End Date"
//                     />
//                   </div>
//                 </div>
//                 <div className="form-group select-wrapper">
//                   <select name="division" className="select-with-icon">
//                     <option value="" selected="" disabled="">
//                       School Division
//                     </option>
//                     {/* Add options */}
//                   </select>
//                 </div>
//                 <div className="form-group select-wrapper">
//                   <select name="year" className="select-with-icon">
//                     <option value="" selected="" disabled="">
//                       Year Group
//                     </option>
//                     {/* Add options */}
//                   </select>
//                 </div>
//                 <div className="terms-section">
//                   <small className="d-block text-center">
//                     By continuing you are acknowledging that you have read,
//                     understand and agreed to Mentrix's{" "}
//                     <a href="#">Terms and Conditions</a> and
//                     <a href="#">Privacy Policy</a>
//                   </small>
//                 </div>
//                 <div className="d-flex justify-content-center">
//                   <button
//                     type="submit"
//                     className="btn btn-primary w-50 w-md-50 enter-btn"
//                   >
//                     Enter
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
