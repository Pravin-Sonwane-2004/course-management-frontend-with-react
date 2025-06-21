// learnsphere-frontend-with-react/src/api/CourseInstanceAPI.js
// Handles all API calls related to course instances

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

export async function createInstance(instanceData) {
  const response = await fetch(`${API_BASE_URL}/instances`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(instanceData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create instance');
  }
  return response.json();
}

export async function getInstancesByYearSemester(year, semester) {
  const response = await fetch(`${API_BASE_URL}/instances/${year}/${semester}`);
  if (!response.ok) throw new Error('Failed to fetch instances');
  return response.json();
}

export async function getInstanceById(year, semester, id) {
  const response = await fetch(`${API_BASE_URL}/instances/${year}/${semester}/${id}`);
  if (!response.ok) throw new Error('Failed to fetch instance');
  return response.json();
}

export async function deleteInstance(year, semester, id) {
  const response = await fetch(`${API_BASE_URL}/instances/${year}/${semester}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete instance');
  }
  return response.json();
}
