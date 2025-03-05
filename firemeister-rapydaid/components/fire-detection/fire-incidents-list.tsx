"use client"

import { useFireData } from "@/context/fire-data-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Building2, Eye, MapPin, MoreHorizontal, Users, TreePine, Flame, Wind } from "lucide-react"

export function FireIncidentsList() {
  const { activeIncidents } = useFireData()

  // Sort by severity (high to low) and then by timestamp (newest first)
  const sortedIncidents = [...activeIncidents].sort((a, b) => {
    const severityOrder = { high: 0, medium: 1, low: 2 }
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[a.severity] - severityOrder[b.severity]
    }
    return b.timestamp.getTime() - a.timestamp.getTime()
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fire Type</TableHead>
            <TableHead>Vegetation Area</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Started</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Affected Area</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedIncidents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No active wildfire incidents.
              </TableCell>
            </TableRow>
          ) : (
            sortedIncidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {incident.fireType === "wildfire" && <Flame className="h-4 w-4 text-orange-500" />}
                    {incident.fireType === "forest fire" && <TreePine className="h-4 w-4 text-green-600" />}
                    {incident.fireType === "bushfire" && <Wind className="h-4 w-4 text-yellow-500" />}
                    <span className="capitalize">{incident.fireType}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <TreePine className="h-4 w-4 text-green-600" />
                    <span>{incident.vegetationArea}</span>
                  </div>
                </TableCell>
                <TableCell>{incident.location}</TableCell>
                <TableCell>{incident.description}</TableCell>
                <TableCell>{incident.timestamp.toLocaleTimeString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      incident.severity === "high"
                        ? "destructive"
                        : incident.severity === "medium"
                          ? "default"
                          : "outline"
                    }
                  >
                    {incident.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      incident.status === "contained"
                        ? "bg-green-500/10 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : incident.status === "responding"
                          ? "bg-blue-500/10 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-red-500/10 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }
                  >
                    {incident.status}
                  </Badge>
                </TableCell>
                <TableCell>{incident.affectedArea} hectares</TableCell>
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
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <MapPin className="mr-2 h-4 w-4" />
                        View on map
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Building2 className="mr-2 h-4 w-4" />
                        Nearby resources
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        Affected population
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
  )
}

