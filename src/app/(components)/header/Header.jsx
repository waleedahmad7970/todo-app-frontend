import Link from "next/link";
import NavItem from "@/app/(dashboard)/(components)/NavItem";

export default function Header() {
    return (
        <header className="header_section">
            <div className="header_top">
                <div className="container-fluid ">
                    <div className="header_top_content">
                        <Link 
                            href="/" 
                            className="navbar-brand d-none d-lg-flex"
                        >
                            <span>Todo App</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="header_bottom">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg custom_nav-container ">
                        <Link 
                            href="/" 
                            className="navbar-brand d-flex d-lg-none"
                        >
                            <span>Todo App</span>
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className=""> </span>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
}

