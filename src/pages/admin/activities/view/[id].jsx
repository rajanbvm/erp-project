import PageBanner from "@/components/common/PageBanner";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { RiEdit2Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

import {
    getActivityById,
} from "@/utils/activitiesStorage";

import {
    initializeCompanies,
    getCompanyById,
} from "@/utils/companiesStorage";

const ActivitiesDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    const [activity, setActivity] = useState(null);
    const [company, setCompany] = useState(null);

    useEffect(() => {
        if (!router.isReady) return;

        initializeCompanies();

        const foundActivity = getActivityById(id);

        if (foundActivity) {
            setActivity(foundActivity);

            const foundCompany = getCompanyById(
                foundActivity?.relatedTo
            );

            setCompany(foundCompany || null);
        }
    }, [router.isReady, id]);

    if (!router.isReady) {
        return null;
    }

    if (!activity) {
        return (
            <>
                <PageBanner title="Activity Details" />

                <div className="bg-box text-center p-5">
                    <h4>Activity not found.</h4>

                    <Link
                        href="/admin/activities"
                        className="btn btn-outline-primary mt-3"
                    >
                        <IoMdClose />
                        <span>Back to Activities</span>
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <PageBanner title="Activities" />

            <div className="bg-box">
                <div className="table-header">
                    <div>
                        <h3>{activity?.taskTitle}</h3>
                        {/* <p className="mb-0">Activity Details</p> */}
                    </div>

                    <div className="QuoteDetailsStatus">
                        <span className="level-btn">
                            {activity?.status}
                        </span>

                        <span className="level-btn">
                            {activity?.type}
                        </span>
                    </div>
                </div>

                <div className="form-outer mb-3">
                    <h3 className="form-title">Task Information</h3>

                    <div className="row QuoteInfo RowBorderBottom">
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group mb-0">
                                <label>Task Title</label>
                                <h6 className="formValue">
                                    {activity?.taskTitle || "-"}
                                </h6>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group mb-0">
                                <label>Type</label>
                                <h6 className="formValue">
                                    {activity?.type || "-"}
                                </h6>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group mb-0">
                                <label>Status</label>
                                <h6 className="formValue">
                                    {activity?.status || "-"}
                                </h6>
                            </div>
                        </div>
                    </div>

                    <div className="row QuoteInfo">
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group mb-0">
                                <label>Assignee</label>
                                <h6 className="formValue">
                                    {activity?.assignee || "-"}
                                </h6>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group mb-0">
                                <label>Due Date</label>
                                <h6 className="formValue">
                                    {activity?.dueDate || "-"}
                                </h6>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group mb-0">
                                <label>Activity ID</label>
                                <h6 className="formValue">
                                    {activity?.id || "-"}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-outer mb-3">
                    <h3 className="form-title">Related Company</h3>

                    <div className="row QuoteInfo RowBorderBottom">
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group mb-0">
                                <label>Company</label>
                                <h6 className="formValue">
                                    {company?.company || "-"}
                                </h6>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group mb-0">
                                <label>Industry</label>
                                <h6 className="formValue">
                                    {company?.industry || "-"}
                                </h6>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group mb-0">
                                <label>Company Owner</label>
                                <h6 className="formValue">
                                    {company?.owner || "-"}
                                </h6>
                            </div>
                        </div>
                    </div>

                    <div className="row QuoteInfo">
                        <div className="col-lg-4 col-md-6">
                            <div className="form-group mb-0">
                                <label>Phone</label>
                                <h6 className="formValue">
                                    {company?.phone || "-"}
                                </h6>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group mb-0">
                                <label>Email</label>
                                <h6 className="formValue">
                                    {company?.email || "-"}
                                </h6>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="form-group mb-0">
                                <label>Website</label>
                                <h6 className="formValue">
                                    {company?.website || "-"}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-action">
                    <Link
                        href={`/admin/activities/edit/${activity?.id}`}
                        className="btn btn-primary ms-2"
                    >
                        <RiEdit2Fill />
                        <span>Edit Activity</span>
                    </Link>

                    <Link
                        href="/admin/activities"
                        className="btn btn-outline-primary mx-2"
                    >
                        <IoMdClose />
                        <span>Back to Activities</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ActivitiesDetails;