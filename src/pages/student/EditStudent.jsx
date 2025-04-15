import { useState, useEffect, useRef } from "react";
import {
  getCountryList,
  getReligionsList,
  getAllClasses,
} from "../../utils/authApi";

import { useForm } from "react-hook-form";
function EditStudent({ student, handleUpdate }) {
  const fileInputRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [religions, setReligions] = useState([]);
  const [classData, setClassData] = useState([]);
  const [profileImageFile, setProfileImageFile] = useState(null); // only set when changed

  const [editFormData, setEditFormData] = useState({
    first_name: "",
    last_name: "",
    class_id: "",
    country_id: "",
    country_of_birth_id: "",
    date_of_birth: "",
    religion_id: "",
    status: "",
    gender: "",
    profile_image: "",
    progress: "",
    category: "",
    student_id: "",
  });

  const [previewImage, setPreviewImage] = useState(editFormData?.profile_image);
  const getCountryData = async () => {
    try {
      const res = await getCountryList();
      console.log("country-list", res);
      if (res.status) {
        setCountries(res.data);
      }
    } catch (error) {
      console.error("Error fetching country data:", error);
      if (error.message) {
        console.error("Response Error:", error.response.data);
        alert(
          `Error: ${error.response.data.message || "Something went wrong"}`
        );
      } else if (error.request) {
        console.error("Network Error:", error.request);
        alert("Network error. Please check your internet connection.");
      } else {
        console.error("Unexpected Error:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };
  const getReligionData = async () => {
    try {
      const res = await getReligionsList();
      console.log("religion-list", res);
      if (res.status) {
        setReligions(res.data);
      }
    } catch (error) {
      console.error("Error fetching religion data:", error);
      if (error.message) {
        console.error("Response Error:", error.response.data);
        alert(
          `Error: ${error.response.data.message || "Something went wrong"}`
        );
      } else if (error.request) {
        console.error("Network Error:", error.request);
        alert("Network error. Please check your internet connection.");
      } else {
        console.error("Unexpected Error:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const getClassData = async () => {
    try {
      const res = await getAllClasses();
      console.log("class-list", res);
      if (res.status) {
        setClassData(res.data);
      }
    } catch (error) {
      console.error("Error fetching class data:", error);
      if (error.message) {
        console.error("Response Error:", error.response.data);
        alert(
          `Error: ${error.response.data.message || "Something went wrong"}`
        );
      } else if (error.request) {
        console.error("Network Error:", error.request);
        alert("Network error. Please check your internet connection.");
      } else {
        console.error("Unexpected Error:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };
  useEffect(() => {
    console.log("student", student, editFormData);
    if (student && student.id) {
      setEditFormData((prev) => ({
        ...prev,
        ...student,
        student_id: student.id,
      }));
    } else {
      // Clean up if needed
      setEditFormData({});
    }
  }, [student]);

  useEffect(() => {
    getCountryData();
    getReligionData();
    getClassData();
  }, []);

  useEffect(() => {
    setPreviewImage(editFormData?.profile_image);
  }, [editFormData]);

  const handleInputChange = (e) => {
    setEditFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Trigger file input when image is clicked
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Handle file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file); // keep file separately
      // setPreviewImage(URL.createObjectURL(file)); // show new preview
    }
  };
  const handleFormSubmit = () => {
    handleUpdate(editFormData, profileImageFile); // pass file only if changed
  };

  return (
    <>
      {/* <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      > */}
      <div className="modal-dialog">
        <div className="modal-content">
          <div clasNames="d-flex mb-2">
            <div
              className="mr-3"
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            >
              <img
                src={previewImage}
                style={{ width: "10em", height: "10em", borderRadius: "50%" }}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div>
              <h6 className="mb-0 mt-2">
                {editFormData?.first_name} {editFormData?.last_name}
              </h6>
              <p>
                Student Code: <span>5452</span>
              </p>
            </div>
          </div>
          <div className="modal-body">
            <label style={{ fontSize: "14px" }}>First Name:</label>
            <input
              style={{ fontSize: "14px" }}
              type="text"
              className="form-control"
              name="first_name"
              value={editFormData?.first_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-body">
            <label style={{ fontSize: "14px" }}>Last Name:</label>
            <input
              style={{ fontSize: "14px" }}
              type="text"
              className="form-control"
              name="last_name"
              value={editFormData?.last_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-body">
            <label style={{ fontSize: "14px" }}>Class:</label>
            <select
              name="class_id"
              value={editFormData.class_id}
              onChange={handleInputChange}
              className="select2 form-control"
            >
              <option value="">Class *</option>
              {classData &&
                classData.map((cls) => {
                  return (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="modal-body">
            <label style={{ fontSize: "14px" }}>Nationality:</label>
            <select
              name="country_id"
              value={editFormData.country_id}
              onChange={handleInputChange}
              className="select2 form-control"
            >
              <option value="">Nationality *</option>
              {countries &&
                countries.map((contry) => {
                  return (
                    <option key={contry.id} value={contry.id}>
                      {contry.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="modal-body">
            <label style={{ fontSize: "14px" }}>Birth Country:</label>
            <select
              name="country_id"
              value={editFormData.country_of_birth_id}
              onChange={handleInputChange}
              className="select2 form-control"
            >
              <option value="">Nationality *</option>
              {countries &&
                countries.map((contry) => {
                  return (
                    <option key={contry.id} value={contry.id}>
                      {contry.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="modal-body">
            <label style={{ fontSize: "14px" }}>Birth Date:</label>
            <input
              style={{ fontSize: "14px" }}
              type="date"
              className="form-control"
              name="date_of_birth"
              value={editFormData?.date_of_birth}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-body">
            <label style={{ fontSize: "14px" }}>Religion:</label>
            <select
              name="religion_id"
              value={editFormData.religion_id}
              onChange={handleInputChange}
              className="select2 form-control"
            >
              <option value="">Please Select Religion *</option>
              {religions &&
                religions.map((dharma) => {
                  return (
                    <option key={dharma.id} value={dharma.id}>
                      {dharma.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="modal-body">
            <label style={{ fontSize: "14px" }}>Status:</label>
            <input
              style={{ fontSize: "14px" }}
              type="text"
              className="form-control"
              name="status"
              value={editFormData?.status}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-body">
            <label style={{ fontSize: "14px" }}>Gender:</label>
            <select
              name="gender"
              value={editFormData.gender}
              onChange={handleInputChange}
              className="select2 form-control"
            >
              <option value="">Please Select Gender *</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="modal-body">
            <label style={{ fontSize: "14px" }}>progress:</label>
            <input
              style={{ fontSize: "14px" }}
              type="text"
              className="form-control"
              name="progress"
              value={editFormData?.progress}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-body">
            <label style={{ fontSize: "14px" }}>category:</label>
            <select
              name="category"
              value={editFormData?.category}
              onChange={handleInputChange}
              className="select2 form-control"
            >
              <option value="">Please Select</option>
              <option value="ESL">ESL</option>
              <option value="ESL">GEN</option>
            </select>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              style={{ fontSize: "12px" }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleFormSubmit}
              style={{ fontSize: "12px" }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
  // return(<>
  // <EditStudentUI selectedStudent={student} handleUpdate={handleUpdate} countries={countries} religions={religions} classData={classData}/>
  // </>)
}

export default EditStudent;

const EditStudentUI = ({
  selectedStudent,
  handleUpdate,
  countries,
  religions,
  classData,
}) => {
  const fileInputRef = useRef();
  // const [profileImageFile, setProfileImageFile] = useState(null); // only set when changed
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: selectedStudent,
  });

  const profileImage = watch("profile_image");

  // Set values when modal is opened with selected student
  useEffect(() => {
    if (selectedStudent) {
      Object.keys(selectedStudent).forEach((key) => {
        setValue(key, selectedStudent[key]);
      });
    }
  }, [selectedStudent]);

  // const onSubmit = (data) => {
  //   // const formData = new FormData();

  //   // for (const key in data) {
  //   //   if (key === "profile_image") {
  //   //     if (data.profile_image && data.profile_image.length > 0) {
  //   //       formData.append("profile_image", data.profile_image[0]); // Only append if changed
  //   //     }
  //   //   } else {
  //   //     formData.append(key, data[key]);
  //   //   }
  //   // }

  //   handleUpdate(formData); // Pass it back to parent
  // };

  const handleFormSubmit = (data, e) => {
    e?.preventDefault(); // Optional, safe fallback
    console.log("editFormData", data);
    const formData = new FormData();
    for (const key in data) {
      if (key === "profile_image") {
        if (data.profile_image && data.profile_image.length > 0) {
          formData.append("profile_image", data.profile_image[0]); // Only append if changed
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    handleUpdate(formData); // pass file only if changed
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="d-flex mb-2">
            <div
              className="mr-3"
              onClick={() => fileInputRef.current.click()}
              style={{ cursor: "pointer" }}
            >
              <img
                src={
                  profileImage && profileImage.length > 0
                    ? URL.createObjectURL(profileImage[0])
                    : selectedStudent?.profile_image
                }
                style={{ width: "10em", height: "10em", borderRadius: "50%" }}
                alt="profile"
              />
              <input
                type="file"
                {...register("profile_image")}
                ref={(e) => {
                  register("profile_image").ref(e);
                  fileInputRef.current = e;
                }}
                style={{ display: "none" }}
                accept="image/*"
              />
            </div>
            <div>
              <h6 className="mb-0 mt-2">
                {selectedStudent?.first_name} {selectedStudent?.last_name}
              </h6>
              <p>
                Student Code: <span>5452</span>
              </p>
            </div>
          </div>

          {/* Input fields */}
          <div className="modal-body">
            <label>First Name:</label>
            <input
              className="form-control"
              {...register("first_name", {
                required: "First name is required",
              })}
            />
            {errors.first_name && (
              <span className="text-danger">{errors.first_name.message}</span>
            )}
          </div>

          <div className="modal-body">
            <label>Last Name:</label>
            <input className="form-control" {...register("last_name")} />
          </div>

          <div className="modal-body">
            <label>Class:</label>
            <select className="form-control" {...register("class_id")}>
              <option value="">Class *</option>
              {classData?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-body">
            <label>Nationality:</label>
            <select className="form-control" {...register("country_id")}>
              <option value="">Nationality *</option>
              {countries?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-body">
            <label>Birth Country:</label>
            <select
              className="form-control"
              {...register("country_of_birth_id")}
            >
              <option value="">Select Country</option>
              {countries?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-body">
            <label>Birth Date:</label>
            <input
              type="date"
              className="form-control"
              {...register("date_of_birth")}
            />
          </div>

          <div className="modal-body">
            <label>Religion:</label>
            <select className="form-control" {...register("religion_id")}>
              <option value="">Select Religion</option>
              {religions?.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-body">
            <label>Status:</label>
            <input className="form-control" {...register("status")} />
          </div>

          <div className="modal-body">
            <label>Gender:</label>
            <select className="form-control" {...register("gender")}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="modal-body">
            <label>Progress:</label>
            <input className="form-control" {...register("progress")} />
          </div>

          <div className="modal-body">
            <label>Category:</label>
            <select className="form-control" {...register("category")}>
              <option value="">Please Select</option>
              <option value="ESL">ESL</option>
              <option value="GEN">GEN</option>
            </select>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
