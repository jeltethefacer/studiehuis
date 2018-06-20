import React from "react";
import ReactDOM from "react-dom";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import rootReducer from "./reducers";
import LogIn from "./components/LogIn";
import ClockInLogin from "./components/ClockInLogin";
import Student from "./components/Student";
import Mentor from "./components/Mentor";
import Admin from "./components/Admin";
import SuperAdmin from "./components/SuperAdmin";
import EditSingleStudent from "./components/EditSingleStudent";
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/ClockIn" component={ClockInLogin} />
        <Route exact path="/Student" component={Student} />
        <Route exact path="/Mentor" component={Mentor} />
        <Route exact path="/Admin" component={Admin} />
        <Route exact path="/SuperAdmin" component={SuperAdmin} />

        <Route
          exact
          path="/SuperAdmin/EditStudent/:urlStudentNumber"
          component={EditSingleStudent}
        />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
