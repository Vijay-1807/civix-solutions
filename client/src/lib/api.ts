import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
    baseURL: API_URL,
});

export const getProjects = async () => {
    const response = await api.get('/projects');
    return response.data;
};

export const createProject = async (formData: FormData) => {
    const response = await api.post('/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const getClients = async () => {
    const response = await api.get('/clients');
    return response.data;
};

export const createClient = async (formData: FormData) => {
    const response = await api.post('/clients', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const getContacts = async () => {
    const response = await api.get('/contacts');
    return response.data;
};

export const createContact = async (data: any) => {
    const response = await api.post('/contacts', data);
    return response.data;
};

export const getSubscribers = async () => {
    const response = await api.get('/subscribers');
    return response.data;
};

export const createSubscriber = async (data: any) => {
    const response = await api.post('/subscribers', data);
    return response.data;
};
