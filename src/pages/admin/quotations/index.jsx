import PageBanner from "@/components/common/PageBanner";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";
import { useEffect, useMemo, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { useRouter } from "next/router";

import {
    initializeQuotations,
    getQuotations,
    deleteQuotation,
} from "@/utils/quotationStorage";

const ListPage = () => {

  const [selectedStatus, setSelectedStatus] = useState("All Status");
const [quotations, setQuotations] = useState([]);

useEffect(() => {
    initializeQuotations();

    setQuotations(getQuotations());
}, []);

  const router = useRouter();

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
            <span
                style={{
                    color: statusColors[row.status] || "#222",
                    fontWeight: 500,
                }}
            >
                {row.status}
            </span>
        ),
    },
    {
        key: "action",
        label: "Action",
        render: (row) => (
            <div className="text-center">

                <FaRegEye
                    className="eyeBtn mx-2"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                        router.push(`/admin/quotations/view/${row.id}`)
                    }
                />

                <RiEdit2Fill
                    className="eyeBtn mx-2"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                        router.push(`/admin/quotations/edit/${row.id}`)
                    }
                />

                <RiDeleteBin6Line
                    className="eyeBtn text-danger mx-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(row.id)}
                />

            </div>
        ),
    },
];

  const statusColors = {
    "Pending Approval": "#E0A83C",
    "Sent": "#26215C",
    "Approved": "#04342C",
    "Draft": "#0C447C",
    "In review": "#4A1B0C",
  };

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

    if (selectedStatus === "All Status") {
        return quotations;
    }

    return quotations.filter(
        item => item.status === selectedStatus
    );

}, [quotations, selectedStatus]);

const handleDelete = (id) => {

    if (!confirm("Delete this quotation?")) return;

    deleteQuotation(id);

    setQuotations(getQuotations());

};

  return (
    <>
      <PageBanner title="Quotations" />
      <PageSearch
        // showImport={true}
        // showExport={true}
        showAddButton={true}
        addButtonText="Create quotation"

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
      </div>

    </>
  );
};


export default ListPage;