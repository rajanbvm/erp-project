import PageBanner from "@/components/common/PageBanner";
import LeadForm from "@/components/leads/LeadForm";


export default function AddLead() {

    return (
        <>
            <PageBanner title="Add Lead" />

            <LeadForm mode="add" />
        </>
    );
}