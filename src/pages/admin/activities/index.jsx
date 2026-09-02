import PageBanner from "@/components/common/PageBanner";
import Image from "next/image";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";
import { useEffect, useMemo, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import ActIcon1 from "@/images/ActIcon1.svg";
import ActIcon2 from "@/images/ActIcon2.svg";
import ActIcon3 from "@/images/ActIcon3.svg";
import { useRouter } from "next/router";
import DeleteModal from "@/components/common/DeleteModal";

import {
  initializeActivities,
  getActivities,
  deleteActivity,
} from "@/utils/activitiesStorage";

import {
  initializeCompanies,
  getCompanies,
} from "@/utils/companiesStorage";

const ListPage = () => {

  const [activities, setActivities] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState(null);

  const handleDelete = (id) => {
    setSelectedActivityId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedActivityId) return;

    deleteActivity(selectedActivityId);

    setActivities(getActivities());

    setShowDeleteModal(false);
    setSelectedActivityId(null);
  };

  useEffect(() => {
    initializeActivities();
    initializeCompanies();

    setActivities(getActivities() || []);
    setCompanies(getCompanies() || []);
  }, []);

  const activitiesData = useMemo(() => {
    return activities.map((activity) => {
      const company = companies.find(
        (item) => item?.id === activity?.relatedTo
      );

      return {
        ...activity,
        title: activity?.taskTitle,
        relatedTo: company?.company || "-",
      };
    });
  }, [activities, companies]);

  const router = useRouter();

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
      key: "dueDate",
      label: "DUE",
      render: (row) => (
        <span style={{ color: dueColors[row?.dueType] }}>
          {row?.dueDate}
        </span>
      ),
    },
    {
      key: "assignee",
      label: "ASSIGNEE",
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
      render: (row) => (
        <div className="table-actions">
          <FaRegEye
            className="eyeBtn mx-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push(`/admin/activities/view/${row?.id}`);
            }}
          />

          <RiEdit2Fill
            className="eyeBtn mx-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push(`/admin/activities/edit/${row?.id}`);
            }}
          />

          <RiDeleteBin6Line
            className="eyeBtn mx-2 text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(row?.id)}
          />

          {/* <button
            className={`activity-btn ${row?.button === "Done"
                ? "done"
                : row?.button === "Mark done"
                  ? "mark-done"
                  : "send-now"
              }`}
          >
            {row?.button}
          </button> */}
        </div>
      ),
    },
  ];


  const statusClasses = {
    "Scheduled": "badge-new",
    "Overdue": "badge-overdue",
    "Pending": "badge-contacted",
    "Completed": "badge-won",
  };

  const getStatusClass = (status) => {
    return statusClasses[status] || "badge-default";
  };

  const dropdownItems = useMemo(() => {
    const statuses = [
      ...new Set(
        activitiesData
          .map((item) => item?.status)
          .filter(Boolean)
      ),
    ];

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
  }, [activitiesData]);

  const filteredData = useMemo(() => {
    if (selectedStatus === "All Status") {
      return activitiesData;
    }

    return activitiesData.filter(
      (item) => item.status === selectedStatus
    );
  }, [selectedStatus, activitiesData]);


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
      <PageBanner title="Activities" />

      {/* <div className="row opp-row mb-32">
        {OpportunitiesCards.map((card) => (
          <div key={card.id} className="col-lg-4 col-md-6">
            <div className="overview-card">
              <Image src={card.image} alt={card.title} />
              <p>{card.title}</p>
              <h3 className="mb-0">{card.value}</h3>
            </div>
          </div>
        ))}
      </div> */}

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
          router.push("/admin/activities/add");
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

        <DeleteModal
          show={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedActivityId(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Activity"
          message="Are you sure you want to delete this activity?"
        />
      </div>

    </>
  );
};


export default ListPage;