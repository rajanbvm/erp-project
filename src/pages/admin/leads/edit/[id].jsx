import PageBanner from "@/components/common/PageBanner";
import LeadForm from "@/components/leads/LeadForm";
import { useRouter } from "next/router";

export default function EditLead() {

    const router = useRouter();

    return (
        <>
            <PageBanner title="Edit Lead" />

            <LeadForm
                mode="edit"
                leadId={router.query.id}
            />
        </>
    );
}