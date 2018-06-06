import { LOGIN_ADMIN_SUCC } from "./../actions/index";

const initialState = {
  adminData: {},
  loggedInStudentsData: []
};

function admin(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ADMIN_SUCC:
      console.log(action.data);
      return Object.assign({}, state, {
        adminData: action.data.adminData,
        loggedInStudentsData: action.data.loggedInStudentsData
      });
    default:
      return state;
  }
}

export default admin;
