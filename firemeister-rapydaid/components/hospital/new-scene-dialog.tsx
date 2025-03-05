"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface NewSceneDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

export function NewSceneDialog({ open, onOpenChange, onSubmit }: NewSceneDialogProps) {
  const [formData, setFormData] = useState({
    gpsLocation: "",
    city: "",
    state: "",
    zipcode: "",
    incidentName: "",
    patientCount: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-orange-400">New Scene Set Up</DialogTitle>
          <DialogDescription>
            You can start the scene without filling anything in. You can always update this information later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gpsLocation">GPS Location</Label>
              <Input
                id="gpsLocation"
                placeholder="37.3362, -121.9467"
                value={formData.gpsLocation}
                onChange={(e) => setFormData({ ...formData, gpsLocation: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="San Jose"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="California"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipcode">Zipcode</Label>
              <Input
                id="zipcode"
                placeholder="95128"
                value={formData.zipcode}
                onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="incidentName">Incident Name</Label>
              <Input
                id="incidentName"
                placeholder="Incident name"
                value={formData.incidentName}
                onChange={(e) => setFormData({ ...formData, incidentName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientCount">Approximate Number of Patients</Label>
              <Input
                id="patientCount"
                type="number"
                placeholder="0"
                value={formData.patientCount}
                onChange={(e) => setFormData({ ...formData, patientCount: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the incident..."
              className="min-h-[100px]"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Start Scene
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

