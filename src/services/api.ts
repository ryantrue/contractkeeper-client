import axios from 'axios';
import { User, Contract } from '../types/user';

const API_URL = 'http://localhost:8080';

export const registerUser = async (user: User) => {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
};

export const loginUser = async (credentials: { username: string; password: string }) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    document.cookie = `token=${response.data.token};path=/`;
    return response.data;
};

export const createContract = async (contract: Contract) => {
    const token = getCookie('token');
    const response = await axios.post(`${API_URL}/api/contracts`, contract, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const getContracts = async (page: number, size: number) => {
    const token = getCookie('token');
    const response = await axios.get(`${API_URL}/api/contracts`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: { page, size }
    });
    return response.data;
};

export const getContract = async (id: number) => {
    const token = getCookie('token');
    const response = await axios.get(`${API_URL}/api/contracts/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const updateContract = async (contract: Contract) => {
    const token = getCookie('token');
    const response = await axios.put(`${API_URL}/api/contracts`, contract, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const deleteContract = async (id: number) => {
    const token = getCookie('token');
    const response = await axios.delete(`${API_URL}/api/contracts/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return "";
}