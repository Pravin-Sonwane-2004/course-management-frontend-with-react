import axios from 'axios';

const BACKEND_API_URL = ((import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '')) + '/api';

// User APIs
export const login = (user) => axios.post(`${BACKEND_API_URL}/auth`, user);

export const getUsers = () => axios.get(`${BACKEND_API_URL}/users`);
export const createUser = (user) => axios.post(`${BACKEND_API_URL}/users`, user);
export const getUserById = (id) => axios.get(`${BACKEND_API_URL}/users/${id}`);
export const getUserByUsername = (username) => axios.get(`${BACKEND_API_URL}/users/get/${username}`);
export const checkPassword = (username, password) => axios.post(`${BACKEND_API_URL}/auth/check-password`, { username, password });
export const deleteUser = (id) => axios.delete(`${BACKEND_API_URL}/users/${id}`);

// Semester APIs
export const createSemester = (semester) => axios.post(`${BACKEND_API_URL}/semester/`, semester);
export const getSemesters = () => axios.get(`${BACKEND_API_URL}/semester`);
export const deleteSemester = (id) => axios.delete(`${BACKEND_API_URL}/semester/${id}`);
export const getSemesterById = (id) => axios.get(`${BACKEND_API_URL}/semester/${id}`);
export const mapSubjectToSemester = (sem) => axios.post(`${BACKEND_API_URL}/semester/map`, sem);

// Instructor APIs
export const createInstructor = (instructor) => axios.post(`${BACKEND_API_URL}/lecturer/save`, instructor);
export const getInstructors = () => axios.get(`${BACKEND_API_URL}/get-all-lecturers`);
export const deleteInstructor = (id) => axios.delete(`${BACKEND_API_URL}/lecturer/${id}`);
export const getInstructorByUsername = (username) => axios.get(`${BACKEND_API_URL}/lecturer/${username}`);
export const getInstructorById = (id) => axios.get(`${BACKEND_API_URL}/lecturer/id/${id}`);

// Course APIs
export const getAllCourses = () => axios.get(`${BACKEND_API_URL}/get-all-courses`);
export const getCoursesByUser = (userName) => axios.get(`${BACKEND_API_URL}/courses/list/${userName}`);
export const getCoursesBySemester = (id) => axios.get(`${BACKEND_API_URL}/courses/sem/${id}`);
export const deleteCourse = (id) => axios.delete(`${BACKEND_API_URL}/courses/${id}`);
export const getCourse = (id) => axios.get(`${BACKEND_API_URL}/courses/${id}`);
export const createCourse = (userName, course) => axios.post(`${BACKEND_API_URL}/courses/save/${userName}`, course);
export const updateCourse = (userName, course) => axios.put(`${BACKEND_API_URL}/courses/update/${userName}`, course);
export const searchCourse = (value) => axios.get(`${BACKEND_API_URL}/courses/search/${value}`);

// Assignment APIs
export const createAssignment = (assignmentdata) => axios.post(`${BACKEND_API_URL}/assignments/add`, assignmentdata);
export const getAssignments = () => axios.get(`${BACKEND_API_URL}/assignments`);
export const getAssignmentFile = (path) => axios.get(`${BACKEND_API_URL}/assignments/getfile/?path=${encodeURI(path)}`);
export const getAssignmentJs = () => axios.get(`${BACKEND_API_URL}/assignments/getjs`);
export const deleteAssignment = (id) => axios.delete(`${BACKEND_API_URL}/assignments/${id}`);
