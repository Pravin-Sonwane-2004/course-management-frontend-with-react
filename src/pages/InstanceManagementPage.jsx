import React from 'react';
import InstanceCreationForm from '../components/instances/InstanceCreationForm';
import InstanceList from '../components/instances/InstanceList';

const InstanceManagementPage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
            <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-6">Create New Course</h2>
                <InstanceCreationForm />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-6">All Courses</h2>
                <InstanceList />
            </div>
        </div>
    );
};

export default InstanceManagementPage;
