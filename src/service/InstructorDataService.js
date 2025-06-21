import {
  createInstructor,
  getInstructors,
  deleteInstructor,
  getInstructorByUsername,
  getInstructorById
} from './api';

class InstructorDataService {
  saveInstructor(instructor) {
    return createInstructor(instructor);
  }

  getInstructors() {
    return getInstructors();
  }

  deleteInstructor(id) {
    return deleteInstructor(id);
  }

  getInstructor(username) {
    return getInstructorByUsername(username);
  }

  getInstructorById(id) {
    return getInstructorById(id);
  }
}

export default new InstructorDataService();
