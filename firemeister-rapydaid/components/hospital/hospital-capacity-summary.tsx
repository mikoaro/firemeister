"use client"

import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Mock data for hospital capacity
const hospitals = [
  {
    id: "h1",
    name: "Central Hospital",
    totalBeds: 120,
    availableBeds: 32,
    status: "normal",
  },
  {
    id: "h2",
    name: "Memorial Medical Center",
    totalBeds: 85,
    availableBeds: 12,
    status: "high",
  },
  {
    id: "h3",
    name: "University Hospital",
    totalBeds: 150,
    availableBeds: 43,
    status: "normal",
  },
  {
    id: "h4",
    name: "St. Mary's Hospital",
    totalBeds: 95,
    availableBeds: 5,
    status: "critical",
  },
  {
    id: "h5",
    name: "Community General Hospital",
    totalBeds: 75,
    availableBeds: 18,
    status: "high",
  },
]

export function HospitalCapacitySummary() {
  // Sort by status (critical first)
  const sortedHospitals = [...hospitals]
    .sort((a, b) => {
      const statusOrder = { critical: 0, high: 1, normal: 2 }
      return statusOrder[a.status] - statusOrder[b.status]
    })
    .slice(0, 3) // Show only top 3

  return (
    <div className="space-y-4">
      {sortedHospitals.map((hospital) => (
        <div key={hospital.id} className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-medium">{hospital.name}</span>
            <Badge
              variant={
                hospital.status === "critical" ? "destructive" : hospital.status === "high" ? "default" : "outline"
              }
            >
              {hospital.status}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>{hospital.availableBeds} available</span>
            <span className="text-muted-foreground">{hospital.totalBeds} total</span>
          </div>
          <Progress
            value={(hospital.availableBeds / hospital.totalBeds) * 100}
            className={
              hospital.availableBeds < 10
                ? "text-red-500"
                : hospital.availableBeds < 20
                  ? "text-orange-500"
                  : "text-green-500"
            }
          />
        </div>
      ))}
    </div>
  )
}

