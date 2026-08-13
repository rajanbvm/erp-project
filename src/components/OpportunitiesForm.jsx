import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageBanner from "@/components/common/PageBanner";
import { IoMdClose } from "react-icons/io";
import { BsFillSendFill } from "react-icons/bs";
import CustomDropdown from "@/components/common/CustomDropdown";
import Link from "next/link";

import {
    ownerOptions,
} from "@/utils/menuDropdown";

import {
    initializeCompanies,
    getCompanies,
} from "@/utils/companiesStorage";

import {
    initializeContacts,
    getContacts,
} from "@/utils/contactsStorage";

import {
    initializeOpportunities,
    getOpportunityById,
    addOpportunity,
    updateOpportunity,
} from "@/utils/opportunitiesStorage";


const OpportunitiesForm = ({
    mode = "add",
    opportunityId,
}) => {

    const router = useRouter();

    const [companies, setCompanies] = useState([]);
    const [contacts, setContacts] = useState([]);

    const [formData, setFormData] = useState({
        opportunity: "",
        company: "",
        contact: "",
        value: "",
        probability: "",
        stage: "Qualification",
        owner: "",
        closeDate: "",
    });


    /*
    |--------------------------------------------------------------------------
    | Stage Options
    |--------------------------------------------------------------------------
    */

    const stageOptions = [
        {
            label: "Qualification",
            value: "Qualification",
        },
        {
            label: "Proposal sent",
            value: "Proposal sent",
        },
        {
            label: "Negotiation",
            value: "Negotiation",
        },
        {
            label: "Won",
            value: "Won",
        },
        {
            label: "Lost",
            value: "Lost",
        },
    ];


    /*
    |--------------------------------------------------------------------------
    | Load Companies, Contacts & Opportunities
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        initializeCompanies();
        initializeContacts();
        initializeOpportunities();

        const companyList = getCompanies();
        const contactList = getContacts();

        setCompanies(companyList || []);
        setContacts(contactList || []);

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Company Dropdown Options
    |--------------------------------------------------------------------------
    */

    const companyOptions = companies.map((company) => ({
        label: company?.company,
        value: company?.company,
    }));


    /*
    |--------------------------------------------------------------------------
    | Contact Dropdown Options
    |--------------------------------------------------------------------------
    */

    const selectedCompany = companies.find(
        (company) =>
            company?.company === formData?.company
    );


    const contactOptions = contacts
        .filter(
            (contact) =>
                contact?.companyId === selectedCompany?.id
        )
        .map((contact) => ({
            label:
                contact?.email ||
                contact?.contact ||
                contact?.name ||
                "Contact",
            value:
                contact?.email ||
                contact?.contact ||
                contact?.name ||
                "",
        }));


    /*
    |--------------------------------------------------------------------------
    | Edit Opportunity
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (mode !== "edit" || !opportunityId) return;

        const opportunity =
            getOpportunityById(opportunityId);

        if (opportunity) {
            setFormData({
                opportunity: opportunity?.opportunity || "",
                company: opportunity?.company || "",
                contact: opportunity?.contact || "",
                value: opportunity?.value || "",
                probability: opportunity?.probability || "",
                stage:
                    opportunity?.stage ||
                    "Qualification",
                owner: opportunity?.owner || "",
                closeDate: opportunity?.closeDate || "",
            });
        }

    }, [mode, opportunityId]);


    /*
    |--------------------------------------------------------------------------
    | Handle Change
    |--------------------------------------------------------------------------
    */

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,

            // Reset contact when company changes
            ...(name === "company"
                ? { contact: "" }
                : {}),
        }));

    };


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!formData?.opportunity?.trim()) {
            alert("Opportunity Name is required.");
            return;
        }

        if (!formData?.company) {
            alert("Please select a company.");
            return;
        }

        if (!formData?.contact) {
            alert("Please select a contact.");
            return;
        }

        if (!formData?.value) {
            alert("Value is required.");
            return;
        }

        if (!formData?.probability) {
            alert("Probability is required.");
            return;
        }

        if (!formData?.stage) {
            alert("Please select a stage.");
            return;
        }

        if (!formData?.owner) {
            alert("Please select an owner.");
            return;
        }

        if (!formData?.closeDate) {
            alert("Expected Close Date is required.");
            return;
        }


        if (mode === "add") {

            addOpportunity(formData);

        } else {

            updateOpportunity(
                opportunityId,
                formData
            );

        }


        router.push("/admin/opportunities");
    };


    return (
        <>
            <PageBanner title="Opportunities" />

            <div className="bg-box opportunity-form-box">

                {/* Header */}

                <div className="table-header mb-3">

                    <div>

                        <h3>
                            {mode === "edit"
                                ? "Edit Opportunity"
                                : "New Opportunity"}
                        </h3>

                        <p>
                            {mode === "edit"
                                ? "Update Opportunity Information"
                                : "Create a New Opportunity"}
                        </p>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    {/* =====================================================
                        OPPORTUNITY INFORMATION
                    ===================================================== */}

                    <div className="form-outer opportunity-form-outer">

                        <div className="row g-3">

                            <h3 className="form-title">
                                Opportunity Information
                            </h3>


                            {/* Opportunity Name */}

                            <div className="col-lg-4 col-md-6">

                                <div className="form-group">

                                    <label>
                                        Opportunity Name
                                    </label>

                                    <input
                                        type="text"
                                        name="opportunity"
                                        className="form-control"
                                        value={formData?.opportunity}
                                        onChange={handleChange}
                                        placeholder="e.g. CRM Software Deployment"
                                    />

                                </div>

                            </div>


                            {/* Company */}

                            <div className="col-lg-4 col-md-6">

                                <div className="form-group">

                                    <label>
                                        Company
                                    </label>

                                    <CustomDropdown
                                        name="company"
                                        value={formData?.company}
                                        placeholder="Select Company"
                                        options={companyOptions}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            {/* Contact */}

                            <div className="col-lg-4 col-md-6">

                                <div className="form-group">

                                    <label>
                                        Contact
                                    </label>

                                    <CustomDropdown
                                        name="contact"
                                        value={formData?.contact}
                                        placeholder="Select Contact"
                                        options={contactOptions}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            {/* Value */}

                            <div className="col-lg-4 col-md-6">

                                <div className="form-group">

                                    <label>
                                        Value ($)
                                    </label>

                                    <input
                                        type="number"
                                        name="value"
                                        className="form-control"
                                        value={formData?.value}
                                        onChange={handleChange}
                                        placeholder="00"
                                        min="0"
                                    />

                                </div>

                            </div>


                            {/* Probability */}

                            <div className="col-lg-4 col-md-6">

                                <div className="form-group">

                                    <label>
                                        Probability (%)
                                    </label>

                                    <input
                                        type="number"
                                        name="probability"
                                        className="form-control"
                                        value={formData?.probability}
                                        onChange={handleChange}
                                        placeholder="20"
                                        min="0"
                                        max="100"
                                    />

                                </div>

                            </div>


                            {/* Stage */}

                            <div className="col-lg-4 col-md-6">

                                <div className="form-group">

                                    <label>
                                        Stage
                                    </label>

                                    <CustomDropdown
                                        name="stage"
                                        value={formData?.stage}
                                        placeholder="Select Stage"
                                        options={stageOptions}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            {/* Owner */}

                            <div className="col-lg-4 col-md-6">

                                <div className="form-group">

                                    <label>
                                        Owner
                                    </label>

                                    <CustomDropdown
                                        name="owner"
                                        value={formData?.owner}
                                        placeholder="Select Owner"
                                        options={ownerOptions}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            {/* Expected Close Date */}

                            <div className="col-lg-4 col-md-6">

                                <div className="form-group">

                                    <label>
                                        Expected Close Date
                                    </label>

                                    <input
                                        type="date"
                                        name="closeDate"
                                        className="form-control"
                                        value={formData?.closeDate}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        ACTION BUTTONS
                    ===================================================== */}

                    <div className="form-action opportunity-form-action">

                        <button
                            type="submit"
                            className="btn btn-primary ms-2"
                        >

                            <BsFillSendFill />

                            <span>
                                {mode === "edit"
                                    ? "Update Opportunity"
                                    : "Create Opportunity"}
                            </span>

                        </button>


                        <Link
                            href="/admin/opportunities"
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


export default OpportunitiesForm;