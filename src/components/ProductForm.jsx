import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import PageBanner from "@/components/common/PageBanner";

import { IoMdClose } from "react-icons/io";
import { BsFillSendFill } from "react-icons/bs";

import {
    addProduct,
    updateProduct,
    getProductById,
} from "@/utils/productsStorage";

import {
    discountOptions,
    vatOptions,
} from "@/utils/menuDropdown";

import {
    notifyAdded,
    notifyUpdated,
} from "@/utils/notificationsStorage";

import CustomDropdown from "@/components/common/CustomDropdown";

const ProductForm = ({ mode, productId }) => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        productName: "",
        sku: "",
        category: "",
        price: "",
        vat: "",
        discount: "",
        status: "Active",
        description: "",
    });

    const [errors, setErrors] = useState({});

    const categoryOptions = [
        {
            label: "Software",
            value: "Software",
        },
        {
            label: "Hardware",
            value: "Hardware",
        },
        {
            label: "Services",
            value: "Services",
        },
        {
            label: "Analytics",
            value: "Analytics",
        },
        {
            label: "Other",
            value: "Other",
        },
    ];

    const productStatusOptions = [
        {
            label: "Active",
            value: "Active",
        },
        {
            label: "Inactive",
            value: "Inactive",
        },
    ];

    useEffect(() => {
        if (mode !== "edit" || !productId) return;

        const product = getProductById(productId);

        if (!product) return;

        setFormData({
            productName: product?.productName || "",
            sku: product?.sku || "",
            category: product?.category || "",
            price: product?.price ?? "",
            // stock: product?.stock ?? "",
            status: product?.status || "Active",
            description: product?.description || "",
        });
    }, [mode, productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (
            (name === "price" || name === "stock") &&
            !/^\d*$/.test(value)
        ) {
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = () => {
        const newErrors = {};

        if (!formData?.productName?.trim()) {
            newErrors.productName = "Product Name is required.";
        }

        if (!formData?.sku?.trim()) {
            newErrors.sku = "SKU is required.";
        }

        if (!formData?.category) {
            newErrors.category = "Category is required.";
        }

        if (
            formData?.price === "" ||
            formData?.price === null ||
            formData?.price === undefined
        ) {
            newErrors.price = "Price is required.";
        } else if (Number(formData?.price) < 0) {
            newErrors.price = "Price cannot be negative.";
        }

        // if (
        //     formData?.stock === "" ||
        //     formData?.stock === null ||
        //     formData?.stock === undefined
        // ) {
        //     newErrors.stock = "Stock is required.";
        // } else if (Number(formData?.stock) < 0) {
        //     newErrors.stock = "Stock cannot be negative.";
        // }

        if (!formData?.status) {
            newErrors.status = "Status is required.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            setTimeout(() => {
                const firstErrorField =
                    document.querySelector(".is-invalid");

                if (firstErrorField) {
                    firstErrorField.scrollIntoView({
                        behavior: "smooth",
                    });

                    firstErrorField.focus?.();
                }
            }, 0);

            return;
        }

        const dataToSave = {
            ...formData,
            price: Number(formData?.price),
            // stock: Number(formData?.stock),
        };

        setErrors({});

        if (mode === "add") {
            const newProduct = addProduct(dataToSave);

            notifyAdded(
                "Product",
                dataToSave?.productName,
                newProduct?.id
            );
        } else {
            updateProduct(productId, dataToSave);

            notifyUpdated(
                "Product",
                dataToSave?.productName,
                productId
            );
        }

        router.push("/admin/products");
    };

    return (
        <>
            <PageBanner title="Products" />

            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>
                            {mode === "add"
                                ? "New Product"
                                : "Edit Product"}
                        </h3>

                        <p>
                            {mode === "add"
                                ? "Add a new product to your catalog"
                                : "Update product information"}
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    {/* Product Information */}
                    <div className="form-outer mb-3">
                        <div className="row">
                            <h3 className="form-title">
                                Product Information
                            </h3>

                            {/* Product Name */}
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Product Name</label>

                                    <input
                                        type="text"
                                        name="productName"
                                        className={`form-control ${errors?.productName
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        value={formData?.productName}
                                        onChange={handleChange}
                                        placeholder="e.g. CRM Software"
                                    />

                                    {errors?.productName && (
                                        <div className="form-error">
                                            {errors?.productName}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* SKU */}
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>SKU</label>

                                    <input
                                        type="text"
                                        name="sku"
                                        className={`form-control ${errors?.sku
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        value={formData?.sku}
                                        onChange={handleChange}
                                        placeholder="e.g. CRM-001"
                                    />

                                    {errors?.sku && (
                                        <div className="form-error">
                                            {errors?.sku}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Category */}
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Category</label>

                                    <CustomDropdown
                                        name="category"
                                        value={formData?.category}
                                        placeholder="Select Category"
                                        options={categoryOptions}
                                        onChange={handleChange}
                                        className={
                                            errors?.category
                                                ? "is-invalid"
                                                : ""
                                        }
                                    />

                                    {errors?.category && (
                                        <div className="form-error">
                                            {errors?.category}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Price</label>

                                    <input
                                        type="text"
                                        name="price"
                                        className={`form-control ${errors?.price
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        value={formData?.price}
                                        onChange={handleChange}
                                        placeholder="e.g. 499"
                                    />

                                    {errors?.price && (
                                        <div className="form-error">
                                            {errors?.price}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
    <div className="form-group">
        <label>VAT (%)</label>

        <CustomDropdown
            name="vat"
            value={formData?.vat}
            placeholder="Select VAT"
            options={vatOptions}
            onChange={handleChange}
            className={errors?.vat ? "is-invalid" : ""}
        />

        {errors?.vat && (
            <div className="form-error">
                {errors?.vat}
            </div>
        )}
    </div>
</div>

                            <div className="col-lg-4 col-md-6">
    <div className="form-group">
        <label>Discount (%)</label>

        <CustomDropdown
            name="discount"
            value={formData?.discount}
            placeholder="Select Discount"
            options={discountOptions}
            onChange={handleChange}
            className={errors?.discount ? "is-invalid" : ""}
        />

        {errors?.discount && (
            <div className="form-error">
                {errors?.discount}
            </div>
        )}
    </div>
</div>

                            {/* Stock */}
                            {/* <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Stock</label>

                                    <input
                                        type="text"
                                        name="stock"
                                        className={`form-control ${errors?.stock ? "is-invalid" : ""
                                            }`}
                                        value={formData?.stock}
                                        onChange={handleChange}
                                        placeholder="00"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                    />

                                    {errors?.stock && (
                                        <div className="form-error">
                                            {errors?.stock}
                                        </div>
                                    )}
                                </div>
                            </div> */}

                            {/* Status */}
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Status</label>

                                    <CustomDropdown
                                        name="status"
                                        value={formData?.status}
                                        placeholder="Select Status"
                                        options={productStatusOptions}
                                        onChange={handleChange}
                                        className={
                                            errors?.status
                                                ? "is-invalid"
                                                : ""
                                        }
                                    />

                                    {errors?.status && (
                                        <div className="form-error">
                                            {errors?.status}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <div className="form-group mb-0">
                                    <label>Product Description</label>

                                    <textarea
                                        name="description"
                                        className="form-control"
                                        style={{
                                            minHeight: "120px",
                                        }}
                                        value={formData?.description}
                                        onChange={handleChange}
                                        maxLength="500"
                                        placeholder="Enter product description..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="form-action">
                        <button
                            type="submit"
                            className="btn btn-primary ms-2"
                        >
                            <BsFillSendFill />

                            <span>
                                {mode === "add"
                                    ? "Create Product"
                                    : "Update Product"}
                            </span>
                        </button>

                        <Link
                            href="/admin/products"
                            className="btn btn-outline-primary mx-2"
                        >
                            <IoMdClose />

                            <span>Cancel</span>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ProductForm;