import axios from "axios";
import {API_URL} from "../constants/constant";

const getAllEmployee = async () => {
  try {
    const response = await axios.get(`${API_URL}GetAllEmployee`);
    return response.data;
  } catch (error) {
    alert("Api Error");
  }
};

const createEmployee = async (data) => {
  try {
    const response = await axios.post(`${API_URL}CreateEmployee`, data);
    return response.data;
  } catch (error) {
    alert("Api Error");
  }
};

const updateEmployee = async (data) => {
  try {
    const response = await axios.post(`${API_URL}UpdateEmployee`, data);
    return response.data;
  } catch (error) {
    alert("Api Error");
  }
};

const deleteEmployee = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}DeleteEmployeeByEmpId?empid=` + id
    );
    return response.data;
  } catch (error) {
    alert("Api Error");
  }
};

const getAllAttendance = async () => {
  try {
    const response = await axios.get(`${API_URL}GetAllAttendance`);
    return response.data;
  } catch (error) {
    alert("Api Error");
  }
};

const addAttendance = async (data) => {
  try {
    const response = await axios.post(`${API_URL}AddAttendance`, data);
    return response.data;
  } catch (error) {
    alert("Api Error");
  }
};

const updateAttendance = async (data) => {
  try {
    const response = await axios.post(`${API_URL}UpdateAttendance`, data);
    return response.data;
  } catch (error) {
    alert("Api Error");
  }
};

const deleteAttendance = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}DeleteAttendanceById?attendanceid=` + id
    );
    return response.data;
  } catch (error) {}
};

export {
  getAllEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance,
};
