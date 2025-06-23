import React, { useState } from 'react';

export default function InstanceForm({ onSuccess, courses }) {
  const [form, setForm] = useState({
    courseId: '',
    year: '',
    semester: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const semesterOptions = [1, 2];

  const validate = () => {
    const errs = {};
    if (!form.courseId) errs.courseId = 'Course is required';
    if (!form.year || form.year < 2000 || form.year > 2100) errs.year = 'Year must be between 2000 and 2100';
    if (![1,2].includes(Number(form.semester))) errs.semester = 'Semester must be 1 or 2';
    return errs;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    try {
      await onSuccess({
        courseId: form.courseId, // keep as string to match backend DTO
        year: Number(form.year),
        semester: Number(form.semester),
      });
      setForm({ courseId: '', year: '', semester: '' });
      if (window.toast) window.toast.success('Course instance created successfully!');
      if (typeof window.onInstanceFormClose === 'function') window.onInstanceFormClose();
    } catch (e) {
      // Show backend error in toast if available
      if (window.toast) {
        window.toast.error(e?.response?.data?.message || e.message || 'Failed to create instance');
      } else if (window.alert) {
        alert(e?.response?.data?.message || e.message || 'Failed to create instance');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Add Course Instance</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block font-medium">Course<span style={{ color: 'red' }}>*</span></label>
          <select
            name="courseId"
            value={form.courseId}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
            disabled={submitting}
            required
          >
            <option value="">Select Course</option>
            {courses && courses.map(c => (
              <option key={c.courseId} value={c.courseId}>
                {(c.name || c.title) + ' (' + c.courseId + ')'}
              </option>
            ))}
          </select>
          {errors.courseId && <div className="text-red-600 text-sm">{errors.courseId}</div>}
        </div>
        <div>
          <label className="block font-medium">Year<span style={{ color: 'red' }}>*</span></label>
          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
            disabled={submitting}
            required
          >
            <option value="">Select Year</option>
            {yearOptions.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {errors.year && <div className="text-red-600 text-sm">{errors.year}</div>}
        </div>
        <div>
          <label className="block font-medium">Semester<span style={{ color: 'red' }}>*</span></label>
          <select
            name="semester"
            value={form.semester}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
            disabled={submitting}
            required
          >
            <option value="">Select Semester</option>
            {semesterOptions.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.semester && <div className="text-red-600 text-sm">{errors.semester}</div>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center"
          disabled={submitting}
        >
          {submitting && (
            <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          )}
          {submitting ? 'Adding...' : 'Add Instance'}
        </button>
      </form>
    </div>
  );
}
