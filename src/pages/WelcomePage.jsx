// import React, { useState } from "react";
// import logo from "../assets/assets/img/upbg.png";
// import { Link, useNavigate } from "react-router-dom";
// import bg from "../assets/assets/logo.png";

// const WelcomePage = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = () => {};

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await signInAdmin(formData);
//       console.log("Response", res);
//     } catch (error) {

//     }
//   };

//   return (
//     <div className="login-30 tab-box" style={{ overflow: "hidden" }}>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-lg-7 col-md-12 form-section">
//             <div className="login-inner-form">
//               <div className="details">
//                 <h1 className="mb-5">Welcome Back</h1>
//                 <form onSubmit={handleSubmit}>
//                   <div className="form-group">
//                     <input
//                       name="email"
//                       type="email"
//                       className="form-control"
//                       id="first_field"
//                       placeholder="Email"
//                       aria-label="Email Address"
//                     />
//                   </div>
//                   <div className="form-group clearfix">
//                     <input
//                       name="password"
//                       type="password"
//                       className="form-control"
//                       autoComplete="off"
//                       id="second_field"
//                       placeholder="Password"
//                       aria-label="Password"
//                     />
//                   </div>
//                   <div className="checkbox form-group clearfix">
//                     <div className="float-start">
//                       <label className="form-check-label" htmlFor="rememberme">
//                         By continuing, you are acknowledging that you have read,
//                         understood and agreed to Mansha's{" "}
//                         <a href="#">Terms and Conditions</a> and
//                         <a href="#">Privacy Policy</a>
//                       </label>
//                     </div>
//                   </div>
//                   <div
//                     className="form-group mb-3"
//                     style={{ textAlign: "right" }}
//                   >
//                     <button type="submit" className="btn btn-primary w-25">
//                       Enter
//                     </button>
//                   </div>
//                   {/* <div className="text-center">
//                     <label className="form-check-label" htmlFor="rememberme">
//                       If you don't have an account, Please{" "}
//                       <Link to="/">Sign Up Now</Link>
//                     </label>
//                   </div> */}
//                 </form>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-5 col-md-12 bg-img position-relative">
//             <div id="bg">
//               <h5 className="text-white">Sign In</h5>
//             </div>
//             <img src={logo} style={{ position: "absolute", right: "20%" }} />
//             <div className="text-center">
//               <img
//                 src={bg}
//                 alt="logo"
//                 style={{ width: 250, marginBottom: 50 }}
//               />
//               <h4 className="text-white mt-2 mb-3">Welcome to Schooleo </h4>
//               <p className="text-white">
//                 Login to get started with Schooleo
//                 <br />
//                 If not yet registered click on sign up
//                 <br />
//                 to get started
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WelcomePage;
import React, { useEffect, useState } from "react";
import logo from "../assets/assets/img/upbg.png";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/assets/logo.png";
import { signInAdmin } from "../utils/authApi";
import Swal from "sweetalert2";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userTokenStudent");
    const userData = localStorage.getItem("userStudentData");

    if (token && userData) {
      navigate("/");
    }
  }, [navigate]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signInAdmin(formData);
      console.log("Response:", res);

      if (res.status) {
        localStorage.setItem("userTokenStudent", res.token);
        localStorage.setItem("userStudentData", JSON.stringify(res.admin));

        navigate("/");
      } else {
        setError(res.message || "Login failed!");
        // Swal.fire("Error!", res.message || "Login failed!", "error");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong. Please try again.");
      // Swal.fire("Error!", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupNevigation=()=>{
    navigate("/signup")
  }

  return (
    <div className="login-30 tab-box" style={{ overflow: "hidden" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-7 col-md-12 form-section">
            <div className="login-inner-form">
              <div className="details">
                <h1 className="mb-5">Welcome Back</h1>
                {error && (
                  <div
                    className="alert alert-danger"
                    style={{ fontSize: "15px" }}
                  >
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      id="first_field"
                      placeholder="Email"
                      aria-label="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group clearfix">
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      autoComplete="off"
                      id="second_field"
                      placeholder="Password"
                      aria-label="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="checkbox form-group clearfix">
                    <label className="form-check-label">
                      By continuing, you acknowledge that you have read,
                      understood, and agreed to{" "}
                      <a href="#">Terms and Conditions</a> and{" "}
                      <a href="#">Privacy Policy</a>.
                    </label>
                  </div>
                  <div
                    className="form-group mb-3"
                    style={{ textAlign: "right" }}
                  >
                    <button
                      type="submit"
                      className="btn btn-primary w-25"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Enter"}
                    </button>
                  </div>
                  <div className="text-center">
                             <label class="form-check-label" for="rememberme">
                               
                                If you don't have an account, Please <a href="#" onClick={handleSignupNevigation}>Sign Up Now</a>
                            </label>
                        </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 bg-img position-relative">
            <div id="bg">
              <h5 className="text-white">Sign In</h5>
            </div>
            <img
              src={logo}
              style={{ position: "absolute", right: "20%" }}
              alt="Background"
            />
            <div className="text-center">
              <img
                src={bg}
                alt="logo"
                style={{ width: 250, marginBottom: 50 }}
              />
              <h4 className="text-white mt-2 mb-3">Welcome to Schooleo</h4>
              <p className="text-white">
                Login to get started with Schooleo
                <br />
                If not yet registered, click on sign up
                <br />
                to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
