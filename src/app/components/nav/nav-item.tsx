'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function NavItem({href, children}: { href: string, children: ReactNode }) {
    const currentPath = usePathname()

    return (
        <li className="text-xl font-bold cursor-pointer border-b border-gray-300 dark:border-gray-600 last:border-none md:border-none">
            <Link href={href}
                  className={`${(currentPath === href) && " text-sky-700 dark:text-blue-200"}
                            py-2 px-4 md:p-0 hover:text-sky-700 dark:hover:text-blue-200 hover:underline block w-full`}
            >
                {children}
            </Link>
        </li>
    )
}
