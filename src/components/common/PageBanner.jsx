import Image from "next/image";

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
                    <h1>{title}</h1>
                </div>
            </div>
        </section>
    );
};

export default PageBanner;