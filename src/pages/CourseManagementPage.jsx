import React from 'react';
import CourseCreationForm from '../components/CourseCreationForm';
import CourseList from '../components/CourseList';

const CourseManagementPage = () => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
                Course Management
            </h1>
            
            <div className="space-y-6">
                <CourseCreationForm />
                <CourseList />
            </div>
        </div>
    );
};

export default CourseManagementPage;
