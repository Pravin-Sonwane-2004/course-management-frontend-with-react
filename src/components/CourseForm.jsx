import React, { useState } from 'react';

export default function CourseForm({ onSubmit, initial = {}, allCourses = [] }) {
  const [form, setForm] = useState({
    courseId: initial.courseId || '',
    name: initial.name || '',
    description: initial.description || '',
    prerequisites: initial.prerequisites || [],
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.courseId || isNaN(Number(form.courseId))) errs.courseId = 'Course ID is required and must be a number';
    if (!form.name) errs.name = 'Name is required';
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
      courseId: Number(form.courseId),
      name: form.name,
      description: form.description,
      prerequisites: form.prerequisites,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block font-medium">Course ID<span style={{ color: 'red' }}>*</span></label>
        <input
          type="number"
          name="courseId"
          value={form.courseId}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
          required
        />
        {errors.courseId && <div className="text-red-600 text-sm">{errors.courseId}</div>}
      </div>
      <div>
        <label className="block font-medium">Name<span style={{ color: 'red' }}>*</span></label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
          required
        />
        {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
      </div>
      <div>
        <label className="block font-medium">Description<span style={{ color: 'red' }}>*</span></label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
          required
        />
        {errors.description && <div className="text-red-600 text-sm">{errors.description}</div>}
      </div>
      <div>
        <label className="block font-medium">Prerequisites</label>
        <select
          multiple
          value={form.prerequisites}
          onChange={handlePrereqChange}
          className="border rounded px-2 py-1 w-full"
        >
          {allCourses
            .filter(c => String(c.courseId) !== String(form.courseId))
            .map(c => (
              <option key={c.courseId} value={c.courseId}>
                {c.name || c.title}
              </option>
            ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
