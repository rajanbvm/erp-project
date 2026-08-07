import PageBanner from '@/components/common/PageBanner'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import Buildings from "@/images/Buildings.svg";
import Phone from "@/images/Phone.svg";
import { FaCheck, FaRegFileLines } from "react-icons/fa6";
import Envelope from "@/images/Envelope.svg";
import { RiEdit2Fill, RiNumber2, RiNumber3, RiNumber4 } from "react-icons/ri";
import { BsFillSendFill } from 'react-icons/bs';
import {
    getQuotationById,
} from "@/utils/quotationStorage";

const QuotationDetails = () => {

    const [quotation, setQuotation] = useState(null);

    const router = useRouter();
    const { id } = router.query;


    useEffect(() => {
        if (!id) return;

        const quotationData = getQuotationById(id);

        if (quotationData) {
            setQuotation(quotationData);
        }
    }, [id]);

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case "draft":
                return "draft";

            case "sent":
                return "sent";

            case "approved":
                return "approved";

            case "pending":
            case "pending approval":
                return "pending";

            case "rejected":
                return "rejected";

            case "in review":
                return "review";

            default:
                return "default";
        }
    };

    return (
        <>
            <PageBanner title="Quotations" />

            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>Quotation {quotation?.quotationNo}</h3>
                    </div>
                    <div className="QuoteDetailsStatus">
                        <span className={`badge ${getStatusClass(quotation?.status)}`}>
                            {quotation?.status}
                        </span>
                        <span className="level-btn">Level 2 of 4</span>
                        <span className="level-btn">V3.0</span>
                    </div>
                </div>
                <div className="form-outer mb-3">
                    <h3 className="form-title">Quotation Info</h3>
                    <div className="row QuoteInfo RowBorderBottom">
                        <div className="col-lg-4">
                            <div className="quote-box">
                                <Image src={Buildings} />
                                <span>{quotation?.customer}</span>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="quote-box">
                                <Image src={Phone} />
                                <span>{quotation?.phone}</span>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="quote-box">
                                <Image src={Envelope} />
                                <span>{quotation?.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row QuoteInfo RowBorderBottom">
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Quotation Value</label>
                                <h6 className="formValue">AED {quotation?.quotationValue}</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Discount</label>
                                <h6 className="formValue">{quotation?.quotationValue}</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Tax %</label>
                                <h6 className="formValue">{quotation?.vat}</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Prepared By</label>
                                <h6 className="formValue">{quotation?.owner}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="row QuoteInfo RowBorderBottom">

                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Current Version</label>
                                <h6 className="formValue">V3.0 (Active)</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Created</label>
                                <h6 className="formValue">{quotation?.created}</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Status</label>
                                <h6 className="formValue">{quotation?.status}</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Lead Source</label>
                                <h6 className="formValue">{quotation?.source}</h6>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group mb-0">
                                <label>Notes</label>
                                <h6 className="formValue">
                                   {quotation?.notes}
                                </h6>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="form-outer mb-3">
                    <h3 className="form-title">Approval Workflow</h3>
                    <div className="approvalRow">
                        <div className="col-approval-box">
                            <div className="approval-box">
                                <div className="icon" style={{ backgroundColor: "#12A858" }}>
                                    <FaCheck />
                                </div>
                                <div className="text">
                                    <p>Sales Manager Approval</p>
                                    <h6>Approved by Priya Sharma · 02 Jul 2026, 11:20 AM</h6>
                                    <p>Pricing aligns with the quarterly plan, approved."</p>
                                </div>
                            </div>
                            <div className="approval-status">
                                <span className="badge bg-success">Approved</span>
                            </div>
                        </div>
                        <div className="col-approval-box">
                            <div className="approval-box">
                                <div className="icon" style={{ backgroundColor: "#E08A3C" }}>
                                    <RiNumber2 />
                                </div>
                                <div className="text">
                                    <p>Regional Manager Approval</p>
                                    <h6>Sent to Ahmed Khan · 04 Jul 2026, 9:05 AM</h6>
                                </div>
                            </div>
                            <div className="approval-status">
                                <span className="badge bg-warning">In Review</span>
                            </div>
                        </div>
                        <div className="col-approval-box">
                            <div className="approval-box">
                                <div className="icon">
                                    <RiNumber3 />
                                </div>
                                <div className="text">
                                    <p>Finance Approval</p>
                                    <h6>Waiting on Level 2</h6>
                                </div>
                            </div>
                            <div className="approval-status">
                                <span className="badge">Pending</span>
                            </div>
                        </div>
                        <div className="col-approval-box">
                            <div className="approval-box">
                                <div className="icon">
                                    <RiNumber4 />
                                </div>
                                <div className="text">
                                    <p>Director Final Approval</p>
                                    <h6>Waiting on Level 3</h6>
                                </div>
                            </div>
                            <div className="approval-status">
                                <span className="badge">Pending</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-outer">
                    <h3 className="form-title">Version History</h3>
                    <div className="VersionRow">
                        <div className="col-version-box">
                            <div className="version-box">
                                <div className="icon" style={{ backgroundColor: "#E08A3C" }}>
                                    V3.0
                                </div>
                                <div className="text">
                                    <p>Discount adjusted to 12%, payment terms updated</p>
                                    <h6>John Doe · 04 Jul 2026, 3:40 PM</h6>
                                </div>
                            </div>
                            <div className="version-status">
                                <span className="badge bg-warning">Active</span>
                            </div>
                        </div>
                        <div className="col-version-box">
                            <div className="version-box">
                                <div className="icon">
                                    V2.0
                                </div>
                                <div className="text">
                                    <p>Added maintenance package line item</p>
                                    <h6>John Doe · 22 Jun 2026, 1:15 PM</h6>
                                </div>
                            </div>
                            <div className="version-status">
                                {/* <span className="badge bg-warning">Active</span> */}
                            </div>
                        </div>
                        <div className="col-version-box">
                            <div className="version-box">
                                <div className="icon">
                                    V1.0
                                </div>
                                <div className="text">
                                    <p>Original quotation created</p>
                                    <h6>John Doe · 10 Jun 2026, 10:02 AM</h6>
                                </div>
                            </div>
                            <div className="version-status">
                                {/* <span className="badge bg-warning">Active</span> */}
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
                    <button
                        className="btn btn-outline-primary mx-2"
                    >
                        <RiEdit2Fill />
                        <span>Edit</span>
                    </button>
                    <button
                        className="btn btn-outline-primary mx-2"
                    >
                        <FaRegFileLines />
                        <span>Download PDF</span>
                    </button>
                </div>

            </div >

        </>
    )
}

export default QuotationDetails