import React from "react";
import "../Components/Home/home.css";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { SearceLogo } from "../Asset/searce";
import { Card, CardBody, Image } from "@nextui-org/react";
import { IconHome } from "../Asset/icon_home";
import { IconProject } from "../Asset/icon_projects";
import { IconResources } from "../Asset/icon_resources";
import { IconTeam } from "../Asset/icon_team";
import { IconOppor } from "../Asset/icon_opportunity";
import { IconUtilization } from "../Asset/icon_utilization";
// import { IconHandWave } from "../../Asset/icon_handwave";
import RevenuePhoto from "../Asset/dollar.png";
import ProjectPhoto from "../Asset/project.png";
import ResourcePhoto from "../Asset/resource.png";
import ProgressPhoto from "../Asset/progress.png";
import ApexChart from "react-apexcharts";
import { graph_options } from "../Components/Home/graph_options";
import { graph_series } from "../Components/Home/graph_series";
import { donut_options } from "../Components/Home/pie_option";
import { donut_series } from "../Components/Home/pie_series";
import { Spinner } from "@nextui-org/react";
import { DataGrid } from "@mui/x-data-grid";
import { Progress } from "@nextui-org/react";

export default function Home(userDetails) {
  React.useEffect(() => {
    getData();
  }, []);

  const user = userDetails.user;
  const [data, setdata] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const logout = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, "_self");
  };

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/salesforce`);
      const result = await response.json();
      setdata(result);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const columns = [
    { field: "id", headerName: "Id", width: 200 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "company", headerName: "Company", width: 250 },
    { field: "status", headerName: "Status", width: 200 },
  ];

  const rows = data.map((item, index) => ({
    id: item.Id,
    name: item.Name,
    title: item.Title,
    company: item.Company,
    status: item.Status,
  }));

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <a href="https://searce.com" className="flex ms-2 md:me-24">
                <SearceLogo />
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <Dropdown>
                  <DropdownTrigger>
                    <User
                      as="button"
                      avatarProps={{
                        isBordered: true,
                        src: user.picture,
                      }}
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-bold">Signed in as</p>
                      <p className="font-bold">{user.name}</p>
                    </DropdownItem>
                    <DropdownItem key="settings">My Settings</DropdownItem>
                    <DropdownItem key="help_and_feedback">
                      Help & Feedback
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" onClick={logout}>
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-52 h-screen pt-20 transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="http://localhost:3000/home"
                className="flex items-center p-2 text-black rounded-lg hover:bg-blue-700 hover:text-white group"
              >
                <IconHome />
                <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3000/projects"
                className="flex items-center p-2 text-black rounded-lg hover:bg-blue-700 hover:text-white group"
              >
                <IconProject />
                <span className="flex-1 ms-3 whitespace-nowrap">Projects</span>
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3000/resource"
                className="flex items-center p-2 text-black rounded-lg hover:bg-blue-700 hover:text-white group"
              >
                <IconResources />
                <span className="flex-1 ms-3 whitespace-nowrap">Resources</span>
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3000/team"
                className="flex items-center p-2 text-black rounded-lg hover:bg-blue-700 hover:text-white group"
              >
                <IconTeam />
                <span className="flex-1 ms-3 whitespace-nowrap">My Team</span>
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3000/opportunity"
                className="flex items-center p-2 text-black rounded-lg hover:bg-blue-700 hover:text-white group"
              >
                <IconOppor />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Opportunities
                </span>
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3000/utilization"
                className="flex items-center p-2 text-black rounded-lg hover:bg-blue-700 hover:text-white group"
              >
                <IconUtilization />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Utilization
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-2 sm:ml-52">
        <div className="p-4 mt-14">
          <div className="grid grid-cols-3 mb-6">
            <h1 style={{ fontSize: "2.5rem", fontFamily: "initial" }}>
              Hey, {user.name}
            </h1>
            {/* <IconHandWave /> */}
          </div>
          <div className="grid grid-cols-4 gap-4 mb-14">
            <Card
              isBlurred
              className="border-2 border-purple-700 max-w-[610px]"
              shadow="md"
            >
              <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                  <div className="relative col-span-6 md:col-span-4">
                    <Image
                      alt="Revenue Image"
                      height={200}
                      shadow="sm"
                      src={RevenuePhoto}
                      width="100%"
                    />
                  </div>
                  <div className="flex flex-col col-span-2 md:col-span-8">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-0">
                        <h3 className="font-bold text-foreground/90">
                          REVENUE
                        </h3>
                        <h2 className="text-large font-extrabold mt-1">12K</h2>
                        <p className="text-small text-foreground/80 mt-2">
                          Forecast:
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card
              isBlurred
              className="border-2 border-purple-700 max-w-[610px]"
              shadow="md"
            >
              <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                  <div className="relative col-span-6 md:col-span-4">
                    <Image
                      alt="Project Image"
                      height={200}
                      shadow="sm"
                      src={ProjectPhoto}
                      width="100%"
                    />
                  </div>
                  <div className="flex flex-col col-span-2 md:col-span-8">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-0">
                        <h3 className="font-bold text-foreground/90">
                          PROJECT
                        </h3>
                        <h1 className="text-large font-extrabold mt-1">5</h1>
                        <p className="text-small text-foreground/80 mt-2">
                          Forecast:
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card
              isBlurred
              className="border-2 border-purple-700 max-w-[610px]"
              shadow="md"
            >
              <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                  <div className="relative col-span-6 md:col-span-4">
                    <Image
                      alt="Resource Image"
                      height={200}
                      shadow="sm"
                      src={ResourcePhoto}
                      width="100%"
                    />
                  </div>
                  <div className="flex flex-col col-span-2 md:col-span-8">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-0">
                        <h3 className="font-bold text-foreground/90">
                          RESOURCE
                        </h3>
                        <h1 className="text-large font-extrabold mt-1">10</h1>
                        <p className="text-small text-foreground/80 mt-2">
                          Available Resources:
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card
              isBlurred
              className="border-2 border-purple-700 max-w-[610px]"
              shadow="md"
            >
              <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                  <div className="relative col-span-6 md:col-span-4">
                    <Image
                      alt="Progress Image"
                      height={200}
                      shadow="sm"
                      src={ProgressPhoto}
                      width="100%"
                    />
                  </div>
                  <div className="flex flex-col col-span-1 md:col-span-8">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-0">
                        <h3 className="font-bold text-foreground/90">
                          PROGRESS
                        </h3>
                        <h1 className="text-large font-extrabold mt-1">70%</h1>
                        <p className="mt-4">
                          <Progress
                            size="sm"
                            aria-label="Loading..."
                            value={70}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="grid grid-cols-2 gap-10 mb-10">
            <ApexChart
              options={graph_options}
              series={graph_series}
              type="bar"
              width={570}
              height={350}
              shadow="md"
            />
            <ApexChart
              options={donut_options}
              series={donut_series}
              type="donut"
              width={570}
              height={350}
            />
          </div>
          <div className="grid grid-cols-1 mb-4">
            Opportunities - SalesForce
          </div>
          <div className="grid grid-cols-1 mb-4">
            {isLoading ? (
              <Spinner label="Loading..." />
            ) : (
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10, 20]}
                checkboxSelection
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
