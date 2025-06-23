import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import SearchIcon from 'react-feather/dist/icons/search';
import TrashIcon from 'react-feather/dist/icons/trash';
import { api } from '../../api/api';

export default function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Move fetchInstances to top-level so all handlers can use it
  // Fetch all courses for the right-side table
  const fetchCourses = async () => {
    try {
      
      const allCourses = await api.getAllCourses();
      
      const formattedCourses = allCourses.map(course => ({
        id: course.courseId,
        name: course.name,
        description: course.description,
        prerequisites: course.prerequisites || [],
        key: course.courseId
      }));
      setCourses(formattedCourses);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setLoading(false);
    }
  };

  // Fetch all available courses for the prerequisites dropdown
  const fetchAvailableCourses = async () => {
    try {
      
      const allCourses = await api.getAllCourses();
      
      const formattedCourses = allCourses.map(course => ({
        value: course.courseId,
        label: `${course.courseId} - ${course.name}`
      }));
      
      setAvailableCourses(formattedCourses);
    } catch (error) {
      console.error('Error fetching available courses:', error);
    }
  };

  useEffect(() => {
    
    fetchCourses();
    fetchAvailableCourses();
  }, []);

  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      id: '',
      name: '',
      description: '',
      prerequisites: [],
    }
  });

  const onSubmit = async (data) => {
    try {
      const courseData = {
        courseId: data.id,
        name: data.name,
        description: data.description,
        prerequisites: data.prerequisites || []
      };
      await api.createCourse(courseData);
      if (window.toast) {
        window.toast.success('Course created successfully!');
      } else {
        alert('Course created successfully!');
      }
      await fetchCourses();
    } catch (error) {
      if (window.toast) {
        window.toast.error(error.message || 'Error creating course');
      } else {
        alert(error.message || 'Error creating course');
      }
      console.error('Error creating course:', error);
    }
  };

  const handleDeleteInstance = async (instanceId) => {
    try {
      const [courseId, yearStr, semesterStr] = instanceId.split('_');
      const year = parseInt(yearStr);
      const semester = parseInt(semesterStr);

      await api.deleteCourseInstance(year, semester, courseId);
      await fetchCourses();
    } catch (error) {
      console.error('Error deleting course instance:', error);
      throw error;
    }
  };

  return (
    <div className="flex gap-6">
      <div className="w-2/5 border-r pr-6">
        <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Course ID</label>
            <input
              {...register('id', { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Course Name</label>
            <input
              {...register('name', { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              {...register('description', { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter course description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Prerequisites</label>
            <Select
              {...register('prerequisites')}
              isMulti
              options={availableCourses || []}
              className="w-full"
              placeholder="Select prerequisites..."
              onChange={(selected) => {
                
                setValue('prerequisites', selected?.map(option => option.value) || []);
              }}
              value={register('prerequisites').value?.map(value => {
                const option = availableCourses?.find(option => option.value === value);
                return option || null;
              }).filter(Boolean)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <input
              {...register('year', { required: true })}
              type="number"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter year (e.g., 2024)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Semester</label>
            <select
              {...register('semester', { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Course
          </button>
        </form>
      </div>
      <div className="w-3/5">
        <h2 className="text-xl font-semibold mb-2">Courses</h2>
        <p className="text-gray-500 mb-2">Manage your courses here</p>
        <div className="mb-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-64 px-2 py-1 pl-8 border rounded focus:outline-none"
            />
        
            <SearchIcon className="absolute left-2 top-1.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prerequisites</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {courses.map((instance) => (
                <tr key={instance.key} className="border-b">
                  <td className="px-4 py-2 whitespace-nowrap">{instance.id}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{instance.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{instance.description}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {instance.prerequisites.length > 0 ? instance.prerequisites.join(', ') : 'None'}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{instance.year}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{instance.semester}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteInstance(instance.key)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500">Showing {searchText ? 'filtered' : 'all'} courses</span>
          <div className="flex items-center space-x-1">
            <button
              className="px-2 py-1 border rounded hover:bg-gray-50"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-2 py-1 text-xs">Page {currentPage}</span>
            <button
              className="px-2 py-1 border rounded hover:bg-gray-50"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={false} // We don't have total count for pagination
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
