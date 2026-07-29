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
            <PageBanner title="Calls" />

            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>Log Call</h3>
                        <p>Create a Log Call</p>
                    </div>
                </div>

                <div className="form-outer">
                    <div className="row">
                        <h3 className="form-title">Log a Call</h3>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Call Status</label>
                                <input type="text" className="form-control" placeholder="e.g. Completed" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Call Outcome</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>No Answer</option>
                                    <option value="1" >Outcome One</option>
                                    <option value="2" >Outcome Two</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Duration (seconds)</label>
                                <input type="text" placeholder="120" className="form-control" />
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Outcome</label>
                                <input type="text" placeholder="Interested" className="form-control" />
                            </div>
                        </div>

                        <div className="col-lg-8 col-md-6">
                            <div className="form-group">
                                <label>Notes</label>
                                <input type="text" className="form-control" placeholder="Customer is interested in the premium plan." />
                            </div>
                        </div>
                        <div className="col-12">
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="checkChecked" checked />
  <label class="form-check-label" for="checkChecked">
    Schedule a Follow-up Task? (Creates a quick reminder for later)
  </label>
</div>
                        </div>
                    </div>

                </div>

                <div className="form-action">
                    <button
                        className="btn btn-primary ms-2"
                    >
                        <BsFillSendFill />
                        <span>Save Log</span>
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