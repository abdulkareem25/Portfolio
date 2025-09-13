import axios from "axios";

const API_URL = "http://localhost:5000/api"

export const getProjects = () => {
    return axios.get(`${API_URL}/projects/`)
}

export const getSkills = () => {
    return axios.get(`${API_URL}/skills/`)
}