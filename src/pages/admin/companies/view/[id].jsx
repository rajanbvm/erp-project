import PageBanner from '@/components/common/PageBanner'
import {
    getCompanyById,
} from "@/utils/companiesStorage";

import {
    initializeQuotations,
    getQuotations
} from "@/utils/quotationStorage";

import {
    getContacts
} from "@/utils/contactsStorage";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Image from 'next/image';

import Buildings from "@/images/Buildings.svg";
import Phone from "@/images/Phone.svg";
import Envelope from "@/images/Envelope.svg";

import { RiEdit2Fill } from "react-icons/ri";
import DataTable from '@/components/DataTable';
import { FaRegEye } from 'react-icons/fa6';
import Link from 'next/link';


const CompaniesDetails = () => {

    const router = useRouter();
    const { id } = router.query;

    const [company, setCompany] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [quotations, setQuotations] = useState([]);


    useEffect(() => {

    if (!router.isReady) return;

    const companyData = getCompanyById(id);
    setCompany(companyData);

    const contactData = getContacts();
    setContacts(
        contactData.filter(item => item.companyId === id)
    );

    initializeQuotations();

    const quotationData = getQuotations();

    setQuotations(
        quotationData.filter(
            item => item.customer === companyData.company
        )
    );

}, [router.isReady, id]);

    const quotationColumns = [
        {
            key: "quotationNo",
            label: "Quotation No"
        },
        {
            key: "created",
            label: "Date"
        },
        {
            key: "customer",
            label: "Customer"
        },
        {
            key: "quotationValue",
            label: "Amount"
        },
        {
            key: "status",
            label: "Status"
        },
        {
                key: "action",
                label: "Action",
                render: (row) => (
                    <div className="text-center">
        
                        <FaRegEye
                            className="eyeBtn mx-2"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                router.push(`/admin/quotations/view/${row?.id}`)
                            }
                        />
        
                        <RiEdit2Fill
                            className="eyeBtn mx-2"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                router.push(`/admin/quotations/edit/${row?.id}`)
                            }
                        />
         {/*
                        <RiDeleteBin6Line
                            className="eyeBtn text-danger mx-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(row?.id)}
                        /> */}
        
                    </div>
                ),
            },
    ];

    if (!company) {
        return (
            <>
                <PageBanner title="Company Details" />

                <div className="bg-box text-center p-5">
                    <h4>Loading...</h4>
                </div>
            </>
        );
    }

    const handleViewAllQuotations = () => {
        router.push(`/admin/quotations`);
    };

    const quotationData = getQuotations();

    return (
        <>

            <PageBanner title="Companies" />


            <div className="bg-box mb-3">
                {/* Header */}
                <div className="table-header">
                    <div>
                        <h3>
                            {company?.company}
                        </h3>
                    </div>
                    <div className="QuoteDetailsStatus">
                        <span className="level-btn">
                            Active
                        </span>
                        <span className="level-btn">
                            {company?.industry}
                        </span>
                        <span className="level-btn">
                            Owner: {company?.owner}
                        </span>
                    </div>
                </div>

                {/* Company Info */}
                <div className="form-outer">
                    <h3 className="form-title">
                        Company Info
                    </h3>

                    <div className="row QuoteInfo RowBorderBottom">
                        <div className="col-lg-4 col-md-6">
                            <div className="quote-box">
                                <Image src={Buildings} />
                                <span>
                                    {company?.company}
                                </span>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="quote-box">
                                <Image src={Phone} />
                                <span>
                                    {company?.phone}
                                </span>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="quote-box">
                                <Image src={Envelope} />
                                <span>
                                    {contacts?.length} Contacts
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="row QuoteInfo RowBorderBottom">
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>
                                    Company Name
                                </label>

                                <h6 className="formValue">
                                    {company?.company}
                                </h6>
                            </div>
                        </div>



                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>
                                    Phone
                                </label>

                                <h6 className="formValue">
                                    {company?.phone}
                                </h6>
                            </div>
                        </div>



                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>
                                    Email
                                </label>

                                <h6 className="formValue">
                                    {company?.email}
                                </h6>
                            </div>
                        </div>



                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>
                                    Website
                                </label>

                                <h6 className="formValue">
                                    {company?.website}
                                </h6>
                            </div>
                        </div>
                    </div>

                    <div className="row QuoteInfo RowBorderBottom">
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>
                                    Company Size
                                </label>

                                <h6 className="formValue">
                                    {company?.companySize}
                                </h6>
                            </div>
                        </div>



                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>
                                    GSTIN
                                </label>

                                <h6 className="formValue">
                                    {company?.gstin}
                                </h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>
                                    Industry
                                </label>

                                <h6 className="formValue">
                                    {company?.industry}
                                </h6>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>
                                    Billing Address
                                </label>

                                <h6 className="formValue">
                                    {company?.billingAddress}
                                </h6>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group mb-0">
                                <label>
                                    Notes
                                </label>

                                <h6 className="formValue">
                                    {company?.notes}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action */}

                    
                <div className="form-action mt-3">
                    <Link
                        href={`/admin/companies/edit/${company?.id}`}
                        className="btn btn-outline-primary mx-2"
                    >
                        <RiEdit2Fill />
                        <span>Edit</span>
                    </Link>
                </div>
            </div>

            <div className="bg-box mt-3">

                <DataTable
                    title="Recent Quotations"
                    description="Latest quotations of this company"
                    columns={quotationColumns}
                    data={quotations}
                    onViewAll={handleViewAllQuotations}
                />

            </div>
        </>
    )
}


export default CompaniesDetails;