import { LOGIN_CLOCKIN_SUCC } from "./../actions/index";

const initialState = {
  id: 0,
  name: ""
};

function ClockIn(state = initialState, action) {
  switch (action.type) {
    case LOGIN_CLOCKIN_SUCC:
      console.log(action.data);
      return Object.assign({}, state, {
        id: action.data.clock_in_id,
        name: action.data.name
      });
    default:
      return state;
  }
}

export default ClockIn;
