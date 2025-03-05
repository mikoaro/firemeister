"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Trash2 } from "lucide-react"
import Image from "next/image"

type Gateway = {
  id: string
  name: string
  location: string
  connectedDevices: number
  status: "online" | "offline"
  imageUrl: string
}

type GatewayFormData = Omit<Gateway, "id"> & {
  id?: string
  file?: File | null
}

const initialGateways: Gateway[] = [
  {
    id: "1",
    name: "Gateway 1",
    location: "Downtown District",
    connectedDevices: 15,
    status: "online",
    imageUrl: "/fire_gateway.jpeg",
  },
  {
    id: "2",
    name: "Gateway 2",
    location: "Industrial Park",
    connectedDevices: 8,
    status: "online",
    imageUrl: "/fire_gateway.jpeg",
  },
]

export default function FireGatewaySettings() {
  const [gateways, setGateways] = useState<Gateway[]>(initialGateways)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentGateway, setCurrentGateway] = useState<GatewayFormData>({
    name: "",
    location: "",
    connectedDevices: 0,
    status: "offline",
    imageUrl: "/placeholder.svg?height=50&width=50",
    file: null,
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleAddGateway = () => {
    setCurrentGateway({
      name: "",
      location: "",
      connectedDevices: 0,
      status: "offline",
      imageUrl: "/placeholder.svg?height=50&width=50",
      file: null,
    })
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const handleEditGateway = (gateway: Gateway) => {
    setCurrentGateway({ ...gateway, file: null })
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDeleteGateway = (id: string) => {
    setGateways(gateways.filter((gateway) => gateway.id !== id))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setCurrentGateway({
        ...currentGateway,
        imageUrl,
        file,
      })
    }
  }

  const handleSaveGateway = () => {
    const gatewayToSave: Gateway = {
      id: currentGateway.id || Date.now().toString(),
      name: currentGateway.name,
      location: currentGateway.location,
      connectedDevices: currentGateway.connectedDevices,
      status: currentGateway.status,
      imageUrl: currentGateway.imageUrl,
    }

    if (isEditing) {
      setGateways(gateways.map((gateway) => (gateway.id === gatewayToSave.id ? gatewayToSave : gateway)))
    } else {
      setGateways([...gateways, gatewayToSave])
    }
    setIsDialogOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentGateway({
      ...currentGateway,
      [name]: name === "connectedDevices" ? Number.parseInt(value, 10) : value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setCurrentGateway({
      ...currentGateway,
      [name]: value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fire Gateway Settings</CardTitle>
        <CardDescription>Manage gateways for fire detection devices.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" onClick={handleAddGateway}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Gateway
        </Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Connected Devices</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gateways.map((gateway) => (
              <TableRow key={gateway.id}>
                <TableCell>
                  <div className="relative w-10 h-10">
                    <Image
                      src={gateway.imageUrl || "/placeholder.svg?height=50&width=50"}
                      alt={gateway.name}
                      width={40}
                      height={40}
                      style={{ objectFit: "cover" }}
                      className="rounded-md"
                    />
                  </div>
                </TableCell>
                <TableCell>{gateway.name}</TableCell>
                <TableCell>{gateway.location}</TableCell>
                <TableCell>{gateway.connectedDevices}</TableCell>
                <TableCell>
                  <Badge variant={gateway.status === "online" ? "default" : "destructive"}>{gateway.status}</Badge>
                </TableCell>
                <TableCell className="flex justify-center">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditGateway(gateway)}>
                      {/* <Edit className="h-4 w-4" /> */}
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteGateway(gateway.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Gateway" : "Add New Gateway"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Make changes to the gateway details below." : "Fill in the details for the new gateway."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="relative w-16 h-16 flex-shrink-0 border rounded-md overflow-hidden">
                      <Image
                        src={currentGateway.imageUrl || "/placeholder.svg?height=64&width=64"}
                        alt="Preview"
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-md"
                      />
                    </div>
                    <Input
                      id="file"
                      name="file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={currentGateway.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Gateway name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={currentGateway.location}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Gateway location"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="connectedDevices" className="text-right">
                  Connected Devices
                </Label>
                <Input
                  id="connectedDevices"
                  name="connectedDevices"
                  type="number"
                  value={currentGateway.connectedDevices}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Number of connected devices"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select value={currentGateway.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveGateway}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter>
        <Button>Save All Changes</Button>
      </CardFooter>
    </Card>
  )
}

