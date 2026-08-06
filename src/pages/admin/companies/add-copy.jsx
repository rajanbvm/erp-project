import PageBanner from '@/components/common/PageBanner'
import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import UploadIcon from "@/images/UploadIcon.svg";
import { BsFillSendFill } from "react-icons/bs";
import { useRouter } from "next/router";
import CustomDropdown from '@/components/common/CustomDropdown';

const add = () => {
    const router = useRouter();

    return (
        <>
            <PageBanner title="Companies" />

            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>New Company</h3>
                        <p>Create a company record and link it to leads, contacts, opportunities and quotations. </p>
                    </div>
                </div>

                <div className="form-outer mb-3">
                    <div className="row">
                        <h3 className="form-title">Company Information</h3>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Company Name</label>
                                <input type="text" className="form-control" placeholder="e.g. Falcon Group LLC" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Industry Type</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Select range</option>
                                    <option value="1" >range One</option>
                                    <option value="2" >range Two</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Website</label>
                                <input type="text" className="form-control" placeholder="e.g. www.falcongroup.com" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Company Size</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Select range</option>
                                    <option value="1" >range One</option>
                                    <option value="2" >range Two</option>
                                </select>
                            </div>
                        </div>
                        {/* <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Company Type</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Select Type</option>
                                    <option value="1" >Type One</option>
                                    <option value="2" >Type Two</option>
                                </select>
                            </div>
                        </div> */}
                        {/* <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Industry</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Select Industry</option>
                                    <option value="1" >Industry One</option>
                                    <option value="2" >Industry Two</option>
                                </select>
                            </div>
                        </div> */}
                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>About Company</label>
                                <textarea style={{ minHeight: "120px" }} name="" id="" className="form-control" placeholder="Brief description about the company, its business and background..."></textarea>
                            </div>
                        </div>

                        {/* <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Company Logo</label>
                                <label htmlFor="uploadFiles" className="w-100">
                                    <input
                                        type="file"
                                        id="uploadFiles"
                                        className="d-none"
                                        accept=".xlsx,.xls"
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
                        </div> */}
                    </div>
                </div>

                <div className="form-outer mb-3">
                    <div className="row">
                        <h3 className="form-title">Primary Contact Details</h3>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Company Email</label>
                                <input type="text" className="form-control" placeholder="e.g. info@falcongroup.com" />
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="text" className="form-control" placeholder="e.g. +91 12345 67890" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Alternate Phone</label>
                                <input type="text" className="form-control" placeholder="e.g. +91 12345 67890" />
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
                                <input type="text" className="form-control" placeholder="e.g. 08Abrpd123456" />
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

                <div className="form-outer mb-3">
                    <div className="row">
                        <h3 className="form-title">Ownership & Assignment</h3>
                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Account Owner</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Rohit Sharma</option>
                                    <option value="1" >Owner One</option>
                                    <option value="2" >Owner Two</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Company Status</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Active</option>
                                    <option value="1" >InActive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-action">
                    <button
                        className="btn btn-primary ms-2"
                    >
                        <BsFillSendFill />
                        <span>Create Company</span>
                    </button>
                    <button onClick={() => {
                        router.push("/admin/companies");
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