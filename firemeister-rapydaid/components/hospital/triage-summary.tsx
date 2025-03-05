"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFireData } from "@/context/fire-data-context"
import { Flame, TreePine, Wind } from "lucide-react"

// Triage categories
type TriageCategory = "immediate" | "delayed" | "minimal" | "expectant" | "dead" | "transported"

// Mock data for patients by incident
const generateMockIncidentData = (activeIncidents) => {
  return activeIncidents.map((incident) => ({
    id: incident.id,
    name: incident.location,
    fireType: incident.fireType,
    patients: {
      immediate: Math.floor(Math.random() * 10) + 1,
      delayed: Math.floor(Math.random() * 15) + 5,
      minimal: Math.floor(Math.random() * 20) + 10,
      expectant: Math.floor(Math.random() * 5),
      dead: Math.floor(Math.random() * 3),
      transported: Math.floor(Math.random() * 10) + 5,
    },
    timestamp: incident.timestamp,
  }))
}

const ITEMS_PER_PAGE = 3

export function TriageSummary() {
  const { activeIncidents, refreshData } = useFireData()
  const [incidentData, setIncidentData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [refreshInterval, setRefreshInterval] = useState(0)

  useEffect(() => {
    setIncidentData(generateMockIncidentData(activeIncidents))
  }, [activeIncidents])

  useEffect(() => {
    if (refreshInterval > 0) {
      const interval = setInterval(() => {
        refreshData()
      }, refreshInterval * 1000)
      return () => clearInterval(interval)
    }
  }, [refreshInterval, refreshData])

  const totalPages = Math.ceil(incidentData.length / ITEMS_PER_PAGE)
  const paginatedIncidentData = incidentData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const getFireTypeIcon = (fireType) => {
    switch (fireType) {
      case "wildfire":
        return <Flame className="h-4 w-4 text-orange-500" />
      case "forest fire":
        return <TreePine className="h-4 w-4 text-green-600" />
      case "bushfire":
        return <Wind className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Triage Summary by Incident</CardTitle>
          <CardDescription>Patient triage distribution across active fire incidents</CardDescription>
        </div>
        <Select value={refreshInterval.toString()} onValueChange={(value) => setRefreshInterval(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Refresh interval" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Manual refresh</SelectItem>
            <SelectItem value="30">Every 30 seconds</SelectItem>
            <SelectItem value="60">Every 1 minute</SelectItem>
            <SelectItem value="300">Every 5 minutes</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={paginatedIncidentData[0]?.id}>
          <TabsList className="grid grid-cols-3">
            {paginatedIncidentData.map((incident) => (
              <TabsTrigger key={incident.id} value={incident.id}>
                <div className="flex items-center gap-2">
                  {getFireTypeIcon(incident.fireType)}
                  <span className="truncate max-w-[150px]">{incident.name}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {paginatedIncidentData.map((incident) => {
            const totalPatients = Object.values(incident.patients).reduce((sum, count) => sum + count, 0)

            return (
              <TabsContent key={incident.id} value={incident.id} className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Incident started: {incident.timestamp.toLocaleTimeString()}</span>
                  <span>Total patients: {totalPatients}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-red-600">Immediate</Badge>
                      <span className="font-medium">{incident.patients.immediate}</span>
                    </div>
                    <Progress value={(incident.patients.immediate / totalPatients) * 100} className="h-2">
                      <div
                        className="h-full bg-red-600"
                        style={{ width: `${(incident.patients.immediate / totalPatients) * 100}%` }}
                      ></div>
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-yellow-500">Delayed</Badge>
                      <span className="font-medium">{incident.patients.delayed}</span>
                    </div>
                    <Progress value={(incident.patients.delayed / totalPatients) * 100} className="h-2">
                      <div
                        className="h-full bg-yellow-500"
                        style={{ width: `${(incident.patients.delayed / totalPatients) * 100}%` }}
                      ></div>
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-500">Minimal</Badge>
                      <span className="font-medium">{incident.patients.minimal}</span>
                    </div>
                    <Progress value={(incident.patients.minimal / totalPatients) * 100} className="h-2">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${(incident.patients.minimal / totalPatients) * 100}%` }}
                      ></div>
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-purple-600">Expectant</Badge>
                      <span className="font-medium">{incident.patients.expectant}</span>
                    </div>
                    <Progress value={(incident.patients.expectant / totalPatients) * 100} className="h-2">
                      <div
                        className="h-full bg-purple-600"
                        style={{ width: `${(incident.patients.expectant / totalPatients) * 100}%` }}
                      ></div>
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gray-800">Dead</Badge>
                      <span className="font-medium">{incident.patients.dead}</span>
                    </div>
                    <Progress value={(incident.patients.dead / totalPatients) * 100} className="h-2">
                      <div
                        className="h-full bg-gray-800"
                        style={{ width: `${(incident.patients.dead / totalPatients) * 100}%` }}
                      ></div>
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-blue-500">Transported</Badge>
                      <span className="font-medium">{incident.patients.transported}</span>
                    </div>
                    <Progress value={(incident.patients.transported / totalPatients) * 100} className="h-2">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${(incident.patients.transported / totalPatients) * 100}%` }}
                      ></div>
                    </Progress>
                  </div>
                </div>

                <div className="mt-4 rounded-md border p-3">
                  <h4 className="font-medium">Triage Recommendations</h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    {incident.patients.immediate > 5 && (
                      <li className="text-red-600 dark:text-red-400">
                        • High number of immediate patients - request additional medical teams
                      </li>
                    )}
                    {incident.patients.expectant > 0 && (
                      <li className="text-purple-600 dark:text-purple-400">
                        • Expectant patients present - consider palliative care resources
                      </li>
                    )}
                    {incident.patients.delayed > incident.patients.immediate && (
                      <li className="text-yellow-600 dark:text-yellow-400">
                        • High delayed-to-immediate ratio - reassess triage priorities
                      </li>
                    )}
                    {incident.patients.transported < (incident.patients.immediate + incident.patients.delayed) / 2 && (
                      <li className="text-blue-600 dark:text-blue-400">
                        • Transport bottleneck detected - request additional ambulances
                      </li>
                    )}
                  </ul>
                </div>
              </TabsContent>
            )
          })}
        </Tabs>

        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

