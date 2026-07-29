import PageBanner from "@/components/common/PageBanner";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";
import { useRouter } from "next/router";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";

const ListPage = () => {

    const router = useRouter();

  const CallsColumns = [
    {
      key: "lead",
      label: "LEAD",
    },
    {
      key: "direction",
      label: "DIRECTION",
    },
    {
      key: "duration",
      label: "DURATION",
    },
    {
      key: "outcome",
      label: "OUTCOME",
    },
    {
      key: "owner",
      label: "OWNER",
    },
    {
      key: "date",
      label: "DATE & TIME",
    },
    {
      key: "action",
      label: "ACTION",
      render: () => (
        <div className="text-center">
          <RiDeleteBin6Line className="eyeBtn text-danger" />
        </div>
      ),
    },
  ];

  const CallsData = [
    {
      lead: "Rajesh Mehta",
      direction: "Outbound",
      duration: "1m 0s",
      outcome: "Interested",
      owner: "John Doe",
      date: "Jul 7, 2026",
    },
    {
      lead: "Fatima Al Zahra",
      direction: "Inbound",
      duration: "1m 35s",
      outcome: "Not Interested",
      owner: "Sarah Wilson",
      date: "Jul 7, 2026",
    },
    {
      lead: "David Chen",
      direction: "Outbound",
      duration: "2m 10s",
      outcome: "Follow-Up Required",
      owner: "Mike Johnson",
      date: "Jul 7, 2026",
    },
    {
      lead: "Sophia Martinez",
      direction: "Inbound",
      duration: "2m 45s",
      outcome: "Meeting Scheduled",
      owner: "John Doe",
      date: "Jul 6, 2026",
    },
    {
      lead: "Arjun Malhotra",
      direction: "Outbound",
      duration: "3m 20s",
      outcome: "No Response",
      owner: "Sarah Wilson",
      date: "Jul 6, 2026",
    },
    {
      lead: "Emily Turner",
      direction: "Inbound",
      duration: "3m 55s",
      outcome: "Interested",
      owner: "Mike Johnson",
      date: "Jul 6, 2026",
    },
    {
      lead: "Omar Siddiqui",
      direction: "Outbound",
      duration: "4m 30s",
      outcome: "Not Interested",
      owner: "John Doe",
      date: "Jul 6, 2026",
    },
  ];


  return (
    <>
      <PageBanner title="Calls" />
      <PageSearch
        showSecondaryButton={true}
        secondaryButtonText="Schedule Call"
        onSecondaryButtonClick={() => console.log("Schedule Call")}

        showAddButton={true}
        addButtonText="Log Call"
        onAddClick={() => {
          router.push("/admin/calls/add");
        }}
      />

      <div className="bg-box mb-32">
        <DataTable
          title="Calls"
          columns={CallsColumns}
          data={CallsData}
          showViewAll={false}
          showDropdown={false}
        />
      </div>

    </>
  );
};


export default ListPage;