import { USERINFO } from "../constants/action-types";

const initialState = {
  userData: {},
  isLogin: false
};

export default function channels(state = initialState, action) {
  switch (action.type) {
    case USERINFO:{
      return {...state, userData: action.data, isLogin: true}
    }
    default:
      return state;
  }
}
