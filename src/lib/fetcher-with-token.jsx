import { getCookie } from "@/utils/clientCookie";

const token = getCookie();

export const fetcherWithToken = (url) =>
    fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`, // token from wherever you store it
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());