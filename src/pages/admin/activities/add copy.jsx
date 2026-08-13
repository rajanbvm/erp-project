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
            <PageBanner title="Activities" />

            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>New Task</h3>
                        <p>Create a New Task  </p>
                    </div>
                </div>

                <div className="form-outer">
                    <div className="row">
                        <h3 className="form-title">Task Information</h3>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Task Title</label>
                                <input type="text" className="form-control" placeholder="e.g. CRM Software Deployment" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Assignee</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Orion Constructions</option>
                                    <option value="1" >Assignee One</option>
                                    <option value="2" >Assignee Two</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Due Date</label>
                                <input type="date" name="" id="" className="form-control" />
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Type</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Call</option>
                                    <option value="1" >Type One</option>
                                    <option value="2" >Type Two</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Related To</label>
                                <input type="text" className="form-control" placeholder="20" />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="form-action">
                    <button
                        className="btn btn-primary ms-2"
                    >
                        <BsFillSendFill />
                        <span>Create Task</span>
                    </button>
                    <button onClick={() => {
                        router.push("/admin/activities");
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