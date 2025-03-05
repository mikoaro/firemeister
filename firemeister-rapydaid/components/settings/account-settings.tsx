"use client"

import React from "react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Upload, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useUser } from "@/context/user-context"

export function AccountSettings() {
  const { user, loading, updateProfile, isUpdating } = useUser()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    role: "",
  })

  // Update form data when user data is loaded
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
      })
    }
  }, [user])

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please select an image file",
      })
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Image must be less than 2MB",
      })
      return
    }

    setImageFile(file)
  }

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateProfile(formData, imageFile)
  }

  // Preview URL for the selected image
  const imagePreviewUrl = imageFile ? URL.createObjectURL(imageFile) : user?.avatar_url || null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account information and preferences.</CardDescription>
      </CardHeader>
      {loading ? (
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-24 h-24 bg-muted rounded-full overflow-hidden">
                {imagePreviewUrl ? (
                  <Image
                    src={imagePreviewUrl || "/user.png"}
                    alt="Profile Picture"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-muted text-muted-foreground">
                    {formData.name.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>
              <div>
                <Button type="button" variant="outline" onClick={handleUploadClick} disabled={isUpdating}>
                  <Upload className="mr-2 h-4 w-4" />
                  {isUpdating ? "Uploading..." : "Upload Image"}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <p className="text-sm text-muted-foreground mt-2">Recommended: Square image, max 2MB</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" placeholder="Your role" value={formData.role} onChange={handleChange} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isUpdating} className="mt-5">
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  )
}

