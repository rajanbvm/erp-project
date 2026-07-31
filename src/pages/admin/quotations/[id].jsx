import PageBanner from '@/components/common/PageBanner'
import React, { useEffect } from 'react'
import { useRouter } from "next/router";
import Image from 'next/image';
import Buildings from "@/images/Buildings.svg";
import Phone from "@/images/Phone.svg";
import { FaCheck, FaRegFileLines } from "react-icons/fa6";
import Envelope from "@/images/Envelope.svg";
import { RiEdit2Fill, RiNumber2, RiNumber3, RiNumber4 } from "react-icons/ri";
import { BsFillSendFill } from 'react-icons/bs';

const QuotationDetails = () => {

    const router = useRouter();
    const { id } = router.query;

    const QuotationData = [
        {
            id: 1,
            quotation: "#QT-2026-0189",
            customer: "Falcon Group LLC",
            email: "ahmed@falcon.ae",
            products: "CRM Enterprise (1 yr)",
            amount: "$42,000",
            vat: "$2,100",
            total: "$44,100",
            valid: "30 Jun 2026",
            status: "Sent",
        },
        {
            id: 2,
            quotation: "#QT-2026-0188",
            customer: "TechVentures UAE",
            email: "ahmed@TechVentures.ae",
            products: "HR + Finance Modules",
            amount: "$28,500",
            vat: "$1,425",
            total: "$29,925",
            valid: "25 Jun 2026",
            status: "Approved",
        },
        {
            id: 3,
            quotation: "#QT-2026-0187",
            customer: "ABC Industries",
            email: "ahmed@ABC.ae",
            products: "Inventory Module (Basic)",
            amount: "$12,000",
            vat: "$600",
            total: "$12,600",
            valid: "15 Jul 2026",
            status: "Draft",
        },
        {
            id: 4,
            quotation: "#QT-2026-0186",
            customer: "Gulf Solutions Co.",
            email: "ahmed@Gulf.ae",
            products: "Full ERP Suite",
            amount: "$95,000",
            vat: "$4,750",
            total: "$99,750",
            valid: "20 Jun 2026",
            status: "In review",
        },

    ];

    // Find the quotation
    const quotation = QuotationData.find(
        (item) => item.id === Number(id)
    );

    useEffect(() => {
        if (id) {
            console.log("Quotation ID:", id);
        }
    }, [id]);


    return (
        <>
            <PageBanner title="Quotations" />

            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>Quotation {quotation?.quotation}</h3>
                    </div>
                    <div className="QuoteDetailsStatus">
                        <span className="badge pending">Pending Approval</span>
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
                                <span>+971 4 222 0000</span>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="quote-box">
                                <Image src={Envelope} />
                                <span>ahmed@falcon.ae</span>
                            </div>
                        </div>
                    </div>

                    <div className="row QuoteInfo RowBorderBottom">
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Quotation Value</label>
                                <h6 className="formValue">AED 184,500</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Discount</label>
                                <h6 className="formValue">12%</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Tax (VAT 5%)</label>
                                <h6 className="formValue">AED 8,120</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Prepared By</label>
                                <h6 className="formValue">John Doe</h6>
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
                                <h6 className="formValue">10 Jun 2026</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Status</label>
                                <h6 className="formValue">Pending</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Last Revised</label>
                                <h6 className="formValue">04 Jul 2026</h6>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group mb-0">
                                <label>Notes</label>
                                <h6 className="formValue">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
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
                        <RiEdit2Fill/>
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