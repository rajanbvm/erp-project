import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/custom.css";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {

  const router = useRouter();

  const isAdminPage = router.pathname.startsWith("/admin");


  return (
    <>
      {
        isAdminPage ? (
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        ) : (
          <Component {...pageProps} />
        )
      }
    </>
  );
}