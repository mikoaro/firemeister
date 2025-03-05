"use client"

import { useRef, useState } from "react"
import { useFireData } from "@/context/fire-data-context"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, TreePine, Wind } from "lucide-react"

export function FireMap({ fullscreen = false }: { fullscreen?: boolean }) {
  const { activeIncidents } = useFireData()
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null)

  // This would be replaced with actual map integration like Google Maps or Mapbox
  // For this demo, we'll create a simple visual representation

  return (
    <div
      className={`relative ${fullscreen ? "h-full" : "h-[650px]"} w-full bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden`}
    >
      <div className="absolute inset-0 p-4" ref={mapRef}>
        {/* This would be the actual map */}
        <div className="h-full w-full rounded-md bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-50"></div>

        {/* Forest areas */}
        {activeIncidents.map((incident, index) => {
          // Generate random positions for demo
          const top = `${20 + Math.random() * 60}%`
          const left = `${20 + Math.random() * 60}%`

          return (
            <div key={incident.id} className="absolute" style={{ top, left }}>
              <div className="flex items-center justify-center rounded-full bg-green-200 p-2">
                <TreePine className="h-6 w-6 text-green-600" />
              </div>
              <div className="mt-1 text-xs font-semibold text-green-700">{incident.forestArea}</div>
            </div>
          )
        })}

        {/* Fire incident markers */}
        {activeIncidents.map((incident) => {
          // Generate random positions for demo
          const top = `${20 + Math.random() * 60}%`
          const left = `${20 + Math.random() * 60}%`

          return (
            <div
              key={incident.id}
              className={`absolute cursor-pointer transition-all duration-300 ${selectedIncident === incident.id ? "z-10 scale-110" : "z-0"}`}
              style={{ top, left }}
              onClick={() => setSelectedIncident(incident.id === selectedIncident ? null : incident.id)}
            >
              <div
                className={`flex items-center justify-center rounded-full p-1 shadow-lg
                ${
                  incident.severity === "high"
                    ? "bg-red-500 text-white"
                    : incident.severity === "medium"
                      ? "bg-orange-500 text-white"
                      : "bg-yellow-500 text-white"
                }`}
              >
                {incident.fireType === "wildfire" && <Flame className="h-4 w-4" />}
                {incident.fireType === "forest fire" && <TreePine className="h-4 w-4" />}
                {incident.fireType === "bushfire" && <Wind className="h-4 w-4" />}
              </div>

              {selectedIncident === incident.id && (
                <Card className="absolute left-full ml-2 top-0 w-48 p-2 text-xs shadow-lg">
                  <h4 className="font-bold">{incident.location}</h4>
                  <p className="text-muted-foreground">{incident.description}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <Badge
                      variant={
                        incident.severity === "high"
                          ? "destructive"
                          : incident.severity === "medium"
                            ? "default"
                            : "outline"
                      }
                    >
                      {incident.severity} severity
                    </Badge>
                    <span className="text-xs text-muted-foreground">{incident.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <div className="mt-1">
                    <span className="font-semibold">Fire type:</span> {incident.fireType}
                  </div>
                  <div className="mt-1">
                    <span className="font-semibold">Affected area:</span> {incident.affectedArea} hectares
                  </div>
                </Card>
              )}
            </div>
          )
        })}
      </div>

      <div className="absolute bottom-2 right-2 flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-background">
          <div className="mr-1 h-2 w-2 rounded-full bg-red-500"></div> High
        </Badge>
        <Badge variant="outline" className="bg-background">
          <div className="mr-1 h-2 w-2 rounded-full bg-orange-500"></div> Medium
        </Badge>
        <Badge variant="outline" className="bg-background">
          <div className="mr-1 h-2 w-2 rounded-full bg-yellow-500"></div> Low
        </Badge>
        <Badge variant="outline" className="bg-background">
          <Flame className="mr-1 h-4 w-4 text-orange-500" /> Wildfire
        </Badge>
        <Badge variant="outline" className="bg-background">
          <TreePine className="mr-1 h-4 w-4 text-green-600" /> Forest Fire
        </Badge>
        <Badge variant="outline" className="bg-background">
          <Wind className="mr-1 h-4 w-4 text-yellow-500" /> Bushfire
        </Badge>
      </div>
    </div>
  )
}

