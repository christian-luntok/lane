import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

const navigation = [
    { name: "Resources", href: "/resources" },
    { name: "Blog", href: "/blog" },
    { name: "Stack", href: "/stack" },
    { name: "Contact", href: "https://cjluntok.com/", isArrow: true }
];

export const Nav = () => {
    const router = useRouter();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const closeNav = () => {
        setIsNavOpen(false);
    };
    return (
        <nav className="header-nav text-black/60">
            <div className="header-nav--container">
                <button
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="mobile-menu lg:ml-3 inline-flex items-center p-2 text-black lg:hidden md:mr-auto"
                    aria-controls="navbar-dropdown"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <Icon
                        icon="material-symbols:menu-rounded"
                        className="h-6 w-auto"
                    />
                </button>
                <div
                    className={`header-nav--menu-container absolute left-0 w-full lg:relative lg:block lg:w-auto ${
                        isNavOpen ? "show" : "hide"
                    }`}
                    id="navbar-default"
                >
                    <ul className="header-nav--menu my-3 flex flex-col gap-6 border border-gray-100 bg-neutral-50 p-8 font-medium lg:my-0 lg:mt-0 lg:flex-row lg:border-0 lg:bg-transparent lg:p-0 lg:font-medium">
                        {navigation.map((item) => (
                            <li
                                key={item.name}
                                className="header-nav--menu-item"
                            >
                                <Link
                                    passHref
                                    key={item.name}
                                    href={item.href}
                                    className={`menu-item--link flex rounded py-2 pl-3 pr-4 transition-colors duration-300 md:bg-transparent text-black lg:p-0 md:hover:underline
                    ${router.pathname === item.href ? "active" : ""}
                  `}
                                    onClick={closeNav}
                                >
                                    {item.name}
                                    {item.isArrow && (
                                        <span className="ml-2 inline-block text-sm font-medium text-black">
                                            <Icon
                                                icon="material-symbols:arrow-outward"
                                                className="h-6 w-auto"
                                            />
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
