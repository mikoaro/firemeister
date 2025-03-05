"use client"

import { useState } from "react"
import { useFireData } from "@/context/fire-data-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Camera } from "lucide-react"

export function FireImageSearch() {
  const { fireAlerts } = useFireData()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAlerts = fireAlerts
    .filter(
      (alert) =>
        alert.detectedBy === "iot_camera" &&
        (searchQuery
          ? alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            alert.description.toLowerCase().includes(searchQuery.toLowerCase())
          : true),
    )
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search fire images..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="secondary">
          <Camera className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={alert.imageUrl || "/placeholder.svg"}
                  alt={`Fire at ${alert.location}`}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white">
                  <h3 className="text-sm font-semibold">{alert.location}</h3>
                  <p className="text-xs">{alert.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-2">
                <Badge
                  variant={
                    alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "default" : "outline"
                  }
                >
                  {alert.severity}
                </Badge>
                <span className="text-xs text-muted-foreground">{alert.timestamp.toLocaleTimeString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center text-muted-foreground">No images found matching your search criteria.</div>
      )}
    </div>
  )
}

