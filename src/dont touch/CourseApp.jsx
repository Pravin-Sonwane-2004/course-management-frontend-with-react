import React, { Component } from 'react'
import ListCoursesComponents from './course/ListCoursesComponents'
import CourseComponent from './course/CourseComponent'
import InstructorComponent from './instructor/InstructorComponent'
import LoginPage from './auth/LoginPage'
import Logout from './auth/Logout'
import PrivateRoute from './common/PrivateRoute'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppNavBar from './common/AppNavBar'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../storeConfig'
import AdminRoute from './common/AdminRoute'
import UserComponent from './user/UserComponent'
import ListUserComponent from './user/ListUserComponent'
import ListInstructorComponent from './instructor/ListInstructorComponent'
import JeasyGrid from './common/JeasyGrid'
import AssignmentComponent from './assignment/AssignmentComponent'
import CourseDetailsComponent from './course/CourseDetailsComponent'
import ErrorBoundry from './common/ErrorBoundry'
import ErrorLanding from './common/ErrorLanding'
import SemesterComponent from './semester/SemesterComponent'
import ListSemesterComponent from './semester/ListSemesterComponent'
import MapSemesterSubject from './semester/MapSemesterSubject'
import NavBarDemo from './common/NavBarDemo'
import ListStudentComponent from './student/ListStudentComponent'
import StudentComponent from './student/StudentComponent'
import StudentRoute from './common/StudentRoute'
import StudentIndex from './student/StudentIndex'



class CourseApp extends Component {

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <>
                            <ErrorBoundry>
                                <AppNavBar />
                            </ErrorBoundry>
                            <Routes>
                                <Route path="/server-error" element={<ErrorLanding />} />
                                <Route path="/" element={<ListCoursesComponents />} />
                                <Route path="/student/index" element={<StudentRoute><StudentIndex /></StudentRoute>} />
                                <Route path="/student" element={<AdminRoute><ListStudentComponent /></AdminRoute>} />
                                <Route path="/student/add/:id" element={<AdminRoute><StudentComponent /></AdminRoute>} />
                                <Route path="/semester/add/:id" element={<AdminRoute><SemesterComponent /></AdminRoute>} />
                                <Route path="/semester" element={<AdminRoute><ListSemesterComponent /></AdminRoute>} />
                                <Route path="/semester/map/:id" element={<AdminRoute><MapSemesterSubject /></AdminRoute>} />

                                <Route path="/course/add/:id" element={<PrivateRoute><CourseComponent /></PrivateRoute>} />
                                <Route path="/course/view/:id" element={<PrivateRoute><CourseDetailsComponent /></PrivateRoute>} />
                                <Route path="/lecturer/add/:id" element={<PrivateRoute><InstructorComponent /></PrivateRoute>} />
                                <Route path="/lecturer" element={<PrivateRoute><ListInstructorComponent /></PrivateRoute>} />
                                <Route path="/course/:cid/assignment/add/:id" element={<PrivateRoute><AssignmentComponent /></PrivateRoute>} />
                                <Route path='/login' element={<LoginPage />} />
                                <Route path='/navbar-demo' element={<NavBarDemo />} />
                                <Route path='/logout' element={<Logout />} />
                                <Route path='/jeasygrid' element={<JeasyGrid />} />
                                <Route path='/user/add/:id' element={<AdminRoute><UserComponent /></AdminRoute>} />
                                <Route path='/users' element={<AdminRoute><ListUserComponent /></AdminRoute>} />
                            </Routes>
                        </>
                    </Router>
                </PersistGate>
            </Provider>
        )
    }
}



export default CourseApp
