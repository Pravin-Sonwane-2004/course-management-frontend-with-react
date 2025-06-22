import React from 'react';
import InstanceCreationForm from '../components/instances/InstanceCreationForm';
import InstanceList from '../components/instances/InstanceList';

const InstanceManagementPage = () => {
    return (
        <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h1 className="text-3xl font-bold text-blue-600 mb-8">Course Management</h1>
                    <h2 className="text-2xl font-bold text-blue-600 mb-6">Create New Course</h2>
                    <InstanceCreationForm />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-blue-600 mb-8">Courses</h1>
                    <p className="text-gray-600 mb-4">Manage your courses here</p>
                    <div className="flex items-center mb-6">
                        <input type="text" placeholder="Search courses..." className="flex-1 p-2 border rounded-lg mr-2" />
                    </div>
                    <InstanceList />
                </div>
            </div>
        </div>
    );
};

export default InstanceManagementPage;
