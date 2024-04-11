import axios from "axios";
import { API_URL } from "../constants/constant";

const getData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    alert("Api Error");
  }
};

const createData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    alert("Api Error");
  }
};

const updateData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    alert("Api Error");
  }
};

const deleteData = async (endpoint, id) => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}` + id);
    return response.data;
  } catch (error) {
    alert("Api Error");
  }
};

export { getData, createData, updateData, deleteData };
