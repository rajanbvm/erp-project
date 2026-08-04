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
import TrendUp from "@/images/TrendUp.svg";
import Activities from "@/images/Activities.svg";
import Tasks from "@/images/Tasks.svg";
import Calls from "@/images/Calls.svg";
import Reminders from "@/images/Reminders.svg";
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
                                className={`dash-link ${pathname.startsWith("/admin/leads") ? "active" : ""}`}
                            >
                                <Image src={userIcon} alt="Dashboard icon" />
                                <span className="tooltip">Leads</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={`/admin/quotations`}
                                className={`dash-link ${pathname.startsWith("/admin/quotations") ? "active" : ""}`}
                            >
                                <Image src={FileText} alt="Dashboard icon" />
                                <span className="tooltip">Quotations</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={`/admin/contacts`}
                                className={`dash-link ${pathname.startsWith("/admin/contacts") ? "active" : ""}`}
                            >
                                <Image src={UsersThree} alt="Dashboard icon" />
                                <span className="tooltip">Contacts</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                href={`/admin/companies`}
                                className={`dash-link ${pathname.startsWith("/admin/companies") ? "active" : ""}`}
                            >
                                <Image src={BuildingOffice} alt="Plans icon" />
                                <span className="tooltip">Companies</span>
                            </Link>
                        </li>

                        {/* <li>
                            <Link
                                href={`/admin/dashboard`}
                                className={`dash-link ${pathname === "/" ? "active" : ""}`}
                            >
                                <Image src={Calendar} alt="Claims icon" />
                                <span className="tooltip">Calendar</span>
                            </Link>
                        </li> */}

                        <li>
                            <Link
                                href={`/admin/opportunities`}
                                className={`dash-link ${pathname === "/admin/opportunities" || pathname === "/admin/opportunities/add" ? "active" : ""}`}
                            >
                                <Image src={TrendUp} alt="Opportunities icon" />
                                <span className="tooltip">Opportunities</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/admin/activities`}
                                className={`dash-link ${pathname === "/admin/activities" ? "active" : ""}`}
                            >
                                <Image src={Activities} alt="Activities icon" />
                                <span className="tooltip">Activities</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/admin/tasks`}
                                className={`dash-link ${pathname === "/admin/tasks" ? "active" : ""}`}
                            >
                                <Image src={Tasks} alt="Tasks icon" />
                                <span className="tooltip">Tasks</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/admin/calls`}
                                className={`dash-link ${pathname === "/admin/calls" ? "active" : ""}`}
                            >
                                <Image src={Calls} alt="Calls icon" />
                                <span className="tooltip">Calls</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/admin/reminders`}
                                className={`dash-link 
                                    ${pathname === "/admin/reminders" || pathname === "/admin/reminders/add" ? "active" : ""}`}
                            >
                                <Image src={Reminders} alt="Reminders icon" />
                                <span className="tooltip">Reminders</span>
                            </Link>
                        </li>

                    </ul>
                </div>

            </div>
        </>
    )

}

export default AdminNavbar;