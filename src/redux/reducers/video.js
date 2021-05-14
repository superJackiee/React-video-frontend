import { VIDEOINFO } from "../constants/action-types";

const initialState = {
  videoData: [],
  firstData: {
    filename: ""
  }
};

export default function channels(state = initialState, action) {
  switch (action.type) {
    case VIDEOINFO: {
      return {...state, videoData: action.data.video, firstData: JSON.stringify(action.data.first) === "{}" ? {}: action.data.first }
    }
    default:
      return state;
  }
}
