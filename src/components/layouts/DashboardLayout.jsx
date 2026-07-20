import Sidebar from "@/components/common/Sidebar";

export default function DashboardLayout({children}){

return(
    <div className="dashboard-main">

      <Sidebar />

      <main className="dashboard-right">
        <div className="dashboard-data-wrapper">
          {children}
        </div>
      </main>

    </div>
)

}