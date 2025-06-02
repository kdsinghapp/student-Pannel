import axios from "axios";

const API_URL = "https://server-php-8-3.technorizen.com/gradesphere/api";
const token = localStorage.getItem("userTokenStudent");

export const signInAdmin = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/user/login`, data);
    const responseData = res.data;

    // Save full user object in localStorage (optional)
    localStorage.setItem("userStudentData", JSON.stringify(responseData));

    // ✅ Save just the user's full name separately
    const fullName = `${responseData.user.first_name} ${responseData.user.last_name}`;
    localStorage.setItem("userName", fullName);

    return responseData;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};


export const getAllClasses = async () => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.get(`${API_URL}/user/classes`, {
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
  try {
    const res = await axios.get(`${API_URL}/admin/student/get-students`, {
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

export const getStudentById = async (id) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.get(`${API_URL}/admin{{baseUrl}}admin/student/get-student?student_id=${id}`, {
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

export const deleteStudentById = async (id) => {
  const token = localStorage.getItem("userTokenStudent");
  try {
    const res = await axios.get(`${API_URL}/admin/student/delete-student?student_id=${id}`, {
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
    const res = await axios.post(`${API_URL}/admin/student/update-student`, data, {
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
    const res = await axios.post(`${API_URL}/admin/student/add-student`,formData, {
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
    const res = await axios.get(`${API_URL}/admin/countries`, {
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
    const res = await axios.get(`${API_URL}/admin/religions`, {
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