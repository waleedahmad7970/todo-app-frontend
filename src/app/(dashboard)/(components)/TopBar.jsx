"use client";

import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import Spinner from "@/app/(components)/common/Spinner";

export default function TopBar() {

    const { logout, isLoading } = useAuth();

    const handleLogout = async () => {
        try {
            await logout()
        } catch(error) {
            console.log(`Authentication error ${error}`)
        } finally {
            //
        }   
    }

    return (
        <>
            <nav className="navbar navbar-dark fixed-top bg-secondary flex-md-nowrap p-0 shadow">
                <Link 
                    href="/"
                    className="navbar-brand col-sm-3 col-md-2 mr-0" 
                    style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem', fontSize: '1rem', backgroundColor: 'rgba(0, 0, 0, .25)', boxShadow: 'inset -1px 0 0 rgba(0, 0, 0, .25)' }}
                >
                    Todo App
                </Link>
                <input className="form-control form-control-dark w-100 ml-2" type="text" placeholder="Search" aria-label="Search" />
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <Link 
                            href="#" 
                            className="nav-link"
                            onClick={handleLogout}
                        >
                            {isLoading && <Spinner color="primary" />}
                            {!isLoading && "Logout"}
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
