import {
  getAllCourses,
  getCoursesByUser,
  getCoursesBySemester,
  deleteCourse,
  getCourse,
  createCourse,
  updateCourse,
  searchCourse
} from './api';

class CourseDataService {
  retrieveAllCourses(userName) {
    if (!userName) {
      return getAllCourses();
    }
    return getCoursesByUser(userName);
  }

  retrieveAllCoursesWithSemMapping(id) {
    return getCoursesBySemester(id);
  }

  deleteCourse(id) {
    return deleteCourse(id);
  }

  getCourse(id) {
    return getCourse(id);
  }

  createCourse(userName, course) {
    return createCourse(userName, course);
  }

  updateCourse(userName, course) {
    return updateCourse(userName, course);
  }

  searchCourse(value) {
    return searchCourse(value);
  }
}

export default new CourseDataService();
