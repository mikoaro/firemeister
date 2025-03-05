"use client"

import { useRef, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"
import { Upload, Check } from "lucide-react"
import { toast } from "sonner"
import { useWorkspace } from "@/context/workspace-context"

export function WorkspaceSettings() {
  const {
    workspaceName,
    setWorkspaceName,
    teamSize,
    setTeamSize,
    notifications,
    setNotifications,
    collaboration,
    setCollaboration,
    logoUrl,
    setLogoUrl,
    isUploading,
    setIsUploading,
    isSaving,
    saveChanges,
  } = useWorkspace()

  // Hidden file input reference
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle logo upload button click
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please upload an image file",
      })
      return
    }

    setIsUploading(true)

    // Create a URL for the selected image
    const objectUrl = URL.createObjectURL(file)
    setLogoUrl(objectUrl)

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
      toast.success("Logo uploaded", {
        description: "Your workspace logo has been updated",
      })
    }, 1500)

    // Clean up the URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl)
  }

  // Handle form submission
  const handleSaveChanges = async () => {
    try {
      await saveChanges()
      toast.success("Changes saved", {
        description: "Your workspace settings have been updated",
        icon: <Check className="h-4 w-4" />,
      })
    } catch (error) {
      toast.error("Failed to save changes", {
        description: "Please try again later",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace Settings</CardTitle>
        <CardDescription>Configure your workspace preferences and team settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-24 h-24 border rounded-lg overflow-hidden">
            <Image
              src={logoUrl || "/placeholder.svg"}
              alt="Workspace Logo"
              fill
              sizes="(max-width: 96px) 100vw, 96px"
              className="object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                Uploading...
              </div>
            )}
          </div>
          <div>
            <Button variant="outline" onClick={handleUploadClick} disabled={isUploading}>
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Upload Logo"}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">Recommended: Square image, at least 128x128px</p>
            {/* Hidden file input */}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="workspace-name">Workspace Name</Label>
          <Input
            id="workspace-name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            placeholder="Your workspace name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="team-size">Team Size</Label>
          <Input
            id="team-size"
            type="number"
            value={teamSize}
            onChange={(e) => setTeamSize(Number.parseInt(e.target.value) || 0)}
            placeholder="Number of team members"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
          <Label htmlFor="notifications">Enable workspace notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="collaboration" checked={collaboration} onCheckedChange={setCollaboration} />
          <Label htmlFor="collaboration">Enable team collaboration features</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  )
}

