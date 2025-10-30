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