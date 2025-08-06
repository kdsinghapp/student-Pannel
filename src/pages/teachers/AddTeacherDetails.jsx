import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Headers from "../../components/Headers";
import Sidebar from "../../components/Sidebar";
import Select from "react-select";
const API_URL = "https://server-php-8-3.technorizen.com/gradesphere/api";

const AddTeacherDetails = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({ mode: "onBlur" });
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [roles, setRoles] = useState([]);
  const [classes, setClasses] = useState([]);
  const [yearGroups, setYearGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [depRes, roleRes, classRes] = await Promise.all([
          axios.get(`${API_URL}/user/department/get-departments`),
          axios.get(`${API_URL}/user/teacher-role/get-teacher-roles`),
          axios.get(`${API_URL}/user/classes/get-class-hierarchy?school_curriculum_id=5`)
        ]);
        setDepartments(depRes.data.data || []);
        setRoles(roleRes.data.data || []);
        // Flatten all school_classes from all divisions/classes
        const allSchoolClasses = [];
        const allYearGroups = [];
        (classRes.data.data || []).forEach((item) => {
          if (item.curriculum_division) {
            allYearGroups.push({
              id: item.curriculum_division.id,
              name: item.curriculum_division.name
            });
            (item.curriculum_division.classes || []).forEach((cls) => {
              (cls.school_classes || []).forEach((sc) => {
                allSchoolClasses.push(sc);
              });
            });
          }
        });
        setClasses(allSchoolClasses);
        setYearGroups(allYearGroups);
      } catch (err) {
        setError("Failed to fetch dropdown data");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const depId = watch("department_id");
    if (depId) {
      const dep = departments.find((d) => d.id === parseInt(depId));
      setSubjects(dep?.subjects || []);
      setSelectedSubjects([]); // Reset subjects selection when department changes
    } else {
      setSubjects([]);
      setSelectedSubjects([]);
    }
  }, [watch("department_id"), departments]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("email", data.email);
      formData.append("department_id", data.department_id);
      formData.append("teacher_role_id", data.teacher_role_id);
      if (data.year_group_id) formData.append("year_group_id", data.year_group_id);
      // Use selectedClasses and selectedSubjects from react-select
      selectedClasses.forEach((cls, idx) => {
        formData.append(`assigned_classes[${idx}]`, cls.value);
      });
      selectedSubjects.forEach((sub, idx) => {
        formData.append(`assigned_subjects[${idx}]`, sub.value);
      });
      if (data.profile_image && data.profile_image[0]) {
        formData.append("profile_image", data.profile_image[0]);
      }
      const token = localStorage.getItem("userTokenStudent");
      const res = await axios.post(`${API_URL}/user/teacher/add-teacher`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.status) {
        setSuccess("Teacher added successfully!");
        reset();
        setSelectedClasses([]);
        setSelectedSubjects([]);
      } else {
        setError(res.data.message || "Failed to add teacher");
      }
    } catch (err) {
      setError("Failed to add teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="wrapper" className="wrapper bg-ash">
      <Headers />
      <div className="dashboard-page-one">
        <Sidebar />
        <div className="dashboard-content-one">
          <div className="breadcrumbs-area d-flex justify-content-between ">
            <h3>Add Teacher Details</h3>
          </div>
          <div className="card height-auto">
            <div className="card-body">
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <form className="new-added-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-xl-4 col-lg-6 col-12 form-group">
                    <label>First Name *</label>
                    <input type="text" placeholder="Enter First Name" className="form-control"
                      {...register("first_name", { required: "First name is required" })} />
                    {errors.first_name && <p className="text-danger">{errors.first_name.message}</p>}
                  </div>
                  <div className="col-xl-4 col-lg-6 col-12 form-group">
                    <label>Last Name *</label>
                    <input type="text" placeholder="Enter Last Name" className="form-control"
                      {...register("last_name", { required: "Last name is required" })} />
                    {errors.last_name && <p className="text-danger">{errors.last_name.message}</p>}
                  </div>
                  <div className="col-xl-4 col-lg-6 col-12 form-group">
                    <label>Email *</label>
                    <input type="email" placeholder="Email" className="form-control"
                      {...register("email", { required: "Email is required" })} />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                  </div>
                  <div className="col-xl-4 col-lg-6 col-12 form-group">
                    <label>Year Group *</label>
                    <select className="form-control" {...register("year_group_id", { required: "Year Group is required" })}>
                      <option value="">Select Year Group</option>
                      {yearGroups.map(yg => <option key={yg.id} value={yg.id}>{yg.name}</option>)}
                    </select>
                    {errors.year_group_id && <p className="text-danger">{errors.year_group_id.message}</p>}
                  </div>
                  <div className="col-xl-4 col-lg-6 col-12 form-group">
                    <label>Department *</label>
                    <select className="form-control" {...register("department_id", { required: "Department is required" })}>
                      <option value="">Select Department</option>
                      {departments.map(dep => <option key={dep.id} value={dep.id}>{dep.name}</option>)}
                    </select>
                    {errors.department_id && <p className="text-danger">{errors.department_id.message}</p>}
                  </div>
                  <div className="col-xl-4 col-lg-6 col-12 form-group">
                    <label>Role *</label>
                    <select className="form-control" {...register("teacher_role_id", { required: "Role is required" })}>
                      <option value="">Select Role</option>
                      {roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
                    </select>
                    {errors.teacher_role_id && <p className="text-danger">{errors.teacher_role_id.message}</p>}
                  </div>
                  <div className="col-xl-4 col-lg-6 col-12 form-group">
                    <label>Assigned Classes *</label>
                    <Select
                      isMulti
                      options={classes.map(cls => ({ value: cls.id, label: cls.name }))}
                      value={selectedClasses}
                      onChange={selected => setSelectedClasses(selected || [])}
                      classNamePrefix="react-select"
                      placeholder="Select Classes"
                    />
                    {selectedClasses.length === 0 && <p className="text-danger">At least one class is required</p>}
                  </div>
                  <div className="col-xl-4 col-lg-6 col-12 form-group">
                    <label>Assigned Subjects *</label>
                    <Select
                      isMulti
                      options={subjects.map(sub => ({ value: sub.id, label: sub.name }))}
                      value={selectedSubjects}
                      onChange={selected => setSelectedSubjects(selected || [])}
                      classNamePrefix="react-select"
                      placeholder="Select Subjects"
                    />
                    {selectedSubjects.length === 0 && <p className="text-danger">At least one subject is required</p>}
                  </div>
                  <div className="col-xl-4 col-lg-6 col-12 form-group">
                    <label>Profile Image</label>
                    <input type="file" accept="image/*" className="form-control-file"
                      {...register("profile_image")} />
                  </div>
                  <div className="col-12 form-group mg-t-8">
                    <button type="submit" className="btn-fill-lg btn-gradient-blue1 btn-hover-bluedark" disabled={loading}>
                      {loading ? "Adding..." : "Add Teacher"}
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

export default AddTeacherDetails;