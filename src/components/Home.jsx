import React from 'react';

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">LearnSphere Dashboard</h1>
      <p>Welcome to the LearnSphere Course and Instance Management System frontend.</p>
      <ul className="list-disc ml-6 mt-4 text-gray-700">
        <li>Manage Courses and their prerequisites</li>
        <li>Manage Course Delivery Instances</li>
        <li>Easy navigation and clean UI</li>
      </ul>
    </div>
  );
}
