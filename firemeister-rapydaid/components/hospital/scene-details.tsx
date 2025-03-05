"use client"

import { useState, useEffect } from "react"


import { SceneOverview } from "./scene-overview"
import { ScenePatients } from "./scene-patients"
import { SceneMap } from "./scene-map"

import { Clock } from "lucide-react"
import { Dialog, DialogContent } from "../ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface SceneDetailsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  scene: any | null // We'll type this properly later
}

export function SceneDetails({ open, onOpenChange, scene }: SceneDetailsProps) {
  const [elapsedTime, setElapsedTime] = useState("00:00:00")

  // Update elapsed time every second
  useEffect(() => {
    if (!scene) return

    const interval = setInterval(() => {
      const start = new Date(scene.timestamp)
      const now = new Date()
      const diff = now.getTime() - start.getTime()
      const hours = Math.floor(diff / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
      setElapsedTime(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`,
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [scene])

  if (!scene) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px]">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">{scene.title}</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {elapsedTime}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>FK</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">Fiona Kimber</div>
              <div className="text-muted-foreground">Nelson Fire & Rescue</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <SceneOverview scene={scene} />
          </TabsContent>
          <TabsContent value="patients" className="mt-4">
            <ScenePatients scene={scene} />
          </TabsContent>
          <TabsContent value="map" className="mt-4">
            <SceneMap scene={scene} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

