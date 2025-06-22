import React from 'react';

export default function CourseList({ courses, onDelete, deletingId, dependencyIds }) {
  return (
    <div>
      <h3>Course List</h3>
      <ul className="list-group">
        {courses.map(course => (
          <li key={course.courseId} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{course.name}</strong> (ID: {course.courseId})<br />
              <span className="text-muted">{course.description}</span><br />
              <span>
                Prerequisites:{' '}
                {course.prerequisites && course.prerequisites.length > 0
                  ? course.prerequisites.join(', ')
                  : 'None'}
              </span>
            </div>
            <button
              className="btn btn-danger btn-sm"
              disabled={dependencyIds.includes(course.courseId) || deletingId === course.courseId}
              onClick={() => onDelete(course.courseId)}
            >
              {deletingId === course.courseId ? 'Deleting...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
