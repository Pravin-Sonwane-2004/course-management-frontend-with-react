import React, { useState, useEffect } from 'react';
import { createCourse, getCourses } from '../api/api';

const CourseCreationForm = () => {
    const [courseData, setCourseData] = useState({
        courseId: '',
        name: '',
        description: '',
        prerequisites: []
    });
    const [prerequisites, setPrerequisites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch prerequisites when component mounts
        fetchPrerequisites();
    }, []);

    const fetchPrerequisites = async () => {
        try {
            const courses = await getCourses();
            if (Array.isArray(courses)) {
                setPrerequisites(courses.map(course => ({
                    value: course.courseId,
                    label: `${course.courseId} - ${course.name}`
                })));
            } else {
                throw new Error('Invalid response format from server');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch prerequisites');
            console.error('Error fetching prerequisites:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePrerequisiteChange = (selected) => {
        setCourseData(prev => ({
            ...prev,
            prerequisites: selected.map(option => option.value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await createCourse({
                courseId: courseData.courseId,
                name: courseData.name,
                description: courseData.description,
                prerequisites: courseData.prerequisites
            });
            
            if (response.status === 200) {
                setCourseData({
                    courseId: '',
                    name: '',
                    description: '',
                    prerequisites: []
                });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create course');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="card">
            <h2>Create New Course</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="courseId" className="block text-sm font-medium">Course ID</label>
                    <input
                        type="text"
                        id="courseId"
                        name="courseId"
                        value={courseData.courseId}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium">Course Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={courseData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={courseData.description}
                        onChange={handleChange}
                        rows="3"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Prerequisites</label>
                    <select
                        name="prerequisites"
                        value={courseData.prerequisites}
                        onChange={(e) => handlePrerequisiteChange(e.target.selectedOptions)}
                        multiple
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        {prerequisites.map((prereq) => (
                            <option key={prereq.value} value={prereq.value}>
                                {prereq.label}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create Course'}
                </button>
            </form>
        </div>
    );
};

export default CourseCreationForm;
