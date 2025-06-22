import React, { useState, useEffect } from 'react';
import { getAllCourses, deleteCourse } from '../../api/CourseAPI';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const courses = await getAllCourses();
            if (Array.isArray(courses)) {
                setCourses(courses);
            } else {
                throw new Error('Invalid response format from server');
            }
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch courses');
            setLoading(false);
        }
    };

    const handleDelete = async (courseId) => {
        if (!window.confirm('Are you sure you want to delete this course?')) {
            return;
        }

        try {
            const response = await deleteCourse(courseId);
            if (response.status === 204) {
                setCourses(prev => prev.filter(course => course.id !== courseId));
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete course');
        }
    };

    return (
        <div className="card">
            <h2>Courses</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prerequisites</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {courses && Array.isArray(courses) ? (
                                courses.map((course) => (
                                    <tr key={course.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{course.courseId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{course.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{course.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                             {course.prerequisites && Array.isArray(course.prerequisites) 
                                                ? course.prerequisites.join(', ') 
                                                : 'None'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleDelete(course.courseId)}
                                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center">
                                        No courses found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CourseList;
