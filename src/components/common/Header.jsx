import Link from 'next/link'
import Logo from "@/images/logo.svg";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {   
            // Get role from localStorage
            const userRole = localStorage.getItem("role");
            if (userRole) {
                setRole(userRole);
                setIsLoggedIn(true);
            }
    }, []);

    return (
        <>

            <nav className="navbar navbar-expand-lg">
                <div className="container">

                    <Link className="navbar-brand mobile-only" href="/">
                        <Image src={Logo} className={"main-logo"} alt="Logo" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse">
                        <div className="navbar-outer">
                            <Link className="navbar-brand desktop-only" href="/">
                                <Image src={Logo} className={"main-logo"} alt="Logo" />
                            </Link>
                            <ul className="navbar-nav">

                                <li className="nav-item">
                                    <Link className="nav-link active" href="/">
                                        HOME
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" href="/about">
                                        ABOUT
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" href="#">
                                        CONSUMERS
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" href="#">
                                        RETAILERS
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" href="/team">
                                        JOIN US
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" href="/contact">
                                        CONTACT
                                    </Link>
                                </li>


                            </ul>
                            <div className="header-btn text-end">
                            {isLoggedIn ? (
                                <Link href={`/${role}/dashboard`} className="btn-primary">
                                    DASHBOARD
                                </Link>
                            ) : (
                                <Link href="/login" className="btn-primary">
                                    LOGIN
                                </Link>
                            )}
                        </div>
                        </div>



                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header