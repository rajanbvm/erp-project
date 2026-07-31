import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import {
    addLead,
    updateLead,
    getLeadById
} from "@/utils/leadsStorage";
import { FaRegEye } from 'react-icons/fa6';
import Image from "next/image";
import UploadIcon from "@/images/UploadIcon.svg";
import { FaRegFileLines } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";

const LeadForm = ({ mode, leadId }) => {

    const router = useRouter();

const [formData, setFormData] = useState({
    lead: "",
    company: "",
    email: "",
    phone: "",
    source: "",
    owner: "",
    score: "",
    status: ""
});

useEffect(() => {

    if (mode !== "edit") return;

    if (!leadId) return;

    const lead = getLeadById(leadId);

    if (lead) {
        setFormData(lead);
    }

}, [leadId]);

const handleSubmit = () => {

    if (mode === "add") {

        addLead(formData);

    } else {

        updateLead(leadId, formData);

    }

    router.push("/admin/leads");

};

  return (
    <form>
         <div className="form-outer mb-3">
                    <div className="row">
                        <h3 className="form-title">Lead Information</h3>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Lead Name</label>
                                <input type="text" className="form-control" placeholder="e.g. Rohan Mehta" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Designation</label>
                                <input type="text" className="form-control" placeholder="e.g. Procurement Head" />
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
                                <label>Company Size</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Select range</option>
                                    <option value="1" >1-20</option>
                                    <option value="2" >1-50</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Budget</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Select Budget</option>
                                    <option value="1" >$100 to $300</option>
                                    <option value="2" >$300 to $500</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Follow-Up Type</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Select Type</option>
                                    <option value="1" >Call</option>
                                    <option value="2" >Video Call</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Requirement / Interest</label>
                                <input type="text" className="form-control" placeholder="Briefly describe what the prospect is looking for..." />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Remarks</label>
                                <input type="text" className="form-control" placeholder="Internal remarks..." />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-outer mb-3">
                    <div className="row">
                        <h3 className="form-title">Company Information</h3>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Company Name</label>
                                <input type="text" className="form-control" placeholder="e.g. Nirvana Retail Pvt Ltd" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Website</label>
                                <input type="text" className="form-control" placeholder="e.g. www.company.com" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Industry Type</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Select industry</option>
                                    <option value="1" >Industry One</option>
                                    <option value="2" >Industry Two</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Annual Revenue</label>
                                <input type="text" className="form-control" placeholder="e.g. 2,00,00,000" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Business Address</label>
                                <input type="text" className="form-control" placeholder="e.g. C-Scheme, Jaipur, Rajasthan 302001" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-outer mb-3">
                    <div className="row">
                        <h3 className="form-title">Contact Details</h3>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Primary Phone</label>
                                <input type="text" className="form-control" placeholder="e.g. +91 1234567890" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Secondary Phone</label>
                                <input type="text" className="form-control" placeholder="e.g. Optional" />
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" className="form-control" placeholder="e.g. rohan@company.com" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>WhatsApp Number</label>
                                <input type="text" className="form-control" placeholder="e.g. +91 1234567890" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>LinkedIn / Social Profile</label>
                                <input type="text" className="form-control" placeholder="e.g. linkedin.com/in/..." />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Preferred Communication</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Select Option</option>
                                    <option value="1" >Phone</option>
                                    <option value="2" >Whatsapp</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-outer mb-3">
                    <div className="row">
                        <h3 className="form-title">Classification & Ownership</h3>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Lead Source</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Select source</option>
                                    <option value="1" >Source One</option>
                                    <option value="2" >Source Two</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Lead Owner</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Assign to...</option>
                                    <option value="1" >Source One</option>
                                    <option value="2" >Source Two</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Lead Status</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>New</option>
                                    <option value="1" >Old</option>
                                    <option value="2" >Two</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group">
                                <label>Assignment Mode</label>
                                <select name="" id="" className="form-select">
                                    <option value="" selected>Manual</option>
                                    <option value="1" >One</option>
                                    <option value="2" >Two</option>
                                </select>
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
                    </div>
                </div>

                <div className="form-outer mb-3">
                    <div className="row">
                        <h3 className="form-title">Notes, Documents & Follow-Up</h3>
                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Notes</label>
                                <textarea style={{ minHeight: "120px" }} name="" id="" className="form-control" placeholder="Add any internal notes or discussion points..."></textarea>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Attach Documents</label>
                                <label htmlFor="uploadFiles" className="w-100">
                                    <input
                                        type="file"
                                        id="uploadFiles"
                                        className="d-none"
                                        accept=".xlsx,.xls"
                                    />

                                    <div className="upload-div">
                                        <div className="icon-text">
                                            <Image
                                                src={UploadIcon}
                                                alt="Upload"
                                                width={24}
                                                height={24}
                                            />
                                            <span>Upload Files</span>
                                        </div>

                                        <p className="mb-0">Click to browse PDF, DOC, XLS, PPT, JPG, PNG · up to 25MB each</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Follow-Up Date</label>
                                <input type="date" name="" id="" className="form-control" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                                <label>Follow-Up Time</label>
                                <input type="time" name="" id="" className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-action">
                    <button
    type="button"
    className="btn btn-primary ms-2"
    onClick={handleSubmit}
>
                        <BsFillSendFill />
                        <span>Create Lead</span>
                    </button>
                    <button
                        className="btn btn-outline-primary mx-2"
                    >
                        <FaRegFileLines />
                        <span>Save as Draft</span>
                    </button>
                </div>
    </form>
  )
}

export default LeadForm