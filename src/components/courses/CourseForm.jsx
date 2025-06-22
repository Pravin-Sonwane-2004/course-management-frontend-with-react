import React, { useState, useEffect } from 'react';

export default function CourseForm({ onSubmit = () => {}, initial = {}, allCourses = [], loading }) {
  const [form, setForm] = useState({
    courseId: initial.courseId || '',
    name: initial.name || '',
    description: initial.description || '',
    prerequisites: initial.prerequisites || [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({
      courseId: initial.courseId || '',
      name: initial.name || '',
      description: initial.description || '',
      prerequisites: initial.prerequisites || [],
    });
  }, [initial]);

  const validate = () => {
    const errs = {};
    if (!form.courseId || isNaN(Number(form.courseId)) || !/^\d+$/.test(form.courseId)) {
      errs.courseId = 'Course ID is required and must be a valid number';
    }
    if (!form.name) errs.name = 'Title is required';
    if (!form.description) errs.description = 'Description is required';
    return errs;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handlePrereqChange = e => {
    const options = Array.from(e.target.selectedOptions, o => Number(o.value));
    setForm(f => ({ ...f, prerequisites: options }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onSubmit({
      courseId: form.courseId,
      name: form.name,
      description: form.description,
      prerequisites: Array.from(new Set(form.prerequisites)),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <label className="block text-base font-semibold text-gray-800">Course ID *</label>
        <div className="relative">
          <input
            type="number"
            name="courseId"
            value={form.courseId}
            onChange={handleChange}
            className={`w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 ${
              errors.courseId ? 'border-red-600' : ''
            }`}
            disabled={loading}
            placeholder="Enter course ID"
          />
          {errors.courseId && (
            <p className="absolute -bottom-6 left-0 text-sm text-red-600">{errors.courseId}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-base font-semibold text-gray-800">Course Name *</label>
        <div className="relative">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 ${
              errors.name ? 'border-red-600' : ''
            }`}
            disabled={loading}
            placeholder="Enter course name"
          />
          {errors.name && (
            <p className="absolute -bottom-6 left-0 text-sm text-red-600">{errors.name}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-base font-semibold text-gray-800">Description *</label>
        <div className="relative">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className={`w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 ${
              errors.description ? 'border-red-600' : ''
            }`}
            disabled={loading}
            rows="5"
            placeholder="Enter course description"
          />
          {errors.description && (
            <p className="absolute -bottom-6 left-0 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-base font-semibold text-gray-800">Prerequisites</label>
        <div className="relative">
          <select
            multiple
            value={form.prerequisites}
            onChange={handlePrereqChange}
            className={`w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 ${
              errors.prerequisites ? 'border-red-600' : ''
            }`}
            disabled={loading}
            style={{ height: '200px' }}
          >
            {allCourses
              .filter(c => c.courseId !== form.courseId)
              .map(c => (
                <option key={c.courseId} value={c.courseId}>
                  {c.name}
                </option>
              ))}
          </select>
          {errors.prerequisites && (
            <p className="mt-1 text-sm text-red-600">{errors.prerequisites}</p>
          )}
        </div>
      </div>

      <div className="pt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Create Course'}
        </button>
      </div>
        </form>
      </div>
    </div>
  );
}
