import { redirect } from "next/navigation";

import Header from "../(components)/header/Header";
// import Info from "../(components)/info/Info";
import Footer from "../(components)/footer/Footer";
import { getCookie } from "@/utils/serverCookie";

export default async function AuthLayout({ children }) {

    const bgImage = '/images/slider-bg.jpg';

    const token = await getCookie();
    
    if(token) {
        redirect('/todo');
    }

    return (
        <>
            <div className="hero_area">
                <div className="hero_bg_box"></div>
                <Header />
            </div>
            {children}
            {/* <Info /> */}
            <Footer />
        </>
    );
}
