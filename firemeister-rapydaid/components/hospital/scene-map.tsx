"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Target, Activity, Truck, MoreHorizontal } from "lucide-react"

// This would normally come from a Google Maps import
declare global {
  interface Window {
    google: any
  }
}

export function SceneMap() {
  const mapRef = useRef(null)
  const [selectedPin, setSelectedPin] = useState<string>("triage")

  const pinTypes = [
    { id: "mci", label: "MCI", icon: <Star className="h-4 w-4" />, color: "bg-blue-500" },
    { id: "triage", label: "Triage", icon: <Target className="h-4 w-4" />, color: "bg-red-500" },
    { id: "treatment", label: "Treatment", icon: <Activity className="h-4 w-4" />, color: "bg-purple-500" },
    { id: "staging", label: "Staging", icon: <Truck className="h-4 w-4" />, color: "bg-yellow-500" },
    { id: "other", label: "Other", icon: <MoreHorizontal className="h-4 w-4" />, color: "bg-gray-500" },
  ]

  // In a real app, this would initialize the Google Map
  useEffect(() => {
    if (mapRef.current) {
      // Initialize map
    }
  }, [])

  return (
    <div className="relative h-[600px]">
      <Card className="absolute right-4 top-4 z-10 w-48">
        <CardContent className="p-2">
          <div className="space-y-2">
            <div className="text-sm font-medium">Drop Pin</div>
            <div className="grid grid-cols-3 gap-1">
              {pinTypes.map((pin) => (
                <Button
                  key={pin.id}
                  variant={selectedPin === pin.id ? "default" : "outline"}
                  className="h-auto flex-col gap-1 p-2"
                  onClick={() => setSelectedPin(pin.id)}
                >
                  <Badge className={`${pin.color} w-8`}>{pin.icon}</Badge>
                  <span className="text-xs">{pin.label}</span>
                </Button>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button size="sm">Save</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div ref={mapRef} className="h-full w-full bg-gray-100">
        {/* This would be replaced by the actual Google Map */}
        <div className="flex h-full items-center justify-center">
          <span className="text-muted-foreground">Map would render here</span>
        </div>
      </div>
    </div>
  )
}

