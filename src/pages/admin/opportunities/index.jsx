import PageBanner from "@/components/common/PageBanner";
import Image from "next/image";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";
import { useMemo, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import opp1 from "@/images/opp1.svg";
import opp2 from "@/images/opp2.svg";
import opp3 from "@/images/opp3.svg";
import opp4 from "@/images/opp4.svg";
import opp5 from "@/images/opp5.svg";
import { useRouter } from "next/router";

const ListPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("All Status");

const router = useRouter();

  const OpportunitiesColumns = [
    { key: "opportunity", label: "Opportunity" },
    { key: "company", label: "COMPANY" },
    { key: "owner", label: "Owner" },
    {
      key: "stage",
      label: "Stage",
      render: (row) => (
        <span
          style={{
            color: statusColors[row?.stage] || "#222",
            fontWeight: 500,
          }}
        >
          {row?.stage}
        </span>
      ),
    },
    { key: "value", label: "Value",
      render: (row) => (
        <span
          style={{
            color:"#1D9E75",
            // fontWeight: 500,
          }}
        >
          {row?.value}
        </span>
      ),
     },
    { key: "probability", label: "Probability" },
    { key: "closedate", label: "Close date" },


    {
      key: "action",
      label: "ACTION",
      render: () => (
        <div className="text-center">
          <FaRegEye className="eyeBtn mx-2" />
          <RiEdit2Fill className="eyeBtn mx-2" />
          <RiDeleteBin6Line className="eyeBtn text-danger mx-2" />
        </div>
      ),
    },
  ];



  const OpportunitiesData = [
    {
      opportunity: "Falcon ERP Setup",
      company: "Falcon Group LLC",
      owner: "John Doe",
      stage: "Qualification",
      value: "$45,000",
      probability:"20%",
      closedate:"15 Jul 2026",
    },
     {
      opportunity: "HR Software Package",
      company: "Falcon Group LLC",
      owner: "John Doe",
      stage: "Proposal sent",
      value: "$45,000",
      probability:"20%",
      closedate:"15 Jul 2026",
    },
     {
      opportunity: "Full ERP Package",
      company: "Falcon Group LLC",
      owner: "John Doe",
      stage: "Negotiation",
      value: "$45,000",
      probability:"20%",
      closedate:"15 Jul 2026",
    },
     {
      opportunity: "CRM Starter",
      company: "Falcon Group LLC",
      owner: "John Doe",
      stage: "Won",
      value: "$45,000",
      probability:"20%",
      closedate:"15 Jul 2026",
    },
    
  ];

  const statusColors = {
    "Qualification": "#0C447C",
    "Proposal sent": "#26215C",
    "Negotiation": "#4A1B0C",
    "Won": "#04342C",
    "Lost": "#501313",
  };

  const dropdownItems = useMemo(() => {
    const statuses = [...new Set(OpportunitiesData.map((lead) => lead.stage))];

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
      return OpportunitiesData;
    }

    return OpportunitiesData.filter(
      (lead) => lead.status === selectedStatus
    );
  }, [selectedStatus]);


  const OpportunitiesCards = [
    {
      id: 1,
      image: opp1,
      title: "Pipeline value",
      value: "$4.2M",
    },
    {
      id: 2,
      image: opp2,
      title: "Open deals",
      value: "87",
    },
    {
      id: 3,
      image: opp3,
      title: "Won (month)",
      value: "23",
    },
    {
      id: 4,
      image: opp4,
      title: "Lost",
      value: "8",
    },
    {
      id: 4,
      image: opp5,
      title: "Win rate",
      value: "74%",
    },
  ];

  return (
    <>
      <PageBanner title="Opportunities" />

      <div className="row opp-row mb-32">
        {OpportunitiesCards.map((card) => (
          <div key={card.id} className="col-lg col-md-6">
            <div className="overview-card">
              <Image src={card.image} alt={card.title} />
              <p>{card.title}</p>
              <h3 className="mb-0">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <PageSearch
        // showImport={true}
        // showExport={true}
        showAddButton={true}
        addButtonText="Add Opportunity"

        onImportClick={() => {
          console.log("Import clicked");
        }}

        onExportClick={() => {
          console.log("Export clicked");
        }}

        onAddClick={() => {
    router.push("/admin/opportunities/add");
  }}
      />

      <div className="bg-box mb-32">
        <DataTable
          title="All Opportunities"
          columns={OpportunitiesColumns}
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