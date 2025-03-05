"use client"

import { useFireData } from "@/context/fire-data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FireMap } from "@/components/fire-detection/fire-map"
import { FireAlertsSummary } from "@/components/fire-detection/fire-alerts-summary"
import { HospitalCapacitySummary } from "@/components/hospital/hospital-capacity-summary"
import { PatientStatusSummary } from "@/components/hospital/patient-status-summary"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Overview() {
  const { fireAlerts, activeIncidents } = useFireData()
  const [now, setNow] = useState(new Date());
  // const currentTime = new Date().toLocaleTimeString();

  const highPriorityAlerts = fireAlerts.filter((alert) => alert.severity === "high")

  useEffect(() => {
    setNow(new Date());
  }, []);

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <span>Last updated: {now ? new Date(now).toLocaleString() : 'Loading...'}</span>
            {/* <span>Last updated: {new Date().toLocaleTimeString()}</span> */}
          </Button>
        </div>
      </div>

      {highPriorityAlerts.length > 0 && (
        <Card className="border-red-500 bg-red-50 dark:bg-red-950/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="font-medium text-red-700 dark:text-red-400">
                {highPriorityAlerts.length} high priority fire alerts detected
              </span>
              <Button variant="destructive" size="sm" className="ml-auto" asChild>
                <Link href="/fire-detection">
                  View Alerts <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fire-detection">Fire Detection</TabsTrigger>
          <TabsTrigger value="hospital">Hospital Status</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Fire Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeIncidents.length}</div>
                <p className="text-xs text-muted-foreground">
                  {activeIncidents.filter((i) => i.severity === "high").length} high severity
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fire Alerts Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{fireAlerts.length}</div>
                <p className="text-xs text-muted-foreground">
                  +{fireAlerts.filter((a) => a.isNew).length} new in last hour
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Patients Being Treated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">8 critical, 16 stable</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hospital Capacity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">76%</div>
                <p className="text-xs text-muted-foreground">3 hospitals at critical capacity</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Fire Incident Map</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <FireMap />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Last 24 hours of fire detection alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <FireAlertsSummary limit={5} />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Hospital Capacity</CardTitle>
                <CardDescription>Current capacity status of nearby hospitals</CardDescription>
              </CardHeader>
              <CardContent>
                <HospitalCapacitySummary />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Patient Status</CardTitle>
                <CardDescription>Current patients being treated from fire incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <PatientStatusSummary />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="fire-detection" className="space-y-4">
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
                <CardTitle className="text-sm font-medium">High Severity Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {fireAlerts.filter((alert) => alert.severity === "high").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Alerts Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{fireAlerts.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Alerts (Last Hour)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{fireAlerts.filter((a) => a.isNew).length}</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Fire Incident Map</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <FireMap />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Last 24 hours of fire detection alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <FireAlertsSummary limit={5} />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Fire Detection System</CardTitle>
              <CardDescription>View detailed fire detection data and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild>
                <Link href="/app/fire-detection">
                  Go to Fire Detection Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="hospital" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">8</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Beds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">76</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hospitals at Capacity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">3</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Hospital Capacity</CardTitle>
                <CardDescription>Current capacity status of nearby hospitals</CardDescription>
              </CardHeader>
              <CardContent>
                <HospitalCapacitySummary />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Patient Status</CardTitle>
                <CardDescription>Current patients being treated from fire incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <PatientStatusSummary />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Hospital Dashboard</CardTitle>
              <CardDescription>View detailed hospital capacity and patient data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild>
                <Link href="/app/hospital-dashboard">
                  Go to Hospital Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

