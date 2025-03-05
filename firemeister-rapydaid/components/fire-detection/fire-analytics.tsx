"use client"

import { useState } from "react"
import { useFireData } from "@/context/fire-data-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for trends
const trendData = {
  lastYear: [45, 78, 102, 135, 167, 189, 210, 198, 156, 123, 87, 56],
  thisYear: [52, 86, 114, 152, 183, 205, 228, 215, 170, 138, 95, 63],
}

// Mock data for heatmap
const heatmapData = [
  { id: 1, lat: 34.0522, lon: -118.2437, intensity: 0.8 },
  { id: 2, lat: 37.7749, lon: -122.4194, intensity: 0.6 },
  { id: 3, lat: 40.7128, lon: -74.006, intensity: 0.4 },
  { id: 4, lat: 41.8781, lon: -87.6298, intensity: 0.7 },
  { id: 5, lat: 29.7604, lon: -95.3698, intensity: 0.5 },
]

// Mock data for predictions
const predictionData = [
  { day: "Monday", risk: 0.3 },
  { day: "Tuesday", risk: 0.5 },
  { day: "Wednesday", risk: 0.7 },
  { day: "Thursday", risk: 0.8 },
  { day: "Friday", risk: 0.6 },
  { day: "Saturday", risk: 0.4 },
  { day: "Sunday", risk: 0.2 },
]

export function FireAnalytics() {
  const { fireAlerts, activeIncidents } = useFireData()
  const [selectedYear, setSelectedYear] = useState<"thisYear" | "lastYear">("thisYear")

  return (
    <Tabs defaultValue="trends">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="trends">Trends</TabsTrigger>
        <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
        <TabsTrigger value="predictions">Predictions</TabsTrigger>
      </TabsList>

      <TabsContent value="trends" className="space-y-4 pt-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Fire Incidents by Month</CardTitle>
              <CardDescription>Comparison of fire incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Select value={selectedYear} onValueChange={(value: "thisYear" | "lastYear") => setSelectedYear(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thisYear">This Year</SelectItem>
                    <SelectItem value="lastYear">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-[200px] flex items-end justify-between">
                {trendData[selectedYear].map((value, index) => (
                  <div key={index} className="w-1/12 flex flex-col items-center">
                    <div
                      className="w-full bg-orange-500 rounded-t"
                      style={{ height: `${(value / Math.max(...trendData[selectedYear])) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-1">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fire Types Distribution</CardTitle>
              <CardDescription>Breakdown of fire incidents by type</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px]">
              <div className="h-full flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-8 border-gray-200 relative">
                  <div
                    className="absolute inset-0 border-t-8 border-l-8 border-orange-500 rounded-full"
                    style={{ transform: "rotate(45deg)" }}
                  ></div>
                  <div
                    className="absolute inset-0 border-r-8 border-green-500 rounded-full"
                    style={{ transform: "rotate(180deg)" }}
                  ></div>
                  <div
                    className="absolute inset-0 border-b-8 border-yellow-500 rounded-full"
                    style={{ transform: "rotate(300deg)" }}
                  ></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="text-orange-500 font-bold">Wildfire 45%</div>
                    <div className="text-green-500 font-bold">Forest Fire 35%</div>
                    <div className="text-yellow-500 font-bold">Bushfire 20%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Affected Area Over Time</CardTitle>
            <CardDescription>Total hectares affected by fires</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="h-full flex items-end justify-between">
              {[5000, 7500, 10000, 15000, 12000, 8000, 6000, 9000, 11000, 13000, 9500, 7000].map((value, index) => (
                <div key={index} className="w-1/12 flex flex-col items-center">
                  <div className="w-full bg-red-500 rounded-t" style={{ height: `${(value / 15000) * 100}%` }}></div>
                  <span className="text-xs mt-1">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="heatmap" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Fire Incident Heatmap</CardTitle>
            <CardDescription>Geographic distribution of fire incidents</CardDescription>
          </CardHeader>
          <CardContent className="h-[500px] p-0 relative">
            <div className="h-full w-full rounded-md bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center"></div>
            {heatmapData.map((point) => (
              <div
                key={point.id}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  top: `${(1 - (point.lat - 29) / (41 - 29)) * 100}%`,
                  left: `${((point.lon + 125) / (125 - 70)) * 100}%`,
                  backgroundColor: `rgba(255, 0, 0, ${point.intensity})`,
                }}
              ></div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="predictions" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>AI Fire Risk Predictions</CardTitle>
            <CardDescription>Predicted fire risk areas for next 7 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[500px]">
            <div className="h-full flex flex-col justify-between">
              {predictionData.map((day, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-24">{day.day}</span>
                  <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${day.risk * 100}%`,
                        backgroundColor: day.risk > 0.6 ? "red" : day.risk > 0.3 ? "orange" : "yellow",
                      }}
                    ></div>
                  </div>
                  <span className="w-16 text-right">{(day.risk * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

