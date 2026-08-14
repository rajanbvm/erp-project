
import OpportunitiesForm from "@/components/OpportunitiesForm";
import { useRouter } from "next/router";

export default function EditOpportunities() {

    const router = useRouter();

    return (
        <>
            <OpportunitiesForm
                mode="edit"
                opportunityId={router?.query.id}
            />
        </>
    );
}