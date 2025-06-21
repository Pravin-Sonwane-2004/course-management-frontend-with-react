import {
  createAssignment,
  getAssignments,
  getAssignmentFile,
  getAssignmentJs,
  deleteAssignment
} from './api';

class AssignmentDataService {
  save(assignmentdata) {
    return createAssignment(assignmentdata);
  }

  getAll() {
    return getAssignments();
  }

  getFile(path) {
    return getAssignmentFile(path);
  }

  getJscript() {
    return getAssignmentJs();
  }

  deleteAssignment(id) {
    return deleteAssignment(id);
  }
}

export default new AssignmentDataService();
