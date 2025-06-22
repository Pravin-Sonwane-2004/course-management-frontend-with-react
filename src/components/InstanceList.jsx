import React, { useState, useEffect } from 'react';
import { getInstances, deleteInstance } from '../api/api';

const InstanceList = () => {
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [instances, setInstances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchInstances = async () => {
        try {
            const instances = await getInstances(year, semester);
            if (Array.isArray(instances)) {
                setInstances(instances);
            } else {
                throw new Error('Invalid response format from server');
            }
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch instances');
            setLoading(false);
        }
    };

    const handleDelete = async (year, semester, courseId) => {
        if (!window.confirm('Are you sure you want to delete this instance?')) {
            return;
        }

        try {
            const response = await deleteInstance(year, semester, courseId);
            if (response.status === 204) {
                setInstances(prev => prev.filter(
                    inst => inst.year !== year || 
                           inst.semester !== semester || 
                           inst.courseId !== courseId
                ));
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete instance');
        }
    };

    useEffect(() => {
        fetchInstances();
    }, [year, semester]);

    return (
        <div className="card">
            <h2>Course Instances</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <div className="flex gap-4 mb-4">
                <div className="flex-1">
                    <label htmlFor="year" className="block text-sm font-medium">Year</label>
                    <input
                        type="number"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="semester" className="block text-sm font-medium">Semester</label>
                    <select
                        id="semester"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">Select semester</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <button
                    onClick={fetchInstances}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </div>

            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {instances.map((instance) => (
                                <tr key={`${instance.year}-${instance.semester}-${instance.courseId}`}>
                                    <td className="px-6 py-4 whitespace-nowrap">{instance.courseId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{instance.courseName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{instance.year}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{instance.semester}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleDelete(instance.year, instance.semester, instance.courseId)}
                                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InstanceList;
