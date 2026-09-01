import PageBanner from "@/components/common/PageBanner";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";

import { useMemo, useState } from "react";

import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";

const ListPage = () => {
  const [selectedPriority, setSelectedPriority] =
    useState("All priorities");

  const priorityColors = {
    Critical: "#C53030",
    High: "#8A5A00",
    Medium: "#2F6B1E",
    Low: "#4B7A17",
  };

  const dueColors = {
    today: "#FF4D4F",
    tomorrow: "#333333",
    normal: "#333333",
  };

  const statusColors = {
    "In progress": "#0C447C",
    Pending: "#5A3900",
    Completed: "#0F5A45",
  };

  const statusClasses = {
    "Qualified": "badge-qualified",
    "Proposal sent": "badge-proposal",
    "Contacted": "badge-contacted",
    "New": "badge-new",
    "Negotiation": "badge-negotiation",
    "Won": "badge-won",
  };

    const getStatusClass = (status) => {
    return statusClasses[status] || "badge-default";
  };

  const TaskColumns = [
    {
      key: "checkbox",
      label: (
        <input
          type="checkbox"
          className="form-check-input"
        />
      ),
      render: (row) => (
        <input
          type="checkbox"
          checked={row?.completed}
          readOnly
          className="form-check-input"
        />
      ),
    },

    {
      key: "task",
      label: "TASK",
      render: (row) => (
        <span
          style={{
            textDecoration: row?.completed
              ? "line-through"
              : "none",
            color: "#2C2C2C",
          }}
        >
          {row?.task}
        </span>
      ),
    },

    {
      key: "relatedTo",
      label: "RELATED TO",
    },

    {
      key: "priority",
      label: "PRIORITY",
      render: (row) => (
        <span
          style={{
            color: priorityColors[row?.priority],
            fontWeight: 500,
          }}
        >
          {row?.priority}
        </span>
      ),
    },

    {
      key: "due",
      label: "DUE",
      render: (row) => (
        <span
          style={{
            color: dueColors[row?.dueType],
          }}
        >
          {row?.due}
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
            color: statusColors[row?.status],
            fontWeight: 600,
          }}
        >
          {row?.status}
        </span>
      ),
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

  const TasksData = [
    {
      completed: false,
      task: "Prepare ERP proposal for Falcon Group",
      relatedTo: "Falcon Group LLC",
      priority: "Critical",
      due: "Today",
      dueType: "today",
      assignee: "John Doe",
      status: "In progress",
    },
    {
      completed: false,
      task: "Send pricing catalog to TechVentures",
      relatedTo: "TechVentures UAE",
      priority: "High",
      due: "Tomorrow",
      dueType: "tomorrow",
      assignee: "Sarah Wilson",
      status: "In progress",
    },
    {
      completed: false,
      task: "Verify customer documents — ABC Industries",
      relatedTo: "ABC Industries",
      priority: "Medium",
      due: "29 Jun 2026",
      dueType: "normal",
      assignee: "Mike Johnson",
      status: "Pending",
    },
    {
      completed: false,
      task: "Schedule demo with Gulf Solutions",
      relatedTo: "Gulf Solutions Co.",
      priority: "Low",
      due: "25 Jun 2026",
      dueType: "normal",
      assignee: "John Doe",
      status: "Pending",
    },
    {
      completed: false,
      task: "Prepare ERP proposal for Falcon Group",
      relatedTo: "Falcon Group LLC",
      priority: "Critical",
      due: "24 Jun 2026",
      dueType: "normal",
      assignee: "Sarah Wilson",
      status: "In progress",
    },
    {
      completed: true,
      task: "Send pricing catalog to TechVentures",
      relatedTo: "TechVentures UAE",
      priority: "High",
      due: "23 Jun 2026",
      dueType: "normal",
      assignee: "Mike Johnson",
      status: "Completed",
    },
    {
      completed: true,
      task: "Prepare ERP proposal for Falcon Group",
      relatedTo: "ABC Industries",
      priority: "Medium",
      due: "21 Jun 2026",
      dueType: "normal",
      assignee: "John Doe",
      status: "Completed",
    },
  ];

    const dropdownItems = useMemo(() => {
    const priorities = [...new Set(TasksData.map((item) => item.priority))];

    return [
      {
        label: "All priorities",
        onClick: () => setSelectedPriority("All priorities"),
      },
      ...priorities.map((priority) => ({
        label: priority,
        onClick: () => setSelectedPriority(priority),
      })),
    ];
  }, []);

  const filteredData = useMemo(() => {
    if (selectedPriority === "All priorities") {
      return TasksData;
    }

    return TasksData.filter(
      (item) => item.priority === selectedPriority
    );
  }, [selectedPriority]);

  return (
    <>
      <PageBanner title="Tasks" />

      <PageSearch
        showExport={true}
        showAddButton={true}
        addButtonText="Create task"
        searchPlaceholder="Search"
        onExportClick={() => console.log("Export")}
        onAddClick={() => console.log("Create Task")}
        onSearchChange={(e) => console.log(e.target.value)}
      />

      <div className="bg-box mb-32">
        <DataTable
          title="Task"
          columns={TaskColumns}
          data={filteredData}
          showViewAll={false}
          showDropdown={true}
          dropdownTitle={selectedPriority}
          dropdownItems={dropdownItems}
        />
      </div>
    </>
  );
};

export default ListPage;