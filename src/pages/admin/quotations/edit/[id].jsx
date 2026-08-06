
import LeadForm from "@/components/leads/LeadForm";
import { useRouter } from "next/router";

export default function EditQuotation() {

    const router = useRouter();

    return (
        <>
            <QuotationForm
                mode="edit"
                quotationId={router.query.id}
            />
        </>
    );
}