import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();

    return (
        <nav className="bg-white shadow-lg min-h-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="flex items-center justify-center mb-4 w-full">
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold text-blue-600">LearnSphere</span>
                        </Link>
                    </div>
                    <div className="flex items-center justify-center w-full space-x-8">
                        <Link 
                            to="/courses" 
                            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                                location.pathname === '/courses' 
                                    ? 'bg-blue-50 text-blue-600 font-semibold' 
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            Courses
                        </Link>
                        <Link 
                            to="/instances" 
                            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                                location.pathname === '/instances' 
                                    ? 'bg-blue-50 text-blue-600 font-semibold' 
                                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            Instances
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
