import axios from "axios"
import { Root } from "../constants/config";
 
export const setSession = session => {
    localStorage.setItem("videotoken" , session);
    window.location.assign("/")
}

export const is_session = () => {
    var session = localStorage.getItem("videotoken")
    if(session && session.toString() !== "undefined" ){
        return true;
    }else{
        return false;
    }
}

export const fake_session = () => {
    localStorage.setItem("videotoken" , undefined)
}

export const getSession = () => {
    var session = localStorage.getItem("videotoken")
    return session;
}

export const instance = axios.create({
	baseURL : Root.HOST,
	headers : {
		session : `${getSession()}`,
	},
});

export const AXIOS_REQUEST = async (url,inputdata) =>{
	try{
		var Response =  await instance.post(url,inputdata);
		if(Response.data){
			return Response.data;
		}else{
			return {status : false , data : "error"}
		}
	}catch(e){
		return {status : false , data : "network error"}
	}
}