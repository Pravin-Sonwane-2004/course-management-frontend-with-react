import {
  login,
  getUsers,
  createUser,
  getUserById,
  getUserByUsername,
  checkPassword,
  deleteUser
} from './api';

class UserDataService {
  checkLogin(username, password) {
    return login({ username, password });
  }

  getUsers() {
    return getUsers();
  }

  save(user) {
    return createUser(user);
  }

  getUserById(id) {
    return getUserById(id);
  }

  getUserByUserName(username) {
    return getUserByUsername(username);
  }

  checkPassword(username, password) {
    return checkPassword(username, password);
  }

  deleteUser(id) {
    return deleteUser(id);
  }

  isLoggedin() {
    let user = JSON.parse(localStorage.getItem('user'));
    return !!(user && user.jwt);
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new UserDataService();
