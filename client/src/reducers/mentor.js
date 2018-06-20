import {
  REQUEST_MENTOR_DATA_SUCC,
  REQUEST_MENTOR_DATA_FAIL
} from "./../actions/index";

const initialState = {
  mentorData: {},
  studentsData: [],
  failed: false
};

function mentor(state = initialState, action) {
  switch (action.type) {
    case REQUEST_MENTOR_DATA_SUCC:
      console.log(action.data);
      return Object.assign({}, state, {
        mentorData: action.data.mentorData,
        studentsData: action.data.studentsData,
        failed: false
      });
    case REQUEST_MENTOR_DATA_FAIL:
      return Object.assign({}, state, {
        mentorData: {},
        studentsData: [],
        failed: true
      });
    default:
      return state;
  }
}

export default mentor;
