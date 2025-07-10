import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const mockDepartments = ["Mathematics", "Science", "English", "Arts"];
const mockSubjects = ["Math", "Physics", "Chemistry", "Biology", "English", "History"];
const mockYearGroups = ["Year 1", "Year 2", "Year 3", "Year 4"];
const mockClasses = ["A", "B", "C", "D"];
const mockRoles = ["Teacher", "Head of Department", "Assistant"];

const EditTeacher = ({ teacher, handleUpdate }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onBlur" });

  useEffect(() => {
    if (teacher) {
      reset({ ...teacher, photo: undefined });
    }
  }, [teacher, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "photo" && value && value.length > 0) {
        formData.append("photo", value[0]);
      } else {
        formData.append(key, value);
      }
    });
    // For now, just log the data
    const payload = {};
    formData.forEach((value, key) => { payload[key] = value; });
    console.log("Teacher Edit Payload:", payload);
    if (handleUpdate) handleUpdate(data, data.photo?.[0]);
  };

  return (
    <form className="new-added-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        {/* Forename */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Forename *</label>
          <input type="text" placeholder="Enter Forename" className="form-control"
            {...register("forename", { required: "Forename is required" })} />
          {errors.forename && <p className="text-danger">{errors.forename.message}</p>}
        </div>
        {/* Surname */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Surname *</label>
          <input type="text" placeholder="Enter Surname" className="form-control"
            {...register("surname", { required: "Surname is required" })} />
          {errors.surname && <p className="text-danger">{errors.surname.message}</p>}
        </div>
        {/* Email */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Email *</label>
          <input type="email" placeholder="Email" className="form-control"
            {...register("email", { required: "Email is required" })} />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>
        {/* Department */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Department *</label>
          <select className="form-control" {...register("department", { required: "Department is required" })}>
            <option value="">Department *</option>
            {mockDepartments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
          </select>
          {errors.department && <p className="text-danger">{errors.department.message}</p>}
        </div>
        {/* Subject */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Subject *</label>
          <select className="form-control" {...register("subject", { required: "Subject is required" })}>
            <option value="">Subject *</option>
            {mockSubjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
          </select>
          {errors.subject && <p className="text-danger">{errors.subject.message}</p>}
        </div>
        {/* Year Group */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Year Group *</label>
          <select className="form-control" {...register("year_group", { required: "Year Group is required" })}>
            <option value="">Year Group *</option>
            {mockYearGroups.map(yg => <option key={yg} value={yg}>{yg}</option>)}
          </select>
          {errors.year_group && <p className="text-danger">{errors.year_group.message}</p>}
        </div>
        {/* Class */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Class *</label>
          <select className="form-control" {...register("class", { required: "Class is required" })}>
            <option value="">Class *</option>
            {mockClasses.map(cls => <option key={cls} value={cls}>{cls}</option>)}
          </select>
          {errors.class && <p className="text-danger">{errors.class.message}</p>}
        </div>
        {/* Role */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Role *</label>
          <select className="form-control" {...register("role", { required: "Role is required" })}>
            <option value="">Role *</option>
            {mockRoles.map(role => <option key={role} value={role}>{role}</option>)}
          </select>
          {errors.role && <p className="text-danger">{errors.role.message}</p>}
        </div>
        {/* Photo Upload */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Upload Photo (150px X 150px)</label>
          <input type="file" accept="image/*" className="form-control-file"
            {...register("photo")}
          />
        </div>
        {/* Submit */}
        <div className="col-12 form-group mg-t-8">
          <button type="submit" className="btn-fill-lg btn-gradient-blue1 btn-hover-bluedark">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditTeacher; 