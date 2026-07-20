import Image from "next/image";
import Link from "next/link";

const PageBanner = ({
    title,
    image,
    //   overlay = true,
    className = "",
}) => {
    return (
        <section className={`page-banner-sec ${className}`}>
            <div className="page-banner-img position-relative">

                {/* Optional overlay */}
                {/* {overlay && <div className="bg-color"></div>} */}

                <div className="bg-color"></div>
                <Image
                    className="banner-img"
                    src={image}
                    alt={title || "banner"}
                    priority
                />
            </div>

            <div className="banner-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="banner-text">
                                <h1>{title}</h1>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="banner-text">
                                <ul>
                                    <li><Link href="/">Home</Link></li>
                                    <li><GoDotFill style={{ fill: "#2F6EFF" }} /></li>
                                    <li><span>{title}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PageBanner;