import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-700 p-4 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-extrabold tracking-wide mr-8">Learn<span className="font-black">Sphere</span></span>
          <Link to="/" className="font-semibold hover:underline">Home</Link>
          <Link to="/courses" className="font-semibold hover:underline">Course Management</Link>
          <Link to="/instances" className="font-semibold hover:underline">Course Instance Management</Link>
        </div>
      </nav>
      <main className="p-6 max-w-4xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
