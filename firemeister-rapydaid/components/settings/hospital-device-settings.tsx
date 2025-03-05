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

type Device = {
  id: string
  name: string
  type: "triage" | "hospital"
  location: string
  status: "active" | "inactive"
  imageUrl: string
}

type DeviceFormData = Omit<Device, "id"> & {
  id?: string
  file?: File | null
}

const initialDevices: Device[] = [
  {
    id: "1",
    name: "Triage Tablet 1",
    type: "triage",
    location: "Emergency Vehicle 1",
    status: "active",
    imageUrl: "/hospital_device.png",
  },
  {
    id: "2",
    name: "Hospital Terminal 1",
    type: "hospital",
    location: "Central Hospital",
    status: "active",
    imageUrl: "/hospital_device.png",
  },
]

export default function HospitalDeviceSettings() {
  const [devices, setDevices] = useState<Device[]>(initialDevices)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentDevice, setCurrentDevice] = useState<DeviceFormData>({
    name: "",
    type: "triage",
    location: "",
    status: "inactive",
    imageUrl: "/placeholder.svg?height=50&width=50",
    file: null,
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleAddDevice = () => {
    setCurrentDevice({
      name: "",
      type: "triage",
      location: "",
      status: "inactive",
      imageUrl: "/placeholder.svg?height=50&width=50",
      file: null,
    })
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const handleEditDevice = (device: Device) => {
    setCurrentDevice({ ...device, file: null })
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDeleteDevice = (id: string) => {
    setDevices(devices.filter((device) => device.id !== id))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setCurrentDevice({
        ...currentDevice,
        imageUrl,
        file,
      })
    }
  }

  const handleSaveDevice = () => {
    const deviceToSave: Device = {
      id: currentDevice.id || Date.now().toString(),
      name: currentDevice.name,
      type: currentDevice.type as "triage" | "hospital",
      location: currentDevice.location,
      status: currentDevice.status as "active" | "inactive",
      imageUrl: currentDevice.imageUrl,
    }

    if (isEditing) {
      setDevices(devices.map((device) => (device.id === deviceToSave.id ? deviceToSave : device)))
    } else {
      setDevices([...devices, deviceToSave])
    }
    setIsDialogOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentDevice({
      ...currentDevice,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setCurrentDevice({
      ...currentDevice,
      [name]: value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hospital Device Settings</CardTitle>
        <CardDescription>Manage devices used for patient triage and in hospitals.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" onClick={handleAddDevice}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Device
        </Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.id}>
                <TableCell>
                  <div className="relative w-10 h-10">
                    <Image
                      src={device.imageUrl || "/placeholder.svg?height=50&width=50"}
                      alt={device.name}
                      width={40}
                      height={40}
                      style={{ objectFit: "cover" }}
                      className="rounded-md"
                    />
                  </div>
                </TableCell>
                <TableCell>{device.name}</TableCell>
                <TableCell>
                  <Badge variant={device.type === "triage" ? "secondary" : "default"}>{device.type}</Badge>
                </TableCell>
                <TableCell>{device.location}</TableCell>
                <TableCell>
                  <Badge variant={device.status === "active" ? "default" : "destructive"}>{device.status}</Badge>
                </TableCell>
                <TableCell className="flex justify-center">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditDevice(device)}>
                      {/* <Edit className="h-4 w-4" /> */} Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteDevice(device.id)}>
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
              <DialogTitle>{isEditing ? "Edit Device" : "Add New Device"}</DialogTitle>
              <DialogDescription>
                {isEditing ? "Make changes to the device details below." : "Fill in the details for the new device."}
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
                        src={currentDevice.imageUrl || "/placeholder.svg?height=64&width=64"}
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
                  value={currentDevice.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Device name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select value={currentDevice.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="triage">Triage</SelectItem>
                    <SelectItem value="hospital">Hospital</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={currentDevice.location}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Device location"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select value={currentDevice.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveDevice}>Save</Button>
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

