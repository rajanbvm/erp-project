import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/router";

export default function EditProduct() {
    const router = useRouter();

    return (
        <>
            <ProductForm
                mode="edit"
                productId={router.query.id}
            />
        </>
    );
}