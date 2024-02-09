import { decrypt } from "./encryptDecrypt";


export function authToken() {
    let item = localStorage.getItem("item")
    if(item){
    item = decrypt(item)
    }
    if (!item) { return false }
    let token = JSON.parse(item).token
    if (token) { return token }
    return false
}


export function getRoleId() {
   let item = localStorage.getItem("item")
   const token = JSON.parse(decrypt(item))
   const parts = token.token.split('.');
   const payload = JSON.parse(window.atob(parts[1]));
   return payload.roleId
}

export function bmiCalc(weight={value:0,measureType:"kg"},height={value:0,measureType:"m"}){
    let newValue = 0;
    let weightValue = Number(weight.value);
    let heightValue = Number(height.value);
    if (weightValue <= 0 && heightValue <= 0) {
       newValue = 0;
    } else {
       if (weight.measureType === "lbs") {
          // lbs into kg
          weightValue = weightValue / 2.2046
       }
       if (height.measureType === "in") {
          // in into m
          heightValue = heightValue / 39.370
       }
       // Formula: weight (kg) / [height (m)]2
       newValue = weightValue / Math.pow(heightValue, 2);
    }
    return newValue;
 };

 export const getRole = () =>{
   const item = localStorage.getItem("item");
   if (localStorage.getItem("item")) {
      const token = JSON.parse(decrypt(item))
      const parts = token.token.split('.');
      const payload = JSON.parse(window.atob(parts[1]));
      return payload.roleId;
   }
 }

 export const getCreatedBy = () =>{
   const item = localStorage.getItem("item");
   if (localStorage.getItem("item")) {
      const token = JSON.parse(decrypt(item))
      const parts = token.token.split('.');
      const payload = JSON.parse(window.atob(parts[1]));
      return payload.createdBy;
   }
 }

 export const getUserId = () =>{
   const item = localStorage.getItem("item");
   if (localStorage.getItem("item")) {
      const token = JSON.parse(decrypt(item))
      const parts = token.token.split('.');
      const payload = JSON.parse(window.atob(parts[1]));
      return payload.id;
   }
 }