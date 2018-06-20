import {
  REQUEST_SUPER_ADMIN_DATA_SUCC,
  CHANGE_SUPER_ADMIN_PAGE,
  REQUEST_SUPER_ADMIN_DATA_FAIL,
  REQUEST_SINGLE_STUDENT_DATA_SUCC,
  REQUEST_SINGLE_STUDENT_DATA_FAIL,
  EDIT_STUDENT_DATA_FAIL,
  EDIT_STUDENT_DATA_SUCC,
  RESET_EDIT_STUDENT
} from "./../actions/index";

const initialState = {
  superAdminData: {},
  studentsData: [],
  singleStudentData: {},
  page: "default",
  failed: false,
  singleStudentFailed: false,
  editStudentDataStatus: 0
};

function superAdmin(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SUPER_ADMIN_DATA_SUCC:
      console.log(action.data);
      return Object.assign({}, state, {
        superAdminData: action.data.superAdminData,
        studentsData: action.data.studentsData,
        failed: false
      });
    case CHANGE_SUPER_ADMIN_PAGE:
      return Object.assign({}, state, {
        page: action.page
      });
    case REQUEST_SUPER_ADMIN_DATA_FAIL:
      return Object.assign({}, state, {
        superAdminData: {},
        studentsData: [],
        failed: true
      });
    case REQUEST_SINGLE_STUDENT_DATA_SUCC:
      return Object.assign({}, state, {
        singleStudentData: action.data.studentData,
        singleStudentFailed: false
      });
    case REQUEST_SINGLE_STUDENT_DATA_FAIL:
      return Object.assign({}, state, {
        singleStudentData: {},
        singleStudentFailed: true
      });
    case EDIT_STUDENT_DATA_SUCC:
      return Object.assign({}, state, {
        editStudentDataStatus: 1
      });
    case EDIT_STUDENT_DATA_FAIL:
      return Object.assign({}, state, {
        editStudentDataStatus: 2
      });
    case RESET_EDIT_STUDENT:
      return Object.assign({}, state, {
        singleStudentData: {},
        singleStudentFailed: false,
        editStudentDataStatus: 0
      });

    default:
      return state;
  }
}

export default superAdmin;
