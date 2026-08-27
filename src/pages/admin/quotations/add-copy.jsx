import PageBanner from '@/components/common/PageBanner'
import React from 'react'
import { FaRegEye } from 'react-icons/fa6';
import Image from "next/image";
import UploadIcon from "@/images/UploadIcon.svg";
import { FaRegFileLines } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";
import Link from 'next/link';
import { IoMdClose } from 'react-icons/io';

const add = () => {


    return (
        <>
            <PageBanner title="Quotations" />

            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>New Quotation 123</h3>
                        <p>Create a quotation and submit it for approval</p>
                    </div>
                </div>

                <div className="form-outer">
                    <div className="row">
                        <h3 className="form-title">Customer Info</h3>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Customer / Company</label>
                                <input type="text" className="form-control" placeholder="e.g. e.g. Falcon Group LLC" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Contact Person</label>
                                <input type="text" className="form-control" placeholder="e.g. Contact Person" />
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
                                <label>Phone</label>
                                <input type="text" className="form-control" placeholder="+971 4 000 0000" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Industry</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Select industry</option>
                                    <option value="1" >Industry One</option>
                                    <option value="2" >Industry Two</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Lead Source</label>
                                <input type="text" className="form-control" placeholder="e.g. Google Ads" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <h3 className="form-title">Quotation Details</h3>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Quotation Value (AED)</label>
                                <input type="text" className="form-control" placeholder="e.g. $250" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Discount %</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Select Discount</option>
                                    <option value="1" >5%</option>
                                    <option value="2" >10%</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Tax / VAT %</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Select Vat</option>
                                    <option value="1" >5%</option>
                                    <option value="2" >10%</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Payment Terms</label>
                                <input type="text" className="form-control" placeholder="e.g. e.g. 50% advance, 50% on delivery" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Owner</label>
                                <input type="text" className="form-control" placeholder="e.g. John Doe" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Priority</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Medium</option>
                                    <option value="1" >One</option>
                                    <option value="2" >Two</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <div className="form-group">
                                <label>Notes</label>
                                <textarea style={{ minHeight: "120px" }} name="" id="" className="form-control" placeholder="Add any details relevant to this quotation..."></textarea>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <h3 className="form-title">Approval Routing</h3>
                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Approval Path</label>
                                <input type="text" className="form-control" placeholder="e.g. Auto-detect from value & discount" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>First Approver</label>
                                <input type="text" className="form-control" placeholder="e.g. Priya Sharma — Sales Manager" />
                            </div>
                        </div>
                    </div>
                </div>



                <div className="form-action">
                    <button
                        className="btn btn-primary ms-2"
                    >
                        <BsFillSendFill />
                        <span>Create & Submit for Approval</span>
                    </button>
                    {/* <button
                        className="btn btn-outline-primary mx-2"
                    >
                        <FaRegFileLines />
                        <span>Save as Draft</span>
                    </button> */}
                    <Link
                        href={"/admin/quotations"}
                        className="btn btn-outline-primary mx-2">
                        <IoMdClose />
                        <span>Cancel</span>
                    </Link>
                </div>
            </div>

        </>
    )
}

export default add