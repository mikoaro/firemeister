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
import { Edit, MoreHorizontal, RefreshCw } from "lucide-react"

// Mock data for resource allocation
const resources = [
  {
    id: "r1",
    name: "Emergency Response Teams",
    allocated: 12,
    total: 15,
    status: "adequate",
    lastUpdated: new Date(2023, 5, 10, 16, 30),
  },
  {
    id: "r2",
    name: "Ambulances",
    allocated: 18,
    total: 20,
    status: "critical",
    lastUpdated: new Date(2023, 5, 10, 16, 45),
  },
  {
    id: "r3",
    name: "Burn Treatment Units",
    allocated: 8,
    total: 12,
    status: "adequate",
    lastUpdated: new Date(2023, 5, 10, 16, 15),
  },
  {
    id: "r4",
    name: "Respiratory Support Equipment",
    allocated: 24,
    total: 30,
    status: "adequate",
    lastUpdated: new Date(2023, 5, 10, 16, 10),
  },
  {
    id: "r5",
    name: "Trauma Surgeons",
    allocated: 6,
    total: 8,
    status: "limited",
    lastUpdated: new Date(2023, 5, 10, 15, 45),
  },
  {
    id: "r6",
    name: "Emergency Nurses",
    allocated: 32,
    total: 40,
    status: "adequate",
    lastUpdated: new Date(2023, 5, 10, 15, 30),
  },
]

export function ResourceAllocation() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Resource</TableHead>
            <TableHead>Allocation</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium">{resource.name}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>{resource.allocated} allocated</span>
                    <span className="text-muted-foreground">{resource.total} total</span>
                  </div>
                  <Progress
                    value={(resource.allocated / resource.total) * 100}
                    className={
                      resource.allocated / resource.total > 0.9
                        ? "text-red-500"
                        : resource.allocated / resource.total > 0.7
                          ? "text-orange-500"
                          : "text-green-500"
                    }
                  />
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    resource.status === "critical"
                      ? "destructive"
                      : resource.status === "limited"
                        ? "default"
                        : "outline"
                  }
                >
                  {resource.status}
                </Badge>
              </TableCell>
              <TableCell>{resource.lastUpdated.toLocaleTimeString()}</TableCell>
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
                      <Edit className="mr-2 h-4 w-4" />
                      Update allocation
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh status
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

