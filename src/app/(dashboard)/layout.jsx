import { redirect } from "next/navigation";

import SideBar from "./(components)/SideBar";
import TopBar from "./(components)/TopBar";
import { getCookie } from "@/utils/serverCookie";

export default async function AppLayout({ children }) {

    const token = await getCookie();
  
    if(!token) {
        redirect('/login');
    }

    return (
        <>
            <TopBar />
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                        <SideBar />
                    </nav>
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 ">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
