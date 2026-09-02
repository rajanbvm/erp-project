import PageBanner from "@/components/common/PageBanner";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";
import { useEffect, useMemo, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import DeleteModal from "@/components/common/DeleteModal";
import {
    initializeQuotations,
    getQuotations,
    deleteQuotation,
} from "@/utils/quotationStorage";
import Permission from "@/components/common/Permission";

const ListPage = () => {

    const [selectedStatus, setSelectedStatus] = useState("All Status");
    const [quotations, setQuotations] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedQuotationId, setSelectedQuotationId] = useState(null);

    useEffect(() => {
        initializeQuotations();

        setQuotations(getQuotations());
    }, []);

    const router = useRouter();

    const statusClasses = {
        "Pending Approval": "badge-pending",
        "Sent": "badge-proposal",
        "Approved": "badge-won",
        "Draft": "badge-new",
        "In review": "badge-negotiation",
        "Rejected": "badge-overdue",
    };

    const getStatusClass = (status) => {
        return statusClasses[status] || "badge-default";
    };

    const QuotationColumns = [
        {
            key: "quotationNo",
            label: "Quotation No",
        },
        {
            key: "customer",
            label: "Customer",
        },
        {
            key: "quotationValue",
            label: "Amount",
        },
        {
            key: "vat",
            label: "VAT",
        },
        {
            key: "created",
            label: "Created",
        },
        {
            key: "status",
            label: "Status",
            render: (row) => (
                <span className={`table-status ${getStatusClass(row?.status)}`}>
                    {row?.status}
                </span>
            ),
        },
        {
            key: "action",
            label: "Action",
            render: (row) => (
                <div className="table-actions">

                    <FaRegEye
                        className="eyeBtn mx-2"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                            router.push(`/admin/quotations/view/${row?.id}`)
                        }
                    />

                    <RiEdit2Fill
                        className="eyeBtn mx-2"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                            router.push(`/admin/quotations/edit/${row?.id}`)
                        }
                    />
                    <Permission module="quotations" action="delete">
                        <RiDeleteBin6Line
                            className="eyeBtn text-danger mx-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                setSelectedQuotationId(row?.id);
                                setShowDeleteModal(true);
                            }}
                        />
                    </Permission>
                </div>
            ),
        },
    ];



    const dropdownItems = useMemo(() => {

        const statuses = [
            ...new Set(
                quotations.map(item => item.status)
            ),
        ];

        return [
            {
                label: "All Status",
                onClick: () => setSelectedStatus("All Status"),
            },
            ...statuses.map(status => ({
                label: status,
                onClick: () => setSelectedStatus(status),
            })),
        ];

    }, [quotations]);

    const filteredData = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return quotations.filter((quotation) => {
            const matchesSearch =
                !query ||
                [
                    quotation?.quotationNo,
                    quotation?.customer,
                ]
                    .filter(Boolean)
                    .some((value) =>
                        String(value).toLowerCase().includes(query)
                    );

            const matchesStatus =
                selectedStatus === "All Status" ||
                quotation?.status === selectedStatus;

            return matchesSearch && matchesStatus;
        });
    }, [
        quotations,
        searchQuery,
        selectedStatus,
    ]);

    const handleDelete = () => {
        if (!selectedQuotationId) return;

        deleteQuotation(selectedQuotationId);

        setQuotations(getQuotations());

        setSelectedQuotationId(null);
        setShowDeleteModal(false);
    };

    return (
        <>
            <PageBanner title="Quotations" />
            <PageSearch
                showAddButton={true}
                addButtonText="Create quotation"
                searchPlaceholder="Search quotation no or customer..."
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}

                onImportClick={() => {
                    console.log("Import clicked");
                }}

                onExportClick={() => {
                    console.log("Export clicked");
                }}

                onAddClick={() => {
                    router.push("/admin/quotations/add");
                }}
            />

            <div className="bg-box mb-32">
                <DataTable
                    title="All Quotations"
                    columns={QuotationColumns}
                    data={filteredData}
                    showViewAll={false}
                    showDropdown={true}
                    dropdownTitle={selectedStatus}
                    dropdownItems={dropdownItems}
                />

                <DeleteModal
                    show={showDeleteModal}
                    onClose={() => {
                        setShowDeleteModal(false);
                        setSelectedQuotationId(null);
                    }}
                    onConfirm={handleDelete}
                    title="Delete Quotation"
                    message="Are you sure you want to delete this quotation?"
                />
            </div>

        </>
    );
};


export default ListPage;