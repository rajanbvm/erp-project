import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import PageBanner from "@/components/common/PageBanner";
import { IoMdClose } from "react-icons/io";
import {
    addLead,
    updateLead,
    getLeadById
} from "@/utils/leadsStorage";
import {
    initializeCompanies,
    getCompanies,
    getCompanyById,
} from "@/utils/companiesStorage";

import Image from "next/image";
import UploadIcon from "@/images/UploadIcon.svg";
import { FaRegFileLines } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";
import CustomDropdown from '@/components/common/CustomDropdown';
import {
    budgetOptions,
    communicationOptions,
    statusOptions,
    sourceOptions,
    assignmentModeOptions,
    priorityOptions,
    followUpTypeOptions,
    scoreOptions,
    timeOptions,
} from "@/utils/menuDropdown";
import Link from 'next/link';

import {
    notifyAdded,
    notifyUpdated,
} from "@/utils/notificationsStorage";

const LeadForm = ({ mode, leadId }) => {

    const router = useRouter();

    const getCompanyBusinessAddress = (company) => {
        if (!company) return "";

        const addressParts = [
            company.street,
            company.city,
            // company.state,
            // company.pincode,
        ].filter(Boolean);

        return addressParts.join(", ");
    };

    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        initializeCompanies();

        const companyList = getCompanies();

        setCompanies(companyList);
    }, []);

    const companyOptions = companies.map((company) => ({
        label: company.company,
        value: company.id,
    }));

    const handleCompanyChange = (e) => {
        const companyId = e.target.value;

        const selectedCompany = getCompanyById(companyId);

        if (!selectedCompany) {
            setErrors((prev) => ({
                ...prev,
                companyId: "Company Name is required.",
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,

            companyId: selectedCompany?.id,
            company: selectedCompany?.company,

            website: selectedCompany?.website || "",
            industryType: selectedCompany?.industry || "",
            companySize: selectedCompany?.companySize || "",
            annualRevenue: selectedCompany?.revenue || "",
            // Combine company address
            businessAddress: getCompanyBusinessAddress(selectedCompany),
            owner: selectedCompany?.owner || "",

            primaryPhone: selectedCompany?.phone || "",
            email: selectedCompany?.email || "",
        }));

        setErrors((prev) => ({
            ...prev,
            companyId: "",
        }));
    };

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
        lead: "",
        designation: "",

        companyId: "",

        status: "",
        score: "",

        companySize: "",
        budget: "",
        followUpType: "",
        requirement: "",
        remarks: "",

        company: "",
        website: "",
        industryType: "",
        annualRevenue: "",
        businessAddress: "",

        primaryPhone: "",
        secondaryPhone: "",
        email: "",
        whatsapp: "",
        linkedin: "",
        preferredCommunication: "",

        source: "",
        owner: "",
        assignmentMode: "",
        priority: "",

        notes: "",
        followUpDate: "",
        followUpTime: "",
        documents: [],
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (mode !== "edit" || !leadId || companies.length === 0) return;

        const lead = getLeadById(leadId);

        if (!lead) return;

        const selectedCompany =
            companies.find(
                (company) =>
                    company?.id === lead?.companyId ||
                    company?.company === lead?.company
            );

        setFormData({
            ...lead,
            companyId: selectedCompany?.id || lead?.companyId || "",
            company: selectedCompany?.company || lead?.company || "",

            website:
                selectedCompany?.website ||
                lead?.website ||
                "",

            industryType:
                selectedCompany?.industry ||
                lead?.industryType ||
                "",

            companySize:
                selectedCompany?.companySize ||
                lead?.companySize ||
                "",

            annualRevenue:
                selectedCompany?.revenue ||
                lead?.annualRevenue ||
                "",

            businessAddress:
                selectedCompany?.billingAddress ||
                lead?.businessAddress ||
                "",

            owner:
                selectedCompany?.owner ||
                lead?.owner ||
                "",

            primaryPhone:
                selectedCompany?.phone ||
                lead?.primaryPhone ||
                "",

            email:
                selectedCompany?.email ||
                lead?.email ||
                "",
        });
    }, [mode, leadId, companies]);

    const handleSubmit = () => {
        const newErrors = {};

        if (!formData?.lead?.trim()) {
            newErrors.lead = "Lead Name is required.";
        }

        if (!formData?.companyId) {
            newErrors.companyId = "Company Name is required.";
        }

        if (!formData?.source) {
            newErrors.source = "Lead Source is required.";
        }

        if (!formData?.score) {
            newErrors.score = "Lead Score is required.";
        }

        if (!formData?.owner?.trim()) {
            newErrors.owner = "Lead Owner is required.";
        }

        if (!formData?.status) {
            newErrors.status = "Lead Status is required.";
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

        const dataToSave = {
            ...formData,
            created:
                mode === "edit" && formData?.created
                    ? formData.created
                    : new Date().toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    }),
        };

        setErrors({});

        if (mode === "add") {
            const newLead = addLead(dataToSave);

            notifyAdded(
                "Lead",
                dataToSave?.lead,
                newLead?.id
            );
        } else {
            updateLead(leadId, dataToSave);

            notifyUpdated(
                "Lead",
                dataToSave?.lead,
                leadId
            );
        }

        router.push("/admin/leads");
    };



    return (
        <>
            <PageBanner title="Leads" />
            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>{mode === "add" ? "New Lead" : "Edit Lead"}</h3>
                        <p>Capture prospect details manually</p>
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
                            <h3 className="form-title">Lead Information</h3>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Lead Name</label>

                                    <input
                                        type="text"
                                        name="lead"
                                        className={`form-control ${errors?.lead ? "is-invalid" : ""}`}
                                        value={formData?.lead}
                                        onChange={handleChange}
                                        placeholder="e.g. Rohan Mehta"
                                    />

                                    {errors?.lead && (
                                        <div className="form-error">
                                            {errors?.lead}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Designation</label>
                                    <input
                                        type="text"
                                        name="designation"
                                        className="form-control"
                                        value={formData?.designation}
                                        onChange={handleChange}
                                        placeholder="e.g. Procurement Head"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Budget</label>
                                    <CustomDropdown
                                        name="budget"
                                        value={formData?.budget}
                                        placeholder="Select Budget"
                                        options={budgetOptions}
                                        onChange={handleChange}
                                        className={errors?.budget ? "is-invalid" : ""}
                                    />

                                    {errors?.budget && (
                                        <div className="form-error">
                                            {errors?.budget}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Requirement / Interest</label>
                                    <input type="text"
                                        name="requirement"
                                        className="form-control"
                                        value={formData?.requirement}
                                        onChange={handleChange}
                                        maxLength="40"
                                        placeholder="Briefly describe what the prospect is looking for..." />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Remarks</label>
                                    <input
                                        type="text"
                                        name="remarks"
                                        className="form-control"
                                        maxLength="40"
                                        value={formData?.remarks}
                                        onChange={handleChange}
                                        placeholder="Internal remarks..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-outer mb-3">
                        <div className="row">
                            <h3 className="form-title">Company Information</h3>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Company Name</label>

                                    <CustomDropdown
                                        name="company"
                                        value={formData?.companyId}
                                        placeholder="Select Company"
                                        options={companyOptions}
                                        onChange={handleCompanyChange}
                                        className={errors?.companyId ? "is-invalid" : ""}
                                    />

                                    {errors?.companyId && (
                                        <div className="form-error">
                                            {errors?.companyId}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Website</label>
                                    <div className="input-text-box">
                                        {formData?.website}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Industry Type</label>
                                    <div className="input-text-box">
                                        {formData?.industryType}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Annual Revenue</label>
                                    <div className="input-text-box">
                                        {formData?.annualRevenue}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Business Address</label>
                                    <div className="input-text-box">
                                        {formData?.businessAddress}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-outer mb-3">
                        <div className="row">
                            <h3 className="form-title">Contact Details</h3>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Primary Phone</label>
                                    <div className="input-text-box">
                                        {formData?.primaryPhone}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Secondary Phone</label>
                                    <input
                                        id="secondaryPhone"
                                        name="secondaryPhone"
                                        placeholder="Optional"
                                        type="text"
                                        className="form-control"
                                        value={formData?.secondaryPhone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Email Address</label>

                                    <div className="input-text-box">
                                        {formData?.email}
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>WhatsApp Number</label>
                                    <input id="whatsapp"
                                        name="whatsapp"
                                        type="text"
                                        className="form-control"
                                        value={formData?.whatsapp}
                                        onChange={handleChange}
                                        placeholder="e.g. +91 1234567890" />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>LinkedIn / Social Profile</label>
                                    <input id="linkedin"
                                        name="linkedin"
                                        type="text"
                                        className="form-control"
                                        value={formData?.linkedin}
                                        onChange={handleChange} placeholder="e.g. linkedin.com/in/..." />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Preferred Communication</label>
                                    <CustomDropdown
                                        name="preferredCommunication"
                                        value={formData?.preferredCommunication}
                                        placeholder="Select Preference"
                                        options={communicationOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-outer mb-3">
                        <div className="row">
                            <h3 className="form-title">Classification & Ownership</h3>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Lead Source</label>
                                    <CustomDropdown
                                        name="source"
                                        value={formData?.source}
                                        placeholder="Select Source"
                                        options={sourceOptions}
                                        onChange={handleChange}
                                        className={errors?.source ? "is-invalid" : ""}
                                    />

                                    {errors?.source && (
                                        <div className="form-error">
                                            {errors?.source}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Lead Owner</label>
                                    <input
                                        type="text"
                                        name="owner"
                                        className={`form-control ${errors?.owner ? "is-invalid" : ""}`}
                                        value={formData?.owner}
                                        readOnly
                                        placeholder="e.g. rohan@company.com"
                                    />


                                    {errors?.owner && (
                                        <div className="invalid-feedback">
                                            {errors?.owner}
                                        </div>
                                    )}
                                </div>
                            </div> */}
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Lead Status</label>
                                    <CustomDropdown
                                        name="status"
                                        value={formData?.status}
                                        placeholder="Select Status"
                                        options={statusOptions}
                                        onChange={handleChange}
                                        className={errors?.status ? "is-invalid" : ""}
                                    />

                                    {errors?.status && (
                                        <div className="form-error">
                                            {errors?.status}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Lead Score</label>

                                    <CustomDropdown
                                        name="score"
                                        value={formData?.score}
                                        placeholder="Select Score"
                                        options={scoreOptions}
                                        onChange={handleChange}
                                        className={errors?.score ? "is-invalid" : ""}
                                    />

                                    {errors?.score && (
                                        <div className="form-error">
                                            {errors?.score}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Assignment Mode</label>
                                    <CustomDropdown
                                        name="assignmentMode"
                                        value={formData?.assignmentMode}
                                        placeholder="Select Mode"
                                        options={assignmentModeOptions}
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
                        </div>
                    </div>

                    <div className="form-outer mb-3">
                        <div className="row">
                            <h3 className="form-title">Notes, Documents & Follow-Up</h3>
                            <div className="col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Notes</label>
                                    <textarea style={{ minHeight: "120px" }} id="notes"
                                        name="notes"
                                        className="form-control"
                                        value={formData?.notes}
                                        onChange={handleChange} placeholder="Add any internal notes or discussion points..."></textarea>
                                </div>
                            </div>

                            {/* <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Attach Documents</label>

                                    <label htmlFor="uploadFiles" className="w-100">
                                        <input
                                            id="uploadFiles"
                                            name="documents"
                                            type="file"
                                            className="d-none"
                                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];

                                                if (!file) return;

                                                setFormData((prev) => ({
                                                    ...prev,
                                                    documents: file,
                                                }));
                                            }}
                                        />

                                        <div className="upload-div">
                                            <div className="icon-text">
                                                <Image
                                                    src={UploadIcon}
                                                    alt="Upload"
                                                    width={24}
                                                    height={24}
                                                />

                                                <span>
                                                    {formData?.documents?.name || "Upload Files"}
                                                </span>
                                            </div>

                                            <p className="mb-0">
                                                Click to browse PDF, DOC, XLS, PPT, JPG, PNG · up to 25MB each
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div> */}
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Follow-Up Type</label>

                                    <CustomDropdown
                                        name="followUpType"
                                        value={formData?.followUpType}
                                        placeholder="Select Follow-Up Type"
                                        options={followUpTypeOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Follow-Up Date</label>
                                    <input
                                        id="followUpDate"
                                        name="followUpDate"
                                        type="date"
                                        className="form-control"
                                        value={formData?.followUpDate}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Follow-Up Time</label>

                                    <CustomDropdown
                                        name="followUpTime"
                                        value={formData?.followUpTime}
                                        placeholder="Select Time"
                                        options={timeOptions}
                                        onChange={handleChange}
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
                                {mode === "add" ? "Create Lead" : "Update Lead"}
                            </span>
                        </button>
                        <Link
                            href={"/admin/leads"}
                            className="btn btn-outline-primary mx-2">
                            <IoMdClose />
                            <span>Cancel</span>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LeadForm