var CryptoJS = require("crypto-js");

export function encrypt(text:any){
    return CryptoJS.AES.encrypt(text, process.env.REACT_APP_LOCAL_CRYPTO_SECRET).toString();
}
export function decrypt(text:any){
    var bytes  = CryptoJS.AES.decrypt(text, process.env.REACT_APP_LOCAL_CRYPTO_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
}
