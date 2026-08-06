import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import PageBanner from "@/components/common/PageBanner";
import { IoMdClose } from "react-icons/io";

import { BsFillSendFill } from "react-icons/bs";
import CustomDropdown from '../common/CustomDropdown';
import {
    companySizeOptions,
    industryOptions,
} from "@/utils/menuDropdown";

import {
    addCompany,
    updateCompany,
    getCompanyById,
} from "@/utils/companiesStorage";
import Link from 'next/link';


const CompaniesForm = ({ mode, companyId }) => {

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [formData, setFormData] = useState({

        company: "",
        industry: "",
        location: "",

        phone: "",
        alternatePhone: "",
        email: "",
        website: "",

        companySize: "",
        gstin: "",

        billingAddress: "",

        notes: "",

        owner: "",
        deals: "0",
        revenue: "",

    });

    useEffect(() => {

        if (mode !== "edit" || !companyId) return;

        const company = getCompanyById(companyId);

        if (company) {
            setFormData(company);
        }

    }, [mode, companyId]);

    const handleSubmit = () => {

        if (!formData.company.trim()) {
            alert("Company Name is required.");
            return;
        }

        if (mode === "add") {
            addCompany(formData);
        } else {
            updateCompany(companyId, formData);
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
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >

                    <div className="form-outer mb-3">
                        <div className="row">
                            <h3 className="form-title">Company Information</h3>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Company Name</label>
                                    <input id="company"
                                        name="company"
                                        className="form-control"
                                        value={formData?.company}
                                        onChange={handleChange}
                                        placeholder="e.g. Nirvana Retail Pvt Ltd" />
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
                                        className="form-control"
                                        value={formData?.email}
                                        onChange={handleChange}
                                        placeholder="e.g. rohan@company.com"
                                    />
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
                                    <input type="text" className="form-control" placeholder="e.g. Optional" />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Registered under GST</label>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="PrimaryContact" />
                                        <label className="form-check-label mb-0" style={{ color: "#8B909A", }} for="PrimaryContact">Enable if this company is a GST-registered entity</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

 <div className="form-outer mb-3">
                    <div className="row">
                        <h3 className="form-title">Addresses</h3>
                        <div className="badge-head">
                            <h6 className="mb-0">Billing Address</h6>
                            <span className="primary-badge">Primary</span>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Address Line</label>
                                <input type="text" className="form-control" placeholder="e.g. 14th Floor, Falcon Tower, MG Road" />
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" className="form-control" placeholder="e.g. Jaipur" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>State</label>
                                <input type="text" className="form-control" placeholder="e.g. Rajasthan" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Pincode</label>
                                <input type="text" className="form-control" placeholder="e.g. 302001" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Country</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>India</option>
                                    <option value="1" >Country One</option>
                                    <option value="2" >Country Two</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="add-another-btn">+ Add Another Address</button>
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
                                {mode === "add" ? "Create Lead" : "Update Lead"}
                            </span>
                        </button>
                        <Link
                            href={"/admin/companies"}
                            className="btn btn-outline-primary mx-2">
                            <IoMdClose />
                            <span>Cancel</span>
                        </Link>
                    </div>
                </form>
            </div>
        </>
       );
};

export default CompaniesForm;