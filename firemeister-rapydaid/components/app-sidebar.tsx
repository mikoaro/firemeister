"use client";

import * as React from "react";
import {
  AudioWaveform,
  Bot,
  Command,
  GalleryVerticalEnd,
  SquareTerminal,
  LayoutDashboard,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/user.png",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    // {
    //   title: "Hospital Dashboard",
    //   url: "/app",
    //   icon: LayoutDashboard,
    // },
    // {
    //   title: "Medical Dashboard",
    //   url: "/app/medical-dashboard",
    //   icon: SquareTerminal,
    // },
    {
      title: "Documentation",
      url: "/app/doctors",
      icon: Bot,
      items: [
        {
          title: "Introduction",
          url: "/models/genesis",
        },
        {
          title: "Get Started",
          url: "/models/explorer",
        },
        {
          title: "Tutorials",
          url: "/models/quantum",
        },
        {
          title: "Changelog",
          url: "/models/quantum",
        },
      ],
    },
    {
      title: "Settings",
      url: "/app/settings",
      icon: Bot,
      items: [
        {
          title: "General",
          url: "/app/general",
        },
        {
          title: "Team",
          url: "/app/team",
        },
        {
          title: "Billing",
          url: "/app/billing",
        },
        {
          title: "Limits",
          url: "/app/limits",
        },
      ],
    },
  ],
  navMain2: [
    {
      title: "Playground",
      url: "/app",
      icon: LayoutDashboard,
      items: [

      ],
    },
    {
      title: "Model",
      url: "/app/model",
      icon: SquareTerminal,
      items: [


      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props} className="mt-[100px] h-[93vh]">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain2.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <NavMain items={data.navMain} pathname={pathname} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
