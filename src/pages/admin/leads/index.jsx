import PageBanner from "@/components/common/PageBanner";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";
import { useMemo, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";

const ListPage = () => {
const [selectedStatus, setSelectedStatus] = useState("All Status");
   const LeadsColumns = [
    { key: "lead", label: "LEAD" },
    { key: "email", label: "Email" },
    { key: "company", label: "COMPANY" },
    { key: "source", label: "SOURCE" },
    {
      key: "score",
      label: "SCORE",
      render: (row) => (
        <span
          style={{
            color: getScoreColor(row.score),
            fontWeight: 500,
          }}
        >
          {row.score}
        </span>
      ),
    },
    { key: "owner", label: "OWNER" },
    { key: "created", label: "Created" },
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
      render: () => (
        <>
          <FaRegEye className="eyeBtn mx-2" />
          <RiEdit2Fill className="eyeBtn mx-2" />
          <RiDeleteBin6Line className="eyeBtn text-danger mx-2" />
        </>
      ),
    },
  ];



  const LeadsData = [
    {
      lead: "Ahmed Hassan",
      email: "ahmed@falcon.ae",
      company: "Falcon Group LLC",
      source: "Google Ads",
      score: 95,
      owner: "John Doe",
      created: "10 Jun 2026",
      status: "Qualified",
    },
    {
      lead: "Sara Mehta",
      email: "sara@techventures.com",
      company: "ABC Ltd",
      source: "Website",
      score: 72,
      owner: "Sarah Wilson",
      created: "11 Jun 2026",
      status: "Proposal sent",
    },
    {
      lead: "Ravi Kumar",
      email: "ravi@abc-ind.com",
      company: "XYZ",
      source: "Facebook",
      score: 40,
      owner: "Mike Johnson",
      created: "12 Jun 2026",
      status: "Contacted",
    },
  ];

    const statusColors = {
    "Qualified": "#173404",
    "Proposal sent": "#26215C",
    "Contacted": "#412402",
    "New": "#0C447C",
    "Negotiation": "#4A1B0C",
    "Won": "#04342C",
  };

 const dropdownItems = useMemo(() => {
  const statuses = [...new Set(LeadsData.map((lead) => lead.status))];

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
      return LeadsData;
    }

    return LeadsData.filter(
      (lead) => lead.status === selectedStatus
    );
  }, [selectedStatus]);



  const getScoreColor = (score) => {
    if (score < 50) return "#E24B4A";      // Red
    if (score <= 75) return "#EF9F27";     // Orange (50-75)
    return "#1D9E75";                      // Green (>75)
  };

 

  return (
    <>
      <PageBanner title="Leads" />
      <PageSearch
        showImport={true}
        showExport={true}
        showAddButton={true}
        addButtonText="Add New Lead"

        onImportClick={() => {
          console.log("Import clicked");
        }}

        onExportClick={() => {
          console.log("Export clicked");
        }}

        onAddClick={() => {
          console.log("Add clicked");
        }}
      />

      <div className="bg-box mb-32">
        <DataTable
          title="All Leads"
          columns={LeadsColumns}
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