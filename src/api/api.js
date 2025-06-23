import axios from 'axios';

// API Endpoints
export const API = {
  // Course Endpoints
  COURSES: {
    ALL: '/api/courses',
    CREATE: '/api/courses',
    BY_ID: (id) => `/api/courses/${id}`,
    BY_COURSE_ID: (courseId) => `/api/courses/by-course-id/${courseId}`,

  },
  // Course Instance Endpoints
  COURSE_INSTANCES: {
    ALL: '/api/instances',
    CREATE: '/api/instances',
    BY_YEAR_SEM: (year, semester) => `/api/instances/${year}/${semester}`,
    BY_YEAR_SEM_COURSE: (year, semester, courseId) => `/api/instances/${year}/${semester}/${courseId}`,
    DELETE: (year, semester, courseId) => `/api/instances/${year}/${semester}/${courseId}`
  }
};

// Axios global config
axios.defaults.baseURL = 'http://localhost:8080';
// Remove withCredentials as we don't need it
axios.defaults.withCredentials = false;

// Add CORS headers
axios.interceptors.request.use(config => {
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Access-Control-Allow-Credentials'] = 'true';
  return config;
}, error => {
  return Promise.reject(error);
});

// Handle response safely
const handleResponse = (response) => {
  if (!response) {
    throw new Error('No response received');
  }
  
  // Axios response object has these properties
  const { status, data, statusText } = response;
  
  if (status >= 400) {
    throw new Error(data?.message || statusText || 'Unknown error');
  }
  
  return data;
};

// API Functions
export const api = {
  // Proxy for compatibility with old code
  deleteCourseInstance: async (year, semester, courseId) => {
    return await api.deleteInstance(year, semester, courseId);
  },
  // --- Course APIs ---

  getAllCourses: async () => {
    try {
      const response = await axios.get(API.COURSES.ALL);
      const courses = response.data;
      
      // Normalize the response data
      if (Array.isArray(courses)) {
        return courses.map(course => ({
          courseId: course.courseId,
          name: course.name,
          description: course.description,
          prerequisites: course.prerequisites ? course.prerequisites.map(p => p.courseId) : []
        }));
      }
      
      throw new Error('Invalid response format from server');
    } catch (error) {
      console.error('Error fetching courses:', error);
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Backend server is not running. Please start the Spring Boot server.');
      }
      throw error;
    }
  },

  getAllInstances: async () => {
    try {
      const response = await axios.get(API.COURSE_INSTANCES.ALL);
      const instances = response.data;
      
      if (Array.isArray(instances)) {
        return instances.map(instance => ({
          instanceId: instance.instanceId,
          courseId: instance.courseId,
          year: instance.year,
          semester: instance.semester,
          courseName: instance.courseName,
          courseDescription: instance.courseDescription,
          coursePrerequisites: instance.coursePrerequisites || []
        }));
      }
      
      throw new Error('Invalid response format from server');
    } catch (error) {
      console.error('Error fetching instances:', error);
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

  // Course deletion is not supported by the backend. Only course instance deletion is available.


  // --- Course Instance APIs ---

  createCourseInstance: async (instanceData) => {
    try {
      const response = await axios.get(API.COURSE_INSTANCES.ALL);
      const instances = response.data;
      
      if (Array.isArray(instances)) {
        return instances.map(instance => ({
          instanceId: instance.instanceId,
          courseId: instance.courseId,
          year: instance.year,
          semester: instance.semester,
          courseName: instance.courseName,
          courseDescription: instance.courseDescription,
          coursePrerequisites: instance.coursePrerequisites || []
        }));
      }
      
      throw new Error('Invalid response format from server');
    } catch (error) {
      console.error('Error fetching instances:', error);
      throw error;
    }
  },

  createInstance: async (instanceData) => {
    try {
      const response = await axios.post(API.COURSE_INSTANCES.CREATE, {
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
      const response = await axios.get(API.COURSE_INSTANCES.BY_YEAR_SEM(year, semester));
      const instances = handleResponse(response);

      // Optional: Normalize if needed
      return instances.map(instance => ({
        instanceId: instance.instanceId,
        courseId: instance.courseId,
        year: instance.year,
        semester: instance.semester
      }));
    } catch (error) {
      console.error('Error fetching instances by year and semester:', error);
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Backend server is not running. Please start the Spring Boot server.');
      }
      throw error;
    }
  },

  getInstanceByYearSemCourse: async (year, semester, courseId) => {
    try {
      const response = await axios.get(API.COURSE_INSTANCES.BY_YEAR_SEM_COURSE(year, semester, courseId));
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching instance by year/semester/course:', error);
      throw error;
    }
  },

  deleteInstance: async (year, semester, courseId) => {
    try {
      const response = await axios.delete(API.COURSE_INSTANCES.DELETE(year, semester, courseId));
      if (response.status === 200) {
        return true;
      } else if (response.status === 404) {
        throw new Error('Instance not found');
      } else if (response.status === 409) {
        throw new Error('Cannot delete instance as it is still in use');
      } else {
        throw new Error(response.data?.message || response.statusText || 'Failed to delete instance');
      }
    } catch (error) {
      console.error('Error deleting instance:', error);
      if (error.response) {
        throw new Error(error.response.data?.message || error.response.statusText || 'Failed to delete instance');
      }
      throw new Error(error.message || 'Failed to delete instance');
    }
  }
};
