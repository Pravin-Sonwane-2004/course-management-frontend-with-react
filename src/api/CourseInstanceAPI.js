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
  const response = await api.get(`/instances/${year}/${semester}`);
  return handleResponse(response);
};

export const getInstanceById = async (year, semester, id) => {
  const response = await api.get(`/instances/${year}/${semester}/${id}`);
  return handleResponse(response);
};

export const deleteInstance = async (year, semester, id) => {
  const response = await api.delete(`/instances/${year}/${semester}/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete instance');
  }
  return handleResponse(response);
};
