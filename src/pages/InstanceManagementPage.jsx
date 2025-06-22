import React from 'react';
import InstanceCreationForm from '../components/InstanceCreationForm';
import InstanceList from '../components/InstanceList';

const InstanceManagementPage = () => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
                Course Instance Management
            </h1>
            
            <div className="space-y-6">
                <InstanceCreationForm />
                <InstanceList />
            </div>
        </div>
    );
};

export default InstanceManagementPage;
