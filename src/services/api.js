import axios from "axios";

const API_URL = "https://localhost:5000/api"

export const getProjects = () => {
    return axios.get(`${API_URL}/projects`)
}