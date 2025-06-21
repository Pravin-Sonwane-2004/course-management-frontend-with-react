import {
  createSemester,
  getSemesters,
  deleteSemester,
  getSemesterById,
  mapSubjectToSemester
} from './api';

class SemesterDataService {
  saveSemester(semester) {
    return createSemester(semester);
  }

  getSemesterData() {
    return getSemesters();
  }

  deleteSemester(id) {
    return deleteSemester(id);
  }

  getSemesterById(id) {
    return getSemesterById(id);
  }

  mapSubject(sem) {
    return mapSubjectToSemester(sem);
  }
}

export default new SemesterDataService();
