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
import { getContacts } from "@/utils/contactsStorage";

const ListPage = () => {

    const router = useRouter();

  const CompaniesColumns = [
    { key: "company", label: "COMPANY" },
    { key: "industry", label: "Industry" },
    { key: "location", label: "Location" },
    { key: "contact", label: "Contact",className: "text-center" },
    { key: "deals", label: "Deals", className: "text-center"},
    { key: "revenue", label: "Revenue" },
    { key: "owner", label: "Owner" },

    {
      key: "action",
      label: "ACTION",
      render: (row) => (
    <div className="table-actions">

        <FaRegEye
            className="eyeBtn mx-2"
            onClick={() => router.push(`/admin/companies/view/${row.id}`)}
        />

        <RiEdit2Fill
            className="eyeBtn mx-2"
            onClick={() => router.push(`/admin/companies/edit/${row.id}`)}
        />

        <RiDeleteBin6Line
            className="eyeBtn text-danger mx-2"
            onClick={() => {
                deleteCompany(row.id);
                setCompanies(getCompanies());
            }}
        />

    </div>
)
    },
  ];



const [companies, setCompanies] = useState([]);
const [contacts, setContacts] = useState([]);

useEffect(() => {
    initializeCompanies();

    setCompanies(getCompanies());
    setContacts(getContacts());
}, []);

const companyTableData = useMemo(() => {
    return companies.map((company) => ({
        ...company,
        contact: contacts.filter(
            (contact) => contact.companyId === company.id
        ).length,
    }));
}, [companies, contacts]);

  return (
    <>
      <PageBanner title="Companies" />
      <PageSearch
        showExport={true}
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
      </div>

    </>
  );
};


export default ListPage;