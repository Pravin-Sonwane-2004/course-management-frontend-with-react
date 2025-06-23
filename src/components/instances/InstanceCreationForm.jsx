import React, { useState, useEffect } from 'react';
import { api } from '../../api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InstanceCreationForm = () => {
    const [instanceData, setInstanceData] = useState({
        courseId: '',
        year: '',
        semester: ''
    });
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const courses = await api.getAllCourses();
            if (Array.isArray(courses)) {
                const formattedCourses = courses.map(course => ({
                    value: course.courseId,
                    label: `${course.courseId} - ${course.name}`
                }));
                setCourses(formattedCourses);
            } else {
                throw new Error('Invalid response format from server');
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch courses');
            console.error('Error fetching courses:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInstanceData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.createCourseInstance(instanceData);
            setInstanceData({
                courseId: '',
                year: '',
                semester: ''
            });
            toast.success('Instance created successfully!');
        } catch (err) {
            setError(err.message || 'Failed to create instance');
            console.error('Error creating instance:', err);
            toast.error(err.message || 'Failed to create instance');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="px-8 py-6">
                <h2>Create Course Instance</h2>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="courseId" className="block text-sm font-medium">Course</label>
                    <select
                        id="courseId"
                        name="courseId"
                        value={instanceData.courseId || ''}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">Select a course</option>
                        {courses.map((course) => (
                            <option key={course.value} value={course.value}>
                                {course.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="year" className="block text-sm font-medium">Year</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={instanceData.year || ''}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="semester" className="block text-sm font-medium">Semester</label>
                    <select
                        id="semester"
                        name="semester"
                        value={instanceData.semester || ''}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">Select semester</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create Instance'}
                </button>
            </form>
        </div>
    );
};

export default InstanceCreationForm;