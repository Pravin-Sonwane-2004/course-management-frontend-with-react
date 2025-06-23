import React, { useState, useEffect } from 'react';
import { api } from '../../api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Search, ArrowUp, ArrowDown } from 'react-feather';
import { debounce } from 'lodash';
import CourseForm from './CourseForm';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        const filtered = courses.filter(course => {
            if (!course) return false;
            const searchTermLower = searchTerm.toLowerCase();
            const nameMatch = (course.name || course.courseName || '').toLowerCase().includes(searchTermLower);
            const descriptionMatch = (course.description || '').toLowerCase().includes(searchTermLower);
            const prerequisitesMatch = course.prerequisites?.some(prereqId => 
                typeof prereqId === 'string' && prereqId.toLowerCase().includes(searchTermLower)
            ) || false;
            return nameMatch || descriptionMatch || prerequisitesMatch;
        });
        setFilteredCourses(filtered);
    }, [courses, searchTerm]);

    useEffect(() => {
        if (sortConfig) {
            const { key, direction } = sortConfig;
            const sorted = [...filteredCourses].sort((a, b) => {
                if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
                if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
                return 0;
            });
            setFilteredCourses(sorted);
        }
    }, [sortConfig, filteredCourses]);

    const fetchCourses = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await api.getAllCourses();
            if (response && Array.isArray(response)) {
                setCourses(response);
                setFilteredCourses(response);
            } else {
                throw new Error('Invalid response format from server');
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
            if (error.code === 'ERR_NETWORK') {
                setError('Backend server is not running. Please start the Spring Boot server.');
            } else {
                setError(error.message || 'Failed to fetch courses');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (course) => {
        if (window.confirm(`Are you sure you want to delete course ${course.name || course.courseName}?`)) {
            setDeletingId(course.courseId);
            try {
                await api.deleteCourse(course.courseId);
                await fetchCourses();
                toast.success('Course deleted successfully');
            } catch (error) {
                console.error('Error deleting course:', error);
                toast.error('Error deleting course: ' + error.message);
            } finally {
                setDeletingId(null);
            }
        }
    };

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editCourse, setEditCourse] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleAdd = () => {
        setEditCourse(null);
        setShowModal(true);
    };
    const handleEdit = (course) => {
        setEditCourse(course);
        setShowModal(true);
    };
    const handleModalClose = () => {
        setShowModal(false);
        setEditCourse(null);
    };
    const handleSave = async (form) => {
        setSaving(true);
        try {
            if (editCourse) {
                // Update
                await api.createCourse(form); // Assume upsert for now
                toast.success('Course updated successfully');
            } else {
                await api.createCourse(form);
                toast.success('Course added successfully');
            }
            handleModalClose();
            await fetchCourses();
        } catch (e) {
            toast.error(e.message || 'Failed to save course');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6 px-8 py-6">
                <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-bold text-gray-800">Courses</h2>
                    <span className="text-sm text-gray-500">Manage your courses here</span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        onClick={handleAdd}
                    >
                        Add Course
                    </button>
                    <div className="relative w-80">
                        <Search className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-700 rounded-lg p-4 mb-6">
                    <p>{error}</p>
                </div>
            )}
            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 shadow-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('courseId')}
                                >
                                    ID
                                    {sortConfig?.key === 'courseId' && (
                                        sortConfig.direction === 'ascending' ? 
                                        <ArrowUp className="inline ml-1" /> : 
                                        <ArrowDown className="inline ml-1" />
                                    )}
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('name')}
                                >
                                    Name
                                    {sortConfig?.key === 'name' && (
                                        sortConfig.direction === 'ascending' ? 
                                        <SortAscending className="inline ml-1" /> : 
                                        <SortDescending className="inline ml-1" />
                                    )}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Prerequisites
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCourses
                                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                .map((course) => (
                                    <tr 
                                        key={`course-${course.courseId}`}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">{course.courseId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{course.name || course.courseName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{course.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {course.prerequisites && course.prerequisites.length > 0 ? 
                                                course.prerequisites.join(', ') : 
                                                'No prerequisites'
                                            }
                                        </td>
                                        <td className="px-8 py-4 whitespace-nowrap flex gap-2">
                                            <button
                                                onClick={() => handleEdit(course)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                            >Edit</button>
                                            <button
                                                onClick={() => handleDelete({
                                                  courseId: course.courseId,
                                                  name: course.name || course.courseName
                                                })}
                                                disabled={deletingId === course.courseId}
                                                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                                                    deletingId === course.courseId 
                                                        ? 'bg-gray-200 text-gray-500' 
                                                        : 'bg-red-600 text-white hover:bg-red-700'
                                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200`}
                                            >
                                                {deletingId === course.courseId ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Deleting...
                                                    </>
                                                ) : 'Delete'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            {filteredCourses.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center">
                                        No courses found matching your search
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
                    {filteredCourses.length > 0 && (
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
                            <div className="text-sm text-gray-700">
                                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredCourses.length)} of {filteredCourses.length} results
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 border rounded-md ${currentPage === 1 ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredCourses.length / itemsPerPage)))}
                                    disabled={currentPage === Math.ceil(filteredCourses.length / itemsPerPage)}
                                    className={`px-4 py-2 border rounded-md ${currentPage === Math.ceil(filteredCourses.length / itemsPerPage) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        {/* Modal for Add/Edit Course */}
        {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-8 min-w-[400px] relative">
                    <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={handleModalClose}>&times;</button>
                    <CourseForm
                        onSubmit={handleSave}
                        initial={editCourse || {}}
                        allCourses={courses}
                        loading={saving}
                    />
                </div>
            </div>
        )}
    </div>
    );

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig?.key === key) {
            direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
        }
        setSortConfig({ key, direction });
    };
};

export default CourseList;
