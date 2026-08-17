import PageBanner from "@/components/common/PageBanner";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";
import { useEffect, useMemo, useState } from "react";
import DeleteModal from "@/components/common/DeleteModal";
import {
  initializeLeads,
  getLeads,
  deleteLead,
} from "@/utils/leadsStorage";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { useRouter } from "next/router";



const ListPage = () => {

  const [leadsData, setLeadsData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  const router = useRouter();

  const loadLeads = () => {
    initializeLeads();

    const data = getLeads();

    setLeadsData(data);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleDelete = (id) => {
    setSelectedLeadId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedLeadId) return;

    deleteLead(selectedLeadId);

    loadLeads();

    setShowDeleteModal(false);
    setSelectedLeadId(null);
  };

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
            color: getScoreColor(row?.score),
            fontWeight: 500,
          }}
        >
          {row?.score}
        </span>
      ),
    },
    { key: "owner", label: "OWNER" },
    {
      key: "created", label: "Created",
      render: (row) => (
        <span
          style={{
            minWidth: "100px",
            // fontWeight: 500,
          }}
        >
          {row?.created}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          style={{
            color: statusColors[row?.status] || "#222",
            fontWeight: 500,
          }}
        >
          {row?.status}
        </span>
      ),
    },

    {
      key: "action",
      label: "ACTION",
      render: (row) => (
        <div className="table-actions">
          <FaRegEye className="eyeBtn mx-2"
            onClick={() => {
              router.push(`/admin/leads/view/${row?.id}`);
            }} />
          <RiEdit2Fill
            className="eyeBtn mx-2"
            style={{ cursor: "pointer" }}
            onClick={() => router.push(`/admin/leads/edit/${row?.id}`)}
          />
          <RiDeleteBin6Line
            className="eyeBtn text-danger mx-2"
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(row?.id)}
          />
        </div>
      ),
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
    const statuses = [...new Set(leadsData?.map((lead) => lead.status))];

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
  }, [leadsData]);

  const filteredData = useMemo(() => {
    if (selectedStatus === "All Status") {
      return leadsData;
    }

    return leadsData?.filter(
      (lead) => lead.status === selectedStatus
    );
  }, [selectedStatus, leadsData]);



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
          router.push("/admin/leads/add");
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

        <DeleteModal
          show={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedLeadId(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Lead"
          message="Are you sure you want to delete this lead?"
        />
      </div>

    </>
  );
};


export default ListPage;