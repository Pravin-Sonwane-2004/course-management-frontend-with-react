import React, { useState } from 'react';
import { createCourse } from '../../api/api';

// Static data for testing
const staticPrerequisites = [
    { value: 'CS101', label: 'CS101 - Introduction to Computer Science' },
    { value: 'CS102', label: 'CS102 - Data Structures' },
    { value: 'CS201', label: 'CS201 - Algorithms' },
    { value: 'CS202', label: 'CS202 - Database Systems' }
];

const CourseCreationForm = () => {
    const [courseData, setCourseData] = useState({
        courseId: '',
        name: '',
        description: '',
        prerequisites: []
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePrerequisiteChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedValues = selectedOptions.map(option => option.value);
        setCourseData(prev => ({
            ...prev,
            prerequisites: selectedValues
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
                prerequisites: courseData.prerequisites && courseData.prerequisites.length > 0 ? 
                    Array.from(new Set(courseData.prerequisites)) : 
                    null
            });
            
            if (response.status === 200) {
                setCourseData({
                    courseId: '',
                    name: '',
                    description: '',
                    prerequisites: []
                });
                setError('Course created successfully!');
            } else {
                setError('Failed to create course');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create course');
            if (err.response?.status === 409) {
                setError('Course with this ID already exists. Please use a different ID.');
            }
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
                    <label htmlFor="prerequisites" className="block text-sm font-medium">Prerequisites</label>
                    <select
                        id="prerequisites"
                        name="prerequisites"
                        value={courseData.prerequisites}
                        onChange={handlePrerequisiteChange}
                        multiple
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        {staticPrerequisites.map((prereq) => (
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
