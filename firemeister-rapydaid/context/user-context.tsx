"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "sonner"

// Define the User type
export type User = {
  id: string
  name: string
  email: string
  role: string
  avatar_url: string | null
}

// Define the context type
type UserContextType = {
  user: User | null
  loading: boolean
  updateProfile: (data: Partial<User>, imageFile?: File | null) => Promise<void>
  isUpdating: boolean
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined)

// Custom hook to use the user context
export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

// Mock initial user data - replace with your actual data fetching logic
const mockUser: User = {
  id: "user-123",
  name: "John Doe",
  email: "john@example.com",
  role: "Developer",
  avatar_url: "/user.png",
}

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  // Fetch user data on mount
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true)

        // Simulate API call with setTimeout
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // In a real app, you would fetch the user from your API
        // const response = await fetch('/api/user')
        // const userData = await response.json()
        // setUser(userData)

        // Using mock data for now
        setUser(mockUser)
      } catch (error) {
        console.error("Error fetching user:", error)
        toast.error("Failed to load user data")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  // Update user profile
  const updateProfile = async (data: Partial<User>, imageFile?: File | null) => {
    setIsUpdating(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would:
      // 1. Upload the image if provided
      // 2. Update the user profile with the API

      let newAvatarUrl = user?.avatar_url

      if (imageFile) {
        // Simulate image upload
        // In a real app, you would upload to your storage service
        newAvatarUrl = URL.createObjectURL(imageFile)

        // Note: In production, you'd upload the file and get a real URL
        // const formData = new FormData()
        // formData.append('file', imageFile)
        // const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
        // const { url } = await uploadRes.json()
        // newAvatarUrl = url
      }

      // Update the user in state
      const updatedUser = {
        ...user!,
        ...data,
        ...(newAvatarUrl && { avatar_url: newAvatarUrl }),
      }

      // In a real app, you would send this to your API
      // await fetch('/api/user', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedUser)
      // })

      setUser(updatedUser as User)

      toast.success("Profile updated", {
        description: "Your profile has been updated successfully",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Error", {
        description: error instanceof Error ? error.message : "Failed to update profile",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  // Provide the context value
  const value = {
    user,
    loading,
    updateProfile,
    isUpdating,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

