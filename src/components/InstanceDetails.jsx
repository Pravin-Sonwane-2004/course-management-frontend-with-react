import React from 'react';

export default function InstanceDetails({ instance }) {
  if (!instance) return null;
  return (
    <div className="border rounded p-4 bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Instance Details</h3>
      <div className="space-y-1">
        <div><span className="font-medium">Instance ID:</span> {instance.id}</div>
        <div><span className="font-medium">Course ID:</span> {instance.courseId}</div>
        <div><span className="font-medium">Year:</span> {instance.year}</div>
        <div><span className="font-medium">Semester:</span> {instance.semester}</div>
        {instance.courseTitle && (
          <div><span className="font-medium">Course Title:</span> {instance.courseTitle}</div>
        )}
        {/* Add more fields as needed based on backend response */}
      </div>
    </div>
  );
}
