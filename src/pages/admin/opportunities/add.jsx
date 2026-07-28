import PageBanner from '@/components/common/PageBanner'
import React from 'react'
import { IoMdClose } from "react-icons/io";
import { FaRegFileLines } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";
import { useRouter } from "next/router";
const add = () => {
const router = useRouter();

    return (
        <>
            <PageBanner title="Opportunities" />

            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>New Opportunity</h3>
                        <p>Create a New Opportunity </p>
                    </div>
                </div>

                <div className="form-outer">
                    <div className="row">
                        <h3 className="form-title">Opportunity Information</h3>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Opportunity Name</label>
                                <input type="text" className="form-control" placeholder="e.g. e.g. CRM Software Deployment" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Company</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Orion Constructions</option>
                                    <option value="1" >Industry One</option>
                                    <option value="2" >Industry Two</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Contact</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>name@company.ae</option>
                                    <option value="1" >Contact One</option>
                                    <option value="2" >Contact Two</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Value ($)</label>
                                <input type="text" className="form-control" placeholder="e.g. 00" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Probability (%)</label>
                                <input type="email" className="form-control" placeholder="e.g. 20" />
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Stage</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Qualification</option>
                                    <option value="1" >Stage One</option>
                                    <option value="2" >Stage Two</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Owner</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>John Smith</option>
                                    <option value="1" >Owner One</option>
                                    <option value="2" >Owner Two</option>
                                </select>
                            </div>
                        </div>

<div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Expected Close Date</label>
                                <input type="date" name="" id="" className="form-control" />
                            </div>
                        </div>
                    </div>

                </div>



                <div className="form-action">
                    <button
                        className="btn btn-primary ms-2"
                    >
                        <BsFillSendFill />
                        <span>Create Opportunity</span>
                    </button>
                    <button onClick={() => {
    router.push("/admin/opportunities");
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