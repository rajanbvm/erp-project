import PageBanner from "@/components/common/PageBanner";
import Image from "next/image";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";
import DeleteModal from "@/components/common/DeleteModal";
import { useEffect, useMemo, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import opp1 from "@/images/opp1.svg";
import opp2 from "@/images/opp2.svg";
import opp3 from "@/images/opp3.svg";
import opp4 from "@/images/opp4.svg";
import opp5 from "@/images/opp5.svg";
import { useRouter } from "next/router";

import {
    initializeOpportunities,
    getOpportunities,
    deleteOpportunity,
} from "@/utils/opportunitiesStorage";


const ListPage = () => {

    const router = useRouter();

    const [opportunities, setOpportunities] = useState([]);

    const [selectedStatus, setSelectedStatus] =
        useState("All Status");

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [selectedOpportunity, setSelectedOpportunity] =
        useState(null);


    /*
    |--------------------------------------------------------------------------
    | Load Opportunities
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        initializeOpportunities();

        const opportunityList = getOpportunities();

        setOpportunities(opportunityList || []);

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Status Colors
    |--------------------------------------------------------------------------
    */

    const statusClasses = {
        "Qualification": "badge-new",
        "Proposal sent": "badge-proposal",
        "Negotiation": "badge-negotiation",
        "Won": "badge-won",
        "Lost": "badge-overdue",
    };

    const getStatusClass = (status) => {
        return statusClasses[status] || "badge-default";
    };

    /*
    |--------------------------------------------------------------------------
    | View Opportunity
    |--------------------------------------------------------------------------
    */

    const handleView = (id) => {

        router.push(
            `/admin/opportunities/view/${id}`
        );

    };


    /*
    |--------------------------------------------------------------------------
    | Edit Opportunity
    |--------------------------------------------------------------------------
    */

    const handleEdit = (id) => {

        router.push(
            `/admin/opportunities/edit/${id}`
        );

    };


    /*
    |--------------------------------------------------------------------------
    | Open Delete Modal
    |--------------------------------------------------------------------------
    */

    const handleDeleteClick = (opportunity) => {

        setSelectedOpportunity(opportunity);

        setShowDeleteModal(true);

    };


    /*
    |--------------------------------------------------------------------------
    | Confirm Delete
    |--------------------------------------------------------------------------
    */

    const handleDeleteConfirm = () => {

        if (!selectedOpportunity?.id) return;

        deleteOpportunity(
            selectedOpportunity?.id
        );

        setOpportunities((prev) =>
            prev.filter(
                (item) =>
                    item?.id !==
                    selectedOpportunity?.id
            )
        );

        setShowDeleteModal(false);

        setSelectedOpportunity(null);

    };


    /*
    |--------------------------------------------------------------------------
    | Table Columns
    |--------------------------------------------------------------------------
    */

    const OpportunitiesColumns = [
        {
            key: "opportunity",
            label: "Opportunity",
        },

        {
            key: "company",
            label: "COMPANY",
        },

        {
            key: "owner",
            label: "Owner",
        },

        {
            key: "stage",
            label: "Stage",
            render: (row) => (
                <span className={`table-status ${getStatusClass(row?.stage)}`}>
                    {row?.stage}
                </span>
            ),
        },

        {
            key: "value",
            label: "Value",

            render: (row) => (
                <span
                    style={{
                        color: "#1D9E75",
                    }}
                >
                    ${Number(
                        row?.value || 0
                    ).toLocaleString()}
                </span>
            ),
        },

        {
            key: "probability",
            label: "Probability",

            render: (row) => (
                <span>
                    {row?.probability}%
                </span>
            ),
        },

        {
            key: "closeDate",
            label: "Close date",

            render: (row) => {

                if (!row?.closeDate) {
                    return "-";
                }

                const date = new Date(
                    row.closeDate
                );

                return date.toLocaleDateString(
                    "en-GB",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    }
                );
            },
        },

        {
            key: "action",
            label: "ACTION",

            render: (row) => (
                <div className="table-actions">

                    <FaRegEye
                        className="eyeBtn mx-2"
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={() =>
                            handleView(
                                row?.id
                            )
                        }
                    />

                    <RiEdit2Fill
                        className="eyeBtn mx-2"
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={() =>
                            handleEdit(
                                row?.id
                            )
                        }
                    />

                    <RiDeleteBin6Line
                        className="eyeBtn text-danger mx-2"
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={() =>
                            handleDeleteClick(
                                row
                            )
                        }
                    />

                </div>
            ),
        },
    ];


    /*
    |--------------------------------------------------------------------------
    | Status Dropdown
    |--------------------------------------------------------------------------
    */

    const dropdownItems = useMemo(() => {

        const statuses = [
            ...new Set(
                opportunities.map(
                    (item) =>
                        item?.stage
                )
            ),
        ];

        return [
            {
                label: "All Status",

                onClick: () =>
                    setSelectedStatus(
                        "All Status"
                    ),
            },

            ...statuses.map(
                (status) => ({
                    label: status,

                    onClick: () =>
                        setSelectedStatus(
                            status
                        ),
                })
            ),
        ];

    }, [opportunities]);


    /*
    |--------------------------------------------------------------------------
    | Filter Opportunities
    |--------------------------------------------------------------------------
    */

    const filteredData = useMemo(() => {

        if (
            selectedStatus ===
            "All Status"
        ) {
            return opportunities;
        }

        return opportunities.filter(
            (item) =>
                item?.stage ===
                selectedStatus
        );

    }, [
        opportunities,
        selectedStatus,
    ]);


    /*
    |--------------------------------------------------------------------------
    | Opportunity Cards
    |--------------------------------------------------------------------------
    */

    const OpportunitiesCards = [
        {
            id: 1,
            image: opp1,
            title: "Pipeline value",

            value: `$${opportunities
                .reduce(
                    (total, item) =>
                        total +
                        Number(
                            item?.value || 0
                        ),
                    0
                )
                .toLocaleString()}`,
        },

        {
            id: 2,
            image: opp2,
            title: "Open deals",

            value: opportunities.filter(
                (item) =>
                    item?.stage !== "Won" &&
                    item?.stage !== "Lost"
            ).length,
        },

        {
            id: 3,
            image: opp3,
            title: "Won (month)",

            value: opportunities.filter(
                (item) =>
                    item?.stage === "Won"
            ).length,
        },

        {
            id: 4,
            image: opp4,
            title: "Lost",

            value: opportunities.filter(
                (item) =>
                    item?.stage === "Lost"
            ).length,
        },

        {
            id: 5,
            image: opp5,
            title: "Win rate",

            value:
                opportunities.length > 0
                    ? `${Math.round(
                        (opportunities.filter(
                            (item) =>
                                item?.stage ===
                                "Won"
                        ).length /
                            opportunities.length) *
                        100
                    )}%`
                    : "0%",
        },
    ];


    return (
        <>
            <PageBanner title="Opportunities" />
            {/* =====================================================
                OPPORTUNITY CARDS
            ===================================================== */}

            {/* <div className="row opp-row mb-32">

                {OpportunitiesCards.map(
                    (card) => (

                        <div
                            key={card.id}
                            className="col-lg col-md-6"
                        >

                            <div className="overview-card">

                                <Image
                                    src={card.image}
                                    alt={card.title}
                                />

                                <p>
                                    {card.title}
                                </p>

                                <h3 className="mb-0">
                                    {card.value}
                                </h3>

                            </div>

                        </div>

                    )
                )}

            </div> */}

            {/* =====================================================
                SEARCH / ADD
            ===================================================== */}

            <PageSearch

                showAddButton={true}

                addButtonText="Add Opportunity"

                onAddClick={() => {
                    router.push(
                        "/admin/opportunities/add"
                    );
                }}

            />


            {/* =====================================================
                TABLE
            ===================================================== */}

            <div className="bg-box mb-32">

                <DataTable
                    title="All Opportunities"
                    columns={OpportunitiesColumns}
                    data={filteredData}
                    showViewAll={false}
                    showDropdown={true}
                    dropdownTitle={selectedStatus}
                    dropdownItems={
                        dropdownItems
                    }
                />

            </div>


            {/* =====================================================
                DELETE MODAL
            ===================================================== */}

            {showDeleteModal && (
                <DeleteModal
                    show={showDeleteModal}

                    onClose={() => {
                        setShowDeleteModal(
                            false
                        );

                        setSelectedOpportunity(
                            null
                        );
                    }}

                    onConfirm={
                        handleDeleteConfirm
                    }
                    title="Delete Opportunity"
                    message={
                        <>
                            Are you sure you want to delete{" "}
                            <span className="fw-bold text-black">"{selectedOpportunity?.opportunity} ?"</span>
                        </>
                    }
                />
            )}

        </>
    );
};


export default ListPage;