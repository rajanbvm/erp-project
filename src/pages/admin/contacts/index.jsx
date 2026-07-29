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

  const ContactsColumns = [
    { key: "contact", label: "Contact" },
    { key: "email", label: "Email" },
    { key: "company", label: "COMPANY" },
    { key: "role", label: "Role" },
    { key: "phone", label: "Phone" },
    {
      key: "type",
      label: "Type",
      render: (row) => (
        <span
          style={{
            color: typeColors[row.type] || "#222",
            fontWeight: 500,
          }}
        >
          {row.type}
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



  const ContactsData = [
    {
      contact: "Ahmed Hassan",
      email: "ahmed@falcon.ae",
      company: "Falcon Group LLC",
      role: "Sales Director",
      phone: "+971 50 123 4567",
      type: "Primary",
    },
    {
      contact: "Sara Mehta",
      email: "sara@techventures.com",
      company: "ABC Ltd",
      role: "CTO",
      phone: "+971 50 123 4567",
      type: "Secondary",
    },
    {
      contact: "Ravi Kumar",
      email: "ravi@abc-ind.com",
      company: "XYZ",
      role: "Sales Director",
      phone: "+971 50 123 4567",
      type: "Primary",
    },
  ];

  const typeColors = {
    "Primary": "#173404",
    "Secondary": "#0C447C",
  };

  const dropdownItems = useMemo(() => {
    const typees = [...new Set(ContactsData.map((contact) => contact.type))];

    return [
      {
        label: "All Status",
        onClick: () => setSelectedStatus("All Status"),
      },
      ...typees.map((type) => ({
        label: type,
        onClick: () => setSelectedStatus(type),
      })),
    ];
  }, []);

  const filteredData = useMemo(() => {
    if (selectedStatus === "All Status") {
      return ContactsData;
    }

    return ContactsData.filter(
      (contact) => contact.type === selectedStatus
    );
  }, [selectedStatus]);



  const getScoreColor = (score) => {
    if (score < 50) return "#E24B4A";      // Red
    if (score <= 75) return "#EF9F27";     // Orange (50-75)
    return "#1D9E75";                      // Green (>75)
  };



  return (
    <>
      <PageBanner title="Contacts" />
      <PageSearch
        // showImport={true}
        showExport={true}
        showAddButton={true}
        addButtonText="Add New Contact"

        onImportClick={() => {
          console.log("Import clicked");
        }}

        onExportClick={() => {
          console.log("Export clicked");
        }}

        onAddClick={() => {
          router.push("/admin/contacts/add");
        }}
      />

      <div className="bg-box mb-32">
        <DataTable
          title="All Contacts"
          columns={ContactsColumns}
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