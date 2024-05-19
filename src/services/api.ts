import axios from 'axios';
import { User, Contract } from '../types/user';

const API_URL = 'http://localhost:8080';

export const registerUser = async (user: User) => {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
};

// Add more API functions here