// Fetch class hierarchy for one or more school curriculum IDs
export const getClassHierarchy = async (schoolCurriculumIds) => {
  const token = localStorage.getItem("userTokenStudent");
  // Accepts a single ID or an array of IDs
  let query = "";
  if (Array.isArray(schoolCurriculumIds)) {
    query = schoolCurriculumIds.map(id => `school_curriculum_id[]=${id}`).join("&");
  } else if (schoolCurriculumIds) {
    query = `school_curriculum_id[]=${schoolCurriculumIds}`;
  }
  try {
    const res = await axios.get(
      `${API_URL}/user/classes/get-class-hierarchy?${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching class hierarchy:", error);
    throw error;
  }
};
import axios from "axios";

const API_URL = "https://server-php-8-3.technorizen.com/gradesphere/api";
const token = localStorage.getItem("userTokenStudent");

export const signInAdmin = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/user/login`, data);
    const responseData = res.data;

    if (responseData?.user) {
      localStorage.setItem("userStudentData", JSON.stringify(responseData));
      console.log("userStudentData stored");

      const fullName = `${responseData.user.first_name} ${responseData.user.last_name}`;
      localStorage.setItem("userName", fullName);

      // Save school_id from first school_details item
      if (
        Array.isArray(responseData.user.school_details) &&
        responseData.user.school_details.length > 0 &&
        responseData.user.school_details[0].id
      ) {
        localStorage.setItem("school_id", responseData.user.id);
        console.log("school_id stored:", responseData.user.id);

        // Save first curriculum id as school_curriculum_id
        const curriculums = responseData.user.school_details[0].curriculums;
        if (Array.isArray(curriculums) && curriculums.length > 0 && curriculums[0].id) {
          localStorage.setItem("school_curriculum_id", curriculums[0].id);
          console.log("school_curriculum_id stored:", curriculums[0].id);

          // Save all curriculum ids as an array
          const curriculumIds = curriculums.map(c => c.id);
          localStorage.setItem("school_curriculum_ids", JSON.stringify(curriculumIds));
          console.log("school_curriculum_ids stored:", curriculumIds);
        }
      }
    }

    return responseData;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};


export const getAllClasses = async () => {
  const token = localStorage.getItem("userTokenStudent");
  const schoolCurriculumId = localStorage.getItem("school_curriculum_id");
  try {
    const res = await axios.get(`${API_URL}/user/classes?school_curriculum_id=${schoolCurriculumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};


export const getClassById = async (id) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.get(`${API_URL}/user/classes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

export const deleteClassById = async (id) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.delete(`${API_URL}/user/classes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

export const updateClassById = async (id, data) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.put(`${API_URL}/user/classes/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error updating class:", error);
    throw error;
  }
};


export const addClasses = async (formData) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.post(`${API_URL}/user/classes`,formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};


// -------------Student -----------------------
export const getAllStudents = async () => {
  const token = localStorage.getItem("userTokenStudent");
  const schoolCurriculumId = localStorage.getItem("school_curriculum_id");
  try {
    const res = await axios.get(`${API_URL}/user/student/get-students?limit=1000&page=1&school_curriculum_id[0]=${schoolCurriculumId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

export const getStudentById = async (id) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.get(`${API_URL}/user/student/get-student?student_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching student:", error);
    throw error;
  }
};

export const deleteStudentById = async (id) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.get(`${API_URL}/user/student/delete-student?student_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

export const updateStudentById = async (id, data) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.post(`${API_URL}/user/student/update-student`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating class:", error);
    throw error;
  }
};


export const addStudents = async (formData) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.post(`${API_URL}/user/student/add-student`,formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};


// ----------------------COUNTRY--------------

export const getCountryList = async () => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.get(`${API_URL}/user/countries`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};


export const getReligionsList = async () => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.get(`${API_URL}/user/religions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

export const getTeachers = async()=> {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.get(`${API_URL}user/teacher/get-teachers?limit=10&page=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

// -------------Teachers -----------------------
export const getAllTeachers = async () => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.get(`${API_URL}/user/teacher/get-teachers?limit=1000&page=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw error;
  }
};
// Delete teacher by ID
export const deleteTeacherById = async (id) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.get(`${API_URL}/user/teacher/delete-teacher?teacher_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting teacher:", error);
    throw error;
  }
};

  // Fetch grading schemas
  export const getGradingSchemas = async () => {
    const token = localStorage.getItem("userTokenStudent");
    try {
      const res = await axios.get(`${API_URL}/user/grading/get-grading-schemas`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching grading schemas:", error);
      throw error;
    }
  };

  export const addGradingSchema = async (formData) => {
    const token = localStorage.getItem("userTokenStudent");
    try {
      const res = await axios.post(
        `${API_URL}/user/grading/add-grading-schema`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error adding grading schema:", error);
      throw error;
    }
  };

// Delete grading schema by ID
export const deleteGradingSchemaById = async (id) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.delete(`${API_URL}/user/grading/grading-schema/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting grading schema:", error);
    throw error;
  }
};

// Get grading schemas by school ID
export const getGradingSchemasBySchoolId = async (schoolId) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.get(`${API_URL}/user/grading/grading-schema?school_id=${schoolId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching grading schemas by school ID:", error);
    throw error;
  }
};

// Get school curriculums by school ID
export const getSchoolCurriculums = async (schoolId) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.get(`${API_URL}/user/grading/school-curriculums?school_id=${schoolId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching school curriculums:", error);
    throw error;
  }
};

// Add grading schema with categories and progress categories
export const addGradingSchemaWithDetails = async (formData) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    // Convert form data to FormData object for proper encoding
    const encodedData = new FormData();
    
    // Add simple fields
    encodedData.append("description", formData.description);
    encodedData.append("school_curriculum_id", formData.school_curriculum_id);
    
    // Add grading categories
    if (Array.isArray(formData.grading_categories)) {
      formData.grading_categories.forEach((category, catIdx) => {
        encodedData.append(`grading_categories[${catIdx}][category_name]`, category.category_name);
        encodedData.append(`grading_categories[${catIdx}][description]`, category.description);
        encodedData.append(`grading_categories[${catIdx}][weightage]`, category.weightage);
        
        // Add values for each category
        if (Array.isArray(category.values)) {
          category.values.forEach((value, valIdx) => {
            encodedData.append(`grading_categories[${catIdx}][values][${valIdx}][grade_value]`, value.grade_value);
            encodedData.append(`grading_categories[${catIdx}][values][${valIdx}][min_percentage]`, value.min_percentage);
            encodedData.append(`grading_categories[${catIdx}][values][${valIdx}][max_percentage]`, value.max_percentage);
            encodedData.append(`grading_categories[${catIdx}][values][${valIdx}][color]`, value.color);
            encodedData.append(`grading_categories[${catIdx}][values][${valIdx}][description]`, value.description);
          });
        }
      });
    }
    
    // Add progress categories
    if (Array.isArray(formData.progress_categories)) {
      formData.progress_categories.forEach((progCat, progIdx) => {
        encodedData.append(`progress_categories[${progIdx}][category_name]`, progCat.category_name);
        encodedData.append(`progress_categories[${progIdx}][description]`, progCat.description);
        
        // Add values for each progress category
        if (Array.isArray(progCat.values)) {
          progCat.values.forEach((value, valIdx) => {
            encodedData.append(`progress_categories[${progIdx}][values][${valIdx}][min_progress]`, value.min_progress);
            encodedData.append(`progress_categories[${progIdx}][values][${valIdx}][max_progress]`, value.max_progress);
            encodedData.append(`progress_categories[${progIdx}][values][${valIdx}][color]`, value.color);
            encodedData.append(`progress_categories[${progIdx}][values][${valIdx}][description]`, value.description);
            encodedData.append(`progress_categories[${progIdx}][values][${valIdx}][grade_description]`, value.grade_description);
          });
        }
      });
    }
    
    const res = await axios.post(`${API_URL}/user/grading/add-grading-schema`, encodedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error adding grading schema:", error);
    throw error;
  }
};

// Update grading schema by ID
export const updateGradingSchemaById = async (id, formData) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.put(`${API_URL}/user/grading/grading-schema/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating grading schema:", error);
    throw error;
  }
};

// Get grading schema by ID
export const getGradingSchemaById = async (id) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.get(`${API_URL}/user/grading/grading-schema/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching grading schema by ID:", error);
    throw error;
  }
};

// ---------------------- DEPARTMENTS ----------------------
export const getDepartments = async (school_id = null) => {
  const token = localStorage.getItem("userTokenStudent");
  let url = `${API_URL}/user/departments`;
  if (school_id) url += `?school_id=${school_id}`;

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data; // { status, message, data }
  } catch (error) {
    console.error("Error fetching departments:", error);
    return { status: false, message: "Failed to fetch departments", data: [] };
  }
};



// ---------------------- DEPARTMENTS ----------------------


// ✅ Get all departments (optionally filter by school_id)
export const getAllDepartments = async (school_id = null) => {
  const token = localStorage.getItem("userTokenStudent");
  let url = `${API_URL}/user/departments`;
  if (school_id) url += `?school_id=${school_id}`;

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data; // { status, message, data }
  } catch (error) {
    console.error("Error fetching departments:", error);
    return { status: false, message: "Failed to fetch departments", data: [] };
  }
};

// ✅ Get department by ID
export const getDepartmentById = async (id) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.get(`${API_URL}/user/departments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data; // { status, message, data }
  } catch (error) {
    console.error("Error fetching department:", error);
    return { status: false, message: "Failed to fetch department", data: null };
  }
};

// ✅ Add new department
export const addDepartment = async (data) => {
  const token = localStorage.getItem("userTokenStudent");
  const schoolId = localStorage.getItem("school_id"); // auto attach school_id
  const payload = { ...data, school_id: schoolId };

  try {
    const res = await axios.post(`${API_URL}/user/departments`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data; // { status, message }
  } catch (error) {
    console.error("Error adding department:", error);
    return { status: false, message: "Failed to add department" };
  }
};

// ✅ Update department by ID
export const updateDepartmentById = async (id, data) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.put(`${API_URL}/user/departments/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data; // { status, message }
  } catch (error) {
    console.error("Error updating department:", error);
    return { status: false, message: "Failed to update department" };
  }
};

// ✅ Delete department by ID
export const deleteDepartmentById = async (id) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.delete(`${API_URL}/user/departments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data; // { status, message }
  } catch (error) {
    console.error("Error deleting department:", error);
    return { status: false, message: "Failed to delete department" };
  }
};


// ---------------------- SUBJECTS ----------------------
export const getAllSubjects = async (department_id = null) => {
  const token = localStorage.getItem("userTokenStudent");
  let url = `${API_URL}/user/subjects`;
  if (department_id) url += `?department_id=${department_id}`;

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return { status: false, message: "Failed to fetch subjects", data: [] };
  }
};

export const addSubject = async (payload) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.post(`${API_URL}/user/subjects`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error adding subject:", error);
    return { status: false, message: "Failed to add subject", data: [] };
  }
};

export const updateSubjectById = async (id, payload) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.put(`${API_URL}/user/subjects/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating subject:", error);
    return { status: false, message: "Failed to update subject", data: [] };
  }
};

export const deleteSubjectById = async (id) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.delete(`${API_URL}/user/subjects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting subject:", error);
    return { status: false, message: "Failed to delete subject", data: [] };
  }
};

export const getSubjectById = async (id) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.get(`${API_URL}/user/subjects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;  // ✅ Return full object (status, message, data)
  } catch (error) {
    console.error("Error fetching subject by ID:", error);
    return { status: false, message: "Failed to fetch subject", data: null };
  }
};
