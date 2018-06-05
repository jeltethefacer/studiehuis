import {
  CHANGE_ROLE,
  LOGIN_CLOCKIN_FAIL,
  LOGIN_CLOCKIN_SUCC,
  LOGIN_STUDENT_SUCC,
  LOGIN_MENTOR_SUCC
} from "./../actions/index";

const initialState = {
  role: "login",
  loginStatus: 0
};

function user(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ROLE:
      return Object.assign({}, state, {
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
    default:
      return state;
  }
}

export default user;
