import { AXIOS_REQUEST } from "../actions/baseAction";
import { USERINFO , VIDEOINFO } from "../constants/action-types";
import swal from 'sweetalert';

export const get_userinfor = () => {
  return async(dispatch) => {
    var rdata = await AXIOS_REQUEST("auth/getuserinfo")
    if(rdata.status){
      dispatch({type : USERINFO , data : rdata.data})
    }
  }
}

export const getVideoList = (sendData) => {
  return async (dispatch) => {
    var rdata = await AXIOS_REQUEST("video/getList", sendData);
    if(rdata.status){
      console.log(rdata.data)
      if(rdata.data.first && (!rdata.data.first.filename || rdata.data.first.filename==="")){
        dispatch({type : VIDEOINFO , data : rdata.data});
        setTimeout(() => {
          dispatch(getVideoList(sendData))
        }, 10000);
      }else{
        dispatch({type : VIDEOINFO , data : rdata.data});
      }
    }
  }
}

export const removeVideo = (item, sendData) => {
  return async(dispatch) => {
    var rdata = await AXIOS_REQUEST("video/remove", Object.assign({}, { item }, sendData ))
    if(rdata.status){
      dispatch({type: VIDEOINFO , data: rdata.data});
    }else{
      swal("Can't delete this video.");
    }
  }
}

export const updateName = (item, name, data) => {
  return async(dispatch) => {
    var rdata = await AXIOS_REQUEST("video/update", Object.assign({}, { item }, {name} , data))
    if(rdata.status){
      dispatch({type: VIDEOINFO , data: rdata.data});
    }else{
      swal("Can't update this video.");
    }
  }  
}