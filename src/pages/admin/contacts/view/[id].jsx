import PageBanner from "@/components/common/PageBanner";
import {
    getContactById,
} from "@/utils/contactsStorage";

import {
    getCompanyById,
} from "@/utils/companiesStorage";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Buildings from "@/images/Buildings.svg";
import Phone from "@/images/Phone.svg";
import Envelope from "@/images/Envelope.svg";

import { RiEdit2Fill } from "react-icons/ri";
import Link from "next/link";

const ContactsDetails = () => {
    const router = useRouter();
    const { id } = router.query;

const [contact, setContact] = useState(null);
const [company, setCompany] = useState(null);

useEffect(() => {
    if (!router.isReady || !id) return;

    const foundContact = getContactById(id);

    setContact(foundContact || null);

    if (foundContact?.companyId) {
        const foundCompany = getCompanyById(foundContact.companyId);

        setCompany(foundCompany || null);
    } else {
        setCompany(null);
    }
}, [router.isReady, id]);

    if (!router.isReady) {
        return null;
    }

    if (!contact) {
        return (
            <>
                <PageBanner title="Contact Details" />

                <div className="bg-box text-center p-5">
                    <h4>Contact not found</h4>
                </div>
            </>
        );
    }

    return (
        <>
            <PageBanner title="Contacts" />

            <div className="bg-box">

                {/* =========================
                    HEADER
                ========================== */}
                <div className="table-header">

                    <div>
                        <h3>{contact?.contact || "-"}</h3>

                        <p className="mb-0">
                            {contact?.designation || "-"}
                            {contact?.department
                                ? ` · ${contact.department}`
                                : ""}
                        </p>
                    </div>

                    <div className="QuoteDetailsStatus">

                        {contact?.isPrimary && (
                            <span className="level-btn">
                                Primary Contact
                            </span>
                        )}

                        {contact?.type && (
                            <span className="level-btn">
                                {contact.type}
                            </span>
                        )}

                        {contact?.designation && (
                            <span className="level-btn">
                                {contact.designation}
                            </span>
                        )}

                    </div>

                </div>


                {/* =========================
                    CONTACT INFO
                ========================== */}
                <div className="form-outer mb-3">

                    <h3 className="form-title">
                        Contact Info
                    </h3>


                    {/* Phone / Email / Company */}
                    <div className="row QuoteInfo RowBorderBottom">

                        {/* Company */}
                        <div className="col-lg-4">
                            <div className="quote-box">

                                <Image
                                    src={Buildings}
                                    alt="Company"
                                />

                                <span>
                                    {company?.company || "-"}
                                </span>

                            </div>
                        </div>


                        {/* Phone */}
                        <div className="col-lg-4">
                            <div className="quote-box">

                                <Image
                                    src={Phone}
                                    alt="Phone"
                                />

                                <span>
                                    {contact?.phone || "-"}
                                </span>

                            </div>
                        </div>


                        {/* Email */}
                        <div className="col-lg-4">
                            <div className="quote-box">

                                <Image
                                    src={Envelope}
                                    alt="Email"
                                />

                                <span>
                                    {contact?.email || "-"}
                                </span>

                            </div>
                        </div>

                    </div>


                    {/* =========================
                        BASIC INFORMATION
                    ========================== */}
                    <div className="row QuoteInfo RowBorderBottom">

                        {/* Full Name */}
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">

                                <label>
                                    Full Name
                                </label>

                                <h6 className="formValue">
                                    {contact?.contact || "-"}
                                </h6>

                            </div>
                        </div>

 {/* Email */}
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">

                                <label>
                                    Email Address
                                </label>

                                <h6 className="formValue">
                                    {contact?.email || "-"}
                                </h6>

                            </div>
                        </div>

                        {/* Phone */}
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">

                                <label>
                                    Phone Number
                                </label>

                                <h6 className="formValue">
                                    {contact?.phone || "-"}
                                </h6>

                            </div>
                        </div>

                    </div>


                    {/* =========================
                        COMMUNICATION
                    ========================== */}
                    <div className="row QuoteInfo">

                       
 {/* Designation */}
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">

                                <label>
                                    Designation
                                </label>

                                <h6 className="formValue">
                                    {contact?.designation || "-"}
                                </h6>

                            </div>
                        </div>


                        {/* Department */}
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">

                                <label>
                                    Department
                                </label>

                                <h6 className="formValue">
                                    {contact?.department || "-"}
                                </h6>

                            </div>
                        </div>

                        {/* Preferred Communication */}
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">

                                <label>
                                    Preferred Communication
                                </label>

                                <h6 className="formValue">
                                    {contact?.preferredCommunication || "-"}
                                </h6>

                            </div>
                        </div>


                        {/* Contact ID */}
                        {/* <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">

                                <label>
                                    Contact ID
                                </label>

                                <h6 className="formValue">
                                    {contact?.id || "-"}
                                </h6>

                            </div>
                        </div> */}


                        {/* Company ID */}
                        {/* <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">

                                <label>
                                    Company ID
                                </label>

                                <h6 className="formValue">
                                    {contact?.companyId || "-"}
                                </h6>

                            </div>
                        </div> */}

                    </div>

                </div>


                {/* =========================
                    COMPANY ASSOCIATION
                ========================== */}
                <div className="form-outer mb-3">

                    <h3 className="form-title">
                        Company Association
                    </h3>


                    <div className="row QuoteInfo">

                        {/* Linked Company */}
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">

                                <label>
                                    Linked Company
                                </label>

                                <h6 className="formValue">
                                    {company?.company || "-"}
                                </h6>

                            </div>
                        </div>


                        {/* Reporting Manager */}
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">

                                <label>
                                    Reporting Manager
                                </label>

                                <h6 className="formValue">
                                    {contact?.reportingManager || "-"}
                                </h6>

                            </div>
                        </div>


                        {/* Contact Type */}
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">

                                <label>
                                    Contact Type
                                </label>

                                <h6 className="formValue">
                                    {contact?.type || "-"}
                                </h6>

                            </div>
                        </div>


                        {/* Primary Contact */}
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">

                                <label>
                                    Primary Contact
                                </label>

                                <h6 className="formValue">
                                    {contact?.isPrimary
                                        ? "Yes"
                                        : "No"}
                                </h6>

                            </div>
                        </div>

                    </div>

                </div>


                {/* =========================
                    ADDRESS
                ========================== */}
                <div className="form-outer mb-3">

                    <h3 className="form-title">
                        Address
                    </h3>


                    {/* Street */}
                    <div className="row QuoteInfo RowBorderBottom">

                        <div className="col-lg-12">

                            <div className="form-group mb-0">

                                <label>
                                    Street Address
                                </label>

                                <h6 className="formValue">
                                    {contact?.street || "-"}
                                </h6>

                            </div>

                        </div>

                    </div>


                    {/* City / State / Pincode / Country */}
                    <div className="row QuoteInfo">

                        {/* City */}
                        <div className="col-lg-3 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    City
                                </label>

                                <h6 className="formValue">
                                    {contact?.city || "-"}
                                </h6>

                            </div>

                        </div>


                        {/* State */}
                        <div className="col-lg-3 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    State
                                </label>

                                <h6 className="formValue">
                                    {contact?.state || "-"}
                                </h6>

                            </div>

                        </div>


                        {/* Pincode */}
                        <div className="col-lg-3 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Pincode
                                </label>

                                <h6 className="formValue">
                                    {contact?.pincode || "-"}
                                </h6>

                            </div>

                        </div>


                        {/* Country */}
                        <div className="col-lg-3 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Country
                                </label>

                                <h6 className="formValue">
                                    {contact?.country || "-"}
                                </h6>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    ACTIONS
                ========================== */}
                <div className="form-action">

                    <Link
                        href={`/admin/contacts/edit/${contact?.id}`}
                        className="btn btn-outline-primary mx-2"
                    >

                        <RiEdit2Fill />

                        <span>
                            Edit Contact
                        </span>

                    </Link>

                </div>

            </div>
        </>
    );
};

export default ContactsDetails;