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
    getQuotationById,
    addQuotation,
    updateQuotation,
} from "@/utils/quotationStorage";
import {
    industryOptions,
    sourceOptions,
    ownerOptions,
    priorityOptions,
    discountOptions,
    vatOptions,
} from "@/utils/menuDropdown";
import PageBanner from "../common/PageBanner";
import CustomDropdown from "../common/CustomDropdown";

const QuotationForm = ({ mode, quotationId }) => {

    const router = useRouter();

    const [companyOptions, setCompanyOptions] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        initializeCompanies();

        const companyList = getCompanies();

        setCompanies(companyList);

        setCompanyOptions(
            companyList.map(company => ({
                label: company.company,
                value: company.company,
            }))
        );
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "customer") {
            // const selectedCompany = companies.find(
            //     (company) => company.id === value
            // );
            const selectedCompany = companies.find(
                (company) => company.company === value
            );

            if (selectedCompany) {
                setFormData((prev) => ({
                    ...prev,
                    customer: value,
                    contactPerson: selectedCompany.contactPerson || "",
                    email: selectedCompany.email || "",
                    phone: selectedCompany.phone || "",
                    industry: selectedCompany.industryType || "",
                }));

                return;
            }
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const [formData, setFormData] = useState({

        customer: "",
        contactPerson: "",
        email: "",
        phone: "",
        industry: "",
        source: "",

        quotationValue: "",
        discount: "",
        vat: "",
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

        console.log("quotation", quotation);

        if (quotation) {
            setFormData(quotation);
        }
    }, [mode, quotationId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData?.customer.trim()) {
            alert("Customer Name is required.");
            return;
        }

        if (mode === "add") {
            addQuotation(formData);
        } else {
            updateQuotation(quotationId, formData);
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
                                    />
                                </div>
                            </div>

                            {/* Rest of your fields */}
                            <div className="col-lg-4 col-md-6">
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
                            </div>
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
                                    <CustomDropdown
                                        name="industry"
                                        value={formData?.industry}
                                        placeholder="Select Industry"
                                        options={industryOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
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
                            </div>
                        </div>

                        <div className="row">
                            <h3 className="form-title">Quotation Details</h3>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Quotation Value (AED)</label>
                                    <input
                                        type="text"
                                        name="quotationValue"
                                        className="form-control"
                                        value={formData?.quotationValue}
                                        onChange={handleChange}
                                        placeholder="e.g. $250"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Discount %</label>
                                    <CustomDropdown
                                        name="discount"
                                        value={formData?.discount}
                                        placeholder="Select Discount %"
                                        options={discountOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Vat %</label>
                                    <CustomDropdown
                                        name="vat"
                                        value={formData?.vat}
                                        placeholder="Select Vat %"
                                        options={vatOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Payment Terms</label>
                                    <input
                                        type="text"
                                        name="paymentTerms"
                                        className="form-control"
                                        value={formData?.paymentTerms}
                                        onChange={handleChange}
                                        placeholder="e.g. $250"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Owner</label>
                                    <CustomDropdown
                                        name="owner"
                                        value={formData?.owner}
                                        placeholder="Assign Owner"
                                        options={ownerOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Priority</label>
                                    <CustomDropdown
                                        name="priority"
                                        value={formData?.priority}
                                        placeholder="Select Priority"
                                        options={priorityOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Notes</label>
                                    <textarea style={{ minHeight: "120px" }} id="notes"
                                        name="notes"
                                        className="form-control"
                                        value={formData?.notes}
                                        onChange={handleChange} placeholder="Add any details relevant to this quotation..."></textarea>
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