
import LeadForm from "@/components/leads/LeadForm";
import { useRouter } from "next/router";

export default function EditLead() {

    const router = useRouter();

    return (
        <>
            <LeadForm
                mode="edit"
                leadId={router.query.id}
            />
        </>
    );
}