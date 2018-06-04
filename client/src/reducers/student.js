import { LOGIN_STUDENT_SUCC } from "./../actions/index";

const initialState = {
  studentData: {},
  clockInData: []
};

function student(state = initialState, action) {
  switch (action.type) {
    case LOGIN_STUDENT_SUCC:
      console.log(action.data);
      return Object.assign({}, state, {
        studentData: action.data.studentData,
        clockInData: action.data.clockInData
      });
    default:
      return state;
  }
}

export default student;
