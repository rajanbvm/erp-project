import PageBanner from '@/components/common/PageBanner'
import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { FaRegFileLines } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";
import { useRouter } from "next/router";
const add = () => {
    const router = useRouter();

    const roles = [
        "Primary",
        "Secondary",
        "Decision Maker",
        "Assistant",
    ];

    const [selectedRole, setSelectedRole] = useState("");

    return (
        <>
            <PageBanner title="Contacts" />

            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>New Contact</h3>
                        <p>Create a contact and link it to a company </p>
                    </div>
                </div>

                <div className="form-outer">
                    <div className="row">
                        <h3 className="form-title">Personal Information</h3>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Contact Name</label>
                                <input type="text" className="form-control" placeholder="e.g. Falcon Group LLC" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Designation</label>
                                <input type="text" className="form-control" placeholder="e.g. Rajesh Mehta" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Department</label>
                                <input type="email" className="form-control" placeholder="e.g. name@company.ae" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Phone</label>
                                <input type="text" className="form-control" placeholder="e.g. Real Estate" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="e.g. name@company.ae" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Preferred Communication</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Email</option>
                                    <option value="1" >Call</option>
                                    <option value="2" >Meeting</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <h3 className="form-title">Company Association</h3>
                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Link to Company (optional)</label>
                                <input type="text" className="form-control" placeholder="Search company e.g. Falcon Group LLC" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Reporting Manager</label>
                                <input type="text" className="form-control" placeholder="e.g. Anita Sharma" />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <div className="form-group">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="PrimaryContact" />
                                    <label className="form-check-label" style={{ color: "#8B909A", }} for="PrimaryContact">Set as Primary Contact for this company</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <div className="form-group">
                                <label>Contact Type</label>
                                <div>
                                    <div className="d-flex gap-2">
                                        {roles.map((role, index) => (
                                            <div key={index}>
                                                <input
                                                    type="checkbox"
                                                    className="btn-check"
                                                    id={`btn-check-${index}`}
                                                    checked={selectedRole === role}
                                                    onChange={() => setSelectedRole(role)}
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

                        <div className="row">
                            <h3 className="form-title">Address</h3>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Street Address</label>
                                    <input type="text" className="form-control" placeholder="e.g. 24 MG Road, Sector 12" />
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
                            
                        </div>

                    </div>

                </div>



                <div className="form-action">
                    <button
                        className="btn btn-primary ms-2"
                    >
                        <BsFillSendFill />
                        <span>Save Contact</span>
                    </button>
                    <button onClick={() => {
                        router.push("/admin/contacts");
                    }}
                        className="btn btn-outline-primary mx-2"
                    >
                        <IoMdClose />
                        <span>Cancel</span>
                    </button>
                </div>
            </div>

        </>
    )
}

export default add