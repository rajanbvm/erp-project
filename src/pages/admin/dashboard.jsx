import { useEffect } from "react";
import { useRouter } from "next/router";

import DashboardLayout from "@/components/layouts/DashboardLayout";

import DashImg from "@/images/DashImg.png";
import SmallActivity from "@/images/SmallActivity.png";
import RevenueChart from "@/components/RevenueChart";
import SalesFunnel from "@/components/SalesFunnel";

import Image from "next/image";
import Dropdown from "react-bootstrap/Dropdown";

import {
  BsArrowDownRight,
  BsArrowUpRight,
  BsEye,
} from "react-icons/bs";

import DashIcon1 from "@/images/DashIcon1.png";
import DashIcon2 from "@/images/DashIcon2.png";
import DashIcon3 from "@/images/DashIcon3.png";
import DashIcon4 from "@/images/DashIcon4.png";

import { IoChevronDown } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";

import DataTable from "@/components/DataTable";


function Dashboard() {

  const router = useRouter();


 useEffect(() => {

  const adminUser = localStorage.getItem("adminUser");

  if (!adminUser) {
    router.replace("/");
    return;
  }

  const user = JSON.parse(adminUser);

  if (!user.isLoggedIn || user.role !== "admin") {
    router.replace("/");
  }

}, [router]);


  const overviewCards = [
    {
      icon: DashIcon1,
      title: "Total Leads",
      value: "1,234",
      text: "+12% this month",
      iconComponent: BsArrowUpRight,
      color: "#1A932E",
    },
    {
      icon: DashIcon2,
      title: "Target achievement",
      value: "74%",
      text: "26% remaining",
      iconComponent: BsArrowDownRight,
      color: "#EE201C",
    },
    {
      icon: DashIcon3,
      title: "Won this month",
      value: "$892K",
      text: "23 deals closed",
      iconComponent: BsArrowUpRight,
      color: "#1A932E",
    },
    {
      icon: DashIcon4,
      title: "Open opportunities",
      value: "87",
      text: "+5 this week",
      iconComponent: BsArrowUpRight,
      color: "#1A932E",
    },
  ];



  const columns = [
    { key: "lead", label: "LEAD" },
    { key: "company", label: "COMPANY" },
    { key: "source", label: "SOURCE" },
    { key: "score", label: "SCORE" },
    { key: "priority", label: "PRIORITY" },
    { key: "probability", label: "PROBABILITY" },
    { key: "owner", label: "OWNER" },

    {
      key: "action",
      label: "ACTION",
      render: () => (
        <BsEye className="eyeBtn" />
      ),
    },
  ];



  const rows = [
    {
      lead: "Ahmed Hassan",
      company: "Falcon Group LLC",
      source: "Google Ads",
      score: 95,
      priority: "Critical",
      probability: "92%",
      owner: "John Doe",
    },
  ];



  return (
    <>

      <div
        className="dashboard-welcome-banner"
        style={{
          backgroundImage: `url(${SmallActivity.src})`,
        }}
      >

        <div className="row align-items-center">

          <div className="col-md-6">

            <div className="welcome-banner-content">
              <h1>
                Good morning, Andrew Smith!
              </h1>

              <p>
                Here's your business overview for today
              </p>
            </div>

          </div>


          <div className="col-md-6">

            <div className="welcome-banner-image">

              <Image
                src={DashImg}
                alt="Welcome Banner"
              />

            </div>

          </div>


        </div>

      </div>



      <div className="dashboard-overview mb-40">

        <div className="overview-header">

          <h2>
            Overview
          </h2>


          <Dropdown>

            <Dropdown.Toggle
              variant="success"
              className="overview-dropdown"
            >

              <span>
                Last 30 days
              </span>

              <IoChevronDown />

            </Dropdown.Toggle>


            <Dropdown.Menu>

              <Dropdown.Item>
                Last 15 days
              </Dropdown.Item>

              <Dropdown.Item>
                Last 30 days
              </Dropdown.Item>

            </Dropdown.Menu>


          </Dropdown>


        </div>



        <div className="row">

          {overviewCards.map((card,index)=>{

            const ArrowIcon = card.iconComponent;


            return (

              <div
                className="col-lg-3 col-md-6"
                key={index}
              >

                <div className="overview-card">

                  <Image
                    src={card.icon}
                    alt={card.title}
                  />


                  <p>
                    {card.title}
                  </p>


                  <h3>
                    {card.value}
                  </h3>


                  <span className="growth-text">

                    <ArrowIcon
                      style={{
                        color:card.color
                      }}
                    />

                    {card.text}

                  </span>


                </div>

              </div>

            )

          })}

        </div>

      </div>




      <div className="dashboard-charts mb-40">

        <div className="row">


          <div className="col-lg-6">

            <div className="chart-box">


              <div className="chart-header">

                <h3>
                  Sales funnel
                </h3>


                <Dropdown className="table-dropdown">
                  <Dropdown.Toggle variant="success" className="chart-dropdown" id="dropdown-basic">
                    <CiCalendarDate />
                    <span>Dropdown Button</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>


              </div>


              <SalesFunnel />

            </div>


          </div>



          <div className="col-lg-6">


            <div className="chart-box">

              <div className="chart-header">

                <h3>
                  Revenue
                </h3>

              </div>


              <RevenueChart />


            </div>


          </div>


        </div>

      </div>




      <div className="bg-box">

        <DataTable
          title="AI Lead Scoring — Top Priorities"
          description="Ranked by conversion probability"
          columns={columns}
          data={rows}
        />

      </div>


    </>
  );
}

// Apply dashboard layout

Dashboard.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
};



export default Dashboard;