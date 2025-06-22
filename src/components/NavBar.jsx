import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <div>
                            <Link to="/" className="flex items-center py-4">
                                <span className="text-xl font-bold text-blue-600">LearnSphere</span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link 
                                to="/courses" 
                                className={`py-4 px-2 ${
                                    location.pathname === '/courses' 
                                        ? 'text-blue-500 border-b-4 border-blue-500 font-semibold' 
                                        : 'text-gray-500 hover:text-blue-500'
                                }`}
                            >
                                Courses
                            </Link>
                            <Link 
                                to="/instances" 
                                className={`py-4 px-2 ${
                                    location.pathname === '/instances' 
                                        ? 'text-blue-500 border-b-4 border-blue-500 font-semibold' 
                                        : 'text-gray-500 hover:text-blue-500'
                                }`}
                            >
                                Instances
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
