import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Course endpoints
export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (!response) {
        throw new Error('No response from server');
    }
    
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
};

// Course APIs
export const createCourse = async (courseData) => {
    const response = await api.post('/courses', courseData);
    return handleResponse(response);
};

export const getCourses = async () => {
    const response = await api.get('/courses/combined');
    return handleResponse(response);
};

export const deleteCourse = async (id) => {
    const response = await api.delete(`/courses/${id}`);
    return handleResponse(response);
};

// Course Instance APIs
export const createInstance = async (instanceData) => {
    const response = await api.post('/instances', instanceData);
    return handleResponse(response);
};

export const getInstances = async (year = null, semester = null) => {
    const url = year && semester 
        ? `/instances/${year}/${semester}`
        : '/instances';
    const response = await api.get(url);
    return response;
};

export const getInstancesByYearAndSemester = async (year, semester) => {
    const response = await api.get(`/instances/${year}/${semester}`);
    return handleResponse(response);
};

export const getInstanceByCourseId = async (year, semester, courseId) => {
    const response = await api.get(`/instances/${year}/${semester}/${courseId}`);
    return handleResponse(response);
};

export const deleteInstance = async (year, semester, courseId) => {
    const response = await api.delete(`/instances/${year}/${semester}/${courseId}`);
    return handleResponse(response);
};
