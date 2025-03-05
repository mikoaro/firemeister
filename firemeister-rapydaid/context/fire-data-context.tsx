"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback } from "react"

// Define types for our data
type FireSeverity = "high" | "medium" | "low"
type IncidentStatus = "active" | "contained" | "responding"
type DetectionDevice = "smoke_detector" | "heat_sensor" | "iot_camera" | "satellite"
type FireType = "wildfire" | "forest fire" | "bushfire"

interface FireAlert {
  id: string
  location: string
  vegetationArea: string
  fireType: FireType
  description: string
  timestamp: Date
  severity: FireSeverity
  isNew: boolean
  isAcknowledged: boolean
  detectedBy: DetectionDevice
  imageUrl?: string
}

interface FireIncident {
  id: string
  location: string
  vegetationArea: string
  fireType: FireType
  description: string
  timestamp: Date
  severity: FireSeverity
  status: IncidentStatus
  affectedArea: number // in hectares
}

interface FireDataContextType {
  fireAlerts: FireAlert[]
  activeIncidents: FireIncident[]
  refreshData: () => Promise<void>
}

// Create the context
const FireDataContext = createContext<FireDataContextType | undefined>(undefined)

// Generate mock data
function generateMockFireAlerts(): FireAlert[] {
  const vegetationAreas = [
    "Redwood National Forest",
    "Yosemite National Park",
    "Sequoia National Forest",
    "Sierra National Forest",
    "Angeles National Forest",
    "Australian Outback",
    "California Chaparral",
  ]

  const descriptions = [
    "Smoke detected in vegetation area",
    "High temperature reading in dense vegetation",
    "Satellite imagery shows potential fire",
    "Multiple heat signatures detected",
    "Rapid spread of fire observed",
    "Drought-stressed vegetation ignition",
  ]

  const fireTypes: FireType[] = ["wildfire", "forest fire", "bushfire"]
  const detectionDevices: DetectionDevice[] = ["smoke_detector", "heat_sensor", "iot_camera", "satellite"]

  const alerts: FireAlert[] = []

  // Generate between 8-15 alerts
  const numAlerts = Math.floor(Math.random() * 8) + 8

  for (let i = 0; i < numAlerts; i++) {
    const description = descriptions[Math.floor(Math.random() * descriptions.length)]
    const severity: FireSeverity = ["high", "medium", "low"][Math.floor(Math.random() * 3)] as FireSeverity
    const detectedBy = detectionDevices[Math.floor(Math.random() * detectionDevices.length)]

    // Generate a timestamp within the last 24 hours
    const timestamp = new Date()
    timestamp.setHours(timestamp.getHours() - Math.floor(Math.random() * 24))

    // 30% chance of being a new alert
    const isNew = Math.random() < 0.3

    // 50% chance of being acknowledged if not new
    const isAcknowledged = !isNew && Math.random() < 0.5

    const alert: FireAlert = {
      id: `alert-${i + 1}`,
      location: `${vegetationAreas[Math.floor(Math.random() * vegetationAreas.length)]} - Section ${Math.floor(Math.random() * 10) + 1}`,
      vegetationArea: vegetationAreas[Math.floor(Math.random() * vegetationAreas.length)],
      fireType: fireTypes[Math.floor(Math.random() * fireTypes.length)],
      description,
      timestamp,
      severity,
      isNew,
      isAcknowledged,
      detectedBy,
    }

    // Add image URL for IoT camera detections
    if (detectedBy === "iot_camera") {
      alert.imageUrl = `/placeholder.svg?text=Fire+Image+${i + 1}&width=300&height=200`
    }

    alerts.push(alert)
  }

  return alerts
}

function generateMockFireIncidents(): FireIncident[] {
  const vegetationAreas = [
    "Redwood National Forest",
    "Yosemite National Park",
    "Sequoia National Forest",
    "Sierra National Forest",
    "Angeles National Forest",
    "Australian Outback",
    "California Chaparral",
  ]

  const descriptions = [
    "Wildfire spreading in coniferous area",
    "Crown fire in mixed forest",
    "Ground fire in deciduous forest",
    "Spot fires across multiple sections",
    "Bushfire threatening dry scrubland",
    "Forest fire affecting old-growth trees",
  ]

  const fireTypes: FireType[] = ["wildfire", "forest fire", "bushfire"]

  const incidents: FireIncident[] = []

  // Generate between 3-8 incidents
  const numIncidents = Math.floor(Math.random() * 6) + 3

  for (let i = 0; i < numIncidents; i++) {
    const description = descriptions[Math.floor(Math.random() * descriptions.length)]
    const severity: FireSeverity = ["high", "medium", "low"][Math.floor(Math.random() * 3)] as FireSeverity

    // Generate a timestamp within the last 12 hours
    const timestamp = new Date()
    timestamp.setHours(timestamp.getHours() - Math.floor(Math.random() * 12))

    const status: IncidentStatus = ["active", "contained", "responding"][
      Math.floor(Math.random() * 3)
    ] as IncidentStatus

    const incident: FireIncident = {
      id: `incident-${i + 1}`,
      location: `${vegetationAreas[Math.floor(Math.random() * vegetationAreas.length)]} - Section ${Math.floor(Math.random() * 10) + 1}`,
      vegetationArea: vegetationAreas[Math.floor(Math.random() * vegetationAreas.length)],
      fireType: fireTypes[Math.floor(Math.random() * fireTypes.length)],
      description,
      timestamp,
      severity,
      status,
      affectedArea: Math.floor(Math.random() * 1000) + 50, // Random area between 50 and 1050 hectares
    }

    incidents.push(incident)
  }

  return incidents
}

// Create the provider component
export function FireDataProvider({ children }: { children: React.ReactNode }) {
  const [fireAlerts, setFireAlerts] = useState<FireAlert[]>([])
  const [activeIncidents, setActiveIncidents] = useState<FireIncident[]>([])

  // Function to refresh data
  const refreshData = useCallback(async () => {
    // In a real app, this would fetch data from an API
    // For this demo, we'll generate new mock data
    setFireAlerts(generateMockFireAlerts())
    setActiveIncidents(generateMockFireIncidents())
  }, [])

  // Initialize data on mount
  useEffect(() => {
    refreshData()

    // Set up a timer to periodically refresh data (every 5 minutes)
    const intervalId = setInterval(
      () => {
        refreshData()
      },
      5 * 60 * 1000,
    )

    return () => clearInterval(intervalId)
  }, [refreshData])

  return (
    <FireDataContext.Provider value={{ fireAlerts, activeIncidents, refreshData }}>{children}</FireDataContext.Provider>
  )
}

// Custom hook to use the context
export function useFireData() {
  const context = useContext(FireDataContext)
  if (context === undefined) {
    throw new Error("useFireData must be used within a FireDataProvider")
  }
  return context
}

