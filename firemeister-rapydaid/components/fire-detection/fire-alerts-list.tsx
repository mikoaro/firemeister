"use client"

import { useState, useEffect, useCallback } from "react"
import { useFireData } from "@/context/fire-data-context"
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
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Camera,
  Eye,
  Filter,
  MoreHorizontal,
  Search,
  Thermometer,
  WifiIcon,
  RefreshCw,
  TreePine,
  Flame,
  Wind,
} from "lucide-react"

const ITEMS_PER_PAGE = 10

export function FireAlertsList() {
  const { fireAlerts, refreshData } = useFireData()
  const [searchQuery, setSearchQuery] = useState("")
  const [severityFilter, setSeverityFilter] = useState<string | null>(null)
  const [forestAreaFilter, setForestAreaFilter] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [refreshRate, setRefreshRate] = useState("0")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [fireTypeFilter, setFireTypeFilter] = useState<string | null>(null)

  const filteredAlerts = fireAlerts
    .filter(
      (alert) =>
        (severityFilter ? alert.severity === severityFilter : true) &&
        (fireTypeFilter ? alert.fireType === fireTypeFilter : true) &&
        (forestAreaFilter ? alert.vegetationArea === forestAreaFilter : true) &&
        (searchQuery
          ? alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            alert.vegetationArea.toLowerCase().includes(searchQuery.toLowerCase())
          : true),
    )
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  const totalPages = Math.ceil(filteredAlerts.length / ITEMS_PER_PAGE)
  const paginatedAlerts = filteredAlerts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "smoke_detector":
        return <WifiIcon className="h-4 w-4" />
      case "heat_sensor":
        return <Thermometer className="h-4 w-4" />
      case "iot_camera":
        return <Camera className="h-4 w-4" />
      case "satellite":
        return <WifiIcon className="h-4 w-4" />
      default:
        return null
    }
  }

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await refreshData()
    setTimeout(() => setIsRefreshing(false), 1000)
  }, [refreshData])

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (refreshRate && refreshRate !== "0") {
      const rate = Number.parseInt(refreshRate) * 60 * 1000 // Convert minutes to milliseconds
      intervalId = setInterval(handleRefresh, rate)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [refreshRate, handleRefresh])

  const uniqueForestAreas = Array.from(new Set(fireAlerts.map((alert) => alert.forestArea)))

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search wildfire alerts..."
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
            <DropdownMenuLabel>Filter by Severity</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSeverityFilter(null)}>All Severities</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSeverityFilter("high")}>High Severity</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSeverityFilter("medium")}>Medium Severity</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSeverityFilter("low")}>Low Severity</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter by Forest Area</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setForestAreaFilter(null)}>All Forest Areas</DropdownMenuItem>
            {uniqueForestAreas.map((area) => (
              <DropdownMenuItem key={area} onClick={() => setForestAreaFilter(area)}>
                {area}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter by Fire Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFireTypeFilter(null)}>All Fire Types</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFireTypeFilter("wildfire")}>Wildfire</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFireTypeFilter("forest fire")}>Forest Fire</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFireTypeFilter("bushfire")}>Bushfire</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Select value={refreshRate} onValueChange={setRefreshRate}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Refresh Rate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Manual Refresh</SelectItem>
            <SelectItem value="1">Every 1 minute</SelectItem>
            <SelectItem value="2">Every 2 minutes</SelectItem>
            <SelectItem value="5">Every 5 minutes</SelectItem>
            <SelectItem value="10">Every 10 minutes</SelectItem>
            <SelectItem value="60">Every 1 hour</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Forest Area</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Fire Type</TableHead>
              <TableHead>Detected By</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAlerts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No wildfire alerts found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    {alert.isNew && (
                      <Badge
                        variant="outline"
                        className="bg-blue-500/10 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      >
                        New
                      </Badge>
                    )}
                    {!alert.isNew && alert.isAcknowledged && (
                      <Badge
                        variant="outline"
                        className="bg-green-500/10 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      >
                        Acknowledged
                      </Badge>
                    )}
                    {!alert.isNew && !alert.isAcknowledged && (
                      <Badge
                        variant="outline"
                        className="bg-orange-500/10 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                      >
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TreePine className="h-4 w-4 text-green-600" />
                      <span>{alert.vegetationArea}</span>
                    </div>
                  </TableCell>
                  <TableCell>{alert.location}</TableCell>
                  <TableCell>{alert.description}</TableCell>
                  <TableCell>{alert.timestamp.toLocaleTimeString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "default" : "outline"
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {alert.fireType === "wildfire" && <Flame className="h-4 w-4 text-orange-500" />}
                      {alert.fireType === "forest fire" && <TreePine className="h-4 w-4 text-green-600" />}
                      {alert.fireType === "bushfire" && <Wind className="h-4 w-4 text-yellow-500" />}
                      <span className="capitalize">{alert.fireType}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(alert.detectedBy)}
                      <span className="text-sm">{alert.detectedBy.replace("_", " ")}</span>
                    </div>
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
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Mark as acknowledged
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
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

