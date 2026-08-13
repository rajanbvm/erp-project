
import ContactsForm from "@/components/ContactsForm";
import { useRouter } from "next/router";

export default function EditLead() {

    const router = useRouter();

    return (
        <>
            <ContactsForm
                mode="edit"
                contactId={router.query.id}
            />
        </>
    );
}