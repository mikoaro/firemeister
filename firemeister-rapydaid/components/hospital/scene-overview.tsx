"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, ChevronDown } from "lucide-react"

export function SceneOverview({ scene }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">{scene.title}</h3>
          <p className="text-sm text-muted-foreground">{scene.description}</p>
        </div>

        <Button variant="destructive" className="w-full">
          Close Scene
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Patient Count</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Approximate</div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between bg-blue-50 px-2 py-1 text-black">
                    <span>Total</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        -
                      </Button>
                      <span className="w-8 text-center">10</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-red-50 px-2 py-1 text-black">
                    <span>Immediate</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        -
                      </Button>
                      <span className="w-8 text-center">3</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-yellow-50 px-2 py-1 text-black">
                    <span>Delayed</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        -
                      </Button>
                      <span className="w-8 text-center">2</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-green-50 px-2 py-1 text-black">
                    <span>Minimal</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        -
                      </Button>
                      <span className="w-8 text-center">3</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-gray-100 px-2 py-1 text-black">
                    <span>Expectant</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        -
                      </Button>
                      <span className="w-8 text-center">1</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-gray-200 px-2 py-1 text-black">
                    <span>Dead</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        -
                      </Button>
                      <span className="w-8 text-center">1</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-blue-100 px-2 py-1 text-black">
                    <span>Transport</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        -
                      </Button>
                      <span className="w-8 text-center">0</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Recorded</div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between bg-blue-50 px-2 py-1 text-black">
                    <span>Total</span>
                    <span>0</span>
                  </div>
                  <div className="flex items-center justify-between bg-red-50 px-2 py-1 text-black">
                    <span>Immediate</span>
                    <span>0</span>
                  </div>
                  <div className="flex items-center justify-between bg-yellow-50 px-2 py-1 text-black">
                    <span>Delayed</span>
                    <span>0</span>
                  </div>
                  <div className="flex items-center justify-between bg-green-50 px-2 py-1 text-black">
                    <span>Minimal</span>
                    <span>0</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-100 px-2 py-1 text-black">
                    <span>Expectant</span>
                    <span>0</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-200 px-2 py-1 text-black">
                    <span>Dead</span>
                    <span>0</span>
                  </div>
                  <div className="flex items-center justify-between bg-blue-100 px-2 py-1 text-black">
                    <span>Transported</span>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>First Responders on Scene</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {[
              {
                name: "Fiona Kimber",
                role: "Fire Chief",
                department: "Nelson Fire & Rescue",
                arrival: "10:45 AM",
                badge: "Medical Group Supervisor",
              },
              {
                name: "Allie Smith",
                role: "Paramedic",
                department: "Nelson Fire & Rescue",
                arrival: "10:45 AM",
              },
              {
                name: "Norman Itium",
                role: "EMS Chief",
                department: "Nelson Fire & Rescue",
                arrival: "11:05 AM",
              },
            ].map((responder) => (
              <div key={responder.name} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{responder.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{responder.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {responder.role} • {responder.department}
                    </div>
                    <div className="text-sm text-muted-foreground">Arrival: {responder.arrival}</div>
                  </div>
                </div>
                <div>
                  {responder.badge ? (
                    <Badge className="bg-blue-500">
                      <Star className="mr-1 h-3 w-3" />
                      {responder.badge}
                    </Badge>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          Assign Role
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4 text-blue-500" />
                          Medical Group Supervisor
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4 text-red-500" />
                          Triage Officer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4 text-purple-500" />
                          Treatment Officer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4 text-yellow-500" />
                          Staging Officer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4 text-green-500" />
                          Transport Officer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

