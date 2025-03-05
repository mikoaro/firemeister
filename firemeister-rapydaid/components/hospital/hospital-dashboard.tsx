"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HospitalCapacityList } from "@/components/hospital/hospital-capacity-list"
import { PatientsList } from "@/components/hospital/patients-list"
import { ResourceAllocation } from "@/components/hospital/resource-allocation"
import { TriageSummary } from "@/components/hospital/triage-summary"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { ScenesView } from "@/components/hospital/scenes-view"

export function HospitalDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // This would call an actual refresh function
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <div className="space-y-4 w-full p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">EMS & Hospital Dashboard</h2>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">From fire incidents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Immediate Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">15</div>
            <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Beds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">42</div>
            <p className="text-xs text-muted-foreground">Across all hospitals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Currently deployed</p>
          </CardContent>
        </Card>
      </div>

      <TriageSummary />

      <Tabs defaultValue="patients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="patients">Patient Triage</TabsTrigger>
          <TabsTrigger value="capacity">Hospital Capacity</TabsTrigger>
          <TabsTrigger value="resources">Resource Allocation</TabsTrigger>
          <TabsTrigger value="scenes">Scenes</TabsTrigger>
        </TabsList>
        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Triage Management</CardTitle>
              <CardDescription>Patients from fire incidents categorized by triage priority</CardDescription>
            </CardHeader>
            <CardContent>
              <PatientsList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="capacity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Capacity Status</CardTitle>
              <CardDescription>Current capacity and availability of nearby hospitals</CardDescription>
            </CardHeader>
            <CardContent>
              <HospitalCapacityList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Allocation</CardTitle>
              <CardDescription>Allocation of medical resources and personnel</CardDescription>
            </CardHeader>
            <CardContent>
              <ResourceAllocation />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scenes" className="space-y-4">
          <ScenesView />
        </TabsContent>
      </Tabs>
    </div>
  )
}

