
import CompaniesForm from "@/components/companies/CompaniesForm";
import LeadForm from "@/components/leads/LeadForm";
import { useRouter } from "next/router";

export default function EditLead() {

    const router = useRouter();

    return (
        <>
            <CompaniesForm
                mode="edit"
                leadId={router.query.id}
            />
        </>
    );
}