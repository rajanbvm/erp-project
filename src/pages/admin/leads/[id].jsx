import PageBanner from '@/components/common/PageBanner'
import {
    getLeads,
    getLeadById,
} from "@/utils/leadsStorage";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import Buildings from "@/images/Buildings.svg";
import Phone from "@/images/Phone.svg";
import { FaCheck, FaRegFileLines } from "react-icons/fa6";
import Envelope from "@/images/Envelope.svg";
import { RiEdit2Fill, RiNumber2, RiNumber3, RiNumber4 } from "react-icons/ri";
import { BsFillSendFill } from 'react-icons/bs';

const LeadsDetails = () => {

    const router = useRouter();
    const { id } = router.query;

    const [lead, setLead] = useState(null);

    useEffect(() => {
        if (!router.isReady) return;

        console.log("Router Query:", router.query);
        console.log("ID:", id);
        console.log("ID Type:", typeof id);

        const leads = getLeads();
        console.log("All Leads:", leads);

        const foundLead = getLeadById(id);
        console.log("Found Lead:", foundLead);

        setLead(foundLead || null);
    }, [router.isReady, id]);

    if (!router.isReady) {
        return null;
    }


    if (!lead) {
        return (
            <>
                <PageBanner title="Lead Details" />
                <div className="bg-box text-center p-5">
                    <h4>Loading...</h4>
                </div>
            </>
        );
    }

    return (
        <>
            <PageBanner title="Leads" />

            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>{lead?.lead}</h3>
                    </div>
                    <div className="QuoteDetailsStatus">
                        <span className="level-btn">
                            {lead?.status}
                        </span>
                        <span className="level-btn">
                            {lead?.Leadsource}
                        </span>
                        <span className="level-btn">
                            Score {lead?.score}
                        </span>
                    </div>
                </div>
                <div className="form-outer mb-3">
                    <h3 className="form-title">Lead Info</h3>
                    <div className="row QuoteInfo RowBorderBottom">
                        <div className="col-lg-4">
                            <div className="quote-box">
                                <Image src={Buildings} />
                                <span>{lead?.company}</span>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="quote-box">
                                <Image src={Phone} />
                                <span>{lead?.primaryPhone}</span>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="quote-box">
                                <Image src={Envelope} />
                                <span>{lead?.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="row QuoteInfo RowBorderBottom">
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Lead Name</label>
                                <h6 className="formValue">{lead?.lead}</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Lead source</label>
                                <h6 className="formValue">{lead?.Leadsource}</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Score</label>
                                <h6 className="formValue">{lead?.score}</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Owner</label>
                                <h6 className="formValue">
                                    {lead?.owner}
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="row QuoteInfo RowBorderBottom">

                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Priority</label>
                                <h6 className="formValue">{lead?.priority}</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Created</label>
                                <h6 className="formValue">
                                    {lead?.created}
                                </h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Status</label>
                                <h6 className="formValue">
                                    {lead?.status}
                                </h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Industry</label>
                                <h6 className="formValue">{lead?.industry}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="row QuoteInfo RowBorderBottom">
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Annual Revenue</label>
                                <h6 className="formValue">{lead?.annualRevenue}</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Website</label>
                                <h6 className="formValue">{lead?.website}</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="form-group mb-0">
                                <label>Budget</label>
                                <h6 className="formValue">04 Jul 2026</h6>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group mb-0">
                                <label>Notes</label>
                                <h6 className="formValue">
                                    {lead?.notes}
                                </h6>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="form-outer mb-3">
                    <h3 className="form-title mb-0">Version History</h3>
                    <div className="">
                        <div className="col-approval-box ms-0">
                            <div className="approval-box">
                                <div className="text">
                                    <p>Next Follow-Up</p>
                                    <h6 className="mb-0">{lead?.nextFollowUp}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-approval-box ms-0">
                            <div className="approval-box">
                                <div className="text">
                                    <p>Last Call</p>
                                    <h6 className="mb-0">{lead?.lastCall}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-approval-box ms-0">
                            <div className="approval-box">
                                <div className="text">
                                    <p>Open Tasks</p>
                                    <h6 className="mb-0">{lead?.openTasks}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-approval-box ms-0">
                            <div className="approval-box">
                                <div className="text">
                                    <p>Director Final Approval</p>
                                    <h6 className="mb-0">{lead?.meetingsScheduled}</h6>
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

export default LeadsDetails