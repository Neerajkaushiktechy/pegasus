import jwt_decode from "jwt-decode";
import { authToken } from "./commonUtil";

export function checkToken() {
    const token = authToken();
    try {
        let decoded = jwt_decode(token);
        if (decoded) {
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp < currentTime) {
                localStorage.clear();
                return true;
            }
        }
    } catch (error) {
        console.error('Error decoding or checking token:', error);
    }

    return false;
}
