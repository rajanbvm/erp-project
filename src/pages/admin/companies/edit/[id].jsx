import CompaniesForm from "@/components/CompaniesForm";
import { useRouter } from "next/router";

export default function EditCompany() {
    const router = useRouter();

    return (
        <CompaniesForm
            mode="edit"
            companyId={router.query.id}
        />
    );
}