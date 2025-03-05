"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { ClipboardList, Filter, MoreHorizontal, Search, UserCog } from "lucide-react"

// Triage categories
type TriageCategory = "immediate" | "delayed" | "minimal" | "expectant" | "dead" | "transported"

// Mock data for patients
const patients = [
  {
    id: "p1",
    name: "John Doe",
    age: 45,
    condition: "Smoke inhalation, severe burns",
    severity: "critical",
    hospital: "Central Hospital",
    admittedAt: new Date(2023, 5, 10, 14, 30),
    status: "treatment",
    triage: "immediate" as TriageCategory,
    incident: "Downtown District Fire",
  },
  {
    id: "p2",
    name: "Jane Smith",
    age: 32,
    condition: "Burns - 2nd degree",
    severity: "high",
    hospital: "Memorial Medical Center",
    admittedAt: new Date(2023, 5, 10, 15, 15),
    status: "stable",
    triage: "delayed" as TriageCategory,
    incident: "Downtown District Fire",
  },
  {
    id: "p3",
    name: "Robert Johnson",
    age: 58,
    condition: "Smoke inhalation, minor burns",
    severity: "medium",
    hospital: "University Hospital",
    admittedAt: new Date(2023, 5, 10, 14, 45),
    status: "stable",
    triage: "minimal" as TriageCategory,
    incident: "Industrial Park Fire",
  },
  {
    id: "p4",
    name: "Emily Davis",
    age: 27,
    condition: "Burns - 3rd degree, respiratory failure",
    severity: "critical",
    hospital: "St. Mary's Hospital",
    admittedAt: new Date(2023, 5, 10, 13, 50),
    status: "critical",
    triage: "expectant" as TriageCategory,
    incident: "Industrial Park Fire",
  },
  {
    id: "p5",
    name: "Michael Wilson",
    age: 41,
    condition: "Smoke inhalation",
    severity: "medium",
    hospital: "Central Hospital",
    admittedAt: new Date(2023, 5, 10, 15, 30),
    status: "stable",
    triage: "minimal" as TriageCategory,
    incident: "Westside Neighborhood Fire",
  },
  {
    id: "p6",
    name: "Sarah Brown",
    age: 36,
    condition: "Burns - 1st degree",
    severity: "low",
    hospital: "Community General Hospital",
    admittedAt: new Date(2023, 5, 10, 16, 10),
    status: "discharged",
    triage: "transported" as TriageCategory,
    incident: "Westside Neighborhood Fire",
  },
  {
    id: "p7",
    name: "David Miller",
    age: 52,
    condition: "Cardiac arrest due to smoke inhalation",
    severity: "critical",
    hospital: "Central Hospital",
    admittedAt: new Date(2023, 5, 10, 14, 15),
    status: "deceased",
    triage: "dead" as TriageCategory,
    incident: "Downtown District Fire",
  },
  {
    id: "p8",
    name: "Lisa Garcia",
    age: 29,
    condition: "Severe burns, 40% body surface area",
    severity: "critical",
    hospital: "Burn Center",
    admittedAt: new Date(2023, 5, 10, 15, 45),
    status: "treatment",
    triage: "immediate" as TriageCategory,
    incident: "Industrial Park Fire",
  },
  {
    id: "p9",
    name: "James Wilson",
    age: 34,
    condition: "Fractured leg from evacuation",
    severity: "medium",
    hospital: "Memorial Medical Center",
    admittedAt: new Date(2023, 5, 10, 16, 30),
    status: "stable",
    triage: "delayed" as TriageCategory,
    incident: "Westside Neighborhood Fire",
  },
]

// Get unique incidents for filtering
const incidents = [...new Set(patients.map((patient) => patient.incident))]

export function PatientsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [triageFilter, setTriageFilter] = useState<string | null>(null)
  const [incidentFilter, setIncidentFilter] = useState<string | null>(null)

  const filteredPatients = patients
    .filter(
      (patient) =>
        (triageFilter ? patient.triage === triageFilter : true) &&
        (incidentFilter ? patient.incident === incidentFilter : true) &&
        (searchQuery
          ? patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.hospital.toLowerCase().includes(searchQuery.toLowerCase())
          : true),
    )
    .sort((a, b) => {
      // Sort by triage priority first
      const triagePriority = {
        immediate: 0,
        delayed: 1,
        minimal: 2,
        expectant: 3,
        dead: 4,
        transported: 5,
      }

      if (triagePriority[a.triage] !== triagePriority[b.triage]) {
        return triagePriority[a.triage] - triagePriority[b.triage]
      }

      // Then by severity
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
      return severityOrder[a.severity] - severityOrder[b.severity]
    })

  // Get triage counts
  const triageCounts = {
    all: patients.length,
    immediate: patients.filter((p) => p.triage === "immediate").length,
    delayed: patients.filter((p) => p.triage === "delayed").length,
    minimal: patients.filter((p) => p.triage === "minimal").length,
    expectant: patients.filter((p) => p.triage === "expectant").length,
    dead: patients.filter((p) => p.triage === "dead").length,
    transported: patients.filter((p) => p.triage === "transported").length,
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={triageFilter === null ? "default" : "outline"}
          size="sm"
          onClick={() => setTriageFilter(null)}
          className="min-w-24"
        >
          All ({triageCounts.all})
        </Button>
        <Button
          variant={triageFilter === "immediate" ? "default" : "outline"}
          size="sm"
          onClick={() => setTriageFilter("immediate")}
          className="bg-red-600 text-white hover:bg-red-700 hover:text-white min-w-24"
        >
          Immediate ({triageCounts.immediate})
        </Button>
        <Button
          variant={triageFilter === "delayed" ? "default" : "outline"}
          size="sm"
          onClick={() => setTriageFilter("delayed")}
          className="bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white min-w-24"
        >
          Delayed ({triageCounts.delayed})
        </Button>
        <Button
          variant={triageFilter === "minimal" ? "default" : "outline"}
          size="sm"
          onClick={() => setTriageFilter("minimal")}
          className="bg-green-500 text-white hover:bg-green-600 hover:text-white min-w-24"
        >
          Minimal ({triageCounts.minimal})
        </Button>
        <Button
          variant={triageFilter === "expectant" ? "default" : "outline"}
          size="sm"
          onClick={() => setTriageFilter("expectant")}
          className="bg-purple-600 text-white hover:bg-purple-700 hover:text-white min-w-24"
        >
          Expectant ({triageCounts.expectant})
        </Button>
        <Button
          variant={triageFilter === "dead" ? "default" : "outline"}
          size="sm"
          onClick={() => setTriageFilter("dead")}
          className="bg-gray-800 text-white hover:bg-gray-900 hover:text-white min-w-24"
        >
          Dead ({triageCounts.dead})
        </Button>
        <Button
          variant={triageFilter === "transported" ? "default" : "outline"}
          size="sm"
          onClick={() => setTriageFilter("transported")}
          className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white min-w-24"
        >
          Transported ({triageCounts.transported})
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by Incident</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={incidentFilter || ""}
              onValueChange={(value) => setIncidentFilter(value || null)}
            >
              <DropdownMenuRadioItem value="">All Incidents</DropdownMenuRadioItem>
              {incidents.map((incident) => (
                <DropdownMenuRadioItem key={incident} value={incident}>
                  {incident}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Triage</TableHead>
              <TableHead>Hospital</TableHead>
              <TableHead>Incident</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No patients found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.condition}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        patient.triage === "immediate"
                          ? "bg-red-600 hover:bg-red-700"
                          : patient.triage === "delayed"
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : patient.triage === "minimal"
                              ? "bg-green-500 hover:bg-green-600"
                              : patient.triage === "expectant"
                                ? "bg-purple-600 hover:bg-purple-700"
                                : patient.triage === "dead"
                                  ? "bg-gray-800 hover:bg-gray-900"
                                  : "bg-blue-500 hover:bg-blue-600"
                      }
                    >
                      {patient.triage}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.hospital}</TableCell>
                  <TableCell>{patient.incident}</TableCell>
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
                          <ClipboardList className="mr-2 h-4 w-4" />
                          View medical record
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCog className="mr-2 h-4 w-4" />
                          Update status
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Change Triage</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <span className="mr-2 h-2 w-2 rounded-full bg-red-600"></span>
                          Immediate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></span>
                          Delayed
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                          Minimal
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span className="mr-2 h-2 w-2 rounded-full bg-purple-600"></span>
                          Expectant
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                          Transported
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

