import axios from 'axios';

// API Endpoints
export const API = {
  // Course Endpoints
  COURSES: {
    ALL: '/api/courses',
    CREATE: '/api/courses',
    BY_ID: (id) => `/api/courses/${id}`,
    BY_COURSE_ID: (courseId) => `/api/courses/by-course-id/${courseId}`,
    DELETE: (id) => `/api/courses/${id}`
  },
  // Instance Endpoints
  INSTANCES: {
    ALL: '/api/instances',
    CREATE: '/api/instances',
    BY_YEAR_SEM: (year, semester) => `/api/instances/${year}/${semester}`,
    BY_YEAR_SEM_COURSE: (year, semester, courseId) => `/api/instances/${year}/${semester}/${courseId}`,
    DELETE: (year, semester, courseId) => `/api/instances/${year}/${semester}/${courseId}`
  }
};

// Axios global config
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

// Handle response safely
const handleResponse = (response) => {
  if (!response || response.status >= 400) {
    throw new Error(response.statusText || 'Unknown error');
  }
  return response.data;
};

// API Functions
export const api = {
  // --- Course APIs ---

  getAllCourses: async () => {
    try {
      const response = await axios.get(API.COURSES.ALL);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  createCourse: async (courseData) => {
    try {
      const response = await axios.post(API.COURSES.CREATE, {
        courseId: courseData.courseId,
        name: courseData.name,
        description: courseData.description,
        prerequisites: courseData.prerequisites ? [...new Set(courseData.prerequisites)] : []
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },

  getCourseById: async (id) => {
    try {
      const response = await axios.get(API.COURSES.BY_ID(id));
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching course by ID:', error);
      throw error;
    }
  },

  getCourseByCourseId: async (courseId) => {
    try {
      const response = await axios.get(API.COURSES.BY_COURSE_ID(courseId));
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching course by course ID:', error);
      throw error;
    }
  },

  deleteCourse: async (id) => {
    try {
      const response = await axios.delete(API.COURSES.DELETE(id));
      return handleResponse(response);
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  },

  // --- Instance APIs ---

  getInstances: async () => {
    try {
      const response = await axios.get(API.INSTANCES.ALL);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching all instances:', error);
      throw error;
    }
  },

  createInstance: async (instanceData) => {
    try {
      const response = await axios.post(API.INSTANCES.CREATE, {
        courseId: instanceData.courseId,
        year: parseInt(instanceData.year),
        semester: parseInt(instanceData.semester)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error creating instance:', error);
      throw error;
    }
  },

  getInstancesByYearSem: async (year, semester) => {
    try {
      if (isNaN(year) || isNaN(semester)) {
        throw new Error('Invalid year or semester value');
      }
      const response = await axios.get(API.INSTANCES.BY_YEAR_SEM(year, semester));
      const instances = handleResponse(response);

      // Optional: Normalize if needed
      return instances.map(instance => ({
        instanceId: instance.instanceId,
        courseId: instance.courseId,
        year: instance.year,
        semester: instance.semester
      }));
    } catch (error) {
      console.error('Error fetching instances by year/semester:', error);
      throw error;
    }
  },

  getInstanceByYearSemCourse: async (year, semester, courseId) => {
    try {
      const response = await axios.get(API.INSTANCES.BY_YEAR_SEM_COURSE(year, semester, courseId));
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching instance by year/semester/course:', error);
      throw error;
    }
  },

  deleteInstance: async (year, semester, courseId) => {
    try {
      const response = await axios.delete(API.INSTANCES.DELETE(year, semester, courseId));
      return handleResponse(response);
    } catch (error) {
      console.error('Error deleting instance:', error);
      throw error;
    }
  }
};
