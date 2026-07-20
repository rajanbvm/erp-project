import Image from "next/image";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";

const PageBanner = ({
    title,
    image,
    //   overlay = true,
    className = "",
}) => {
    return (
        <section className={`page-banner-sec mb-32 ${className}`}>
            <div className="row">
                <div className="col-md-6">
                    <div className="banner-text">
                        <h1>{title}</h1>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="banner-text">
                        <ul>
                            <li><Link href="/admin/dashboard">Dashboard</Link></li>
                            <li><GoDotFill style={{ fill: "#2F6EFF" }} /></li>
                            <li><span>{title}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PageBanner;