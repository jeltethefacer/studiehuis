import {
  CHANGE_ROLE,
  LOGIN_CLOCKIN_FAIL,
  LOGIN_CLOCKIN_SUCC,
  LOGIN_STUDENT_SUCC,
  LOGIN_MENTOR_SUCC,
  LOGIN_ADMIN_SUCC,
  LOGIN_SUPER_ADMIN_SUCC,
  LOGOUT_USER_SUCC,
  NO_ROLE_FOUND
} from "./../actions/index";

const initialState = {
  role: "login",
  loginStatus: 0,
  checkRoleStatus: 0
};

function user(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ROLE:
      return Object.assign({}, state, {
        checkRoleStatus: 1,
        role: action.role
      });
    case LOGIN_CLOCKIN_FAIL:
      return Object.assign({}, state, {
        loginStatus: 2
      });
    case LOGIN_CLOCKIN_SUCC:
      return Object.assign({}, state, {
        loginStatus: 1,
        role: "ClockIn"
      });
    case LOGIN_STUDENT_SUCC:
      return Object.assign({}, state, {
        loginStatus: 1,
        role: "Student"
      });
    case LOGIN_MENTOR_SUCC:
      return Object.assign({}, state, {
        loginStatus: 1,
        role: "Mentor"
      });
    case LOGIN_ADMIN_SUCC:
      return Object.assign({}, state, {
        loginStatus: 1,
        role: "Admin"
      });
    case LOGIN_SUPER_ADMIN_SUCC:
      return Object.assign({}, state, {
        loginStatus: 1,
        role: "SuperAdmin"
      });
    case LOGOUT_USER_SUCC:
      return Object.assign({}, state, {
        loginStatus: 0,
        role: "login"
      });
    case NO_ROLE_FOUND:
      return Object.assign({}, state, {
        checkRoleStatus: 2
      });
    default:
      return state;
  }
}

export default user;
