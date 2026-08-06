import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import PageBanner from "@/components/common/PageBanner";
import { IoMdClose } from "react-icons/io";

import { BsFillSendFill } from "react-icons/bs";
import CustomDropdown from '../common/CustomDropdown';
import {
    getCountryOptions,
    getStateOptions,
    getCityOptions,
} from "@/utils/location";
import {
    communicationOptions,
    contactTypeOptions,
} from "@/utils/menuDropdown";
import Link from 'next/link';
import {
    addContact,
    updateContact,
    getContactById,
} from "@/utils/contactsStorage";

import {
    initializeCompanies,
    getCompanies,
} from "@/utils/companiesStorage";


const ContactsForm = ({ mode, contactId }) => {

    const router = useRouter();

    const roles = contactTypeOptions;

    const [companyOptions, setCompanyOptions] = useState([]);
    const [countryOptions, setCountryOptions] = useState([]);
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);

    useEffect(() => {
        initializeCompanies();

        setCompanyOptions(
            getCompanies().map((item) => ({
                label: item.company,
                value: item.id,
            }))
        );

        setCountryOptions(getCountryOptions());
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const updated = {
                ...prev,
                [name]: value,
            };

            if (name === "country") {
                updated.state = "";
                updated.city = "";
            }

            if (name === "state") {
                updated.city = "";
            }

            return updated;
        });
    };

    const [formData, setFormData] = useState({
        contact: "",
        designation: "",
        department: "",

        email: "",
        phone: "",
        preferredCommunication: "",

        companyId: "",
        reportingManager: "",
        isPrimary: false,
        type: "Primary",

        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
    });

    useEffect(() => {
        if (!formData.country) {
            setStateOptions([]);
            setCityOptions([]);
            return;
        }

        setStateOptions(getStateOptions(formData.country));
    }, [formData.country]);

    useEffect(() => {
        if (!formData.country || !formData.state) {
            setCityOptions([]);
            return;
        }

        setCityOptions(
            getCityOptions(formData.country, formData.state)
        );
    }, [formData.country, formData.state]);

    useEffect(() => {
        if (mode !== "edit" || !contactId) return;

        const contact = getContactById(contactId);


        console.log("Contact from storage", contact);

        if (contact) {
            setFormData(contact);
        }
    }, [mode, contactId]);

    const handleSubmit = () => {

        if (!formData.contact.trim()) {
            alert("Contact Name is required.");
            return;
        }

        if (!formData.email.trim()) {
            alert("Email is required.");
            return;
        }

        if (!formData.companyId) {
            alert("Please select a company.");
            return;
        }

        if (mode === "add") {
            addContact(formData);
        } else {
            updateContact(contactId, formData);
        }

        router.push("/admin/contacts");
    };

    return (
        <>
            <PageBanner title="Contacts" />

            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>{mode === "add" ? "New Contact" : "Edit Contact"}</h3>
                        <p>Create a contact and link it to a company</p>
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
                            <h3 className="form-title">Personal Information</h3>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Contact Name</label>
                                    <input
                                        type="text"
                                        name="contact"
                                        className="form-control"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        placeholder="e.g. Rajesh Mehta"
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
                                        placeholder="e.g. Sales Director"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Department</label>
                                    <input
                                        type="text"
                                        name="department"
                                        className="form-control"
                                        value={formData.department}
                                        onChange={handleChange}
                                        placeholder="e.g. Sales"
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
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+971 50 123 4567"
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
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="name@company.ae"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Preferred Communication</label>

                                    <CustomDropdown
                                        name="preferredCommunication"
                                        value={formData.preferredCommunication}
                                        placeholder="Select"
                                        options={communicationOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-outer mb-3">
                        <div className="row">
                            <h3 className="form-title">Company Association</h3>

                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Company</label>

                                    <CustomDropdown
                                        name="companyId"
                                        value={formData.companyId}
                                        placeholder="Select Company"
                                        options={companyOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <label>Reporting Manager</label>
                                    <input
                                        type="text"
                                        name="reportingManager"
                                        className="form-control"
                                        value={formData.reportingManager}
                                        onChange={handleChange}
                                        placeholder="e.g. Anita Sharma"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <div className="form-check form-switch">
                                        <input
                                            id="primaryContact"
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={formData.isPrimary}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    isPrimary: e.target.checked,
                                                }))
                                            }
                                        />

                                        <label
                                            htmlFor="primaryContact"
                                            className="form-check-label"
                                        >
                                            Set as Primary Contact
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Contact Type</label>
                                    <div className="d-flex gap-2">
                                        {roles.map((role, index) => (
                                            <div key={index}>
                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    id={`btn-check-${index}`}
                                                    name="type"
                                                    checked={formData.type === role}
                                                    onChange={() =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            type: role,
                                                        }))
                                                    }
                                                />
                                                <label
                                                    className="btn"
                                                    htmlFor={`btn-check-${index}`}
                                                >
                                                    {role}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-outer mb-3">
                        <div className="row">
                            <h3 className="form-title">Address</h3>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Country</label>
                                    <CustomDropdown
                                        name="country"
                                        value={formData.country}
                                        placeholder="Select Country"
                                        options={countryOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>State</label>
                                    <CustomDropdown
                                        name="state"
                                        value={formData.state}
                                        placeholder="Select State"
                                        options={stateOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>City</label>
                                    <CustomDropdown
                                        name="city"
                                        value={formData.city}
                                        placeholder="Select City"
                                        options={cityOptions}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Pincode</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        className="form-control"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Street Address</label>

                                    <input
                                        type="text"
                                        name="street"
                                        className="form-control"
                                        value={formData.street}
                                        onChange={handleChange}
                                        placeholder="Street Address"
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
                                {mode === "add" ? "Save Contact" : "Update Contact"}
                            </span>
                        </button>
                        <Link
                            href={"/admin/contacts"}
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

export default ContactsForm