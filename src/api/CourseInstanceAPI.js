import { api } from './api';

export const createInstance = async (instanceData) => {
  const response = await api.post('/instances', {
    courseId: instanceData.courseId,
    year: parseInt(instanceData.year),
    semester: parseInt(instanceData.semester)
  });
  return handleResponse(response);
};

export const getInstancesByYearSemester = async (year, semester) => {
  try {
    if (isNaN(year) || isNaN(semester)) {
      throw new Error('Invalid year or semester value');
    }
    const response = await api.get(`/instances/${year}/${semester}`);
    console.log('Response data:', response.data);
    if (response.status === 200) {
      // Format the response data to match our frontend needs
      // Extract course IDs first
      const courseIds = response.data.map(instance => instance.instanceId.split('-')[0]);
      
      // Fetch course details in bulk (if we had a proper endpoint)
      // For now, we'll just use the course IDs directly
      return response.data.map(instance => ({
        instanceId: instance.instanceId,
        courseId: instance.courseId, // Directly use the courseId from DTO
        year: instance.year,
        semester: instance.semester
      }));
    }
    if (response.status === 404) {
      return []; // Return empty array if no instances found
    }
    throw new Error('Failed to fetch instances');
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data?.message || 'Failed to fetch instances');
    }
    console.error('Network Error:', error);
    throw error;
  }
};

export const getInstanceById = async (year, semester, id) => {
  try {
    const response = await api.get(`/instances/${year}/${semester}/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Instance not found');
  } catch (error) {
    console.error('Error fetching instance:', error);
    throw error;
  }
};

export const deleteInstance = async (year, semester, courseId) => {
  try {
    const response = await api.delete(`/instances/${year}/${semester}/${courseId}`);
    if (response.status === 204) {
      return true;
    }
    throw new Error('Failed to delete instance');
  } catch (error) {
    console.error('Error deleting instance:', error);
    if (error.response) {
      const errorMessage = error.response.data?.message || 'Failed to delete instance';
      console.error('API Error:', errorMessage);
      throw new Error(errorMessage);
    }
    throw error;
  }
};
