import React, { useState,useEffect } from 'react'
import {
  getCountryList,getReligionsList} from "../../utils/authApi";
function EditStudent({student,handleUpdate}) {
    const [countries, setCountries] = useState([]);
    const [religions, setReligions] = useState([]);
    const [editFormData,setEditFormData]= useState({
        first_name:"",
        last_name:"",
        class_id:"",
        country_id:"",
        country_of_birth_id:"",
        date_of_birth:"",
        religion_id:"",
        status:"",
        gender:"",
        profile_image:"",
        progress:"",
        category:"",
        student_id:""
        // school_code:"",
        // year_group_id:"",
        // academic_class_id:"",
        // school_division:"",
        // sen:"",
        // g_and_t:"",
        // eal:""
      });
      const getCountryData = async () => {
            try {
              const res = await getCountryList();
              console.log("country-list",res)
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
              console.log("religion-list",res)
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
    useEffect(() => {
        console.log("student",student,editFormData)
        if (student && student.id) {
          setEditFormData((prev) => ({
            ...prev,
            ...student,
            student_id: student.id,
          }));
        }
      }, [student]);
       useEffect(() => {
          getCountryData();
          getReligionData();
          }, []);
    const handleInputChange = (e) => {
        setEditFormData((prevData)=>({ ...prevData, [e.target.name]: e.target.value }));
      };

  return (<>
     {/* <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      > */}
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <div className="modal-header">
              <h5
                className="modal-title"
                id="editModalLabel"
                style={{ fontSize: "25px" }}
              >
                Edit Item
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closeEditModal"
              ></button>
            </div> */}
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
              <input
                style={{ fontSize: "14px" }}
                type="text"
                className="form-control"
                name="class_id"
                
                value={editFormData?.class_id}
                onChange={handleInputChange}
              />
            </div>
            <div className="modal-body">
              <label style={{ fontSize: "14px" }}>Nationality:</label>
              <select 
                  name="country_id"
                  value={editFormData.country_id}
                  onChange={handleInputChange}
                    className="select2 form-control">
                    <option value="">Nationality *</option>
                    {countries&&countries.map(contry=>{
                      return(<option key={contry.id} value={contry.id}>{contry.name}</option>)
                    })}
                  </select>
            </div>
            <div className="modal-body">
              <label style={{ fontSize: "14px" }}>Birth Country:</label>
              <select 
                  name="country_id"
                  value={editFormData.country_of_birth_id}
                  onChange={handleInputChange}
                    className="select2 form-control">
                    <option value="">Nationality *</option>
                    {countries&&countries.map(contry=>{
                      return(<option key={contry.id} value={contry.id}>{contry.name}</option>)
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
                            className="select2 form-control">
                              <option  value="">Please Select Religion *</option>
                           {religions&&religions.map(dharma=>{
                              return(<option key={dharma.id} value={dharma.id}>{dharma.name}</option>)
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
                className="select2 form-control">
                  <option value="">Please Select Gender *</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
            </div>
            <div className="modal-body">
              <label style={{ fontSize: "14px" }}>Profile Image</label>
              <input
                style={{ fontSize: "14px" }}
                type="file"
                className="form-control"
                name="status"
                onChange={handleInputChange}
              />
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
                            className="select2 form-control">
                              <option  value={editFormData?.category}>Please Select</option>
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
                onClick={()=>handleUpdate(editFormData)}
                style={{ fontSize: "12px" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      {/* </div> */}

  </>)
}

export default EditStudent