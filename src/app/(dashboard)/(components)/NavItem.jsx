"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({ link, icon, text, count }) {

    const pathname = usePathname();
    const isActive = pathname === link;

    return (
         <li className="nav-item">
            <Link href={link} className={`${isActive} ? 'nav-link active' : 'nav-link'`}>
                {icon && (
                    <i className={`mr-2 ${icon}`}></i>
                )} 
                {text} {isActive && (<span className="sr-only">(current)</span>)}
                {count && (
                    <span className="badge badge-danger ml-2">{count}</span>
                )}
            </Link>
        </li>
    );
}
