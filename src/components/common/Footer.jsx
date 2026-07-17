import React from 'react'
import LogoWh from "@/images/logoWh.svg";
import PortaLIcon from "@/images/PortaLIcon.svg";
import Link from 'next/link';
import Image from 'next/image';
const Footer = () => {
    return (
        <>
        <footer>
            <section className="footer-section-top">
                <div className="container">
                    <div className="row footer-row">
                        <div className="col-footer-logo">
                            <div className="footer-logo">
                                <Link className="logo-image" href="/">
                                    <Image src={LogoWh} className={"main-logo"} alt="Logo" />
                                </Link>
                                <p>
                                    Leading provider of furniture protection plans in North America. Relax more, worry less — for over 40 years.
                                </p>
                            </div>
                        </div>
                        <div className="col-footer-links">
                            <div className="footer-links">
                                <h4>Company</h4>
                                <ul className="list-unstyled mb-0">
                                    <li>
                                        <Link href={"#"}>
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"#"}>
                                            Careers
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"/privacy"}>
                                            Privacy Policy
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-footer-links">
                            <div className="footer-links">
                                <h4>Services</h4>
                                <ul className="list-unstyled mb-0">
                                    <li>
                                        <Link href={"#"}>
                                            For Consumers
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"#"}>
                                            For Retailers
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-footer-links">
                            <div className="footer-links">
                                <h4>Connect</h4>
                                <ul className="list-unstyled mb-0">
                                    <li>
                                        <Link href={"#"}>
                                            LinkedIn
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"#"}>
                                            Contact Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"#"}>
                                            Consumer Portal
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <div className="copyright-div">
                © 2025 Montage LLC. All rights reserved.
            </div>
</footer>
        </>
    )
}

export default Footer