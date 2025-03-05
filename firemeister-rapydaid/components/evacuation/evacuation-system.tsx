"use client";

import { useState } from "react";
import { useFireData } from "@/context/fire-data-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, Route, CloudRain, Bus } from "lucide-react";

// Mock data for evacuation routes
const evacuationRoutes = [
  {
    id: 1,
    name: "Route A",
    status: "open",
    travelTime: "25 mins",
    affectedByWeather: false,
  },
  {
    id: 2,
    name: "Route B",
    status: "congested",
    travelTime: "40 mins",
    affectedByWeather: true,
  },
  {
    id: 3,
    name: "Route C",
    status: "closed",
    travelTime: "N/A",
    affectedByWeather: true,
  },
];

// Mock data for weather conditions
const weatherConditions = {
  temperature: 28,
  condition: "Partly Cloudy",
  windSpeed: 15,
  windDirection: "NW",
  precipitation: "10%",
};

// Mock data for shuttle locations
const shuttleLocations = [
  {
    id: 1,
    name: "Shuttle 1",
    location: "Main St & 5th Ave",
    capacity: 50,
    available: 30,
  },
  {
    id: 2,
    name: "Shuttle 2",
    location: "Park Rd & Oak Ln",
    capacity: 50,
    available: 0,
  },
  {
    id: 3,
    name: "Shuttle 3",
    location: "River Blvd & Pine St",
    capacity: 50,
    available: 15,
  },
];

export function EvacuationSystem() {
  const { activeIncidents } = useFireData();
  const [selectedIncident, setSelectedIncident] = useState(
    activeIncidents[0]?.id || ""
  );

  return (
    <div className="space-y-4 w-full p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Evacuation System</h2>
        <Select value={selectedIncident} onValueChange={setSelectedIncident}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select an incident" />
          </SelectTrigger>
          <SelectContent>
            {activeIncidents.map((incident) => (
              <SelectItem key={incident.id} value={incident.id}>
                {incident.location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Evacuation Status
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">In Progress</div>
            <p className="text-xs text-muted-foreground">3 routes active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              People Evacuated
            </CardTitle>
            <Route className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">+180 in last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Weather Impact
            </CardTitle>
            <CloudRain className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Moderate</div>
            <p className="text-xs text-muted-foreground">Affecting 2 routes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Shuttles
            </CardTitle>
            <Bus className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">45 seats available</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="routes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="routes">Evacuation Routes</TabsTrigger>
          <TabsTrigger value="weather">Weather Conditions</TabsTrigger>
          <TabsTrigger value="shuttles">Shuttle Locations</TabsTrigger>
        </TabsList>
        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Evacuation Routes</CardTitle>
              <CardDescription>
                Current status of evacuation routes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evacuationRoutes.map((route) => (
                  <div
                    key={route.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div>
                      <h3 className="font-semibold">{route.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Travel Time: {route.travelTime}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          route.status === "open"
                            ? "outline"
                            : route.status === "congested"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {route.status}
                      </Badge>
                      {route.affectedByWeather && (
                        <Badge
                          variant="outline"
                          className="bg-yellow-100 text-yellow-800"
                        >
                          Weather Impact
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="weather" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Weather Conditions</CardTitle>
              <CardDescription>
                Weather forecast and its impact on evacuation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Current Conditions</h3>
                  <p>Temperature: {weatherConditions.temperature}°C</p>
                  <p>Condition: {weatherConditions.condition}</p>
                  <p>
                    Wind: {weatherConditions.windSpeed} km/h{" "}
                    {weatherConditions.windDirection}
                  </p>
                  <p>Precipitation: {weatherConditions.precipitation}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Weather Impact</h3>
                  <p>Routes Affected: 2</p>
                  <p>Severity: Moderate</p>
                  <p>Expected Duration: 3 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shuttles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shuttle Locations and Availability</CardTitle>
              <CardDescription>
                Current status of evacuation shuttles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shuttleLocations.map((shuttle) => (
                  <div
                    key={shuttle.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div>
                      <h3 className="font-semibold">{shuttle.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {shuttle.location}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">Capacity: {shuttle.capacity}</p>
                      <p className="text-sm">Available: {shuttle.available}</p>
                    </div>
                    <Badge
                      variant={
                        shuttle.available > 0 ? "outline" : "destructive"
                      }
                    >
                      {shuttle.available > 0 ? "Available" : "Full"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
