import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import PageBanner from "@/components/common/PageBanner";
import { IoMdClose } from "react-icons/io";

import { BsFillSendFill } from "react-icons/bs";
import CustomDropdown from '@/components/common/CustomDropdown';
import {
    companySizeOptions,
    industryOptions,
} from "@/utils/menuDropdown";
import {
    getCountryOptions,
    getStateOptions,
    getCityOptions,
} from "@/utils/location";

import {
    addCompany,
    updateCompany,
    getCompanyById,
} from "@/utils/companiesStorage";
import Link from 'next/link';

import {
    notifyAdded,
    notifyUpdated,
} from "@/utils/notificationsStorage";


const CompaniesForm = ({ mode, companyId }) => {

    const router = useRouter();

    const [countryOptions, setCountryOptions] = useState([]);
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;

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
        company: "",
        industry: "",

        phone: "",
        alternatePhone: "",
        email: "",
        website: "",

        companySize: "",
        gstin: "",
        panNo: "",

        country: "",
        state: "",
        city: "",
        pincode: "",
        street: "",

        notes: "",

        owner: "",
        deals: "0",
        revenue: "",
    });

    useEffect(() => {
        setCountryOptions(getCountryOptions());
    }, []);

    useEffect(() => {
        if (!formData?.country) {
            setStateOptions([]);
            setCityOptions([]);
            return;
        }

        setStateOptions(getStateOptions(formData?.country));
    }, [formData?.country]);

    useEffect(() => {
        if (!formData?.country || !formData?.state) {
            setCityOptions([]);
            return;
        }

        setCityOptions(
            getCityOptions(
                formData?.country,
                formData?.state
            )
        );
    }, [formData?.country, formData?.state]);


    useEffect(() => {

        if (mode !== "edit" || !companyId) return;

        const company = getCompanyById(companyId);

        if (company) {
            setFormData(company);
        }

    }, [mode, companyId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData?.company?.trim()) {
            newErrors.company = "Company Name is required.";
        }

        if (!formData?.email?.trim()) {
            newErrors.email = "Email is required.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            setTimeout(() => {
                const firstErrorField = document.querySelector(".is-invalid");

                if (firstErrorField) {
                    firstErrorField.scrollIntoView({
                        behavior: "smooth",
                        // block: "center",
                    });

                    firstErrorField.focus?.();
                }
            }, 0);

            return;
        }

        if (mode === "add") {
            const newCompany = addCompany(formData);

            notifyAdded(
                "Company",
                formData?.company,
                newCompany?.id
            );
        } else {
            updateCompany(
                companyId,
                formData
            );

            notifyUpdated(
                "Company",
                formData?.company,
                companyId
            );
        }

        router.push("/admin/companies");
    };

    return (
        <>
            <PageBanner title="Companies" />

            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>{mode === "add" ? "New Company" : "Edit Company"}</h3>
                        <p>Create a company record and link it to leads, contacts, opportunities and quotations.</p>
                    </div>

                </div>
                <form onSubmit={handleSubmit}>

                    <div className="form-outer mb-3">
                        <div className="row">
                            <h3 className="form-title">Company Information</h3>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Company Name</label>
                                    <input
                                        id="company"
                                        name="company"
                                        type="text"
                                        className={`form-control ${errors?.company ? "is-invalid" : ""}`}
                                        value={formData?.company}
                                        onChange={handleChange}
                                        placeholder="e.g. Nirvana Retail Pvt Ltd"
                                    />

                                    {errors?.company && (
                                        <div className="form-error">
                                            {errors?.company}
                                        </div>
                                    )}
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
                                    <label>Website</label>
                                    <input
                                        type="text"
                                        name="website"
                                        className="form-control"
                                        placeholder="www.google.com"
                                        value={formData?.website}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Company Size</label>
                                    <CustomDropdown
                                        name="companySize"
                                        value={formData?.companySize}
                                        placeholder="Select Company Size"
                                        options={companySizeOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-6">
                                <div className="form-group">
                                    <label>About Company</label>
                                    <input
                                        id="notes"
                                        name="notes"
                                        type="text"
                                        maxLength="100"
                                        className="form-control"
                                        value={formData?.notes}
                                        onChange={handleChange}
                                        placeholder="Brief description about the company, its business and background..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-outer mb-3">
                        <div className="row">
                            <h3 className="form-title">Contact Details</h3>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control ${errors?.email ? "is-invalid" : ""
                                            }`}
                                        value={formData?.email}
                                        onChange={handleChange}
                                        placeholder="e.g. rohan@company.com"
                                    />

                                    {errors?.email && (
                                        <div className="form-error">
                                            {errors?.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Primary Phone</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        className="form-control"
                                        placeholder="+91 1234567890"
                                        value={formData?.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Alternate Phone</label>
                                    <input
                                        id="alternatePhone"
                                        name="alternatePhone"
                                        type="text"
                                        className="form-control"
                                        placeholder="+91 1234567890"
                                        value={formData?.alternatePhone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="form-outer mb-3">
                        <div className="row">
                            <h3 className="form-title">Tax Details</h3>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>GSTIN</label>
                                    <input
                                        id="gstin"
                                        name="gstin"
                                        placeholder="e.g. 08Abrpd123456"
                                        type="text"
                                        className="form-control"
                                        value={formData?.gstin}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>PAN Number</label>
                                    <input type="text"
                                        id="panNo"
                                        name="panNo"
                                        className="form-control" placeholder="e.g. Optional"
                                        value={formData?.panNo}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            {/* <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Registered under GST</label>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="PrimaryContact" />
                                        <label className="form-check-label mb-0" style={{ color: "#8B909A", }} for="PrimaryContact">Enable if this company is a GST-registered entity</label>
                                    </div>
                                </div>
                            </div> */}

                        </div>
                    </div>

                    <div className="form-outer mb-3">
                        <div className="row">
                            <h3 className="form-title">Addresses</h3>
                            <div className="badge-head">
                                <h6 className="mb-0">Billing Address</h6>
                                {/* <span className="primary-badge">Primary</span> */}
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Country</label>
                                    <CustomDropdown
                                        name="country"
                                        value={formData?.country || ""}
                                        placeholder="Select Country"
                                        options={countryOptions}
                                        onChange={handleChange}
                                        searchable
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>State</label>
                                    <CustomDropdown
                                        name="state"
                                        value={formData?.state || ""}
                                        placeholder="Select State"
                                        options={stateOptions}
                                        onChange={handleChange}
                                        searchable
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>City</label>
                                    <CustomDropdown
                                        name="city"
                                        value={formData?.city || ""}
                                        placeholder="Select City"
                                        options={cityOptions}
                                        onChange={handleChange}
                                        searchable
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Pincode</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        placeholder="e.g. 302001"
                                        className="form-control"
                                        value={formData?.pincode}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-6">
                                <div className="form-group">
                                    <label>Address Line</label>

                                    <input
                                        type="text"
                                        name="street"
                                        className="form-control"
                                        value={formData?.street}
                                        onChange={handleChange}
                                        placeholder="Address Line"
                                    />
                                </div>
                            </div>


                            {/* <div className="col-12">
                            <button className="add-another-btn">+ Add Another Address</button>
                        </div> */}
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
                                    ? "Create Company"
                                    : "Update Company"}
                            </span>
                        </button>

                        <Link
                            href="/admin/companies"
                            className="btn btn-outline-primary mx-2"
                        >
                            <IoMdClose />

                            <span>
                                Cancel
                            </span>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CompaniesForm;