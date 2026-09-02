import PageBanner from "@/components/common/PageBanner";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import DeleteModal from "@/components/common/DeleteModal";
import {
  getContacts,
  initializeContacts,
  getContactById,
  deleteContact,
} from "@/utils/contactsStorage";
import { getCompanies, initializeCompanies } from "@/utils/companiesStorage";

const ListPage = () => {

  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [contactsData, setContactsData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const selectedContact = getContactById(selectedContactId);


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
    setSelectedContactId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedContactId) return;

    deleteContact(selectedContactId);

    loadContacts();

    setShowDeleteModal(false);
    setSelectedContactId(null);
  };

  const router = useRouter();

  const statusClasses = {
    "Primary": "badge-qualified",
    "Secondary": "badge-new",
  };

  const getStatusClass = (status) => {
    return statusClasses[status] || "badge-default";
  };

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
        <span className={`table-status ${getStatusClass(row?.type)}`}>
          {row?.type}
        </span>
      ),
    },

    {
      key: "action",
      label: "ACTION",
      render: (row) => (
        <div className="table-actions">
          <FaRegEye className="eyeBtn mx-2"
            onClick={() => router.push(`/admin/contacts/view/${row?.id}`)}
          />
          <RiEdit2Fill
            className="eyeBtn mx-2"
            onClick={() =>
              router.push(`/admin/contacts/edit/${row?.id}`)
            }
          />
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

  // const filteredData = useMemo(() => {
  //   if (selectedStatus === "All Status") {
  //     return contactsData;
  //   }

  //   return contactsData.filter(
  //     (contact) => contact.type === selectedStatus
  //   );
  // }, [selectedStatus, contactsData]);

  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return contactsData?.filter((contact) => {

      // Search only in:
      // LEAD, Email, COMPANY, OWNER
      const matchesSearch =
        !query ||
        [
          contact?.contact,
          contact?.email,
          contact?.company,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value)
              .toLowerCase()
              .includes(query)
          );

      // Status filter
      const matchesStatus =
        selectedStatus === "All Status" ||
        contact?.type === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [selectedStatus,searchQuery,contactsData,]);

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
        // showExport={true}
        showAddButton={true}
        addButtonText="Add New Contact"
        searchValue={searchQuery}
                onSearchChange={setSearchQuery}

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

        <DeleteModal
          show={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedContactId(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Contact"
          // message={`Are you sure you want to delete "${selectedContact?.contact}"?`}
           message={
            <>
              Are you sure you want to delete{" "}
              <span className="fw-bold text-black">"{selectedContact?.contact} ?"</span>
            </>
          }

        />
      </div>

    </>
  );
};


export default ListPage;