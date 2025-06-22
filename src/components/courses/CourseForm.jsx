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
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">Course ID*</label>
        <input
          type="number"
          name="courseId"
          value={form.courseId}
          onChange={handleChange}
          className={`form-control${errors.courseId ? ' is-invalid' : ''}`}
          disabled={loading}
        />
        {errors.courseId && <div className="invalid-feedback">{errors.courseId}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Title*</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={`form-control${errors.name ? ' is-invalid' : ''}`}
          disabled={loading}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Description*</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className={`form-control${errors.description ? ' is-invalid' : ''}`}
          disabled={loading}
        />
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Prerequisites (multi-select)</label>
        <select
          multiple
          value={form.prerequisites}
          onChange={handlePrereqChange}
          className="form-control"
          disabled={loading}
        >
          {allCourses
            .filter(c => c.courseId !== form.courseId)
            .map(c => (
              <option key={c.courseId} value={c.courseId}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
