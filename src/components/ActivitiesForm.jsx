import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageBanner from "@/components/common/PageBanner";
import { IoMdClose } from "react-icons/io";
import { BsFillSendFill } from "react-icons/bs";
import CustomDropdown from "@/components/common/CustomDropdown";
import Link from "next/link";

import {
    ownerOptions,
    communicationOptions,
    activityStatusOptions,
} from "@/utils/menuDropdown";

import {
    initializeCompanies,
    getCompanies,
} from "@/utils/companiesStorage";
import {
    notifyAdded,
    notifyUpdated,
} from "@/utils/notificationsStorage";
import {
    initializeActivities,
    getActivityById,
    addActivity,
    updateActivity,
} from "@/utils/activitiesStorage";

const ActivitiesForm = ({
    mode = "add",
    activityId,
}) => {

    const router = useRouter();

    const [companies, setCompanies] = useState([]);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        taskTitle: "",
        assignee: "",
        dueDate: "",
        dueTime: "",
        type: "Phone",
        relatedTo: "",
        status: "Scheduled",
    });

    /*
    |--------------------------------------------------------------------------
    | Load Data
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        initializeActivities();
        initializeCompanies();

        const companyList = getCompanies();

        setCompanies(companyList || []);

    }, []);

    /*
    |--------------------------------------------------------------------------
    | Company Options
    |--------------------------------------------------------------------------
    */

    const companyOptions = companies.map(
        (company) => ({
            label: company?.company,
            value: company?.id,
        })
    );

    /*
    |--------------------------------------------------------------------------
    | Edit Activity
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (
            mode !== "edit" ||
            !activityId
        ) {
            return;
        }

        const activity =
            getActivityById(activityId);

        if (activity) {

            setFormData({
                taskTitle:
                    activity?.taskTitle || "",

                assignee:
                    activity?.assignee || "",

                dueDate:
                    activity?.dueDate || "",

                dueTime:
                    activity?.dueTime || "",

                type:
                    activity?.type || "Phone",

                relatedTo:
                    activity?.relatedTo || "",

                status:
                    activity?.status || "Scheduled",
            });

        }

    }, [mode, activityId]);

    /*
    |--------------------------------------------------------------------------
    | Handle Change
    |--------------------------------------------------------------------------
    */

    const handleChange = (e) => {
        const {
            name,
            value,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData?.taskTitle?.trim()) {
            newErrors.taskTitle = "Task Title is required.";
        }

        if (!formData?.assignee) {
            newErrors.assignee = "Please select an assignee.";
        }

        if (!formData?.dueDate) {
            newErrors.dueDate = "Due Date is required.";
        }

        if (!formData?.dueTime) {
            newErrors.dueTime = "Due Time is required.";
        }

        if (!formData?.relatedTo) {
            newErrors.relatedTo = "Please select a company.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            setTimeout(() => {
                const firstErrorField = document.querySelector(".is-invalid");

                if (firstErrorField) {
                    firstErrorField.scrollIntoView({
                        behavior: "smooth",
                        // block: "center",
                    });

                    firstErrorField.focus?.();
                }
            }, 0);

            return;
        }

        const activityData = {
            ...formData,
        };

        if (mode === "add") {

            const newActivity = addActivity(activityData);

            notifyAdded(
                "Activity",
                formData?.taskTitle,
                newActivity?.id
            );

        } else {

            updateActivity(
                activityId,
                activityData
            );

            notifyUpdated(
                "Activity",
                formData?.taskTitle,
                activityId
            );
        }

        router.push("/admin/activities");
    };

    return (
        <>
            <PageBanner title="Activities" />

            <div className="bg-box">

                <div className="table-header">

                    <div>

                        <h3>
                            {mode === "edit"
                                ? "Edit Task"
                                : "New Task"}
                        </h3>

                        <p>
                            {mode === "edit"
                                ? "Update Task Information"
                                : "Create a New Task"}
                        </p>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="form-outer mb-3">

                        <div className="row">

                            <h3 className="form-title">
                                Task Information
                            </h3>


                            {/* Task Title */}

                            <div className="col-lg-4 col-md-6">

                                <div className="form-group">

                                    <label>
                                        Task Title
                                    </label>

                                    <input
                                        type="text"
                                        name="taskTitle"
                                        className={`form-control ${errors?.taskTitle ? "is-invalid" : ""}`}
                                        value={formData?.taskTitle}
                                        onChange={handleChange}
                                        placeholder="e.g. CRM Software Deployment"
                                    />

                                    {errors?.taskTitle && (
                                        <div className="form-error">
                                            {errors?.taskTitle}
                                        </div>
                                    )}

                                </div>

                            </div>


                            {/* Assignee */}

                            <div className="col-lg-4 col-md-6">

                                <div className="form-group">

                                    <label>
                                        Assignee
                                    </label>

                                    <CustomDropdown
                                        name="assignee"
                                        value={formData?.assignee}
                                        placeholder="Select Assignee"
                                        options={ownerOptions}
                                        onChange={handleChange}
                                        className={errors?.assignee ? "is-invalid" : ""}
                                    />

                                    {errors?.assignee && (
                                        <div className="form-error">
                                            {errors?.assignee}
                                        </div>
                                    )}

                                </div>

                            </div>


                            {/* Due Date */}

                            <div className="col-lg-4 col-md-6">

                                <div className="form-group">

                                    <label>
                                        Due Date
                                    </label>

                                    <input
                                        type="date"
                                        name="dueDate"
                                        className={`form-control ${errors?.dueDate ? "is-invalid" : ""}`}
                                        value={formData?.dueDate}
                                        onChange={handleChange}
                                    />

                                    {errors?.dueDate && (
                                        <div className="form-error">
                                            {errors?.dueDate}
                                        </div>
                                    )}

                                </div>

                            </div>


                            {/* Due Time */}

                            <div className="col-lg-4 col-md-6">

                                <div className="form-group">

                                    <label>
                                        Due Time
                                    </label>

                                    <input
                                        type="time"
                                        name="dueTime"
                                        className={`form-control ${errors?.dueTime ? "is-invalid" : ""}`}
                                        value={formData?.dueTime}
                                        onChange={handleChange}
                                    />

                                    {errors?.dueTime && (
                                        <div className="form-error">
                                            {errors?.dueTime}
                                        </div>
                                    )}

                                </div>

                            </div>


                            {/* Type */}

                            <div className="col-lg-4 col-md-6">

                                <div className="form-group">

                                    <label>
                                        Type
                                    </label>

                                    <CustomDropdown
                                        name="type"
                                        value={formData?.type}
                                        placeholder="Select Type"
                                        options={communicationOptions}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            {/* Related To */}

                            <div className="col-lg-4 col-md-6">

                                <div className="form-group">

                                    <label>
                                        Related To
                                    </label>

                                    <CustomDropdown
                                        name="relatedTo"
                                        value={formData?.relatedTo}
                                        placeholder="Select Company"
                                        options={companyOptions}
                                        onChange={handleChange}
                                        className={errors?.relatedTo ? "is-invalid" : ""}
                                    />

                                    {errors?.relatedTo && (
                                        <div className="form-error">
                                            {errors?.relatedTo}
                                        </div>
                                    )}

                                </div>

                            </div>


                            {/* Status */}

                            <div className="col-lg-4 col-md-6">

                                <div className="form-group">

                                    <label>
                                        Status
                                    </label>

                                    <CustomDropdown
                                        name="status"
                                        value={formData?.status}
                                        placeholder="Select Status"
                                        options={activityStatusOptions}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="form-action">

                        <button
                            type="submit"
                            className="btn btn-primary ms-2"
                        >

                            <BsFillSendFill />

                            <span>
                                {mode === "edit"
                                    ? "Update Task"
                                    : "Create Task"}
                            </span>

                        </button>


                        <Link
                            href="/admin/activities"
                            className="btn btn-outline-primary mx-2"
                        >

                            <IoMdClose />

                            <span>
                                Cancel
                            </span>

                        </Link>

                    </div>

                </form>

            </div>
        </>
    );
};

export default ActivitiesForm;