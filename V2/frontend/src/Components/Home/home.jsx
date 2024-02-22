import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { Card, CardBody, Image } from "@nextui-org/react";
import { IconHome } from "../../Asset/icon_home";
import { IconProject } from "../../Asset/icon_projects";
import { IconResources } from "../../Asset/icon_resources";
import { IconTeam } from "../../Asset/icon_team";
import { IconOppor } from "../../Asset/icon_opportunity";
import { IconUtilization } from "../../Asset/icon_utilization";
// import { IconHandWave } from "../../Asset/icon_handwave";
import SearceLogo from "../../Asset/searce.png";
import RevenuePhoto from "../../Asset/dollar.png";
import ProjectPhoto from "../../Asset/project.png";
import ResourcePhoto from "../../Asset/resource.png";
import ProgressPhoto from "../../Asset/progress.png";
import ApexChart from "react-apexcharts";
import { graph_options } from "./graph_options";
import { graph_series } from "./graph_series";
import { donut_options } from "./pie_option";
import { donut_series } from "./pie_series";
import { Spinner } from "@nextui-org/react";
import { DataGrid } from "@mui/x-data-grid";

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
      const response = await fetch(`http://localhost:4000/`);
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
      <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start rtl:justify-end">
              <a href="https://searce.com" class="flex ms-2 md:me-24">
                <img src={SearceLogo} class="h-8 me-3" alt="Searce Logo" />
              </a>
            </div>
            <div class="flex items-center">
              <div class="flex items-center ms-3">
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
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-gray-100 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 pb-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <li>
              <a
                href="http://localhost:3000/home"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 group"
              >
                <IconHome />
                <span class="flex-1 ms-3 whitespace-nowrap">Home</span>
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3000/projects"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IconProject />
                <span class="flex-1 ms-3 whitespace-nowrap">Projects</span>
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3000/resource"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IconResources />
                <span class="flex-1 ms-3 whitespace-nowrap">Resources</span>
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3000/team"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IconTeam />
                <span class="flex-1 ms-3 whitespace-nowrap">My Team</span>
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3000/opportunity"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IconOppor />
                <span class="flex-1 ms-3 whitespace-nowrap">Opportunities</span>
              </a>
            </li>
            <li>
              <a
                href="http://localhost:3000/utilization"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IconUtilization />
                <span class="flex-1 ms-3 whitespace-nowrap">Utilization</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div class="p-4 sm:ml-64">
        <div class="p-4 mt-14">
          <div class="grid grid-cols-3 mb-6">
            <h1 style={{ fontSize: "2.5rem", fontFamily: "initial" }}>
              Hey, {user.name}
            </h1>
            {/* <IconHandWave /> */}
          </div>
          <div class="grid grid-cols-4 gap-4 mb-4">
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
                      alt="Project Image"
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
                      src={ProgressPhoto}
                      width="100%"
                    />
                  </div>
                  <div className="flex flex-col col-span-2 md:col-span-8">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-0">
                        <h3 className="font-bold text-foreground/90">
                          PROGRESS
                        </h3>
                        <h1 className="text-large font-extrabold mt-1">70%</h1>
                        <p className="text-small text-foreground/80 mt-2">
                          Forecast:
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <ApexChart
              options={graph_options}
              series={graph_series}
              type="bar"
              width={500}
              height={300}
            />
            <ApexChart
              options={donut_options}
              series={donut_series}
              type="donut"
              width={500}
              height={300}
            />
          </div>
          <div class="grid grid-cols-1 gap-4 mb-4">
            Opportunities - SalesForce
          </div>
          <div class="grid grid-cols-1 gap-4 mb-4">
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
