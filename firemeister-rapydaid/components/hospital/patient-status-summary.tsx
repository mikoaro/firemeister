"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

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
    status: "stable",
    triage: "minimal" as TriageCategory,
    incident: "Westside Neighborhood Fire",
  },
]

export function PatientStatusSummary() {
  // Sort by triage priority
  const sortedPatients = [...patients]
    .sort((a, b) => {
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
    .slice(0, 5) // Show only top 5

  // Calculate triage distribution
  const triageCounts = {
    immediate: patients.filter((p) => p.triage === "immediate").length,
    delayed: patients.filter((p) => p.triage === "delayed").length,
    minimal: patients.filter((p) => p.triage === "minimal").length,
    expectant: patients.filter((p) => p.triage === "expectant").length,
    dead: patients.filter((p) => p.triage === "dead").length,
    transported: patients.filter((p) => p.triage === "transported").length,
  }

  const totalPatients = patients.length

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Triage Distribution</h3>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center">
              <span className="mr-1 h-2 w-2 rounded-full bg-red-600"></span> Immediate
            </span>
            <span>{triageCounts.immediate}</span>
          </div>
          <Progress value={(triageCounts.immediate / totalPatients) * 100} className="h-2 bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-red-600"
              style={{ width: `${(triageCounts.immediate / totalPatients) * 100}%` }}
            ></div>
          </Progress>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center">
              <span className="mr-1 h-2 w-2 rounded-full bg-yellow-500"></span> Delayed
            </span>
            <span>{triageCounts.delayed}</span>
          </div>
          <Progress value={(triageCounts.delayed / totalPatients) * 100} className="h-2 bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-yellow-500"
              style={{ width: `${(triageCounts.delayed / totalPatients) * 100}%` }}
            ></div>
          </Progress>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center">
              <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span> Minimal
            </span>
            <span>{triageCounts.minimal}</span>
          </div>
          <Progress value={(triageCounts.minimal / totalPatients) * 100} className="h-2 bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-green-500"
              style={{ width: `${(triageCounts.minimal / totalPatients) * 100}%` }}
            ></div>
          </Progress>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center">
              <span className="mr-1 h-2 w-2 rounded-full bg-purple-600"></span> Expectant
            </span>
            <span>{triageCounts.expectant}</span>
          </div>
          <Progress value={(triageCounts.expectant / totalPatients) * 100} className="h-2 bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-purple-600"
              style={{ width: `${(triageCounts.expectant / totalPatients) * 100}%` }}
            ></div>
          </Progress>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center">
              <span className="mr-1 h-2 w-2 rounded-full bg-blue-500"></span> Transported
            </span>
            <span>{triageCounts.transported}</span>
          </div>
          <Progress
            value={(triageCounts.transported / totalPatients) * 100}
            className="h-2 bg-gray-200 dark:bg-gray-700"
          >
            <div
              className="h-full bg-blue-500"
              style={{ width: `${(triageCounts.transported / totalPatients) * 100}%` }}
            ></div>
          </Progress>
        </div>
      </div>

      <div className="pt-2">
        <h3 className="text-sm font-medium mb-2">Priority Patients</h3>
        <div className="space-y-3">
          {sortedPatients.map((patient) => (
            <div key={patient.id} className="flex items-start justify-between rounded-md border p-3">
              <div>
                <div className="font-medium">
                  {patient.name}, {patient.age}
                </div>
                <div className="text-sm text-muted-foreground">{patient.condition}</div>
                <div className="mt-1 text-xs text-muted-foreground">{patient.hospital}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
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
                <Badge
                  variant="outline"
                  className={
                    patient.status === "critical"
                      ? "bg-red-500/10 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      : patient.status === "treatment"
                        ? "bg-blue-500/10 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : patient.status === "stable"
                          ? "bg-green-500/10 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-500/10 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                  }
                >
                  {patient.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

