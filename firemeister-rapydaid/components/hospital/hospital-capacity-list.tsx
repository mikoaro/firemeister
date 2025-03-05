"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ExternalLink, MapPin, MoreHorizontal, Phone } from "lucide-react"

// Mock data for hospital capacity
const hospitals = [
  {
    id: "h1",
    name: "Central Hospital",
    location: "Downtown",
    totalBeds: 120,
    availableBeds: 32,
    icuBeds: 24,
    icuAvailable: 5,
    distance: "2.3 miles",
    status: "normal",
  },
  {
    id: "h2",
    name: "Memorial Medical Center",
    location: "Westside",
    totalBeds: 85,
    availableBeds: 12,
    icuBeds: 18,
    icuAvailable: 2,
    distance: "4.7 miles",
    status: "high",
  },
  {
    id: "h3",
    name: "University Hospital",
    location: "Northside",
    totalBeds: 150,
    availableBeds: 43,
    icuBeds: 30,
    icuAvailable: 8,
    distance: "6.1 miles",
    status: "normal",
  },
  {
    id: "h4",
    name: "St. Mary's Hospital",
    location: "Eastside",
    totalBeds: 95,
    availableBeds: 5,
    icuBeds: 20,
    icuAvailable: 0,
    distance: "3.8 miles",
    status: "critical",
  },
  {
    id: "h5",
    name: "Community General Hospital",
    location: "Southside",
    totalBeds: 75,
    availableBeds: 18,
    icuBeds: 15,
    icuAvailable: 3,
    distance: "5.2 miles",
    status: "high",
  },
]

export function HospitalCapacityList() {
  // Sort by status (critical first) and then by distance
  const sortedHospitals = [...hospitals].sort((a, b) => {
    const statusOrder = { critical: 0, high: 1, normal: 2 }
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status]
    }
    return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hospital</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>ICU Beds</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedHospitals.map((hospital) => (
            <TableRow key={hospital.id}>
              <TableCell className="font-medium">{hospital.name}</TableCell>
              <TableCell>{hospital.location}</TableCell>
              <TableCell>{hospital.distance}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
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
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>{hospital.icuAvailable} available</span>
                    <span className="text-muted-foreground">{hospital.icuBeds} total</span>
                  </div>
                  <Progress
                    value={(hospital.icuAvailable / hospital.icuBeds) * 100}
                    className={
                      hospital.icuAvailable === 0
                        ? "text-red-500"
                        : hospital.icuAvailable < 3
                          ? "text-orange-500"
                          : "text-green-500"
                    }
                  />
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    hospital.status === "critical" ? "destructive" : hospital.status === "high" ? "default" : "outline"
                  }
                >
                  {hospital.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <MapPin className="mr-2 h-4 w-4" />
                      Get directions
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Phone className="mr-2 h-4 w-4" />
                      Contact hospital
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

