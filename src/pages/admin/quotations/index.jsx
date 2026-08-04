import PageBanner from "@/components/common/PageBanner";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";
import { useMemo, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { useRouter } from "next/router";

const ListPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const router = useRouter();

  const QuotationColumns = [
    { key: "quotation", label: "Quotation" },
    { key: "customer", label: "Customer" },
    { key: "products", label: "Products" },
    { key: "amount", label: "Amount" },
    { key: "vat", label: "VAT 5%" },
    {
      key: "total",
      label: "Total",
      render: (row) => (
        <span
          style={{
            color: getScoreColor(row.total),
            fontWeight: 500,
          }}
        >
          {row.total}
        </span>
      ),
    },
    { key: "valid", label: "Valid until" },
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
      label: "ACTION",
      render: (row) => (
        <div className="text-center">
          <FaRegEye
            className="eyeBtn mx-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              console.log(row.id);
              router.push(`/admin/quotations/view/${row.id}`);
            }}
          />

          <RiEdit2Fill
            className="eyeBtn mx-2"
            style={{ cursor: "pointer" }}
          />

          <RiDeleteBin6Line
            className="eyeBtn text-danger mx-2"
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];



  const QuotationData = [
    {
      id: 1,
      quotation: "#QT-2026-0189",
      customer: "Falcon Group LLC",
      products: "CRM Enterprise (1 yr)",
      amount: "$42,000",
      vat: "$2,100",
      total: "$44,100",
      valid: "30 Jun 2026",
      status: "Sent",
    },
    {
      id: 2,
      quotation: "#QT-2026-0188",
      customer: "TechVentures UAE",
      products: "HR + Finance Modules",
      amount: "$28,500",
      vat: "$1,425",
      total: "$29,925",
      valid: "25 Jun 2026",
      status: "Approved",
    },
    {
      id: 3,
      quotation: "#QT-2026-0187",
      customer: "ABC Industries",
      products: "Inventory Module (Basic)",
      amount: "$12,000",
      vat: "$600",
      total: "$12,600",
      valid: "15 Jul 2026",
      status: "Draft",
    },
    {
      id: 4,
      quotation: "#QT-2026-0186",
      customer: "Gulf Solutions Co.",
      products: "Full ERP Suite",
      amount: "$95,000",
      vat: "$4,750",
      total: "$99,750",
      valid: "20 Jun 2026",
      status: "In review",
    },

  ];

  const statusColors = {
    "Sent": "#26215C",
    "Approved": "#04342C",
    "Draft": "#0C447C",
    "In review": "#4A1B0C",
  };

  const dropdownItems = useMemo(() => {
    const statuses = [...new Set(QuotationData.map((lead) => lead.status))];

    return [
      {
        label: "All Status",
        onClick: () => setSelectedStatus("All Status"),
      },
      ...statuses.map((status) => ({
        label: status,
        onClick: () => setSelectedStatus(status),
      })),
    ];
  }, []);

  const filteredData = useMemo(() => {
    if (selectedStatus === "All Status") {
      return QuotationData;
    }

    return QuotationData.filter(
      (lead) => lead.status === selectedStatus
    );
  }, [selectedStatus]);



  const getScoreColor = (score) => {
    // if (score < 50) return "#E24B4A";      // Red
    // if (score <= 75) return "#EF9F27";     // Orange (50-75)
    return "#1D9E75";                      // Green (>75)
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