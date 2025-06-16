import { cookies } from 'next/headers';

// get a cookie
export const getCookie = async () => {
    // Get the token from cookies on the server side
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken');

    if(token) {
        return token.value;
    } else {
        return null;
    }
}