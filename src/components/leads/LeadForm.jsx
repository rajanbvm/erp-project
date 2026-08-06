import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import PageBanner from "@/components/common/PageBanner";
import { IoMdClose } from "react-icons/io";
import {
    addLead,
    updateLead,
    getLeadById
} from "@/utils/leadsStorage";

import Image from "next/image";
import UploadIcon from "@/images/UploadIcon.svg";
import { FaRegFileLines } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";
import CustomDropdown from '../common/CustomDropdown';
import {
    companySizeOptions,
    budgetOptions,
    industryOptions,
    communicationOptions,
    statusOptions,
    sourceOptions,
    ownerOptions,
    assignmentModeOptions,
    priorityOptions,
    followUpTypeOptions,
    scoreOptions,
    timeOptions,
} from "@/utils/menuDropdown";
import Link from 'next/link';


const LeadForm = ({ mode, leadId }) => {

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [formData, setFormData] = useState({
        lead: "",
        designation: "",

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

    useEffect(() => {
        if (mode !== "edit" || !leadId) return;

        const lead = getLeadById(leadId);

        console.log("Lead from storage", lead);

        if (lead) {
            setFormData(lead);
        }
    }, [mode, leadId]);

    const handleSubmit = () => {
        if (!formData.lead.trim()) {
            alert("Lead Name is required.");
            return;
        }

        if (!formData.company.trim()) {
            alert("Company Name is required.");
            return;
        }

        if (!formData.email.trim()) {
            alert("Email is required.");
            return;
        }

        if (mode === "add") {
            addLead(formData);
        } else {
            updateLead(leadId, formData);
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
                                        className="form-control"
                                        value={formData.lead}
                                        onChange={handleChange}
                                        placeholder="e.g. Rohan Mehta"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Designation</label>
                                    <input
                                        type="text"
                                        name="designation"
                                        className="form-control"
                                        value={formData.designation}
                                        onChange={handleChange}
                                        placeholder="e.g. Procurement Head"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Company Size</label>
                                    <CustomDropdown
                                        name="companySize"
                                        value={formData.companySize}
                                        placeholder="Select Company Size"
                                        options={companySizeOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Budget</label>
                                    <CustomDropdown
                                        name="budget"
                                        value={formData.budget}
                                        placeholder="Select Budget"
                                        options={budgetOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Requirement / Interest</label>
                                    <input type="text"
                                        name="requirement"
                                        className="form-control"
                                        value={formData.requirement}
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
                                        value={formData.remarks}
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
                                    <input id="company"
                                        name="company"
                                        className="form-control"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="e.g. Nirvana Retail Pvt Ltd" />
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
                                        value={formData.website}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Industry Type</label>
                                    <CustomDropdown
                                        name="industryType"
                                        value={formData.industryType}
                                        placeholder="Select Industry"
                                        options={industryOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Annual Revenue</label>
                                    <input
                                        id="annualRevenue"
                                        name="annualRevenue"
                                        type="text"
                                        className="form-control"
                                        value={formData.annualRevenue}
                                        onChange={handleChange}
                                        placeholder="e.g. 2,00,00,000"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Business Address</label>
                                    <input
                                        id="businessAddress"
                                        name="businessAddress"
                                        type="text"
                                        className="form-control"
                                        value={formData.businessAddress}
                                        onChange={handleChange}
                                        placeholder="e.g. C-Scheme, Jaipur"
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
                                    <label>Primary Phone</label>
                                    <input
                                        id="primaryPhone"
                                        name="primaryPhone"
                                        type="text"
                                        className="form-control"
                                        placeholder="+91 1234567890"
                                        value={formData.primaryPhone}
                                        onChange={handleChange}
                                    />
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
                                        value={formData.secondaryPhone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="e.g. rohan@company.com"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>WhatsApp Number</label>
                                    <input id="whatsapp"
                                        name="whatsapp"
                                        type="text"
                                        className="form-control"
                                        value={formData.whatsapp}
                                        onChange={handleChange} placeholder="e.g. +91 1234567890" />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>LinkedIn / Social Profile</label>
                                    <input id="linkedin"
                                        name="linkedin"
                                        type="text"
                                        className="form-control"
                                        value={formData.linkedin}
                                        onChange={handleChange} placeholder="e.g. linkedin.com/in/..." />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Preferred Communication</label>
                                    <CustomDropdown
                                        name="preferredCommunication"
                                        value={formData.preferredCommunication}
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
                                        value={formData.source}
                                        placeholder="Select Source"
                                        options={sourceOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Lead Owner</label>
                                    <CustomDropdown
                                        name="owner"
                                        value={formData.owner}
                                        placeholder="Assign Owner"
                                        options={ownerOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Lead Status</label>
                                    <CustomDropdown
                                        name="status"
                                        value={formData.status}
                                        placeholder="Select Status"
                                        options={statusOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Lead Score</label>

                                    <CustomDropdown
                                        name="score"
                                        value={formData.score}
                                        placeholder="Select Score"
                                        options={scoreOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Assignment Mode</label>
                                    <CustomDropdown
                                        name="assignmentMode"
                                        value={formData.assignmentMode}
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
                                        value={formData.priority}
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
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Notes</label>
                                    <textarea style={{ minHeight: "120px" }} id="notes"
                                        name="notes"
                                        className="form-control"
                                        value={formData.notes}
                                        onChange={handleChange} placeholder="Add any internal notes or discussion points..."></textarea>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6">
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
                                                <span>Upload Files</span>
                                            </div>

                                            <p className="mb-0">Click to browse PDF, DOC, XLS, PPT, JPG, PNG · up to 25MB each</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Follow-Up Type</label>

                                    <CustomDropdown
                                        name="followUpType"
                                        value={formData.followUpType}
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
                                        value={formData.followUpDate}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Follow-Up Time</label>

                                    <CustomDropdown
                                        name="followUpTime"
                                        value={formData.followUpTime}
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