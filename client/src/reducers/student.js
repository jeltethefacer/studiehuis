import {
  REQUEST_STUDENT_DATA_SUCC,
  REQUEST_STUDENT_DATA_FAIL
} from "./../actions/index";

const initialState = {
  studentData: {},
  clockInData: [],
  failed: false
};

function student(state = initialState, action) {
  switch (action.type) {
    case REQUEST_STUDENT_DATA_SUCC:
      console.log(action.data);
      return Object.assign({}, state, {
        studentData: action.data.studentData,
        clockInData: action.data.clockInData,
        failed: false
      });
    case REQUEST_STUDENT_DATA_FAIL:
      return Object.assign({}, state, {
        studentData: {},
        clockInData: [],
        failed: true
      });

    default:
      return state;
  }
}

export default student;
