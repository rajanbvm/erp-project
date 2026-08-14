import PageBanner from "@/components/common/PageBanner";
import {
    initializeOpportunities,
    getOpportunityById,
} from "@/utils/opportunitiesStorage";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Buildings from "@/images/Buildings.svg";
import Phone from "@/images/Phone.svg";
import Envelope from "@/images/Envelope.svg";

import { RiEdit2Fill } from "react-icons/ri";
import Link from "next/link";


const OpportunitiesDetails = () => {

    const router = useRouter();
    const { id } = router.query;

    const [opportunity, setOpportunity] =
        useState(null);


    /*
    |--------------------------------------------------------------------------
    | Load Opportunity
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!router.isReady) return;

        initializeOpportunities();

        const foundOpportunity =
            getOpportunityById(id);

        setOpportunity(
            foundOpportunity || null
        );

    }, [router.isReady, id]);


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (!router.isReady) {
        return null;
    }


    /*
    |--------------------------------------------------------------------------
    | Opportunity Not Found
    |--------------------------------------------------------------------------
    */

    if (!opportunity) {
        return (
            <>
                <PageBanner title="Opportunity Details" />

                <div className="bg-box text-center p-5">

                    <h4>
                        Opportunity not found.
                    </h4>

                </div>
            </>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Format Value
    |--------------------------------------------------------------------------
    */

    const formattedValue = Number(
        opportunity?.value || 0
    ).toLocaleString();


    /*
    |--------------------------------------------------------------------------
    | Format Close Date
    |--------------------------------------------------------------------------
    */

    const formattedCloseDate =
        opportunity?.closeDate
            ? new Date(
                  opportunity.closeDate
              ).toLocaleDateString(
                  "en-GB",
                  {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                  }
              )
            : "-";


    return (
        <>
            <PageBanner title="Opportunities" />


            <div className="bg-box">


                {/* =====================================================
                    HEADER
                ===================================================== */}

                <div className="table-header">

                    <div>

                        <h3>
                            {opportunity?.opportunity}
                        </h3>

                    </div>


                    <div className="QuoteDetailsStatus">

                        <span className="level-btn">
                            {opportunity?.stage}
                        </span>

                        <span className="level-btn">
                            {opportunity?.probability}%
                        </span>

                        <span className="level-btn">
                            ${formattedValue}
                        </span>

                    </div>

                </div>


                {/* =====================================================
                    OPPORTUNITY INFORMATION
                ===================================================== */}

                <div className="form-outer mb-3">

                    <h3 className="form-title">
                        Opportunity Information
                    </h3>


                    {/* Company / Contact / Value */}

                    <div className="row QuoteInfo RowBorderBottom">


                        {/* Company */}

                        <div className="col-lg-4">

                            <div className="quote-box">

                                <Image
                                    src={Buildings}
                                    alt="Company"
                                />

                                <span>
                                    {opportunity?.company ||
                                        "-"}
                                </span>

                            </div>

                        </div>


                        {/* Contact */}

                        <div className="col-lg-4">

                            <div className="quote-box">

                                <Image
                                    src={Envelope}
                                    alt="Contact"
                                />

                                <span>
                                    {opportunity?.contact ||
                                        "-"}
                                </span>

                            </div>

                        </div>


                        {/* Owner */}

                        {/* <div className="col-lg-4">

                            <div className="quote-box">

                                <Image
                                    src={Phone}
                                    alt="Owner"
                                />

                                <span>
                                    {opportunity?.owner ||
                                        "-"}
                                </span>

                            </div>

                        </div> */}

                    </div>


                    {/* Opportunity Name / Company / Contact */}

                    <div className="row QuoteInfo RowBorderBottom">


                        <div className="col-lg-4 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Opportunity Name
                                </label>

                                <h6 className="formValue">
                                    {opportunity?.opportunity ||
                                        "-"}
                                </h6>

                            </div>

                        </div>


                        <div className="col-lg-4 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Company
                                </label>

                                <h6 className="formValue">
                                    {opportunity?.company ||
                                        "-"}
                                </h6>

                            </div>

                        </div>


                        <div className="col-lg-4 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Contact
                                </label>

                                <h6 className="formValue">
                                    {opportunity?.contact ||
                                        "-"}
                                </h6>

                            </div>

                        </div>

                    </div>


                    {/* Value / Probability / Stage */}

                    <div className="row QuoteInfo RowBorderBottom">


                        <div className="col-lg-4 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Value
                                </label>

                                <h6
                                    className="formValue"
                                    style={{
                                        color:
                                            "#1D9E75",
                                    }}
                                >
                                    ${formattedValue}
                                </h6>

                            </div>

                        </div>


                        <div className="col-lg-4 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Probability
                                </label>

                                <h6 className="formValue">
                                    {opportunity?.probability}%
                                </h6>

                            </div>

                        </div>


                        <div className="col-lg-4 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Stage
                                </label>

                                <h6 className="formValue">
                                    {opportunity?.stage ||
                                        "-"}
                                </h6>

                            </div>

                        </div>

                    </div>


                    {/* Owner / Close Date */}

                    <div className="row QuoteInfo">


                        <div className="col-lg-4 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Owner
                                </label>

                                <h6 className="formValue">
                                    {opportunity?.owner ||
                                        "-"}
                                </h6>

                            </div>

                        </div>


                        <div className="col-lg-4 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Expected Close Date
                                </label>

                                <h6 className="formValue">
                                    {formattedCloseDate}
                                </h6>

                            </div>

                        </div>


                    </div>

                </div>

                {/* =====================================================
                    ACTION BUTTONS
                ===================================================== */}

                <div className="form-action">


                    <Link
                        href={`/admin/opportunities/edit/${opportunity?.id}`}
                        className="btn btn-outline-primary mx-2"
                    >

                        <RiEdit2Fill />

                        <span>
                            Edit
                        </span>

                    </Link>


                </div>


            </div>

        </>
    );
};


export default OpportunitiesDetails;