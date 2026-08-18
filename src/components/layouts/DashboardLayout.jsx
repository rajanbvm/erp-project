import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/common/Sidebar";
import { getCurrentUser } from "@/utils/rolesPermissionsStorage";

export default function DashboardLayout({ children }) {
    const router = useRouter();

    const [authChecking, setAuthChecking] = useState(true);

    useEffect(() => {
        const currentUser = getCurrentUser();

        if (
            !currentUser ||
            !currentUser.isLoggedIn ||
            !currentUser.role
        ) {
            router.replace("/");
            return;
        }


        setAuthChecking(false);
    }, [router]);

    if (authChecking) {
        return null;
    }

    return (
        <div className="dashboard-main">

            <Sidebar />

            <main className="dashboard-right">
                <div className="dashboard-data-wrapper">
                    {children}
                </div>
            </main>

        </div>
    );
}