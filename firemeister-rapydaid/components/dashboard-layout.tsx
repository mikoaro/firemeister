"use client"

import type React from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Flame, Building2, Home, Settings, BarChart3, Route, Users2, Cctv } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="flex h-14 items-center">
            <div className="flex items-center gap-2 font-semibold">
              <Link href="/app" className="flex items-center">
                <Image src="/logo.png" alt="logo" width="200" height="40" className="max-w-full" />
              </Link>
            </div>
          </SidebarHeader>
          <SidebarContent className="py-5">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"} tooltip="Dashboard">
                  <Link href="/">
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/fire-detection"} tooltip="Fire Detection">
                  <Link href="/fire-detection">
                    <Flame />
                    <span>Fire Detection</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/evacuation"} tooltip="Evacuation System">
                  <Link href="/evacuation">
                    <Route />
                    <span>Evacuation</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/hospital-dashboard"}
                  tooltip="Hospital Dashboard"
                >
                  <Link href="/hospital-dashboard">
                    <Building2 />
                    <span>RapyAid EMS</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> 
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/app/#"} tooltip="Analytics">
                  <Link href="/app/#">
                    <BarChart3 />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/agents"} tooltip="Team">
                  <Link href="/agents">
                    <Users2 />
                    <span>Agents</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/cameras"} tooltip="Team">
                  <Link href="/cameras">
                    <Cctv />
                    <span>All Cameras</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/settings"} tooltip="Settings">
                  <Link href="/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 w-full items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger />
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <ModeToggle />
              <UserNav />
            </div>
          </header>
          <main className="flex w-full">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

