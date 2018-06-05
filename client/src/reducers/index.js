import { combineReducers } from "redux";
import user from "./user";
import ClockIn from "./clockIn";
import student from "./student";
import mentor from "./mentor";
var studiehuisApp = combineReducers({
  user,
  ClockIn,
  student,
  mentor
});

export default studiehuisApp;
