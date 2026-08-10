import PageBanner from "@/components/common/PageBanner";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
  getContacts,
  initializeContacts,
  deleteContact,
} from "@/utils/contactsStorage";
import { getCompanies, initializeCompanies } from "@/utils/companiesStorage";

const ListPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [contactsData, setContactsData] = useState([]);
  

  const loadContacts = () => {
  const companies = getCompanies();
  const contacts = getContacts();

  const mergedData = contacts.map((contact) => ({
    ...contact,
    company:
      companies.find((company) => company.id === contact.companyId)?.company ||
      "-",
  }));


  setContactsData(mergedData);
};

  useEffect(() => {
    initializeCompanies();
    initializeContacts();
    loadContacts();
  }, []);

  const handleDelete = (id) => {

     if (!confirm("Delete this Contact?")) return;

    deleteContact(id);

    loadContacts();
  };

  const router = useRouter();

  const ContactsColumns = [
    { key: "contact", label: "Contact" },
    { key: "email", label: "Email" },
    { key: "company", label: "COMPANY" },
    { key: "designation", label: "Designation" },
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
      render: (row) => (
        <div className="table-actions">
          <FaRegEye className="eyeBtn mx-2" 
          onClick={() =>router.push(`/admin/contacts/view/${row.id}`)}
          />
          <RiEdit2Fill className="eyeBtn mx-2" />
          <RiDeleteBin6Line
            className="eyeBtn text-danger mx-2"
            onClick={() => handleDelete(row?.id)}
          />
        </div>
      ),
    },
  ];


  const typeColors = {
    "Primary": "#173404",
    "Secondary": "#0C447C",
  };

  const dropdownItems = useMemo(() => {
    const typees = [...new Set(contactsData.map((contact) => contact.type))];

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
  }, [contactsData]);

  const filteredData = useMemo(() => {
    if (selectedStatus === "All Status") {
      return contactsData;
    }

    return contactsData.filter(
      (contact) => contact.type === selectedStatus
    );
  }, [selectedStatus, contactsData]);

useEffect(() => {
}, [contactsData]);

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