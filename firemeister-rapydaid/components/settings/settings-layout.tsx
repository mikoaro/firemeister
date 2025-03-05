"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountSettings } from "@/components/settings/account-settings"
import { PersonalAISettings } from "@/components/settings/personal-ai-settings"
import { WorkspaceSettings } from "@/components/settings/workspace-settings"
import HospitalDeviceSettings from "@/components/settings/hospital-device-settings"
import FireGatewaySettings from "@/components/settings/fire-gateway-settings"

export function SettingsLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="w-full py-10 p-6">
      {children}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-10">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="personal-ai">Personal AI</TabsTrigger>
          <TabsTrigger value="workspace">Work Space</TabsTrigger>
          <TabsTrigger value="hospital-devices">Hospital Devices</TabsTrigger>
          <TabsTrigger value="fire-gateways">Fire Gateways</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AccountSettings />
        </TabsContent>
        <TabsContent value="personal-ai">
          <PersonalAISettings />
        </TabsContent>
        <TabsContent value="workspace">
          <WorkspaceSettings />
        </TabsContent>
        <TabsContent value="hospital-devices">
          <HospitalDeviceSettings />
        </TabsContent>
        <TabsContent value="fire-gateways">
          <FireGatewaySettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

