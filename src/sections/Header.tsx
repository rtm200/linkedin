'use client'
import GridIcon from "@/components/icons/GridIcon";
import HomeIcon from "@/components/icons/HomeIcon";
import JobsIcon from "@/components/icons/JobsIcon";
import MessageIcon from "@/components/icons/MessageIcon";
import NetworkIcon from "@/components/icons/NetworkIcon";
import NotifIcon from "@/components/icons/NotifIcon";
import { ChevronDown, Clock4, Plus, WatchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NavbarNotification from "@/components/navbarNotification";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/avatar";

interface NavAvatarProps {
    src?: string;
    alt?: string;
    size?: number;
}
const navItems = [
    { href: "/", icon: HomeIcon, label: "Home", active: true, notification: true },
    { href: "/", icon: NetworkIcon, label: "My Network", notification: 1 },
    { href: "/", icon: JobsIcon, label: "Jobs", notification: false },
    { href: "/", icon: MessageIcon, label: "Messaging", notification: false },
    { href: "/", icon: NotifIcon, label: "Notifications", notification: 18 },
];

const recentSearchs = [
    { text: 'internship program' },
    { text: 'next js' },
    { text: 'web developer' }
]




export default function Header() {
    const [activeSearch, setActiveSearch] = useState<boolean>(false);
    const [visibleSearch, setVisibleSearch] = useState<boolean>(false);
    const [border, setBorder] = useState<boolean>(false);
    useEffect(() => {
        if (activeSearch) {
            const t = setTimeout(() => setVisibleSearch(true), 10);
            return () => clearTimeout(t);
        } else {
            setVisibleSearch(false);
        }
    }, [activeSearch]);


    const [activeBusiness, setActiveBusiness] = useState<boolean>(false);
    const [visibleBusiness, setVisibleBusiness] = useState<boolean>(false);
    useEffect(() => {
        if (activeBusiness) {
            const t = setTimeout(() => setVisibleBusiness(true), 10);
            return () => clearTimeout(t);
        } else {
            setVisibleBusiness(false);
        }
    }, [activeBusiness]);



    const searchRef = useRef<HTMLDivElement>(null);
    const businessRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node;

            if (searchRef.current && !searchRef.current.contains(target)) {
                setActiveSearch(false);
                setBorder(false);
            }

            if (businessRef.current && !businessRef.current.contains(target)) {
                setActiveBusiness(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <>
            {activeSearch && (
                <div
                    className={`fixed inset-0 bg-black/50 w-full h-full z-50 transition-opacity duration-300 ${visibleSearch ? "opacity-100" : "opacity-0"
                        }`}
                />
            )}
            <header className="bg-white px-6 w-screen h-14 z-105 fixed top-0 shadow-sm flex border-b border-gray-200">
                <div className="flex gap-0 sm:gap-2 my-0 mx-auto items-center justify-center sm:justify-between h-full w-full max-w-282">
                    <div className="flex gap-2 items-center relative sm:flex-1">
                        <Link href="/" className="outline-none min-h-9 min-w-9 hidden sm:flex">
                            <Image src="/logo.png" alt="LinkedIn" width={36} height={36} />
                        </Link>

                        <div ref={searchRef} className="relative flex-1">
                            <div className={`border rounded-full pl-4 items-center gap-2 h-9 duration-500 ease-in-out sm:flex hidden ${border ? "border-black border-2 w-2/2" : "border-gray-300 w-2/3"}`}>
                                <svg className="min-w-4 w-4 min-h-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="outline-none bg-transparent focus:ring-0 border-none text-sm w-full"
                                    onFocus={() => (setActiveSearch(true), setBorder(true))}
                                />
                            </div>

                            {/* after search focused */}
                            {activeSearch && (
                                <div className={`w-60 md:w-100 bg-white h-60 absolute top-full left-0 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] flex flex-col justify-between pb-2 duration-200
                                    ${visibleSearch ? "translate-y-0" : "-translate-y-4"}`}
                                >
                                    <div className="flex justify-between items-center p-4">
                                        <span className="font-semibold text-sm text-black/60 hover:text-black cursor-pointer">Recent</span>
                                        <span className="font-semibold text-sm text-black/60 hover:text-black cursor-pointer">See all</span>
                                    </div>
                                    <div className="flex flex-col gap-0">
                                        {recentSearchs.map(({ text }) => (
                                            <div key={text} className="flex gap-2 px-4 py-3 hover:bg-gray-200 cursor-pointer font-semibold">
                                                <Clock4 width={18} />
                                                <span>{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <nav className="h-full items-center flex">
                        <ul className="flex list-none h-full">
                            {navItems.map(({ href, icon: Icon, label, active, notification }) => (
                                <li key={label} className="h-full">
                                    <Link
                                        href={href}
                                        className={`flex flex-col items-center gap-1 justify-center h-full px-3 min-w-0 sm:min-w-15 lg:min-w-20 text-[11px] font-medium border-b-2 transition-colors ${active
                                            ? "border-black text-black"
                                            : "border-transparent text-black/70 hover:text-black"
                                            }`}
                                    >
                                        <div className="relative">
                                            <Icon />
                                            {notification && (
                                                <div className="absolute top-0 -right-2">
                                                    <NavbarNotification count={notification} />
                                                </div>
                                            )}
                                        </div>
                                        <span className="hidden lg:block text-[12px]">{label}</span>
                                    </Link>
                                </li>
                            ))}
                            <li className="h-full">
                                <Link
                                        href='/'
                                        className={`flex flex-col items-center gap-1 justify-center h-full px-3 min-w-0 sm:min-w-15 lg:min-w-20 text-[11px] font-medium transition-colors text-black/70 hover:text-black `}
                                    >
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src="morty.jfif" alt="user" />
                                </Avatar>
                                <span className="hidden lg:block text-[12px]">Me</span>
                                </Link>
                            </li>

                            <li className="flex items-center mx-1">
                                <div className="h-10 w-px bg-gray-200" />
                            </li>

                            <li ref={businessRef} className="h-full relative">
                                <div
                                    onClick={() => {
                                        setActiveBusiness((prev) => !prev);
                                        setActiveSearch(false);
                                        setBorder(false);
                                    }}
                                    className="flex flex-col items-center gap-1 justify-center h-full px-3 min-w-20 text-[11px] font-medium text-black/70 hover:text-black cursor-pointer select-none"
                                >
                                    <GridIcon />
                                    <span className="hidden md:flex items-center gap-0.5 text-[12px]">
                                        For Business <ChevronDown className="w-3 h-3" />
                                    </span>
                                </div>
                                {/* Business modal */}
                                {activeBusiness && (
                                    <div className={`absolute top-full right-3 mt-2 h-[85vh] w-[320px] md:w-xl bg-white rounded-tl-lg rounded-br-lg rounded-bl-lg overflow-y-auto shadow-lg p-8 z-100 duration-200 ${visibleBusiness ? 'translate-y-0' : '-translate-y-4'}`}>
                                        <div className="flex h-full md:flex-row flex-col">
                                            <div className="flex-1 flex flex-col gap-8 md:gap-10">
                                                <ul className="flex flex-col gap-3">
                                                    <h3 className="text-xl font-semibold text-black">My Apps</h3>
                                                    <li className="text-md font-semibold text-black">
                                                        <Link href='/' className="hover:underline">Find New Clients</Link>
                                                    </li>
                                                    <li className="text-md font-semibold text-black">
                                                        <Link href='/' className="hover:underline">Groups</Link>
                                                    </li>
                                                </ul>
                                                <ul className="flex flex-col gap-3">
                                                    <h3 className="text-md font-semibold text-black/70">Talent</h3>
                                                    <li className="text-md font-semibold text-black">
                                                        <Link href='/' className="hover:underline">Try Hiring Pro</Link>
                                                    </li>
                                                    <li className="text-md font-semibold text-black">
                                                        <Link href='/' className="hover:underline">Talent Insights</Link>
                                                    </li>
                                                </ul>
                                                <ul className="flex flex-col gap-3">
                                                    <h3 className="text-md font-semibold text-black/70">Sales</h3>
                                                    <li className="text-md font-semibold text-black">
                                                        <Link href='/' className="hover:underline">Services Marketplace</Link>
                                                    </li>
                                                </ul>
                                                 <ul className="flex flex-col gap-3">
                                                    <h3 className="text-md font-semibold text-black/70">Marketing</h3>
                                                    <li className="text-md font-semibold text-black">
                                                        <Link href='/' className="hover:underline">Advertise</Link>
                                                    </li>
                                                </ul>
                                                <ul className="flex flex-col gap-3">
                                                    <h3 className="text-xl font-semibold">Learning</h3>
                                                    <li className="text-md font-semibold text-black">
                                                        <Link href='/' className="hover:underline">Learning</Link>
                                                    </li>
                                                </ul>                                                
                                            </div>
                                            <div className="h-full w-px bg-black/20 mx-8 mt-14 md:mt-0"></div>
                                            <div className="flex-1 pb-6">
                                                <ul className="flex-1 flex flex-col gap-6">
                                                    <h3 className="text-lg font-semibold">Explore more for business</h3>
                                                    <li>
                                                        <Link href='/' className="flex flex-col gap-0 hover:underline">
                                                            <span className="text-md font-semibold text-black">Hire on LinkedIn</span>
                                                            <span className="text-sm leading-none">Find, attract and recruit talent</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href='/' className="flex flex-col gap-0 hover:underline">
                                                            <span className="text-md font-semibold text-black">Sell with LinkedIn</span>
                                                            <span className="text-sm leading-none">Unlock sales opportunities</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href='/' className="flex flex-col gap-0 hover:underline">
                                                            <span className="text-md font-semibold text-black">Find top candidates</span>
                                                            <span className="text-sm leading-none">Reach qualified talent only on LinkedIn</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href='/' className="flex flex-col gap-0 hover:underline">
                                                            <span className="text-md font-semibold text-black">Advertise on LinkedIn</span>
                                                            <span className="text-sm leading-none">Acquire customers and grow your business</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href='/' className="flex flex-col gap-0 hover:underline">
                                                            <span className="text-md font-semibold text-black">Elevate your small business</span>
                                                            <span className="text-sm leading-none">Find new clients and build credibility</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href='/' className="flex flex-col gap-0 hover:underline">
                                                            <span className="text-md font-semibold text-black">Learn with LinkedIn</span>
                                                            <span className="text-sm leading-none">Courses to develop your employees</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href='/' className="flex flex-col gap-0 hover:underline">
                                                            <span className="text-md font-semibold text-black">Admin Center</span>
                                                            <span className="text-sm leading-none">Manage billing and account details</span>
                                                        </Link>
                                                    </li>
                                                    <span className="text-md font-semibold text-black flex items-center gap-2">Create a Company Page <Plus size={16}/></span>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </li>

                            <li className="h-full hidden lg:flex items-center px-3">
                                <Link
                                    href="/"
                                    className="flex flex-col items-center gap-1 justify-center h-full px-3 min-w-20 text-[11px] font-medium text-black/70 hover:text-black"
                                >
                                    <Image src='/prem.png' alt="prem" width={24} height={24} />
                                    <span className="flex items-center gap-0.5 text-[12px]">
                                        Try Premium
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}