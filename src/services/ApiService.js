import axios from 'axios'
const API_URL = "https://onlinetestapi.gerasim.in/api/TeamSync/"

const getAllEmployee = async () => {
    try {
        const response = await axios.get(`${API_URL}GetAllEmployee`)
        return response.data;        
    } catch (error) {
        alert("Api Error")
    }
}


const createEmployee = async (data) => {
    try {
        const response = await axios.post(`${API_URL}CreateEmployee`, data)
        return response.data;
    } catch (error) {
        alert("Api Error")
    }
}

const updateEmployee = async (data) => {
    try {
        debugger;
        const response = await axios.post(`${API_URL}UpdateEmployee`, data)
        debugger;
        return response.data;
    } catch (error) {
        debugger;
        alert("Api Error")
    }
}

const deleteEmployee = async (id) =>{
    try {
        const response = await axios.get(`${API_URL}DeleteEmployeeByEmpId?empid=`+ id)
        return response.data;
    } catch (error) {
        alert("Api Error")
    }
}


export { getAllEmployee, createEmployee, updateEmployee, deleteEmployee }