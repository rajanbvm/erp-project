import PageBanner from "@/components/common/PageBanner";
import Image from "next/image";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";
import { useMemo, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import ActIcon1 from "@/images/ActIcon1.svg";
import ActIcon2 from "@/images/ActIcon2.svg";
import ActIcon3 from "@/images/ActIcon3.svg";
import opp4 from "@/images/opp4.svg";
import opp5 from "@/images/opp5.svg";

const ListPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("All Status");

const dueColors = {
  today: "#1D9E75",
  overdue: "#FF4D4F",
  tomorrow: "#1D9E75",
};

const ActivitiesColumns = [
  {
    key: "type",
    label: "TYPE",
  },
  {
    key: "title",
    label: "TITLE",
  },
  {
    key: "relatedTo",
    label: "RELATED TO",
  },
  {
    key: "due",
    label: "DUE",
    render: (row) => (
      <span style={{ color: dueColors[row.dueType] }}>
        {row.due}
      </span>
    ),
  },
  {
    key: "assignee",
    label: "ASSIGNEE",
  },
  {
    key: "status",
    label: "STATUS",
    render: (row) => (
      <span
        style={{
          color: statusColors[row.status],
          fontWeight: 600,
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
      <div className="d-flex align-items-center justify-content-center gap-3">
        <FaRegEye className="eyeBtn" />
        <RiEdit2Fill className="eyeBtn" />
        <RiDeleteBin6Line className="eyeBtn text-danger" />

        <button
          className={`activity-btn ${
            row.button === "Done"
              ? "done"
              : row.button === "Mark done"
              ? "mark-done"
              : "send-now"
          }`}
        >
          {row.button}
        </button>
      </div>
    ),
  },
];

const ActivitiesData = [
  {
    type: "Call",
    title: "Follow-up – budget discussion",
    relatedTo: "Falcon Group LLC",
    due: "Today 2:00 PM",
    dueType: "today",
    assignee: "John Doe",
    status: "Scheduled",
    button: "Done",
  },
  {
    type: "Meeting",
    title: "Product demo – CRM Enterprise",
    relatedTo: "TechVentures UAE",
    due: "Overdue · 28 Jun",
    dueType: "overdue",
    assignee: "Sarah Wilson",
    status: "Scheduled",
    button: "Done",
  },
  {
    type: "Task",
    title: "Prepare proposal for Gulf Solutions",
    relatedTo: "Gulf Solutions Co.",
    due: "Today 2:00 PM",
    dueType: "today",
    assignee: "Mike Johnson",
    status: "Overdue",
    button: "Mark done",
  },
  {
    type: "Email",
    title: "Send pricing proposal",
    relatedTo: "ABC Industries",
    due: "Today 4:30 PM",
    dueType: "today",
    assignee: "John Doe",
    status: "Pending",
    button: "Send now",
  },
  {
    type: "Task",
    title: "Prepare proposal for Gulf Solutions",
    relatedTo: "Falcon Group LLC",
    due: "Overdue · 28 Jun",
    dueType: "overdue",
    assignee: "Sarah Wilson",
    status: "Scheduled",
    button: "Done",
  },
  {
    type: "Call",
    title: "Follow-up – budget discussion",
    relatedTo: "TechVentures UAE",
    due: "Today 2:00 PM",
    dueType: "today",
    assignee: "Mike Johnson",
    status: "Overdue",
    button: "Mark done",
  },
  {
    type: "Meeting",
    title: "Product demo – CRM Enterprise",
    relatedTo: "Gulf Solutions Co.",
    due: "Tomorrow",
    dueType: "tomorrow",
    assignee: "John Doe",
    status: "Pending",
    button: "Send now",
  },
];

  const statusColors = {
    "Scheduled": "#0C447C",
    "Overdue": "#791F1F",
    "Pending": "#412402",
  };

  const dropdownItems = useMemo(() => {
    const statuses = [...new Set(ActivitiesData.map((item) => item.status))];

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
      return ActivitiesData;
    }

    return ActivitiesData.filter(
      (item) => item.status === selectedStatus
    );
  }, [selectedStatus]);


  const OpportunitiesCards = [
    {
      id: 1,
      image: ActIcon1,
      title: "Today",
      value: "$4.2M",
    },
    {
      id: 2,
      image: ActIcon2,
      title: "Overdue",
      value: "87",
    },
    {
      id: 3,
      image: ActIcon3,
      title: "Done today",
      value: "23",
    },

  ];

  

  return (
    <>
      <PageBanner title="Opportunities" />

      <div className="row opp-row mb-32">
        {OpportunitiesCards.map((card) => (
          <div key={card.id} className="col-lg-4 col-md-6">
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
        addButtonText="Add Activity"

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
          title="All Activities"
          columns={ActivitiesColumns}
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