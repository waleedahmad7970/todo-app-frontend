import Link from "next/link";

export default function Footer() {
    return (
         <footer className="footer_section bg-secondary">
            <div className="container">
                <p className="text-white">
                    &copy; <span id="displayYear"></span> All Rights Reserved By
                    <Link href="/" className="ml-1">Todo App</Link>
                </p>
            </div>
        </footer>
    );
}

