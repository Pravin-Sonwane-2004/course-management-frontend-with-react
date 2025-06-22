import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-700 px-2 py-2 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-lg font-extrabold tracking-wide">Learn<span className="font-black">Sphere</span></span>
          <Link to="/" className="font-medium hover:underline">Home</Link>
          <Link to="/courses" className="font-medium hover:underline">Course Management</Link>
          <Link to="/instances" className="font-medium hover:underline">Course Instance Management</Link>
        </div>
      </nav>
      <main className="p-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
