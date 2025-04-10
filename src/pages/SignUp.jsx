import React from "react";
import shimmer from "../assets/assets/shimmer.png";
import logoLight from "../assets/assets/logo-light.png";

const SignUp = () => {
  return(<>
  <SignUpUI/>
  </>)
};

export default SignUp;


export const  SignUpUI=()=>{
  return(<>
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
            <form className="setup-form mb-5">
              {/* Form groups */}
              <div className="logo-upload mb-4">
                <input type="file" id="schoolLogo" accept="image/*" hidden="" />
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
                  className="form-control"
                  placeholder="School Name"
                />
              </div>
              <div className="form-group mb-3 select-wrapper">
                <select
                  name="curriculum"
                  className="form-select select-with-icon"
                >
                  <option value="" selected="" disabled="">
                    School Curriculum
                  </option>
                  <option value="international-b">International B</option>
                </select>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Academic Start"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Academic End"
                  />
                </div>
              </div>
              <div className="school-terms-container">
                <div className="form-group term-group">
                  <div className="d-flex align-items-center">
                    <div className="select-wrapper">
                      <select name="terms" className="select-with-icon mr-2">
                        <option value="" selected="" disabled="">
                          School Terms
                        </option>
                        {/* Add options */}
                      </select>
                    </div>
                    <button type="button" className="btn btn-primary add-term">
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Start Date"
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="End Date"
                  />
                </div>
              </div>
              <div className="form-group select-wrapper">
                <select name="division" className="select-with-icon">
                  <option value="" selected="" disabled="">
                    School Division
                  </option>
                  {/* Add options */}
                </select>
              </div>
              <div className="form-group select-wrapper">
                <select name="year" className="select-with-icon">
                  <option value="" selected="" disabled="">
                    Year Group
                  </option>
                  {/* Add options */}
                </select>
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
  </>)
}


const Old=()=>{
  return (
    <section className="sign-up-section min-vh-100">
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-lg-6 p-0 d-lg-block">
            <div className="left-section">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="sign-up-title-container">
                      <h3 className="text-white mx-2 my-3 sign-up-title">
                        Sign Up
                      </h3>
                      <img src={shimer} alt="shimmer" className="shimmer-img" />
                    </div>
                    <div className="text-center mt-5 d-flex flex-column justify-content-center align-items-center">
                      <img
                        src={logo}
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
              <form className="setup-form mb-5">
                {/* Form groups */}
                <div className="logo-upload mb-4">
                  {/* <input
                    type="file"
                    id="schoolLogo"
                    accept="image/*"
                    hidden=""
                  /> */}
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
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="School Name"
                  />
                </div>
                <div className="form-group mb-3 select-wrapper">
                  <select
                    name="curriculum"
                    className="form-select select-with-icon"
                  >
                    <option value="" selected="" disabled="">
                      School Curriculum
                    </option>
                    <option value="international-b">International B</option>
                  </select>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Academic Start"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Academic End"
                    />
                  </div>
                </div>
                <div className="school-terms-container">
                  <div className="form-group term-group">
                    <div className="d-flex align-items-center">
                      <div className="select-wrapper">
                        <select name="terms" className="select-with-icon mr-2">
                          <option value="" selected="" disabled="">
                            School Terms
                          </option>
                          {/* Add options */}
                        </select>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary add-term"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Start Date"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="End Date"
                    />
                  </div>
                </div>
                <div className="form-group select-wrapper">
                  <select name="division" className="select-with-icon">
                    <option value="" selected="" disabled="">
                      School Division
                    </option>
                    {/* Add options */}
                  </select>
                </div>
                <div className="form-group select-wrapper">
                  <select name="year" className="select-with-icon">
                    <option value="" selected="" disabled="">
                      Year Group
                    </option>
                    {/* Add options */}
                  </select>
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
  );
}
