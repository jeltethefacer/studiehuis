import { combineReducers } from "redux";
import user from "./user";
import ClockIn from "./clockIn";
import student from "./student";
import mentor from "./mentor";
import admin from "./admin";
import superAdmin from "./superAdmin";
var studiehuisApp = combineReducers({
  user,
  ClockIn,
  student,
  mentor,
  admin,
  superAdmin
});

export default studiehuisApp;
