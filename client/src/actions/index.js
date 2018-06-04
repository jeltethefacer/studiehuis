import axios from "axios";
export const CHANGE_ROLE = "CHANGE_ROLE";
export const LOGIN_CLOCKIN = "LOGIN_CLOCKIN";
export const LOGIN_CLOCKIN_SUCC = "LOGIN_CLOCKIN_SUCC";
export const LOGIN_CLOCKIN_FAIL = "LOGIN_CLOCK_FAIL";
export const LOGIN_STUDENT_SUCC = "LOGIN_STUDENT_SUCC";
export function changeRole(role) {
  return { type: CHANGE_ROLE, role };
}

export function loginClockInSucc(data) {
  return { type: LOGIN_CLOCKIN_SUCC, data };
}

export function loginClockInFail() {
  return { type: LOGIN_CLOCKIN_FAIL };
}

export function loginStudentSucc(data) {
  return { type: LOGIN_STUDENT_SUCC, data };
}

export function loginClockIn(username, password) {
  return function(dispatch) {
    axios
      .post("/api/loginClockIn", {
        username: username,
        password: password
      })
      .then(function(response) {
        dispatch(loginClockInSucc(response.data));
      })
      .catch(function(error) {
        dispatch(loginClockInFail());
      });
  };
}
export function loginStudent(username, password) {
  return function(dispatch) {
    axios
      .post("/api/loginStudent", {
        username: username,
        password: password
      })
      .then(function(response) {
        dispatch(loginStudentSucc(response.data));
      })
      .catch(function(error) {
        dispatch(loginClockInFail());
      });
  };
}
