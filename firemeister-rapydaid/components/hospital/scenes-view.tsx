"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  LayoutGrid,
  LayoutList,
  LayoutTemplateIcon as LayoutTable,
  Plus,
  Search,
  MapPin,
  Users,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"
import { NewSceneDialog } from "./new-scene-dialog"
import { SceneDetails } from "./scene-details"

type Scene = {
  id: string
  title: string
  description: string
  timestamp: Date
  location: {
    lat: number
    lng: number
  }
  patientsTotal: number
  firstResponders: number
  status: "active" | "completed"
  mapUrl: string
}

const mockScenes: Scene[] = [
  {
    id: "1",
    title: "Yosemite Wildfire",
    description: "Rapidly spreading wildfire in Yosemite National Park affecting multiple campsites.",
    timestamp: new Date("2021-05-22T10:36:00"),
    location: {
      lat: 37.8651,
      lng: -119.5383,
    },
    patientsTotal: 12,
    firstResponders: 8,
    status: "active",
    mapUrl: "/yosemite_fire.jpeg",
  },
  {
    id: "2",
    title: "Redwood Forest Fire",
    description: "Large forest fire threatening ancient redwood groves and nearby communities.",
    timestamp: new Date("2021-05-19T10:25:00"),
    location: {
      lat: 41.2132,
      lng: -124.0046,
    },
    patientsTotal: 5,
    firstResponders: 15,
    status: "active",
    mapUrl: "/redwood_fire.jpeg",
  },
  {
    id: "3",
    title: "Australian Bushfire",
    description: "Intense bushfire in drought-affected eucalyptus forest region.",
    timestamp: new Date("2021-05-17T14:49:00"),
    location: {
      lat: -33.8688,
      lng: 151.2093,
    },
    patientsTotal: 8,
    firstResponders: 12,
    status: "active",
    mapUrl: "/australian_fire.jpeg",
  },
]

type ViewMode = "list" | "grid" | "table"

export function ScenesView() {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null)

  const filteredScenes = mockScenes.filter(
    (scene) =>
      scene.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scene.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const activeScenes = filteredScenes.filter((scene) => scene.status === "active")

  const handleNewScene = (data: any) => {
    // In a real app, this would make an API call
    console.log("New scene data:", data)
    // You could add the new scene to the list here
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Emergency Scenes</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-md border p-1">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("table")}
              >
                <LayoutTable className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Start New Scene
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search scenes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {activeScenes.length === 0 && (
          <div className="rounded-md bg-blue-500 p-2 text-center text-sm text-white">No Active Scenes</div>
        )}

        <div className="mt-4">
          {viewMode === "list" && (
            <div className="space-y-4">
              {filteredScenes.map((scene) => (
                <div
                  key={scene.id}
                  className="overflow-hidden rounded-lg border bg-gradient-to-r"
                >
                  <div className="flex gap-4 p-4">
                    <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={scene.mapUrl || "/placeholder.svg"}
                        alt={scene.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{scene.title}</h3>
                          <p className="text-sm text-muted-foreground">{scene.description}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {scene.timestamp.toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                          })}{" "}
                          - {scene.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <AlertCircle className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{scene.patientsTotal} Patients Total</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{scene.firstResponders} First responders</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {scene.location.lat.toFixed(4)}, {scene.location.lng.toFixed(4)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <Badge variant={scene.status === "active" ? "default" : "secondary"}>{scene.status}</Badge>
                        <Button variant="secondary" onClick={() => setSelectedScene(scene)}>
                          View & Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === "grid" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredScenes.map((scene) => (
                <Card key={scene.id}>
                  <CardContent className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={scene.mapUrl || "/placeholder.svg"}
                        alt={scene.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{scene.title}</h3>
                      <p className="text-sm text-muted-foreground">{scene.description}</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-1">
                          <AlertCircle className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{scene.patientsTotal} Patients</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{scene.firstResponders} Responders</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <Badge variant={scene.status === "active" ? "default" : "secondary"}>{scene.status}</Badge>
                        <Button variant="secondary" size="sm" onClick={() => setSelectedScene(scene)}>
                          View & Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {viewMode === "table" && (
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-2 text-left font-medium">Scene</th>
                    <th className="p-2 text-left font-medium">Location</th>
                    <th className="p-2 text-left font-medium">Patients</th>
                    <th className="p-2 text-left font-medium">Responders</th>
                    <th className="p-2 text-left font-medium">Status</th>
                    <th className="p-2 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredScenes.map((scene) => (
                    <tr key={scene.id} className="border-b">
                      <td className="p-2">
                        <div>
                          <div className="font-medium">{scene.title}</div>
                          <div className="text-sm text-muted-foreground">{scene.description}</div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {scene.location.lat.toFixed(4)}, {scene.location.lng.toFixed(4)}
                          </span>
                        </div>
                      </td>
                      <td className="p-2">{scene.patientsTotal}</td>
                      <td className="p-2">{scene.firstResponders}</td>
                      <td className="p-2">
                        <Badge variant={scene.status === "active" ? "default" : "secondary"}>{scene.status}</Badge>
                      </td>
                      <td className="p-2">
                        <Button variant="secondary" size="sm" onClick={() => setSelectedScene(scene)}>
                          View & Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </CardContent>
      <NewSceneDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleNewScene} />
      {selectedScene && (
        <SceneDetails
          open={!!selectedScene}
          onOpenChange={(open) => !open && setSelectedScene(null)}
          scene={selectedScene}
        />
      )}
    </Card>
  )
}

