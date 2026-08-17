import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageBanner from "@/components/common/PageBanner";
import { IoMdClose } from "react-icons/io";
import { BsFillSendFill } from "react-icons/bs";
import CustomDropdown from "@/components/common/CustomDropdown";
import Link from "next/link";

import {
    ownerOptions,
    scoreOptions,
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
import {
    notifyAdded,
    notifyUpdated,
} from "@/utils/notificationsStorage";

const OpportunitiesForm = ({
    mode = "add",
    opportunityId,
}) => {

    const router = useRouter();

    const [companies, setCompanies] = useState([]);
    const [contacts, setContacts] = useState([]);

    const [formData, setFormData] = useState({
    opportunity: "",
    companyId: "",
    company: "",
    contact: "",
    value: "",
    probability: "",
    stage: "Qualification",
    owner: "",
    closeDate: "",
});

    const [errors, setErrors] = useState({});
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

   const companyOptions = companies?.map((company) => ({
    label: company?.company,
    value: company?.id,
}));


    /*
    |--------------------------------------------------------------------------
    | Contact Dropdown Options
    |--------------------------------------------------------------------------
    */

    const selectedCompany = companies.find(
    (company) =>
        company?.id === formData?.companyId
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
            opportunity:
                opportunity?.opportunity || "",

            companyId:
                opportunity?.companyId ||
                companies.find(
                    (company) =>
                        company?.company === opportunity?.company
                )?.id ||
                "",

            company:
                opportunity?.company || "",

            contact:
                opportunity?.contact || "",

            value:
                opportunity?.value || "",

            probability:
                opportunity?.probability || "",

            stage:
                opportunity?.stage ||
                "Qualification",

            owner:
                opportunity?.owner || "",

            closeDate:
                opportunity?.closeDate || "",
        });
    }
}, [mode, opportunityId, companies]);


    /*
    |--------------------------------------------------------------------------
    | Handle Change
    |--------------------------------------------------------------------------
    */

    const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "value" && !/^\d*$/.test(value)) {
        return;
    }

    setFormData((prev) => ({
        ...prev,
        [name]: value,

        ...(name === "companyId"
            ? {
                company:
                    companies.find(
                        (company) =>
                            company?.id === value
                    )?.company || "",
                contact: "",
            }
            : {}),
    }));

    setErrors((prev) => ({
        ...prev,
        [name]: "",
        ...(name === "companyId"
            ? { contact: "" }
            : {}),
    }));
};


    const today = new Date();
    const todayDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1
    ).padStart(2, "0")}-${String(
        today.getDate()
    ).padStart(2, "0")}`;

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData?.opportunity?.trim()) {
            newErrors.opportunity =
                "Opportunity Name is required.";
        }

        
        if (!formData?.companyId) {
    newErrors.company =
        "Please select a company.";
}

        if (!formData?.contact) {
            newErrors.contact =
                "Please select a contact.";
        }

        if (!formData?.value) {
            newErrors.value =
                "Value is required.";
        }

        if (!formData?.probability) {
            newErrors.probability =
                "Probability is required.";
        } else if (
            Number(formData?.probability) < 0 ||
            Number(formData?.probability) > 100
        ) {
            newErrors.probability =
                "Probability must be between 0 and 100.";
        }

        if (!formData?.stage) {
            newErrors.stage =
                "Please select a stage.";
        }

        if (!formData?.owner) {
            newErrors.owner =
                "Please select an owner.";
        }

        if (!formData?.closeDate) {
            newErrors.closeDate =
                "Expected Close Date is required.";
        } else if (formData?.closeDate < todayDate) {
            newErrors.closeDate =
                "Previous dates are not allowed.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        if (mode === "add") {

    const newOpportunity =
        addOpportunity(formData);

    notifyAdded(
        "Opportunity",
        formData?.opportunity,
        newOpportunity?.id
    );

} else {

    updateOpportunity(
        opportunityId,
        formData
    );

    notifyUpdated(
        "Opportunity",
        formData?.opportunity,
        opportunityId
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
                                        className={`form-control ${errors?.opportunity
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        value={formData?.opportunity}
                                        onChange={handleChange}
                                        placeholder="e.g. CRM Software Deployment"
                                    />

                                    {errors?.opportunity && (
                                        <div className="form-error">
                                            {errors?.opportunity}
                                        </div>
                                    )}

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
                                        className={errors?.company ? "is-invalid" : ""}
                                    />

                                    {errors?.company && (
                                        <div className="form-error">
                                            {errors?.company}
                                        </div>
                                    )}

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
                                        className={errors?.contact ? "is-invalid" : ""}
                                        onChange={handleChange}
                                    />

                                    {errors?.contact && (
                                        <div className="form-error">
                                            {errors?.contact}
                                        </div>
                                    )}
                                </div>

                            </div>


                            {/* Value */}

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">

                                    <label>
                                        Value ($)
                                    </label>

                                    <input
                                        type="text"
                                        name="value"
                                        className={`form-control ${errors?.value
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        value={formData?.value}
                                        onChange={handleChange}
                                        placeholder="00"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                    />

                                    {errors?.value && (
                                        <div className="form-error">
                                            {errors?.value}
                                        </div>
                                    )}

                                </div>
                            </div>


                            {/* Probability */}

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">

                                    <label>
                                        Probability (%)
                                    </label>

                                    <CustomDropdown
                                        name="probability"
                                        value={formData?.probability}
                                        placeholder="Select Probability"
                                        options={scoreOptions}
                                        onChange={handleChange}
                                        className={
                                            errors?.probability
                                                ? "is-invalid"
                                                : ""
                                        }
                                    />

                                    {errors?.probability && (
                                        <div className="form-error">
                                            {errors?.probability}
                                        </div>
                                    )}

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
                                        className={errors?.stage ? "is-invalid" : ""}
                                        onChange={handleChange}
                                    />

                                    {errors?.stage && (
                                        <div className="form-error">
                                            {errors?.stage}
                                        </div>
                                    )}

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
                                        className={errors?.owner ? "is-invalid" : ""}
                                        onChange={handleChange}
                                    />

                                    {errors?.owner && (
                                        <div className="form-error">
                                            {errors?.owner}
                                        </div>
                                    )}

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
                                        className={`form-control ${errors?.closeDate
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        value={formData?.closeDate}
                                        onChange={handleChange}
                                        min={todayDate}
                                    />

                                    {errors?.closeDate && (
                                        <div className="form-error">
                                            {errors?.closeDate}
                                        </div>
                                    )}

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