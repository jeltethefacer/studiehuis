import axios from "axios";
export const CHANGE_ROLE = "CHANGE_ROLE";
export const LOGOUT_USER_SUCC = "LOGOUT_USER_SUCC";
export const LOGIN_CLOCKIN = "LOGIN_CLOCKIN";
export const LOGIN_CLOCKIN_SUCC = "LOGIN_CLOCKIN_SUCC";
export const REQUEST_CLOCK_IN_DATA_SUCC = "REQUEST_CLOCK_IN_DATA_SUCC";
export const REQUEST_CLOCK_IN_DATA_FAIL = "REQUEST_CLOCK_IN_DATA_FAIL";
export const LOGIN_CLOCKIN_FAIL = "LOGIN_CLOCK_FAIL";
export const REQUEST_STUDENT_DATA_SUCC = "REQUEST_STUDENT_DATA_SUCC";
export const REQUEST_STUDENT_DATA_FAIL = "REQUEST_STUDENT_DATA_FAIL";
export const LOGIN_STUDENT_SUCC = "LOGIN_STUDENT_SUCC";
export const REQUEST_MENTOR_DATA_SUCC = "REQUEST_MENTOR_DATA_SUCC";
export const REQUEST_MENTOR_DATA_FAIL = "REQUEST_MENTOR_DATA_FAIL";
export const LOGIN_MENTOR_SUCC = "LOGIN_MENTOR_SUCC";
export const REQUEST_ADMIN_DATA_SUCC = "REQUEST_ADMIN_DATA_SUCC";
export const REQUEST_ADMIN_DATA_FAIL = "REQUEST_ADMIN_DATA_FAIL";
export const LOGIN_ADMIN_SUCC = "LOGIN_ADMIN_SUCC";
export const REQUEST_SUPER_ADMIN_DATA_SUCC = "REQUEST_SUPER_ADMIN_DATA_SUCC";
export const REQUEST_SUPER_ADMIN_DATA_FAIL = "REQUEST_SUPER_ADMIN_DATA_FAIL";
export const LOGIN_SUPER_ADMIN_SUCC = "LOGIN_SUPER_ADMIN_SUCC";
export const CHANGE_SUPER_ADMIN_PAGE = "CHANGE_SUPER_ADMIN_PAGE";
export const REQUEST_SINGLE_STUDENT_DATA_SUCC =
  "REQUEST_SINGLE_STUDENT_DATA_SUCC";
export const REQUEST_SINGLE_STUDENT_DATA_FAIL =
  "REQUEST_SINGLE_STUDENT_DATA_FAIL";
export const EDIT_STUDENT_DATA_FAIL = "EDIT_STUDENT_DATA_FAIL";
export const EDIT_STUDENT_DATA_SUCC = "EDIT_STUDENT_DATA_SUCC";
export const NO_ROLE_FOUND = "NO_ROLE_FOUND";
export const RESET_EDIT_STUDENT = "RESET_EDIT_STUDENT";

// axios.defaults.baseURL = "http://localhost/";

export function changeRole(role) {
  return { type: CHANGE_ROLE, role };
}

export function noRoleFound() {
  return { type: NO_ROLE_FOUND };
}

export function changeSuperAdminPage(page) {
  return { type: CHANGE_SUPER_ADMIN_PAGE, page: page };
}

export function logoutUserSucc() {
  return { type: LOGOUT_USER_SUCC };
}

export function loginClockInSucc() {
  return { type: LOGIN_CLOCKIN_SUCC };
}

export function requestClockInDataSucc(data) {
  return { type: REQUEST_CLOCK_IN_DATA_SUCC, data };
}

export function requestClockInDataFail() {
  return { type: REQUEST_CLOCK_IN_DATA_FAIL };
}

export function requestStudentDataSucc(data) {
  return { type: REQUEST_STUDENT_DATA_SUCC, data };
}

export function requestStudentDataFail() {
  return { type: REQUEST_STUDENT_DATA_FAIL };
}

export function loginClockInFail() {
  return { type: LOGIN_CLOCKIN_FAIL };
}

export function loginStudentSucc() {
  return { type: LOGIN_STUDENT_SUCC };
}

export function requestMentorDataSucc(data) {
  return { type: REQUEST_MENTOR_DATA_SUCC, data };
}

export function requestMentorDataFail() {
  return { type: REQUEST_MENTOR_DATA_FAIL };
}

export function loginMentorSucc(data) {
  return { type: LOGIN_MENTOR_SUCC, data };
}

export function requestAdminDataSucc(data) {
  return { type: REQUEST_ADMIN_DATA_SUCC, data };
}

export function requestAdminDataFail() {
  return { type: REQUEST_ADMIN_DATA_FAIL };
}

export function loginAdminSucc() {
  return { type: LOGIN_ADMIN_SUCC };
}

export function loginSuperAdminSucc() {
  return { type: LOGIN_SUPER_ADMIN_SUCC };
}

export function requestSuperAdminDataSucc(data) {
  return { type: REQUEST_SUPER_ADMIN_DATA_SUCC, data };
}

export function requestSuperAdminDataFail() {
  return { type: REQUEST_SUPER_ADMIN_DATA_FAIL };
}

export function requestSingleStudentDataSucc(data) {
  return { type: REQUEST_SINGLE_STUDENT_DATA_SUCC, data };
}

export function requestSingleStudentDataFail() {
  return { type: REQUEST_SINGLE_STUDENT_DATA_FAIL };
}

export function editStudentDataSucc(data) {
  return { type: EDIT_STUDENT_DATA_SUCC, data };
}

export function editStudentDataFail() {
  return { type: EDIT_STUDENT_DATA_FAIL };
}

export function resetEditStudent() {
  return { type: RESET_EDIT_STUDENT };
}

export function checkCookieRole() {
  return function(dispatch) {
    axios
      .get("api/checkCookieRole")
      .then(function(response) {
        dispatch(changeRole(response.data.role));
      })
      .catch(function(error) {
        if (error.response.status !== 409) {
          console.log("error in checkCookieRole", error);
        } else {
          dispatch(noRoleFound());
        }
      });
  };
}

export function logoutUser() {
  return function(dispatch) {
    axios.get("api/logoutUser").then(function(response) {
      dispatch(logoutUserSucc());
    });
  };
}

export function loginClockIn(username, password) {
  return function(dispatch) {
    axios
      .post("/api/loginClockIn", {
        username: username,
        password: password
      })
      .then(function(response) {
        dispatch(loginClockInSucc());
      })
      .catch(function(error) {
        dispatch(loginClockInFail());
      });
  };
}

export function requestClockInData() {
  return function(dispatch) {
    axios
      .get("/api/requestClockInData")
      .then(function(response) {
        dispatch(requestClockInDataSucc(response.data));
      })
      .catch(function(error) {
        dispatch(requestClockInDataFail());
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
        dispatch(loginStudentSucc());
      })
      .catch(function(error) {
        dispatch(loginClockInFail());
      });
  };
}
//takes the student number from the cookies
export function requestStudentData() {
  return function(dispatch) {
    axios
      .get("/api/requestStudentData")
      .then(function(response) {
        dispatch(requestStudentDataSucc(response.data));
      })
      .catch(function(error) {
        dispatch(requestStudentDataFail());
      });
  };
}

export function loginMentor(username, password) {
  return function(dispatch) {
    axios
      .post("/api/loginMentor", {
        username: username,
        password: password
      })
      .then(function(response) {
        dispatch(loginMentorSucc(response.data));
      })
      .catch(function(error) {
        dispatch(loginClockInFail());
      });
  };
}

export function requestMentorData() {
  return function(dispatch) {
    axios
      .get("/api/requestMentorData")
      .then(function(response) {
        dispatch(requestMentorDataSucc(response.data));
      })
      .catch(function(error) {
        dispatch(requestMentorDataFail());
      });
  };
}

export function loginAdmin(username, password) {
  return function(dispatch) {
    axios
      .post("/api/loginAdmin", {
        username: username,
        password: password
      })
      .then(function(response) {
        dispatch(loginAdminSucc());
      })
      .catch(function(error) {
        dispatch(loginClockInFail());
      });
  };
}

export function requestAdminData() {
  return function(dispatch) {
    axios
      .get("/api/requestAdminData")
      .then(function(response) {
        dispatch(requestAdminDataSucc(response.data));
      })
      .catch(function(error) {
        dispatch(requestAdminDataFail());
      });
  };
}

export function loginSuperAdmin(username, password) {
  return function(dispatch) {
    axios
      .post("/api/loginSuperAdmin", {
        username: username,
        password: password
      })
      .then(function(response) {
        dispatch(loginSuperAdminSucc());
      })
      .catch(function(error) {
        dispatch(loginClockInFail());
      });
  };
}

export function requestSuperAdminData() {
  return function(dispatch) {
    axios
      .get("/api/requestSuperAdminData")
      .then(function(response) {
        dispatch(requestSuperAdminDataSucc(response.data));
      })
      .catch(function(error) {
        dispatch(requestSuperAdminDataFail());
      });
  };
}
//takes the student data from the number provided
export function requestSingleStudentData(studentNumber) {
  return function(dispatch) {
    axios
      .post("/api/requestSingleStudentData", {
        studentNumber: studentNumber
      })
      .then(function(response) {
        dispatch(requestSingleStudentDataSucc(response.data));
      })
      .catch(function(error) {
        dispatch(requestSingleStudentDataFail());
      });
  };
}

export function editStudentData(
  studentNumber,
  frontName,
  lastName,
  madeMinutes,
  weeklyHours,
  shouldHours
) {
  return function(dispatch) {
    axios
      .post("/api/editStudentData", {
        studentNumber: studentNumber,
        frontName: frontName,
        lastName: lastName,
        madeMinutes: madeMinutes,
        weeklyHours: weeklyHours,
        shouldHours: shouldHours
      })
      .then(function(response) {
        console.log(response);
        dispatch(editStudentDataSucc(response.data));
      })
      .catch(function(error) {
        dispatch(editStudentDataFail());
      });
  };
}
