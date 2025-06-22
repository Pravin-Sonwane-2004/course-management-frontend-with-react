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
  const semesterOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  const validate = () => {
    const errs = {};
    if (!form.courseId) errs.courseId = 'Course is required';
    if (!form.year) errs.year = 'Year is required';
    if (!form.semester) errs.semester = 'Semester is required';
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
      // Ensure all fields are sent as numbers
      await onSuccess({
        courseId: Number(form.courseId),
        year: Number(form.year),
        semester: Number(form.semester),
      });
      setForm({ courseId: '', year: '', semester: '' });
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
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? 'Adding...' : 'Add Instance'}
        </button>
      </form>
    </div>
  );
}
