import { combineReducers } from "redux";
import user from "./user";
import ClockIn from "./clockIn";
import student from "./student";
var studiehuisApp = combineReducers({
  user,
  ClockIn,
  student
});

export default studiehuisApp;
