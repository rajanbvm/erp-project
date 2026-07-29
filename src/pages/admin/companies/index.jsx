import PageBanner from "@/components/common/PageBanner";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";
import { useMemo, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { useRouter } from "next/router";

const ListPage = () => {

    const router = useRouter();

  const CompaniesColumns = [
    { key: "company", label: "COMPANY" },
    { key: "industry", label: "Industry" },
    { key: "location", label: "Location" },
    { key: "contact", label: "Contact" },
    { key: "deals", label: "Deals" },
    { key: "revenue", label: "Revenue" },
    { key: "owner", label: "Owner" },

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



  const CompData = [
    {
      company: "Falcon Group LLC",
      industry: "Real Estate",
      location: "Dubai, UAE",
      contact: "3",
      deals: "2",
      revenue: "$120K",
      owner: "John Doe",
    },
    {
      company: "Falcon Group LLC",
      industry: "Real Estate",
      location: "Dubai, UAE",
      contact: "3",
      deals: "2",
      revenue: "$120K",
      owner: "John Doe",
    },
    {
      company: "Falcon Group LLC",
      industry: "Real Estate",
      location: "Dubai, UAE",
      contact: "3",
      deals: "2",
      revenue: "$120K",
      owner: "John Doe",
    },
  ];

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
          data={CompData}
          showViewAll={false}
        />
      </div>

    </>
  );
};


export default ListPage;