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
            <PageBanner title="Reminders" />

            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>Add New Event</h3>
                        {/* <p>Create a Log Call</p> */}
                    </div>
                </div>

                <div className="form-outer">
                    <div className="row">
                        <h3 className="form-title">Event Information</h3>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Type</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Tasks</option>
                                    <option value="1" >Calls</option>
                                    <option value="2" >Meetings</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" placeholder="Product Demo & Pricing Discussion" className="form-control" />
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" className="form-control" />
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Time</label>
                                <input type="time" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div class="form-group">
                                <label>Duration</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>60 Min</option>
                                    <option value="1" >80 Min</option>
                                    <option value="2" >100 Min</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Purpose/Subject</label>
                                <input type="text" placeholder="Product Demo & Pricing Discussion with client" className="form-control" />
                            </div>
                        </div>
                         <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Location / Platform</label>
                                <input type="text" placeholder="Google Meet" className="form-control" />
                            </div>
                        </div>
                         <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Participants</label>
                               <select name="" id="" className="form-select">
                                    <option value="" selected>2</option>
                                    <option value="1" >3</option>
                                    <option value="2" >4</option>
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
                        <span>Save Reminder</span>
                    </button>
                    <button onClick={() => {
                        router.push("/admin/calls");
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