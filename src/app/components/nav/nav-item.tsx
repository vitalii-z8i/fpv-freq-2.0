'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function NavItem({href, children}: { href: string, children: ReactNode }) {
    const currentPath = usePathname()

    return (
        <li className="text-xs cursor-pointer">
            <Link href={href}
                  className={`${(currentPath === href) && " text-sky-700 dark:text-blue-200"}
                            hover:text-sky-700 dark:hover:text-blue-200
                            flex flex-col items-center`}
            >
                {children}
            </Link>
        </li>
    )
}
