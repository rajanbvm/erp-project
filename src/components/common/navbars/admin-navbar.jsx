import React, { useState, useContext } from 'react'
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DP from "@/images/Dp.png";
import DashIcon from "@/images/DashIcon.svg";
import userIcon from "@/images/UserList.svg";
import FileText from "@/images/FileText.svg";
import UsersThree from "@/images/UsersThree.svg";
import Calendar from "@/images/Calendar.svg";
import BuildingOffice from "@/images/BuildingOffice.svg";
// import { BASE_URL } from '@/config/api';





const AdminNavbar = () => {
    const pathname = usePathname();

    return (
        <>
            <div className="dashboard-left">
                <div className="dash-logo">
                    <Link href="/">
                        <span className="text-one">BVM</span>
                        <span className="text-two">ONE</span>
                    </Link>
                </div>

                <div className="dash-navbar">

                    <ul className="navbar-list">
                        <li className="nav-profile">
                            <Image src={DP} alt="Profile Image" />
                        </li>
                        <li className="nav-heading">
                            Main
                        </li>

                        <li>
                            <Link
                                href={`/admin/dashboard`}
                                className={`dash-link ${pathname === "/admin/dashboard" ? "active" : ""}`}
                            >
                                <Image src={DashIcon} alt="Dashboard icon" />
                                <span className="tooltip">Dashboard</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={`/admin/leads`}
                                className={`dash-link ${pathname === "/admin/leads" ? "active" : ""}`}
                            >
                                <Image src={userIcon} alt="Dashboard icon" />
                                <span className="tooltip">Leads</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={`/admin/dashboard`}
                                className={`dash-link ${pathname === "/admin/retailers" ? "active" : ""}`}
                            >
                                <Image src={FileText} alt="Dashboard icon" />
                                <span className="tooltip">Quotations</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={`/admin/dashboard`}
                                className={`dash-link ${pathname === "/admin/technicians" ? "active" : ""}`}
                            >
                                <Image src={UsersThree} alt="Dashboard icon" />
                                <span className="tooltip">Contacts</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={`/admin/dashboard`}
                                className={`dash-link ${pathname === "/admin/plans" ? "active" : ""}`}
                            >
                                <Image src={BuildingOffice} alt="Plans icon" />
                                <span className="tooltip">Companies</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={`/admin/dashboard`}
                                className={`dash-link ${pathname === "/" ? "active" : ""}`}
                            >
                                <Image src={Calendar} alt="Claims icon" />
                                <span className="tooltip">Calendar</span>
                            </Link>
                        </li>


                    </ul>
                </div>

            </div>
        </>
    )

}

export default AdminNavbar;