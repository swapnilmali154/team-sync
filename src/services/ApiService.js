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


export { getAllEmployee }