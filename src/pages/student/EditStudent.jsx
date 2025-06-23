import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getCountryList,
  getReligionsList,
  getAllClasses,
  updateStudentById,
} from "../../utils/authApi";

const EditStudent = ({ student, handleUpdate }) => {
  const [countries, setCountries] = useState([]);
  const [religions, setReligions] = useState([]);
  const [classData, setClassData] = useState([]);
  const [classHierarchy, setClassHierarchy] = useState([]);
  const [selectedDivisionId, setSelectedDivisionId] = useState("");
  const [selectedYearGroupId, setSelectedYearGroupId] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({ mode: "onBlur" });

  // Fetch dropdown data and class hierarchy
  useEffect(() => {
    (async () => {
      try {
        const [countryRes, religionRes, classRes] = await Promise.all([
          getCountryList(),
          getReligionsList(),
          getAllClasses(),
        ]);
        if (countryRes.status) setCountries(countryRes.data);
        if (religionRes.status) setReligions(religionRes.data);
        if (classRes.status) setClassData(classRes.data);
        // Fetch class hierarchy
        const userDataString = localStorage.getItem("userData");
        let schoolCurriculumId = null;
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          schoolCurriculumId = userData?.user?.school_details?.[0]?.curriculums?.[0]?.id;
        }
        if (schoolCurriculumId) {
          const res = await fetch(
            `https://server-php-8-3.technorizen.com/gradesphere/api/user/classes/get-class-hierarchy?school_curriculum_id=${schoolCurriculumId}`
          );
          const result = await res.json();
          if (result.status && result.data) setClassHierarchy(result.data);
        }
      } catch (error) {
        alert("Error loading dropdown data");
      }
    })();
  }, []);

  // Pre-fill form fields with student data
  useEffect(() => {
    if (student) {
      reset({
        ...student,
        profile_image: undefined,
        profile_image_2: undefined,
      });
      setSelectedDivisionId(student.school_division_id || "");
      setSelectedYearGroupId(student.year_group_id || "");
      setSelectedClassId(student.school_class_id || "");
    }
  }, [student, reset]);

  // Reset year group and class when division changes
  useEffect(() => {
    setSelectedYearGroupId("");
    setSelectedClassId("");
  }, [selectedDivisionId]);

  // Reset class when year group changes
  useEffect(() => {
    setSelectedClassId("");
  }, [selectedYearGroupId]);

  // Helpers for year groups and classes
  const yearGroups = React.useMemo(() => {
    if (!selectedDivisionId) return [];
    const div = classHierarchy.find(
      (item) => String(item.curriculum_division?.id) === String(selectedDivisionId)
    );
    return div?.curriculum_division?.classes || [];
  }, [selectedDivisionId, classHierarchy]);

  const classes = React.useMemo(() => {
    if (!selectedYearGroupId) return [];
    const yearGroup = yearGroups.find(
      (cls) => String(cls.id) === String(selectedYearGroupId)
    );
    return yearGroup?.school_classes || [];
  }, [selectedYearGroupId, yearGroups]);

  // Form submit handler
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("school_class_id", selectedClassId);
      formData.append("country_id", data.country_id);
      formData.append("country_of_birth_id", data.country_of_birth_id);
      formData.append("date_of_birth", data.date_of_birth);
      formData.append("religion_id", data.religion_id);
      formData.append("status", data.status || "");
      formData.append("gender", data.gender);
      formData.append("progress", data.progress || "");
      formData.append("category", data.category);
      formData.append("school_code", data.school_code);
      formData.append("year_group_id", selectedYearGroupId);
      formData.append("academic_class_id", data.academic_class_id || "");
      formData.append("sen", data.sen);
      formData.append("g_and_t", data.g_and_t);
      formData.append("eal", data.eal);
      formData.append("school_division_id", selectedDivisionId);
      formData.append("student_id", student.student_id);
      if (data.profile_image && data.profile_image.length > 0) {
        formData.append("profile_image", data.profile_image[0]);
      }
      if (data.profile_image_2 && data.profile_image_2.length > 0) {
        formData.append("profile_image_2", data.profile_image_2[0]);
      }
      await updateStudentById(student.student_id, formData);
      if (handleUpdate) handleUpdate(data, data.profile_image?.[0]);
    } catch (error) {
      alert("Error updating student");
    }
  };

  return (
    <form className="new-added-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        {/* Firstname */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Firstname *</label>
          <input
            type="text"
            placeholder="Enter Firstname"
            {...register("first_name", {
              required: "Firstname is required",
              minLength: { value: 3, message: "FirstName must be at least 3 characters" },
            })}
            className="form-control"
          />
          {errors.first_name && <p className="text-danger">{errors.first_name.message}</p>}
        </div>
        {/* Surname */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Surname *</label>
          <input
            type="text"
            placeholder="Enter Surname"
            {...register("last_name", {
              required: "Surname is required",
              minLength: { value: 3, message: "Surname must be at least 3 characters" },
            })}
            className="form-control"
          />
          {errors.last_name && <p className="text-danger">{errors.last_name.message}</p>}
        </div>
        {/* Date of Birth */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Date Of Birth *</label>
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            {...register("date_of_birth", { required: "Date of Birth is required" })}
            className="form-control air-datepicker"
          />
          {errors.date_of_birth && <p className="text-danger">{errors.date_of_birth.message}</p>}
        </div>
        {/* Nationality */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Nationality *</label>
          <select
            {...register("country_id", { required: "Nationality is required" })}
            className="select2 form-control"
          >
            <option value="">Select Nationality</option>
            {countries && countries.map((contry) => (
              <option key={contry.id} value={contry.id}>{contry.name}</option>
            ))}
          </select>
          {errors.country_id && <p className="text-danger">{errors.country_id.message}</p>}
        </div>
        {/* Birth Country */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Birth Country *</label>
          <select
            {...register("country_of_birth_id", { required: "Birth Country is required" })}
            className="select2 form-control"
          >
            <option value="">Select Birth Country</option>
            {countries && countries.map((contry) => (
              <option key={contry.id} value={contry.id}>{contry.name}</option>
            ))}
          </select>
          {errors.country_of_birth_id && <p className="text-danger">{errors.country_of_birth_id.message}</p>}
        </div>
        {/* Religion */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Religion *</label>
          <select
            {...register("religion_id", { required: "Religion is required" })}
            className="select2 form-control"
          >
            <option value="">Select Religion</option>
            {religions && religions.map((dharma) => (
              <option key={dharma.id} value={dharma.id}>{dharma.name}</option>
            ))}
          </select>
          {errors.religion_id && <p className="text-danger">{errors.religion_id.message}</p>}
        </div>
        {/* Gender */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Gender *</label>
          <select
            {...register("gender", { required: "Gender is required" })}
            className="select2 form-control"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
          {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
        </div>
        {/* File Uploads */}
        <div className="col-lg-8 col-12 form-group mg-t-30">
          <label className="text-dark-medium">Upload Student Photo (150px X 150px)</label>
          <input
            type="file"
            accept="image/*"
            {...register("profile_image")}
            className="form-control-file"
          />
        </div>
        <div className="col-lg-8 col-12 form-group mg-t-30">
          <label className="text-dark-medium">Upload Student Photo 2 (150px X 150px)</label>
          <input
            type="file"
            accept="image/*"
            {...register("profile_image_2")}
            className="form-control-file"
          />
        </div>
        {/* School Code */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>School Code*</label>
          <input
            type="text"
            placeholder="Enter School Code"
            className="form-control"
            {...register("school_code", { required: "School Code is required" })}
          />
          {errors.school_code && <span className="text-danger">{errors.school_code.message}</span>}
        </div>
        {/* Curriculum Division */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Curriculum Division*</label>
          <select
            className="form-control"
            value={selectedDivisionId}
            onChange={e => setSelectedDivisionId(e.target.value)}
            required
          >
            <option value="">Select Division</option>
            {classHierarchy.map((item) => (
              <option key={item.curriculum_division?.id} value={item.curriculum_division?.id}>
                {item.curriculum_division?.name}
              </option>
            ))}
          </select>
        </div>
        {/* Year Group */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Year Group*</label>
          <select
            className="form-control"
            value={selectedYearGroupId}
            onChange={e => setSelectedYearGroupId(e.target.value)}
            disabled={!selectedDivisionId}
            required
          >
            <option value="">Select Year Group</option>
            {yearGroups.map((cls) => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
        </div>
        {/* Class */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Class*</label>
          <select
            className="form-control"
            value={selectedClassId}
            onChange={e => setSelectedClassId(e.target.value)}
            disabled={!selectedYearGroupId}
            required
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
        </div>
        {/* SEN */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>SEN*</label>
          <select
            className="select2 form-control"
            {...register("sen", { required: "SEN is required" })}
          >
            <option value="">Please Select SEN</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.sen && <span className="text-danger">{errors.sen.message}</span>}
        </div>
        {/* G & T */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>G & T*</label>
          <select
            className="select2 form-control"
            {...register("g_and_t", { required: "G & T is required" })}
          >
            <option value="">Please Select G&T</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.g_and_t && <span className="text-danger">{errors.g_and_t.message}</span>}
        </div>
        {/* EAL */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>EAL*</label>
          <select
            className="select2 form-control"
            {...register("eal", { required: "EAL is required" })}
          >
            <option value="">Please Select EAL</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.eal && <span className="text-danger">{errors.eal.message}</span>}
        </div>
        {/* Category */}
        <div className="col-xl-4 col-lg-6 col-12 form-group">
          <label>Category</label>
          <select className="select2 form-control" {...register("category")}>
            <option value="">Please Select</option>
            <option value="ESL">ESL</option>
            <option value="GEN">GEN</option>
          </select>
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

export default EditStudent;
