import React from 'react';
import InstanceCreationForm from '../components/instances/InstanceCreationForm';
import InstanceList from '../components/instances/InstanceList';

const InstanceManagementPage = () => {
    return (
        <div className="space-y-8 px-4 md:px-10">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-12">
                Course Instance Management
            </h1>
            <div className="space-y-8 mt-12">
                <InstanceCreationForm />
                <InstanceList />
            </div>
        </div>
    );
};

export default InstanceManagementPage;
