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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser(); // ✅ Hook is now inside the component

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: `/${user?.role || "user"}/dashboard`,
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "Rental",
        url: `/${user?.role || "landlord"}/rental/manage-rental`,
        icon: Bot,
        items: [
          {
            title: "Manage Rental",
            url: `/${user?.role || "landlord"}/rental/manage-rental`,
          },
          { title: "Manage Categories", url: "/user/shop/category" },
          { title: "Manage Brands", url: "/user/shop/brand" },
          { title: "Manage Coupon", url: "/user/shop/manage-coupon" },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings,
        items: [{ title: "Profile", url: "/profile" }],
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
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">NextMart</h2>
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
