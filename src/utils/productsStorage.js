const PRODUCTS_STORAGE_KEY = "productsData";

export const defaultProducts = [
    {
        id: "PRD-001",
        productName: "CRM Software",
        sku: "CRM-001",
        category: "Software",
        price: 500,
        vat: "5",
        discount: "5",
        status: "Active",
        description: "Customer relationship management software.",
        created: "24 Aug 2026",
    },
    {
        id: "PRD-002",
        productName: "ERP Software",
        sku: "ERP-001",
        category: "Software",
        price: 800,
        vat: "5",
        discount: "10",
        status: "Active",
        description: "Enterprise resource planning software.",
        created: "23 Aug 2026",
    },
    {
        id: "PRD-003",
        productName: "Business Analytics",
        sku: "BA-001",
        category: "Analytics",
        price: 300,
        vat: "5",
        discount: "15",
        status: "Inactive",
        description: "Business analytics and reporting solution.",
        created: "22 Aug 2026",
    },
];

export const initializeProducts = () => {
    if (typeof window === "undefined") return;

    const existingProducts = localStorage.getItem(
        PRODUCTS_STORAGE_KEY
    );

    if (!existingProducts) {
        localStorage.setItem(
            PRODUCTS_STORAGE_KEY,
            JSON.stringify(defaultProducts)
        );
    }
};

export const getProducts = () => {
    if (typeof window === "undefined") return [];

    const products = localStorage.getItem(
        PRODUCTS_STORAGE_KEY
    );

    return products ? JSON.parse(products) : [];
};

export const getProductById = (id) => {
    const products = getProducts();

    return products.find(
        (product) => product?.id === id
    );
};

export const addProduct = (product) => {
    const products = getProducts();

    const newProduct = {
        ...product,
        id: `PRD-${String(products.length + 1).padStart(3, "0")}`,
        created: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }),
    };

    localStorage.setItem(
        PRODUCTS_STORAGE_KEY,
        JSON.stringify([
            ...products,
            newProduct,
        ])
    );

    return newProduct;
};

export const updateProduct = (id, updatedProduct) => {
    const products = getProducts();

    const updatedProducts = products.map((product) =>
        product?.id === id
            ? {
                ...product,
                ...updatedProduct,
            }
            : product
    );

    localStorage.setItem(
        PRODUCTS_STORAGE_KEY,
        JSON.stringify(updatedProducts)
    );

    return updatedProducts;
};

export const deleteProduct = (id) => {
    const products = getProducts();

    const updatedProducts = products.filter(
        (product) => product?.id !== id
    );

    localStorage.setItem(
        PRODUCTS_STORAGE_KEY,
        JSON.stringify(updatedProducts)
    );

    return updatedProducts;
};