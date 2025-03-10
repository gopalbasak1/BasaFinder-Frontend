"use client";

import * as React from "react";
import {
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { useUser } from "@/context/UserContext"; // ✅ Import hook but DON'T use it here
import Image from "next/image";
import logo from "../../../../assests/Basa.svg";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser(); // ✅ Hook is now inside the component

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: `/${user?.role}/dashboard`,
        icon: SquareTerminal,
        isActive: true,
      },
      // Conditionally include the Rental section based on the user's role
      ...(user?.role === "landlord"
        ? [
            {
              title: "Rental",
              url: `/landlord/rental/manage-rental`,
              icon: Bot,
              items: [
                {
                  title: "Manage Rental",
                  url: `/landlord/rental/manage-rental`,
                },
              ],
            },
            {
              title: "Rental-Request",
              url: `/landlord/request/manage-request`,
              icon: Bot,
              items: [
                {
                  title: "Manage Request",
                  url: `/landlord/request/manage-request`,
                },
              ],
            },
          ]
        : []),
      // Conditionally include the Rental section based on the user's role
      ...(user?.role === "admin"
        ? [
            {
              title: "Rental",
              url: `/admin/rental/manage-rental`,
              icon: Bot,
              items: [
                {
                  title: "Manage Rental",
                  url: `/admin/rental/manage-rental`,
                },
              ],
            },
            {
              title: "User",
              url: `/admin/user/manage-users`,
              icon: Bot,
              items: [
                {
                  title: "Manage Users",
                  url: `/admin/user/manage-users`,
                },
                { title: "Manage Role", url: "/admin/user/update-role" },
              ],
            },
          ]
        : []),
      {
        title: "Settings",
        url: `/${user?.role}/settings/profile`,
        icon: Settings,
        items: [
          { title: "Profile", url: `/${user?.role}/settings/profile` },
          { title: "Manage Password", url: `/${user?.role}/settings/password` },
        ],
      },
    ],
    navSecondary: [
      { title: "Support", url: "#", icon: LifeBuoy },
      { title: "Feedback", url: "#", icon: Send },
    ],
    projects: [
      { name: "Design Engineering", url: "#", icon: Frame },
      { name: "Sales & Marketing", url: "#", icon: PieChart },
      { name: "Travel", url: "#", icon: Map },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  {/* <Logo /> */}
                  <Image
                    className="w-[100px]"
                    src={logo}
                    alt="logo"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">Basa Finder</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser /> {/* ✅ Pass user correctly */}
      </SidebarFooter>
    </Sidebar>
  );
}
