"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type AIAvatar = {
  id: string
  name: string
  role: string
  description: string
  imageUrl: string
}

type AvatarContextType = {
  avatars: AIAvatar[]
  selectedAvatarId: string
  addAvatar: () => void
  deleteAvatar: (id: string) => void
  updateAvatar: (id: string, field: keyof AIAvatar, value: string) => Promise<void>
  selectAvatar: (id: string) => void
  saveChanges: () => Promise<void>
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined)

export function AvatarProvider({ children }: { children: ReactNode }) {
  const [avatars, setAvatars] = useState<AIAvatar[]>([
    {
      id: "1",
      name: "Medical Director AI",
      role: "Medical Director",
      description: "AI assistant for medical directors",
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Triage Officer AI",
      role: "Triage Officer",
      description: "AI assistant for triage officers",
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      name: "Emergency Manager AI",
      role: "Emergency Management Official",
      description: "AI assistant for emergency management",
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "4",
      name: "Fire Chief AI",
      role: "Fire Department Chief",
      description: "AI assistant for fire department chiefs",
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
  ])
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(avatars[0].id)

  const addAvatar = () => {
    const newAvatar: AIAvatar = {
      id: Date.now().toString(),
      name: "New AI Avatar",
      role: "Unspecified",
      description: "Description of the new AI avatar",
      imageUrl: "/placeholder.svg?height=100&width=100",
    }
    setAvatars([...avatars, newAvatar])
    setSelectedAvatarId(newAvatar.id)
  }

  const deleteAvatar = (id: string) => {
    if (avatars.length <= 1) {
      return // Prevent deleting the last avatar
    }
    
    setAvatars(avatars.filter((avatar) => avatar.id !== id))
    if (selectedAvatarId === id) {
      const remainingAvatars = avatars.filter((avatar) => avatar.id !== id)
      setSelectedAvatarId(remainingAvatars[0]?.id || "")
    }
  }

  const updateAvatar = async (id: string, field: keyof AIAvatar, value: string) => {
    setAvatars(avatars.map((avatar) => 
      avatar.id === id ? { ...avatar, [field]: value } : avatar
    ))
  }

  const selectAvatar = (id: string) => {
    setSelectedAvatarId(id)
  }

  const saveChanges = async () => {
    try {
      const response = await fetch('/api/save-avatars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(avatars),
      })

      if (!response.ok) {
        throw new Error('Failed to save avatars')
      }
    } catch (error) {
      console.error('Error saving avatars:', error)
      throw error
    }
  }

  return (
    <AvatarContext.Provider 
      value={{ 
        avatars, 
        selectedAvatarId, 
        addAvatar, 
        deleteAvatar, 
        updateAvatar, 
        selectAvatar,
        saveChanges
      }}
    >
      {children}
    </AvatarContext.Provider>
  )
}

export function useAvatars() {
  const context = useContext(AvatarContext)
  if (context === undefined) {
    throw new Error("useAvatars must be used within an AvatarProvider")
  }
  return context
}
