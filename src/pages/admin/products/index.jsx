import PageBanner from "@/components/common/PageBanner";
import PageSearch from "@/components/common/PageSearch";
import DataTable from "@/components/DataTable";
import { useEffect, useMemo, useState } from "react";
import DeleteModal from "@/components/common/DeleteModal";

import {
    initializeProducts,
    getProducts,
    deleteProduct,
} from "@/utils/productsStorage";

import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import Permission from "@/components/common/Permission";

const ListPage = () => {
    const [productsData, setProductsData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("All Status");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const router = useRouter();

    const loadProducts = () => {
        initializeProducts();

        const data = getProducts();

        setProductsData(data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleDelete = (id) => {
        setSelectedProductId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!selectedProductId) return;

        deleteProduct(selectedProductId);

        loadProducts();

        setShowDeleteModal(false);
        setSelectedProductId(null);
    };

    const statusColors = {
        Active: "#1D9E75",
        Inactive: "#E24B4A",
    };

    const ProductsColumns = [
        {
            key: "productName",
            label: "PRODUCT",
        },
        {
            key: "sku",
            label: "SKU",
        },
        {
            key: "category",
            label: "CATEGORY",
        },
        {
            key: "price",
            label: "PRICE",
            render: (row) => (
                <span style={{ fontWeight: 500 }}>
                    ${row?.price}
                </span>
            ),
        },
        {
            key: "vat",
            label: "VAT",
            render: (row) => (
                <span>
                    {row?.vat ? `${row?.vat}%` : "-"}
                </span>
            ),
        },
        {
            key: "discount",
            label: "DISCOUNT",
            render: (row) => (
                <span>
                    {row?.discount ? `${row?.discount}%` : "-"}
                </span>
            ),
        },
        {
            key: "status",
            label: "STATUS",
            render: (row) => (
                <span
                    style={{
                        color:
                            statusColors[row?.status] || "#222",
                        fontWeight: 500,
                    }}
                >
                    {row?.status}
                </span>
            ),
        },
        {
            key: "created",
            label: "CREATED",
            render: (row) => (
                <span
                    style={{
                        minWidth: "100px",
                    }}
                >
                    {row?.created}
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
                            router.push(
                                `/admin/products/view/${row?.id}`
                            );
                        }}
                    />

                    <RiEdit2Fill
                        className="eyeBtn mx-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            router.push(
                                `/admin/products/edit/${row?.id}`
                            );
                        }}
                    />

                    <Permission
                        module="products"
                        action="delete"
                    >
                        <RiDeleteBin6Line
                            className="eyeBtn text-danger mx-2"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                handleDelete(row?.id)
                            }
                        />
                    </Permission>
                </div>
            ),
        },
    ];

    const dropdownItems = useMemo(() => {
        const statuses = [
            ...new Set(
                productsData?.map(
                    (product) => product?.status
                )
            ),
        ];

        return [
            {
                label: "All Status",
                onClick: () =>
                    setSelectedStatus("All Status"),
            },
            ...statuses.map((status) => ({
                label: status,
                onClick: () =>
                    setSelectedStatus(status),
            })),
        ];
    }, [productsData]);

    const filteredData = useMemo(() => {
        if (selectedStatus === "All Status") {
            return productsData;
        }

        return productsData?.filter(
            (product) =>
                product?.status === selectedStatus
        );
    }, [selectedStatus, productsData]);

    return (
        <>
            <PageBanner title="Products" />

            <PageSearch
                showAddButton={true}
                addButtonText="Add New Product"
                onAddClick={() => {
                    router.push("/admin/products/add");
                }}
            />

            <div className="bg-box mb-32">
                <DataTable
                    title="All Products"
                    columns={ProductsColumns}
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
                        setSelectedProductId(null);
                    }}
                    onConfirm={confirmDelete}
                    title="Delete Product"
                    message="Are you sure you want to delete this product?"
                />
            </div>
        </>
    );
};

export default ListPage;