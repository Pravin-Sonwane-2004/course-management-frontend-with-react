// learnsphere-frontend-with-react/src/api/CourseAPI.js
// Handles all API calls related to courses

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

export async function getAllCourses() {
  const response = await fetch(`${API_BASE_URL}/courses`);
  if (!response.ok) throw new Error('Failed to fetch courses');
  return response.json();
}

export async function getCourseById(id) {
  const response = await fetch(`${API_BASE_URL}/courses/${id}`);
  if (!response.ok) throw new Error('Failed to fetch course');
  return response.json();
}

export async function createCourse(courseData) {
  const response = await fetch(`${API_BASE_URL}/courses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(courseData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create course');
  }
  return response.json();
}

export async function deleteCourse(id) {
  const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete course');
  }
  return response.json();
}
