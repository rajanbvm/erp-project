import PageBanner from "@/components/common/PageBanner";
import { getProductById } from "@/utils/productsStorage";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { RiEdit2Fill } from "react-icons/ri";
import Link from "next/link";

const ProductsDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (!router.isReady) return;

        const foundProduct = getProductById(id);

        setProduct(foundProduct || null);
    }, [router.isReady, id]);

    if (!router.isReady) {
        return null;
    }

    if (!product) {
        return (
            <>
                <PageBanner title="Product Details" />

                <div className="bg-box text-center p-5">
                    <h4>Product not found.</h4>
                </div>
            </>
        );
    }

    return (
        <>
            <PageBanner title="Products" />

            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>{product?.productName}</h3>
                    </div>

                    <div className="QuoteDetailsStatus">
                        <span className="level-btn">
                            {product?.status}
                        </span>
                    </div>
                </div>

                <div className="form-outer mb-3">
                    <h3 className="form-title">
                        Product Information
                    </h3>

                    <div className="row QuoteInfo RowBorderBottom">
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Product Name</label>
                                <h6 className="formValue">
                                    {product?.productName || "-"}
                                </h6>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>SKU</label>
                                <h6 className="formValue">
                                    {product?.sku || "-"}
                                </h6>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Category</label>
                                <h6 className="formValue">
                                    {product?.category || "-"}
                                </h6>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Status</label>
                                <h6 className="formValue">
                                    {product?.status || "-"}
                                </h6>
                            </div>
                        </div>
                    </div>

                    <div className="row QuoteInfo RowBorderBottom">
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Price</label>
                                <h6 className="formValue">
                                    ${product?.price ?? "-"}
                                </h6>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>VAT</label>
                                <h6 className="formValue">
                                    {product?.vat
                                        ? `${product?.vat}%`
                                        : "-"}
                                </h6>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Discount</label>
                                <h6 className="formValue">
                                    {product?.discount
                                        ? `${product?.discount}%`
                                        : "-"}
                                </h6>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Created</label>
                                <h6 className="formValue">
                                    {product?.created || "-"}
                                </h6>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group mb-0">
                                <label>Description</label>
                                <h6 className="formValue">
                                    {product?.description || "-"}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-action">
                    <Link
                        href={`/admin/products/edit/${product?.id}`}
                        className="btn btn-outline-primary mx-2"
                    >
                        <RiEdit2Fill />
                        <span>Edit</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ProductsDetails;