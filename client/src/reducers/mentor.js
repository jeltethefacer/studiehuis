import { LOGIN_MENTOR_SUCC } from "./../actions/index";

const initialState = {
  mentorData: {},
  studentsData: []
};

function mentor(state = initialState, action) {
  switch (action.type) {
    case LOGIN_MENTOR_SUCC:
      console.log(action.data);
      return Object.assign({}, state, {
        mentorData: action.data.mentorData,
        studentsData: action.data.studentsData
      });
    default:
      return state;
  }
}

export default mentor;
