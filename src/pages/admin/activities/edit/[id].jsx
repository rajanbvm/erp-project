import ActivitiesForm from "@/components/ActivitiesForm";
import { useRouter } from "next/router";

export default function EditActivities() {
    const router = useRouter();

    if (!router.isReady) {
        return null;
    }

    return (
        <ActivitiesForm
            mode="edit"
            activityId={router.query.id}
        />
    );
}