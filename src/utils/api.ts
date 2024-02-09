import request from "../utils/request";
import { API_BASE_URL } from "../utils/globalConstants";
import { CHECKCUSTOMFORM ,UPDATEQUICKGUIDEATTACHEMENT, DASHBOARD ,GETSINGLECUSTOMFORM } from "../utils/constants";
import {authToken} from "../utils/commonUtil";
import { encrypt } from "../utils/encryptDecrypt";

export default async function checkCustomFormExistApi(formData:any) {
  let token = authToken();
  const requestURL = `${API_BASE_URL}${CHECKCUSTOMFORM}`;
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" , ...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(formData)) }),
  };
  try {
    const res = await fetch(requestURL, params); 
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error,"errrr");
    throw error;
  }
}


export  const  getSingleCustomForm = async(formData:any)=> {
  let token = authToken();
  const requestURL = `${API_BASE_URL}${GETSINGLECUSTOMFORM}/${btoa(formData)}`;
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" , ...(token && {token})},
  };
  try {
    const res = await fetch(requestURL, params);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}



export const updateQuickGuidAttachement = async (fileArray: any , id : string) => {
  let token = authToken();
  const requestURL = `${API_BASE_URL}${UPDATEQUICKGUIDEATTACHEMENT}/${id}`;
  const params = {
    method: "PUT",
    body: fileArray,
    ...(token && {headers : {token}})
  };
  try {
    const res = await fetch(requestURL, params); 
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error,"errrr");
    throw error;
  }
}

export const getDashboardDataApi = async () => {
  let token = authToken();
  const requestURL = `${API_BASE_URL}${DASHBOARD}`;
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(token && {token}) },
  };
  try {
    const res = await fetch(requestURL, params); 
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error,"errrr");
    throw error;
  }
}
