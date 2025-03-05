"use client"

import { useState } from "react"
import { useFireData } from "@/context/fire-data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FireMap } from "@/components/fire-detection/fire-map"
import { FireAlertsList } from "@/components/fire-detection/fire-alerts-list"
import { FireIncidentsList } from "@/components/fire-detection/fire-incidents-list"
import { FireAnalytics } from "@/components/fire-detection/fire-analytics"
import { FireImageSearch } from "@/components/fire-detection/fire-image-search"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function FireDetectionDashboard() {
  const { fireAlerts, activeIncidents, refreshData } = useFireData()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshData()
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <div className="space-y-4 w-full p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Fire Detection System</h2>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeIncidents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {activeIncidents.filter((i) => i.severity === "high").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medium Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {activeIncidents.filter((i) => i.severity === "medium").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {activeIncidents.filter((i) => i.severity === "low").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="map" className="space-y-4">
        <TabsList>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="incidents">Active Incidents</TabsTrigger>
          <TabsTrigger value="images">Fire Images</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="map" className="space-y-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Fire Incident Map</CardTitle>
              <CardDescription>Real-time visualization of fire incidents and alerts</CardDescription>
            </CardHeader>
            <CardContent className="h-[600px] p-0">
              <FireMap fullscreen />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alerts" className="space-y-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Fire Alerts</CardTitle>
              <CardDescription>All fire alerts from detection systems</CardDescription>
            </CardHeader>
            <CardContent>
              <FireAlertsList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="incidents" className="space-y-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Active Fire Incidents</CardTitle>
              <CardDescription>Currently active fire incidents being monitored</CardDescription>
            </CardHeader>
            <CardContent>
              <FireIncidentsList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="images" className="space-y-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Fire Image Search</CardTitle>
              <CardDescription>Search and view images from IoT camera detections</CardDescription>
            </CardHeader>
            <CardContent>
              <FireImageSearch />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Fire Analytics</CardTitle>
              <CardDescription>Analysis of fire data and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <FireAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

