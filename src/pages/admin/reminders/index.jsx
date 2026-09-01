import PageBanner from "@/components/common/PageBanner";
import Image from "next/image";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";
import { useEffect, useMemo, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import DashIcon1 from "@/images/DashIcon1.png";
import DashIcon2 from "@/images/DashIcon2.png";
import DashIcon3 from "@/images/DashIcon3.png";
import DashIcon4 from "@/images/DashIcon4.png";
import { useRouter } from "next/router";
import {
    notifyReminderOverdue,
} from "@/utils/notificationsStorage";

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

  const router = useRouter();

  const [selectedStatus, setSelectedStatus] =
    useState("All Status");

  const [activities, setActivities] = useState([]);

  const [companies, setCompanies] = useState([]);

  /*
  |--------------------------------------------------------------------------
  | Status Colors
  |--------------------------------------------------------------------------
  */

   const statusClasses = {
    "Scheduled": "badge-new",
    "Overdue": "badge-overdue",
    "Pending": "badge-contacted",
    "Completed": "badge-won",
  };

    const getStatusClass = (status) => {
        return statusClasses[status] || "badge-default";
    };
  /*
  |--------------------------------------------------------------------------
  | Load Activities
  |--------------------------------------------------------------------------
  */

 const loadActivities = () => {

    initializeActivities();

    const activityList = getActivities() || [];

    setActivities(activityList);

    activityList.forEach((activity) => {

        const status = getReminderStatus(activity);

        if (status !== "Overdue") {
            return;
        }

        notifyReminderOverdue(
            activity?.taskTitle || "Untitled Activity",
            activity?.id
        );
    });
};

  /*
  |--------------------------------------------------------------------------
  | Load Companies
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    initializeCompanies();

    const companyList = getCompanies();

    setCompanies(companyList || []);

  }, []);

  /*
  |--------------------------------------------------------------------------
  | Load Activities
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    loadActivities();

  }, []);

  /*
  |--------------------------------------------------------------------------
  | Company Name
  |--------------------------------------------------------------------------
  */

  const getCompanyName = (companyId) => {

    const company = companies.find(
      (item) => item?.id === companyId
    );

    return company?.company || "-";

  };

  /*
  |--------------------------------------------------------------------------
  | Get Reminder Date
  |--------------------------------------------------------------------------
  */

  const getReminderDate = (activity) => {

    if (!activity?.dueDate) {
      return null;
    }

    return new Date(
      `${activity?.dueDate}T${activity?.dueTime || "00:00"}`
    );

  };

  /*
  |--------------------------------------------------------------------------
  | Get Reminder Status
  |--------------------------------------------------------------------------
  */

  const getReminderStatus = (activity) => {

    /*
    | If activity is already completed
    */

    if (activity?.status === "Completed") {
      return "Completed";
    }

    /*
    | If activity is cancelled
    */

    if (activity?.status === "Cancelled") {
      return "Cancelled";
    }

    const reminderDate =
      getReminderDate(activity);

    if (!reminderDate) {
      return "Pending";
    }

    const now = new Date();

    if (reminderDate < now) {
      return "Overdue";
    }

    return "Scheduled";

  };

  /*
  |--------------------------------------------------------------------------
  | Format Due Date
  |--------------------------------------------------------------------------
  */

  const formatDueDate = (activity) => {

    const reminderDate =
      getReminderDate(activity);

    if (!reminderDate) {
      return "-";
    }

    return reminderDate.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );

  };

  /*
  |--------------------------------------------------------------------------
  | Convert Activities Into Reminders
  |--------------------------------------------------------------------------
  */

  const reminderData = useMemo(() => {

    return activities
      .filter((activity) => {

        /*
        | Only activities with a date
        | can become reminders.
        */

        return Boolean(
          activity?.dueDate
        );

      })
      .map((activity) => {

        const status =
          getReminderStatus(activity);

        return {

          id: activity?.id,

          reminder:
            activity?.taskTitle || "Untitled Activity",

          contact:
            getCompanyName(
              activity?.relatedTo
            ),

          type:
            activity?.type || "-",

          dueDate:
            formatDueDate(activity),

          status,

          activity,
        };

      })
      .sort((a, b) => {

        const dateA =
          getReminderDate(a?.activity);

        const dateB =
          getReminderDate(b?.activity);

        return dateA - dateB;

      });

  }, [activities, companies]);

  /*
  |--------------------------------------------------------------------------
  | Reminder Columns
  |--------------------------------------------------------------------------
  */

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
            label: "Status",
            render: (row) => (
                <span className={`table-status ${getStatusClass(row?.status)}`}>
                    {row?.status}
                </span>
            ),
        },

    // {
    //   key: "action",
    //   label: "ACTION",

    //   render: (row) => (

    //     <div className="d-flex align-items-center justify-content-center gap-3">

    //       <FaRegEye
    //         className="eyeBtn"
    //         style={{
    //           cursor: "pointer",
    //         }}
    //         onClick={() => {

    //           router.push(
    //             `/admin/activities/view/${row?.id}`
    //           );

    //         }}
    //       />


    //       {/* <RiEdit2Fill
    //         className="eyeBtn"
    //         style={{
    //           cursor: "pointer",
    //         }}
    //         onClick={() => {

    //           router.push(
    //             `/admin/activities/edit/${row?.id}`
    //           );

    //         }}
    //       /> */}


    //       <RiDeleteBin6Line
    //         className="eyeBtn text-danger"
    //         style={{
    //           cursor: "pointer",
    //         }}
    //         onClick={() => {

    //           const confirmed =
    //             window.confirm(
    //               `Are you sure you want to delete "${row?.reminder}"?`
    //             );

    //           if (!confirmed) {
    //             return;
    //           }

    //           deleteActivity(row?.id);

    //           loadActivities();

    //         }}
    //       />

    //     </div>

    //   ),
    // },

  ];

  /*
  |--------------------------------------------------------------------------
  | Status Dropdown
  |--------------------------------------------------------------------------
  */

  const dropdownItems = useMemo(() => {

    const statuses = [
      ...new Set(
        reminderData.map(
          (item) => item?.status
        )
      ),
    ];

    return [

      {
        label: "All Status",

        onClick: () =>
          setSelectedStatus(
            "All Status"
          ),
      },

      ...statuses.map((status) => ({

        label: status,

        onClick: () =>
          setSelectedStatus(status),

      })),

    ];

  }, [reminderData]);

  /*
  |--------------------------------------------------------------------------
  | Filtered Data
  |--------------------------------------------------------------------------
  */

  const filteredData = useMemo(() => {

    if (
      selectedStatus === "All Status"
    ) {

      return reminderData;

    }

    return reminderData.filter(
      (item) =>
        item?.status === selectedStatus
    );

  }, [
    selectedStatus,
    reminderData,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Reminder Cards
  |--------------------------------------------------------------------------
  */

  const RemindersCards = [

    {
      id: 1,
      image: DashIcon1,
      title: "Active Reminders",
      value: reminderData.filter(
        (item) =>
          item?.status === "Scheduled"
      ).length,
      text: "Upcoming scheduled activities",
    },

    {
      id: 2,
      image: DashIcon2,
      title: "Overdue",
      value: reminderData.filter(
        (item) =>
          item?.status === "Overdue"
      ).length,
      text: "Need immediate attention",
    },

    {
      id: 3,
      image: DashIcon3,
      title: "Pending",
      value: reminderData.filter(
        (item) =>
          item?.status === "Pending"
      ).length,
      text: "Waiting for action",
    },

    {
      id: 4,
      image: DashIcon4,
      title: "Total Reminders",
      value: reminderData.length,
      text: "Based on scheduled activities",
    },

  ];

  /*
  |--------------------------------------------------------------------------
  | Reminder Settings
  |--------------------------------------------------------------------------
  */

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

    // {
    //   id: 3,
    //   title: "Push Notifications",
    //   enabled: true,
    // },

    // {
    //   id: 4,
    //   title: "In-App Alerts",
    //   enabled: false,
    // },

  ];

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (

    <>
      <PageBanner title="Reminders" />


      {/* =========================================================
          REMINDER CARDS
      ========================================================= */}

      {/*

      <div className="row opp-row mb-32">

        {RemindersCards.map((card) => (

          <div
            key={card.id}
            className="col-lg-3 col-md-6"
          >

            <div className="overview-card">

              <Image
                src={card.image}
                alt={card.title}
              />

              <p>
                {card.title}
              </p>

              <h3 className="mb-0">
                {card.value}
              </h3>

              <span className="growth-text">
                {card.text}
              </span>

            </div>

          </div>

        ))}

      </div>

      */}


      {/* =========================================================
          SEARCH / ADD
      ========================================================= */}

      <PageSearch

        showAddButton={false}

        addButtonText="New Reminder"

        onImportClick={() => {
          console.log(
            "Import clicked"
          );
        }}

        onExportClick={() => {
          console.log(
            "Export clicked"
          );
        }}

        onAddClick={() => {

          router.push(
            "/admin/reminders/add"
          );

        }}

      />


      {/* =========================================================
          REMINDER SETTINGS
      ========================================================= */}

      <div className="row mb-32">

        {reminderSettings.map(
          (item) => (

            <div
              className="col-lg-6 mb-3"
              key={item?.id}
            >

              <div className="reminder-setting">

                <h5>
                  {item?.title}
                </h5>

                <div className="reminder-switch">

                  <span className="text-muted me-2">
                    Disabled
                  </span>

                  <div className="form-check form-switch m-0">

                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultChecked={
                        item?.enabled
                      }
                    />

                  </div>

                  <span className="text-muted">
                    Enabled
                  </span>

                </div>

              </div>

            </div>

          )
        )}

      </div>


      {/* =========================================================
          ACTIVE REMINDERS
      ========================================================= */}

      <div className="bg-box mb-32">

        <DataTable

          title="Active Reminders"

          columns={reminderColumns}

          data={filteredData}

          showViewAll={false}

          showDropdown={true}

          dropdownTitle={
            selectedStatus
          }

          dropdownItems={
            dropdownItems
          }

        />

      </div>

    </>

  );

};

export default ListPage;