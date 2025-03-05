"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type WorkspaceContextType = {
  workspaceName: string
  setWorkspaceName: (name: string) => void
  teamSize: number
  setTeamSize: (size: number) => void
  notifications: boolean
  setNotifications: (enabled: boolean) => void
  collaboration: boolean
  setCollaboration: (enabled: boolean) => void
  logoUrl: string
  setLogoUrl: (url: string) => void
  isUploading: boolean
  setIsUploading: (uploading: boolean) => void
  isSaving: boolean
  setIsSaving: (saving: boolean) => void
  saveChanges: () => Promise<void>
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  // State for workspace settings
  const [workspaceName, setWorkspaceName] = useState("My Workspace")
  const [teamSize, setTeamSize] = useState<number>(5)
  const [notifications, setNotifications] = useState(true)
  const [collaboration, setCollaboration] = useState(true)

  // State for logo image
  const [logoUrl, setLogoUrl] = useState("/placeholder.svg?height=100&width=100")
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Save changes function
  const saveChanges = async () => {
    setIsSaving(true)

    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsSaving(false)
        resolve()
      }, 1000)
    })
  }

  const value = {
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
    setIsSaving,
    saveChanges,
  }

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext)
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider")
  }
  return context
}

