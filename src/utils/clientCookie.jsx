import Cookies from "js-cookie";

// get a cookie
export const getCookie = () => {
    // Get the token from cookies on the client side
    const token = Cookies.get("authToken");

    if(token) {
        return token;
    } else {
        return null;
    }
}
