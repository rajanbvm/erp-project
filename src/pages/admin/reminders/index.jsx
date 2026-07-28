import PageBanner from "@/components/common/PageBanner";
import Image from "next/image";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";
import { useMemo, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import DashIcon1 from "@/images/DashIcon1.png";
import DashIcon2 from "@/images/DashIcon2.png";
import DashIcon3 from "@/images/DashIcon3.png";
import DashIcon4 from "@/images/DashIcon4.png";

const ListPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("All Status");

const dueColors = {
  today: "#1D9E75",
  overdue: "#FF4D4F",
  tomorrow: "#1D9E75",
};

const reminderColumns = [
  {
    key: "reminder",
    label: "REMINDER",
  },
  {
    key: "contact",
    label: "CONTACT",
  },
  {
    key: "type",
    label: "TYPE",
  },
  {
    key: "dueDate",
    label: "DUE DATE",
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
      </div>
    ),
  },
];

const reminderData = [
  {
    reminder: "Call reminder",
    contact: "Rahul Sharma",
    type: "Email",
    dueDate: "Jul 8, 9:00 AM",
    status: "Sent",
  },
  {
    reminder: "Meeting reminder",
    contact: "Priya Mehta",
    type: "SMS",
    dueDate: "Jul 7, 9:00 AM",
    status: "Pending",
  },
  {
    reminder: "Follow-up overdue",
    contact: "Deepak Malhotra",
    type: "Push + Email",
    dueDate: "Jul 6, 9:00 AM",
    status: "Overdue",
  },
  {
    reminder: "Quotation expiry",
    contact: "Arjun Verma",
    type: "Push",
    dueDate: "Jul 5, 9:00 AM",
    status: "Pending",
  },
];
const reminderSettings = [
  {
    id: 1,
    title: "Email Reminders",
    enabled: true,
  },
  {
    id: 2,
    title: "SMS Reminders",
    enabled: false,
  },
  {
    id: 3,
    title: "Push Notifications",
    enabled: true,
  },
  {
    id: 4,
    title: "In-App Alerts",
    enabled: false,
  },
];

  const statusColors = {
    "Scheduled": "#0C447C",
    "Overdue": "#791F1F",
    "Pending": "#412402",
  };

  const dropdownItems = useMemo(() => {
    const statuses = [...new Set(reminderData.map((item) => item.status))];

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
      return reminderData;
    }

    return reminderData.filter(
      (item) => item.status === selectedStatus
    );
  }, [selectedStatus]);


  const RemindersCards = [
    {
      id: 1,
      image: DashIcon1,
      title: "Active Reminders",
      value: "42",
      text: "Across all channels",
    },
    {
      id: 2,
      image: DashIcon2,
      title: "Overdue",
      value: "5",
      text: "Need immediate attention",
    },
    {
      id: 3,
      image: DashIcon3,
      title: "Sent Today",
      value: "18",
      text: "Email: 9 · SMS: 4 · Push: 5",
    },
{
      id: 4,
      image: DashIcon4,
      title: "Delivery Rate",
      value: "98.4%",
      text: "Last 30 days",
    },
  ];

  

  return (
    <>
      <PageBanner title="Reminders" />

      <div className="row opp-row mb-32">
        {RemindersCards.map((card) => (
          <div key={card.id} className="col-lg-3 col-md-6">
            <div className="overview-card">
              <Image src={card.image} alt={card.title} />
              <p>{card.title}</p>
              <h3 className="mb-0">{card.value}</h3>
              <span className="growth-text">
                    {card.text}
                  </span>
            </div>
          </div>
        ))}
      </div>

      <PageSearch
        // showImport={true}
        // showExport={true}
        showAddButton={true}
        addButtonText="New Reminder"

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

      <div className="row mb-32">
  {reminderSettings.map((item) => (
    <div className="col-lg-6 mb-3" key={item.id}>
      <div className="reminder-setting">
        <h5>{item.title}</h5>

        <div className="reminder-switch">
          <span className={"text-muted me-2"}>
            Disabled
          </span>

          <div className="form-check form-switch m-0">
            <input
              className="form-check-input"
              type="checkbox"
              defaultChecked={item.enabled}
            />
          </div>

          <span className={"text-muted"}>
            Enabled
          </span>
        </div>
      </div>
    </div>
  ))}
</div>

      <div className="bg-box mb-32">
        <DataTable
          title="Active Reminders"
          columns={reminderColumns}
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