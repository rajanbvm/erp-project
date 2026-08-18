import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import DP from "@/images/Dp.png";
import DashIcon from "@/images/DashIcon.svg";
import userIcon from "@/images/UserList.svg";
import FileText from "@/images/FileText.svg";
import UsersThree from "@/images/UsersThree.svg";
import BuildingOffice from "@/images/BuildingOffice.svg";
import TrendUp from "@/images/TrendUp.svg";
import Activities from "@/images/Activities.svg";
import Logout from "@/images/logout.svg";
import Reminders from "@/images/Reminders.svg";

import Permission from "@/components/common/Permission";

const AdminNavbar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        router.push("/");
    };

    return (
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
                        <Image
                            src={DP}
                            alt="Profile Image"
                        />
                    </li>

                    <li className="nav-heading">
                        Main
                    </li>

                    {/* Dashboard - always visible */}
                    <li>
                        <Link
                            href="/admin/dashboard"
                            className={`dash-link ${
                                pathname === "/admin/dashboard"
                                    ? "active"
                                    : ""
                            }`}
                        >
                            <Image
                                src={DashIcon}
                                alt="Dashboard icon"
                            />

                            <span className="tooltip">
                                Dashboard
                            </span>
                        </Link>
                    </li>

                    {/* Leads */}
                    <Permission
                        module="leads"
                        action="view"
                    >
                        <li>
                            <Link
                                href="/admin/leads"
                                className={`dash-link ${
                                    pathname?.startsWith(
                                        "/admin/leads"
                                    )
                                        ? "active"
                                        : ""
                                }`}
                            >
                                <Image
                                    src={userIcon}
                                    alt="Leads icon"
                                />

                                <span className="tooltip">
                                    Leads
                                </span>
                            </Link>
                        </li>
                    </Permission>

                    {/* Quotations */}
                    <Permission
                        module="quotations"
                        action="view"
                    >
                        <li>
                            <Link
                                href="/admin/quotations"
                                className={`dash-link ${
                                    pathname?.startsWith(
                                        "/admin/quotations"
                                    )
                                        ? "active"
                                        : ""
                                }`}
                            >
                                <Image
                                    src={FileText}
                                    alt="Quotations icon"
                                />

                                <span className="tooltip">
                                    Quotations
                                </span>
                            </Link>
                        </li>
                    </Permission>

                    {/* Contacts */}
                    <Permission
                        module="contacts"
                        action="view"
                    >
                        <li>
                            <Link
                                href="/admin/contacts"
                                className={`dash-link ${
                                    pathname?.startsWith(
                                        "/admin/contacts"
                                    )
                                        ? "active"
                                        : ""
                                }`}
                            >
                                <Image
                                    src={UsersThree}
                                    alt="Contacts icon"
                                />

                                <span className="tooltip">
                                    Contacts
                                </span>
                            </Link>
                        </li>
                    </Permission>

                    {/* Companies */}
                    <Permission
                        module="companies"
                        action="view"
                    >
                        <li>
                            <Link
                                href="/admin/companies"
                                className={`dash-link ${
                                    pathname?.startsWith(
                                        "/admin/companies"
                                    )
                                        ? "active"
                                        : ""
                                }`}
                            >
                                <Image
                                    src={BuildingOffice}
                                    alt="Companies icon"
                                />

                                <span className="tooltip">
                                    Companies
                                </span>
                            </Link>
                        </li>
                    </Permission>

                    {/* Opportunities */}
                    <Permission
                        module="opportunities"
                        action="view"
                    >
                        <li>
                            <Link
                                href="/admin/opportunities"
                                className={`dash-link ${
                                    pathname?.startsWith(
                                        "/admin/opportunities"
                                    )
                                        ? "active"
                                        : ""
                                }`}
                            >
                                <Image
                                    src={TrendUp}
                                    alt="Opportunities icon"
                                />

                                <span className="tooltip">
                                    Opportunities
                                </span>
                            </Link>
                        </li>
                    </Permission>

                    {/* Activities */}
                    <Permission
                        module="activities"
                        action="view"
                    >
                        <li>
                            <Link
                                href="/admin/activities"
                                className={`dash-link ${
                                    pathname?.startsWith(
                                        "/admin/activities"
                                    )
                                        ? "active"
                                        : ""
                                }`}
                            >
                                <Image
                                    src={Activities}
                                    alt="Activities icon"
                                />

                                <span className="tooltip">
                                    Activities
                                </span>
                            </Link>
                        </li>
                    </Permission>

                    {/* Reminders */}
                    <Permission
                        module="reminders"
                        action="view"
                    >
                        <li>
                            <Link
                                href="/admin/reminders"
                                className={`dash-link ${
                                    pathname ===
                                        "/admin/reminders" ||
                                    pathname ===
                                        "/admin/reminders/add"
                                        ? "active"
                                        : ""
                                }`}
                            >
                                <Image
                                    src={Reminders}
                                    alt="Reminders icon"
                                />

                                <span className="tooltip">
                                    Reminders
                                </span>
                            </Link>
                        </li>
                    </Permission>

                    {/* Logout */}
                    <li>
                        <button
                            type="button"
                            className="dash-link border-0"
                            onClick={handleLogout}
                        >
                            <Image
                                src={Logout}
                                alt="Logout"
                            />

                            <span className="tooltip">
                                Logout
                            </span>
                        </button>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default AdminNavbar;