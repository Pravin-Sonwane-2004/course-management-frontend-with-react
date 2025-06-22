import { api } from './api';

export const createCourse = async (courseData) => {
  const response = await api.post('/courses', {
    courseId: courseData.courseId,
    name: courseData.name,
    description: courseData.description,
    prerequisites: courseData.prerequisites && courseData.prerequisites.length > 0 ? 
        Array.from(new Set(courseData.prerequisites)) : 
        null
  });
  return handleResponse(response);
};

export const getAllCourses = async () => {
  try {
    const response = await api.get('/courses');
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to fetch courses');
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await api.get(`/courses/by-course-id/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Course not found');
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await api.delete(`/courses/${id}`);
    if (response.status === 204) {
      return true;
    }
    throw new Error('Failed to delete course');
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};
