import { combineReducers } from "redux";
import user from "./user";
import ClockIn from "./clockIn";
import student from "./student";
import mentor from "./mentor";
import admin from "./admin";
var studiehuisApp = combineReducers({
  user,
  ClockIn,
  student,
  mentor,
  admin
});

export default studiehuisApp;
