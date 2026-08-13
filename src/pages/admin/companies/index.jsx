import PageBanner from "@/components/common/PageBanner";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
  initializeCompanies,
  getCompanies,
  deleteCompany
} from "@/utils/companiesStorage";
import {
  getCountryOptions,
  getStateOptions,
} from "@/utils/location";
import { getContacts } from "@/utils/contactsStorage";
import DeleteModal from "@/components/common/DeleteModal";

const ListPage = () => {

  const handleDelete = (id) => {
    setSelectedCompanyId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedCompanyId) return;

    deleteCompany(selectedCompanyId);

    setCompanies(getCompanies());

    setShowDeleteModal(false);
    setSelectedCompanyId(null);
  };

  const router = useRouter();

  const CompaniesColumns = [
    { key: "company", label: "COMPANY" },
    { key: "industry", label: "Industry" },
    { key: "location", label: "Location" },
    { key: "contact", label: "Contact", className: "text-center" },
    { key: "deals", label: "Deals", className: "text-center" },
    { key: "revenue", label: "Revenue" },
    { key: "owner", label: "Owner" },

    {
      key: "action",
      label: "ACTION",
      render: (row) => (
        <div className="table-actions">

          <FaRegEye
            className="eyeBtn mx-2"
            onClick={() => router.push(`/admin/companies/view/${row?.id}`)}
          />

          <RiEdit2Fill
            className="eyeBtn mx-2"
            onClick={() => router.push(`/admin/companies/edit/${row?.id}`)}
          />

          <RiDeleteBin6Line
            className="eyeBtn text-danger mx-2"
            onClick={() => handleDelete(row?.id)}
          />

        </div>
      )
    },
  ];


  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const countryOptions = getCountryOptions();


  useEffect(() => {
    initializeCompanies();

    setCompanies(getCompanies());
    setContacts(getContacts());
  }, []);

  const companyTableData = useMemo(() => {
    return companies.map((company) => {

      const country = countryOptions.find(
        (item) => item.value === company?.country
      );

      const stateOptions = company?.country
        ? getStateOptions(company?.country)
        : [];

      const state = stateOptions.find(
        (item) => item.value === company?.state
      );

      const location = [
        // company?.city,
        state?.label,
        country?.label,
      ]
        .filter(Boolean)
        .join(", ");

      return {
        ...company,
        location,
        contact: contacts.filter(
          (contact) => contact.companyId === company?.id
        ).length,
      };
    });
  }, [companies, contacts]);

  return (
    <>
      <PageBanner title="Companies" />
      <PageSearch
        showExport={false}
        showAddButton={true}
        addButtonText="Add New Companies"

        onImportClick={() => {
          console.log("Import clicked");
        }}

        onExportClick={() => {
          console.log("Export clicked");
        }}

        onAddClick={() => {
          router.push("/admin/companies/add");
        }}
      />

      <div className="bg-box mb-32">
        <DataTable
          title="All Companies"
          columns={CompaniesColumns}
          data={companyTableData}
          showViewAll={false}
        />

        <DeleteModal
          show={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedCompanyId(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Company"
          message="Are you sure you want to delete this company?"
        />
      </div>

    </>
  );
};


export default ListPage;