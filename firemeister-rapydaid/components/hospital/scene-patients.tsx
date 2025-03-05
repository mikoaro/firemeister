"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockPatients = [
  {
    id: "N3276477",
    status: "immediate",
    lastUpdate: "15 minutes ago",
    gender: "F",
    age: "39 y",
    chiefComplaint: "We have awith bleeding from the head",
    name: "Cavaliere Vitale 3",
  },
  {
    id: "8465369",
    status: "immediate",
    lastUpdate: "a few seconds ago",
    gender: "F",
    age: "35 y",
    chiefComplaint: "",
    name: "Erica kinder",
  },
  {
    id: "625563",
    status: "delayed",
    lastUpdate: "2 minutes ago",
    gender: "F",
    age: "",
    chiefComplaint: "875",
    name: "Aaron Kolosky",
  },
  {
    id: "86653",
    status: "minimal",
    lastUpdate: "a minute ago",
    gender: "M",
    age: "67 y",
    chiefComplaint: "",
    name: "Eric Allsun",
  },
  {
    id: "855426",
    status: "minimal",
    lastUpdate: "a minute ago",
    gender: "F",
    age: "16 y",
    chiefComplaint: "",
    name: "Maria Mintz",
  },
  {
    id: "8456566",
    status: "minimal",
    lastUpdate: "a few seconds ago",
    gender: "F",
    age: "12 y",
    chiefComplaint: "",
    name: "Claire Roski",
  },
  {
    id: "846426",
    status: "dead",
    lastUpdate: "a minute ago",
    gender: "F",
    age: "64 y",
    chiefComplaint: "",
    name: "",
  },
]

const statusColors = {
  all: "bg-blue-100",
  immediate: "bg-red-100",
  delayed: "bg-yellow-100",
  minimal: "bg-green-100",
  expectant: "bg-gray-200",
  dead: "bg-gray-300",
  transported: "bg-blue-200",
}

export function ScenePatients() {
  const [sortBy, setSortBy] = useState("triage")

  const counts = {
    all: mockPatients.length,
    immediate: mockPatients.filter((p) => p.status === "immediate").length,
    delayed: mockPatients.filter((p) => p.status === "delayed").length,
    minimal: mockPatients.filter((p) => p.status === "minimal").length,
    expectant: mockPatients.filter((p) => p.status === "expectant").length,
    dead: mockPatients.filter((p) => p.status === "dead").length,
    transported: mockPatients.filter((p) => p.status === "transported").length,
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {Object.entries(counts).map(([status, count]) => (
            <Badge key={status} variant="outline" className={`${statusColors[status as keyof typeof statusColors]} text-black`}>
            {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
          </Badge>
          ))}
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="triage">Triage Priority</SelectItem>
            <SelectItem value="time">Time</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="space-y-1">
            {mockPatients.map((patient) => (
              <div
                key={patient.id}
                className={`flex items-center gap-4 p-3 ${statusColors[patient.status]} hover:bg-opacity-75`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{patient.name[0] || "?"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-black">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium capitalize">{patient.status}</span>
                        <span className="text-sm">Last Update: {patient.lastUpdate}</span>
                      </div>
                      <div className="text-sm">
                        Tag #{patient.id} • Gender: {patient.gender} • Age: {patient.age}
                      </div>
                      {patient.chiefComplaint && (
                        <div className="text-sm">
                          <span className="font-medium">C/O:</span> {patient.chiefComplaint}
                        </div>
                      )}
                      {patient.name && (
                        <div className="text-sm">
                          <span className="font-medium">Name:</span> {patient.name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

