import PageBanner from "@/components/common/PageBanner";
import {
    getActivityById,
    initializeActivities,
} from "@/utils/activitiesStorage";
import {
    initializeCompanies,
    getCompanies,
} from "@/utils/companiesStorage";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Buildings from "@/images/Buildings.svg";
import Phone from "@/images/Phone.svg";
import Envelope from "@/images/Envelope.svg";
import { RiEdit2Fill } from "react-icons/ri";
import { BsFillSendFill } from "react-icons/bs";
import Link from "next/link";

const ReminderDetails = () => {

    const router = useRouter();
    const { id } = router.query;

    const [activity, setActivity] = useState(null);
    const [company, setCompany] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Load Reminder / Activity
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!router.isReady) {
            return;
        }

        initializeActivities();
        initializeCompanies();

        const foundActivity =
            getActivityById(id);

        setActivity(
            foundActivity || null
        );

        /*
        |--------------------------------------------------------------------------
        | Get Related Company
        |--------------------------------------------------------------------------
        */

        if (foundActivity?.relatedTo) {

            const companies =
                getCompanies();

            const foundCompany =
                companies.find(
                    (item) =>
                        item?.id ===
                        foundActivity?.relatedTo
                );

            setCompany(
                foundCompany || null
            );

        }

    }, [router.isReady, id]);


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (!router.isReady) {
        return null;
    }


    if (!activity) {

        return (
            <>
                <PageBanner title="Reminder Details" />

                <div className="bg-box text-center p-5">

                    <h4>
                        Reminder not found
                    </h4>

                </div>
            </>
        );

    }


    /*
    |--------------------------------------------------------------------------
    | Reminder Date / Time
    |--------------------------------------------------------------------------
    */

    const reminderDate = activity?.dueDate
        ? new Date(
            `${activity?.dueDate}T${activity?.dueTime || "00:00"}`
        )
        : null;


    /*
    |--------------------------------------------------------------------------
    | Format Date
    |--------------------------------------------------------------------------
    */

    const formattedDate =
        reminderDate
            ? reminderDate.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }
            )
            : "-";


    /*
    |--------------------------------------------------------------------------
    | Format Time
    |--------------------------------------------------------------------------
    */

    const formattedTime =
        reminderDate
            ? reminderDate.toLocaleTimeString(
                "en-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                }
            )
            : "-";


    /*
    |--------------------------------------------------------------------------
    | Reminder Status
    |--------------------------------------------------------------------------
    */

    const getReminderStatus = () => {

        if (
            activity?.status ===
            "Completed"
        ) {
            return "Completed";
        }

        if (
            activity?.status ===
            "Cancelled"
        ) {
            return "Cancelled";
        }

        if (!reminderDate) {
            return "Pending";
        }

        const now = new Date();

        if (reminderDate < now) {
            return "Overdue";
        }

        return "Scheduled";
    };


    const reminderStatus =
        getReminderStatus();


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <>
            <PageBanner title="Reminders" />

            <div className="bg-box">

                {/* =====================================================
                    HEADER
                ===================================================== */}

                <div className="table-header">

                    <div>

                        <h3>
                            {activity?.taskTitle}
                        </h3>

                    </div>


                    <div className="QuoteDetailsStatus">

                        <span className="level-btn">
                            {reminderStatus}
                        </span>

                        <span className="level-btn">
                            {activity?.type}
                        </span>

                    </div>

                </div>


                {/* =====================================================
                    REMINDER INFORMATION
                ===================================================== */}

                <div className="form-outer mb-3">

                    <h3 className="form-title">
                        Reminder Information
                    </h3>


                    {/* =================================================
                        TOP INFORMATION
                    ================================================= */}

                    <div className="row QuoteInfo RowBorderBottom">

                        {/* Company */}

                        <div className="col-lg-4">

                            <div className="quote-box">

                                <Image
                                    src={Buildings}
                                    alt="Company"
                                />

                                <span>
                                    {company?.company ||
                                        activity?.relatedTo ||
                                        "-"}
                                </span>

                            </div>

                        </div>


                        {/* Assignee */}

                        <div className="col-lg-4">

                            <div className="quote-box">

                                <Image
                                    src={Phone}
                                    alt="Assignee"
                                />

                                <span>
                                    {activity?.assignee ||
                                        "-"}
                                </span>

                            </div>

                        </div>


                        {/* Type */}

                        <div className="col-lg-4">

                            <div className="quote-box">

                                <Image
                                    src={Envelope}
                                    alt="Type"
                                />

                                <span>
                                    {activity?.type ||
                                        "-"}
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        BASIC INFORMATION
                    ================================================= */}

                    <div className="row QuoteInfo RowBorderBottom">

                        <div className="col-lg-3 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Reminder
                                </label>

                                <h6 className="formValue">
                                    {activity?.taskTitle}
                                </h6>

                            </div>

                        </div>


                        <div className="col-lg-3 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Type
                                </label>

                                <h6 className="formValue">
                                    {activity?.type}
                                </h6>

                            </div>

                        </div>


                        <div className="col-lg-3 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Assignee
                                </label>

                                <h6 className="formValue">
                                    {activity?.assignee}
                                </h6>

                            </div>

                        </div>


                        <div className="col-lg-3 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Status
                                </label>

                                <h6 className="formValue">
                                    {reminderStatus}
                                </h6>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        DATE / TIME
                    ================================================= */}

                    <div className="row QuoteInfo RowBorderBottom">

                        <div className="col-lg-3 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Due Date
                                </label>

                                <h6 className="formValue">
                                    {formattedDate}
                                </h6>

                            </div>

                        </div>


                        <div className="col-lg-3 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Due Time
                                </label>

                                <h6 className="formValue">
                                    {formattedTime}
                                </h6>

                            </div>

                        </div>


                        <div className="col-lg-3 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Company
                                </label>

                                <h6 className="formValue">
                                    {company?.company || "-"}
                                </h6>

                            </div>

                        </div>


                        <div className="col-lg-3 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Activity ID
                                </label>

                                <h6 className="formValue">
                                    {activity?.id}
                                </h6>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        CREATED INFORMATION
                    ================================================= */}

                    <div className="row QuoteInfo RowBorderBottom">

                        <div className="col-lg-3 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Created
                                </label>

                                <h6 className="formValue">

                                    {activity?.createdAt
                                        ? new Date(
                                            activity?.createdAt
                                        ).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )
                                        : "-"}

                                </h6>

                            </div>

                        </div>


                        <div className="col-lg-3 col-md-6">

                            <div className="form-group mb-0">

                                <label>
                                    Related To
                                </label>

                                <h6 className="formValue">
                                    {company?.company ||
                                        activity?.relatedTo ||
                                        "-"}
                                </h6>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    REMINDER TIMELINE
                ===================================================== */}

                <div className="form-outer mb-3">

                    <h3 className="form-title mb-0">
                        Reminder Details
                    </h3>

                    <div className="">

                        <div className="col-approval-box ms-0">

                            <div className="approval-box">

                                <div className="text">

                                    <p>
                                        Scheduled Date
                                    </p>

                                    <h6 className="mb-0">
                                        {formattedDate}
                                    </h6>

                                </div>

                            </div>

                        </div>


                        <div className="col-approval-box ms-0">

                            <div className="approval-box">

                                <div className="text">

                                    <p>
                                        Scheduled Time
                                    </p>

                                    <h6 className="mb-0">
                                        {formattedTime}
                                    </h6>

                                </div>

                            </div>

                        </div>


                        <div className="col-approval-box ms-0">

                            <div className="approval-box">

                                <div className="text">

                                    <p>
                                        Reminder Status
                                    </p>

                                    <h6 className="mb-0">
                                        {reminderStatus}
                                    </h6>

                                </div>

                            </div>

                        </div>


                        <div className="col-approval-box ms-0">

                            <div className="approval-box">

                                <div className="text">

                                    <p>
                                        Activity Type
                                    </p>

                                    <h6 className="mb-0">
                                        {activity?.type || "-"}
                                    </h6>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    ACTION BUTTONS
                ===================================================== */}

                <div className="form-action">

                    <button
                        type="button"
                        className="btn btn-primary ms-2"
                        onClick={() => {

                            router.push(
                                `/admin/activities/edit/${activity?.id}`
                            );

                        }}
                    >

                        <BsFillSendFill />

                        <span>
                            Mark / Update Activity
                        </span>

                    </button>


                    <Link
                        href={`/admin/activities/edit/${activity?.id}`}
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

export default ReminderDetails;