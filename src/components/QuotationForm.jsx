import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsFillSendFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { IoMdClose } from "react-icons/io";
import {
    initializeCompanies,
    getCompanies,
} from "@/utils/companiesStorage";

import {
    initializeProducts,
    getProducts,
} from "@/utils/productsStorage";

import {
    getQuotationById,
    addQuotation,
    updateQuotation,
} from "@/utils/quotationStorage";
import {
    notifyAdded,
    notifyUpdated,
} from "@/utils/notificationsStorage";
import {
    industryOptions,
    sourceOptions,
    ownerOptions,
    priorityOptions,
    // discountOptions,
    // vatOptions,
} from "@/utils/menuDropdown";
import PageBanner from "@/components/common/PageBanner";
import CustomDropdown from "@/components/common/CustomDropdown";

const QuotationForm = ({ mode, quotationId }) => {

    const router = useRouter();

    const [companyOptions, setCompanyOptions] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        initializeCompanies();
        initializeProducts();

        const companyList = getCompanies();
        const productList = getProducts();

        setCompanies(companyList || []);
        setProducts(productList || []);

        setCompanyOptions(
            companyList.map((company) => ({
                label: company?.company,
                value: company?.company,
            }))
        );

    }, []);

    const productOptions = products?.map((product) => ({
        label: `${product?.productName} - ${product?.sku}`,
        value: product?.id,
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "quantity" && !/^\d*$/.test(value)) {
            return;
        }

        if (name === "quotationValue" && !/^\d*$/.test(value)) {
            return;
        }

        if (name === "customer") {
            const selectedCompany = companies.find(
                (company) => company?.company === value
            );

            setFormData((prev) => ({
                ...prev,
                customer: value,
                contactPerson: selectedCompany?.contactPerson || "",
                email: selectedCompany?.email || "",
                phone: selectedCompany?.phone || "",
                industry:
                    selectedCompany?.industry ||
                    selectedCompany?.industryType ||
                    "",
            }));

            setErrors((prev) => ({
                ...prev,
                customer: "",
            }));

            return;
        }

        if (name === "productId") {
            const selectedProduct = products.find(
                (product) => product?.id === value
            );

            if (!selectedProduct) {
                setFormData((prev) => ({
                    ...prev,
                    productId: "",
                    productName: "",
                    unitPrice: "",
                    quantity: "1",
                    quotationValue: "",
                    discount: "",
                    vat: "",
                }));

                setErrors((prev) => ({
                    ...prev,
                    productId: "",
                }));

                return;
            }

            const unitPrice = Number(
                selectedProduct?.price || 0
            );

            const quantity = Number(
                formData?.quantity || 1
            );

            const quotationValue =
                unitPrice * quantity;

            setFormData((prev) => ({
                ...prev,
                productId: selectedProduct?.id || "",
                productName: selectedProduct?.productName || "",
                unitPrice: unitPrice.toString(),
                quantity: quantity.toString(),
                quotationValue: quotationValue.toString(),
                discount: selectedProduct?.discount || "",
                vat: selectedProduct?.vat || "",
            }));

            setErrors((prev) => ({
                ...prev,
                productId: "",
                quotationValue: "",
                vat: "",
            }));

            return;
        }

        if (name === "quantity") {
            const quantity = Number(value || 0);
            const unitPrice = Number(
                formData?.unitPrice || 0
            );

            setFormData((prev) => ({
                ...prev,
                quantity: value,
                quotationValue: (
                    unitPrice * quantity
                ).toString(),
            }));

            setErrors((prev) => ({
                ...prev,
                quantity: "",
                quotationValue: "",
            }));

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


    const [formData, setFormData] = useState({
        customer: "",
        contactPerson: "",
        email: "",
        phone: "",
        industry: "",
        source: "",

        productId: "",
        productName: "",
        unitPrice: "",
        quantity: "1",

        quotationValue: "",
        discount: "",
        vat: "",

        discountAmount: "",
        vatAmount: "",
        grandTotal: "",

        paymentTerms: "",
        owner: "",
        priority: "",

        notes: "",

        approvalPath: "",
        firstApprover: "",
    });

    useEffect(() => {
        if (mode !== "edit" || !quotationId) return;

        const quotation = getQuotationById(quotationId);

        if (quotation) {
            setFormData(quotation);
        }
    }, [mode, quotationId]);

    const calculateTotals = () => {
        const subtotal = Number(
            formData?.quotationValue || 0
        );

        const discountPercent = Number(
            formData?.discount || 0
        );

        const vatPercent = Number(
            formData?.vat || 0
        );

        const discountAmount =
            subtotal * (discountPercent / 100);

        const afterDiscount =
            subtotal - discountAmount;

        const vatAmount =
            afterDiscount * (vatPercent / 100);

        const grandTotal =
            afterDiscount + vatAmount;

        return {
            subtotal,
            discountPercent,
            discountAmount,
            vatPercent,
            vatAmount,
            grandTotal,
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData?.customer?.trim()) {
            newErrors.customer =
                "Customer / Company is required.";
        }

        if (!formData?.productId) {
            newErrors.productId =
                "Please select a product.";
        }

        if (!formData?.quantity) {
            newErrors.quantity =
                "Quantity is required.";
        }

        if (!formData?.quotationValue) {
            newErrors.quotationValue =
                "Quotation value is required.";
        }

        if (!formData?.vat) {
            newErrors.vat =
                "VAT is required.";
        }

        if (!formData?.paymentTerms?.trim()) {
            newErrors.paymentTerms =
                "Payment terms are required.";
        }

        if (!formData?.owner) {
            newErrors.owner =
                "Owner is required.";
        }

        if (!formData?.priority) {
            newErrors.priority =
                "Priority is required.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setTimeout(() => {
                const firstErrorField =
                    document.querySelector(".is-invalid");

                if (firstErrorField) {
                    firstErrorField.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });

                    firstErrorField.focus?.();
                }
            }, 0);

            return;
        }

        const totals = calculateTotals();

        const quotationData = {
            ...formData,

            quotationValue: totals?.subtotal,

            discountAmount:
                totals?.discountAmount,

            vatAmount:
                totals?.vatAmount,

            grandTotal:
                totals?.grandTotal,
        };

        if (mode === "add") {
            const newQuotation =
                addQuotation(quotationData);

            notifyAdded(
                "Quotation",
                formData?.customer,
                newQuotation?.id
            );
        } else {
            updateQuotation(
                quotationId,
                quotationData
            );

            notifyUpdated(
                "Quotation",
                formData?.customer,
                quotationId
            );
        }

        router.push("/admin/quotations");
    };

    return (
        <>
            <PageBanner title="Quotations" />

            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>{mode === "add" ? "New Quotation" : "Edit Quotation"}</h3>
                        <p>Create a quotation and submit it for approval</p>
                    </div>

                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-outer">
                        {/* Customer Info */}
                        <div className="row">
                            <h3 className="form-title">Customer Info</h3>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Customer / Company</label>

                                    <CustomDropdown
                                        name="customer"
                                        value={formData?.customer}
                                        placeholder="Select Customer"
                                        options={companyOptions}
                                        onChange={handleChange}
                                        className={errors?.customer ? "is-invalid" : ""}
                                    />

                                    {errors?.customer && (
                                        <div className="form-error">
                                            {errors?.customer}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Rest of your fields */}
                            {/* <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Contact Person</label>
                                    <input
                                        type="text"
                                        name="contactPerson"
                                        placeholder="e.g. Contact Person"
                                        className="form-control"
                                        value={formData?.contactPerson}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div> */}
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData?.email}
                                        onChange={handleChange}
                                        placeholder="e.g. name@company.ae"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        value={formData?.phone}
                                        onChange={handleChange}
                                        placeholder="+971 4 000 0000"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Industry Type</label>
                                    <input
                                        type="text"
                                        name="industry"
                                        className="form-control"
                                        value={formData?.industry}
                                        placeholder="Select Industry"
                                        options={industryOptions}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </div>
                            </div>
                            {/* <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Lead Source</label>
                                    <CustomDropdown
                                        name="source"
                                        value={formData?.source}
                                        placeholder="Select Source"
                                        options={sourceOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div> */}

                            {/* Owner */}

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Owner</label>

                                    <CustomDropdown
                                        name="owner"
                                        value={formData?.owner}
                                        placeholder="Assign Owner"
                                        options={ownerOptions}
                                        onChange={handleChange}
                                        className={
                                            errors?.owner
                                                ? "is-invalid"
                                                : ""
                                        }
                                    />

                                    {errors?.owner && (
                                        <div className="form-error">
                                            {errors?.owner}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Priority */}

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Priority</label>

                                    <CustomDropdown
                                        name="priority"
                                        value={formData?.priority}
                                        placeholder="Select Priority"
                                        options={priorityOptions}
                                        onChange={handleChange}
                                        className={
                                            errors?.priority
                                                ? "is-invalid"
                                                : ""
                                        }
                                    />

                                    {errors?.priority && (
                                        <div className="form-error">
                                            {errors?.priority}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <h3 className="form-title">
                                Quotation Details
                            </h3>

                            {/* Product */}

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Product</label>

                                    <CustomDropdown
                                        name="productId"
                                        value={formData?.productId}
                                        placeholder="Select Product"
                                        options={productOptions}
                                        onChange={handleChange}
                                        className={
                                            errors?.productId
                                                ? "is-invalid"
                                                : ""
                                        }
                                    />

                                    {errors?.productId && (
                                        <div className="form-error">
                                            {errors?.productId}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Unit Price */}

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Unit Price (AED)</label>

                                    <input
                                        type="text"
                                        name="unitPrice"
                                        className="form-control"
                                        value={formData?.unitPrice}
                                        readOnly
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            {/* Quantity */}

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Quantity</label>

                                    <input
                                        type="number"
                                        name="quantity"
                                        min="1"
                                        className={`form-control ${errors?.quantity ? "is-invalid" : "" }`}
                                        value={formData?.quantity}
                                        onChange={handleChange}
                                        placeholder="e.g. 1"
                                        inputMode="numeric"
                                    />

                                    {errors?.quantity && (
                                        <div className="form-error">
                                            {errors?.quantity}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Subtotal */}

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Subtotal (AED)</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData?.quotationValue}
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* Discount */}

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Discount {formData?.discount ? `(${formData?.discount}%)` : "%"}</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={calculateTotals()?.discountAmount}
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* VAT */}

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>VAT {formData?.vat ? `(${formData?.vat}%)` : "%"}</label>

                                    <input
                                        type="text"
                                        className={`form-control ${errors?.vat ? "is-invalid" : ""}`}
                                        value={calculateTotals()?.vatAmount}
                                        readOnly
                                    />

                                    {errors?.vat && (
                                        <div className="form-error">
                                            {errors?.vat}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Grand Total */}

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Grand Total (AED)</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={calculateTotals()?.grandTotal}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="col-lg-8 col-md-6">
                                <div className="form-group">
                                    <label>Payment Terms</label>

                                    <input
                                        type="text"
                                        name="paymentTerms"
                                        className={`form-control ${errors?.paymentTerms
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        value={formData?.paymentTerms}
                                        onChange={handleChange}
                                        placeholder="e.g. 30 Days"
                                    />

                                    {errors?.paymentTerms && (
                                        <div className="form-error">
                                            {errors?.paymentTerms}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Notes */}

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Notes</label>

                                    <textarea
                                        style={{ minHeight: "120px" }}
                                        name="notes"
                                        className="form-control"
                                        value={formData?.notes}
                                        onChange={handleChange}
                                        placeholder="Add any details relevant to this quotation..."
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="form-action">
                        <button
                            type="submit"
                            className="btn btn-primary ms-2"
                        >
                            <BsFillSendFill />
                            <span>
                                {mode === "add"
                                    ? "Create Quotation"
                                    : "Update Quotation"}
                            </span>
                        </button>

                        <Link
                            href="/admin/quotations"
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

export default QuotationForm;