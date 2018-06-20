import {
  REQUEST_CLOCK_IN_DATA_SUCC,
  REQUEST_CLOCK_IN_DATA_FAIL
} from "./../actions/index";

const initialState = {
  id: 0,
  name: "",
  failed: false
};

function ClockIn(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CLOCK_IN_DATA_SUCC:
      console.log(action.data);
      return Object.assign({}, state, {
        id: action.data.clock_in_id,
        name: action.data.name,
        failed: false
      });
    case REQUEST_CLOCK_IN_DATA_FAIL:
      return Object.assign({}, state, {
        failed: true
      });
    default:
      return state;
  }
}

export default ClockIn;
