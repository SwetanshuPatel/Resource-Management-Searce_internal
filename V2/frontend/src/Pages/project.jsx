import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Button,
} from "@nextui-org/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
} from "@nextui-org/react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import "../Components/Projects/project.css";
import { IconHome } from "../Asset/icon_home";
import { IconProject } from "../Asset/icon_projects";
import { IconResources } from "../Asset/icon_resources";
import { IconTeam } from "../Asset/icon_team";
import { IconOppor } from "../Asset/icon_opportunity";
import { IconUtilization } from "../Asset/icon_utilization";
import { IconSearch } from "../Asset/icon_search";
import { SearceLogo } from "../Asset/searce";
import { IconFilter } from "../Asset/icon_filter";
import GCPPhoto from "../Asset/gcp.png";

export default function Projects(userDetails) {
  const user = userDetails.user;

  const logout = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, "_self");
  };

  const content = (
    <PopoverContent className="w-[240px]">
      {(titleProps) => (
        <div className="px-1 py-2 w-full">
          <p className="text-small font-bold text-foreground" {...titleProps}>
            Dimensions
          </p>
          <div className="mt-2 flex flex-col gap-2 w-full">
            <Input
              defaultValue="100%"
              label="Width"
              size="sm"
              variant="bordered"
            />
            <Input
              defaultValue="300px"
              label="Max. width"
              size="sm"
              variant="bordered"
            />
            <Input
              defaultValue="24px"
              label="Height"
              size="sm"
              variant="bordered"
            />
            <Input
              defaultValue="30px"
              label="Max. height"
              size="sm"
              variant="bordered"
            />
          </div>
        </div>
      )}
    </PopoverContent>
  );

  function popover() {
    return (
      <Popover
        key="blur"
        offset={0}
        placement="bottom"
        backdrop="blur"
      >
        {/* <PopoverTrigger>
          <Button color="warning" variant="flat" className="capitalize">
            Blur
          </Button>
        </PopoverTrigger> */}
        {content}
      </Popover>
    );
  }

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
          <div className="grid grid-cols-1 mb-12">
            <Input
              placeholder="Search"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">
                    <IconSearch />
                  </span>
                </div>
              }
              endContent={
                <Dropdown backdrop="blur">
                  <DropdownTrigger>
                    <Button isIconOnly variant="light" size="sm">
                      <IconFilter />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu variant="faded" aria-label="Static Actions">
                    <DropdownItem key="option 1">option 1</DropdownItem>
                    <DropdownItem key="option 2">option 2</DropdownItem>
                    <DropdownItem key="option 3">option 3</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              }
            />
          </div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card
              className="py-4"
              isPressable
              onPress={() => popover}
            >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Company Name</p>
                <small className="text-default-500">Project Manager</small>
                <h4 className="font-bold uppercase text-large">Project Name</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={GCPPhoto}
                  width={270}
                />
              </CardBody>
            </Card>
            <Card className="py-4" isPressable>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Company Name</p>
                <small className="text-default-500">Project Manager</small>
                <h4 className="font-bold uppercase text-large">Project Name</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={GCPPhoto}
                  width={270}
                />
              </CardBody>
            </Card>
            <Card className="py-4" isPressable>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Company Name</p>
                <small className="text-default-500">Project Manager</small>
                <h4 className="font-bold uppercase text-large">Project Name</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={GCPPhoto}
                  width={270}
                />
              </CardBody>
            </Card>
            <Card className="py-4" isPressable>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Company Name</p>
                <small className="text-default-500">Project Manager</small>
                <h4 className="font-bold uppercase text-large">Project Name</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={GCPPhoto}
                  width={270}
                />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
