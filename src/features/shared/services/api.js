import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getProjects = () => axios.get(`${API_URL}/projects/`);

export const getSkills = () => axios.get(`${API_URL}/skills/`);
