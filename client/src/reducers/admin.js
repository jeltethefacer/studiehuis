import {
  REQUEST_ADMIN_DATA_SUCC,
  REQUEST_ADMIN_DATA_FAIL
} from "./../actions/index";

const initialState = {
  adminData: {},
  loggedInStudentsData: [],
  failed: false
};

function admin(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ADMIN_DATA_SUCC:
      console.log(action.data);
      return Object.assign({}, state, {
        adminData: action.data.adminData,
        loggedInStudentsData: action.data.loggedInStudentsData,
        failed: true
      });
    case REQUEST_ADMIN_DATA_FAIL:
      console.log(action.data);
      return Object.assign({}, state, {
        adminData: {},
        loggedInStudentsData: [],
        failed: true
      });
    default:
      return state;
  }
}

export default admin;
