"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"

type Document = {
  id: string
  name: string
  content: string
  size: string;
  sizeInBytes: number;
  type: string;
  uploadDate: Date;
  file?: File;
  // Add any other relevant properties
}

type AIAvatar = {
  id: string
  name: string
  role: string
  description: string
  imageUrl: string
  documents: Document[]
}

type Message = {
  id: string
  content: string
  sender: "user" | "agent"
  timestamp: string
}

type AgentContextType = {
  avatars: AIAvatar[]
  setAvatars: React.Dispatch<React.SetStateAction<AIAvatar[]>>
  selectedAgent: string | null
  selectAgent: (agentId: string) => void
  messages: Message[]
  addMessage: (message: Message) => void
  updateAvatar: (updatedAvatar: AIAvatar) => void
}

const initialAvatars: AIAvatar[] = [
  {
    id: "1",
    name: "Medical Director AI",
    role: "Medical Director",
    description: "AI assistant for medical directors",
    imageUrl: "/medical_ai.png",
    documents: [],
  },
  {
    id: "2",
    name: "Triage Officer AI",
    role: "Triage Officer",
    description: "AI assistant for triage officers",
    imageUrl: "/triage_ai.png",
    documents: [],
  },
  {
    id: "3",
    name: "Emergency Manager AI",
    role: "Emergency Management Official",
    description: "AI assistant for emergency management",
    imageUrl: "/emergency_ai.png",
    documents: [],
  },
  {
    id: "4",
    name: "Fire Chief AI",
    role: "Fire Department Chief",
    description: "AI assistant for fire department chiefs",
    imageUrl: "/fire_ai.jpeg",
    documents: [],
  },
]

const AgentContext = createContext<AgentContextType | undefined>(undefined)

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const [avatars, setAvatars] = useState<AIAvatar[]>(initialAvatars)
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  const selectAgent = useCallback((agentId: string) => {
    setSelectedAgent(agentId)
    setMessages([])
  }, [])

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message])
  }, [])

  const updateAvatar = useCallback((updatedAvatar: AIAvatar) => {
    setAvatars((prevAvatars) => prevAvatars.map((avatar) => (avatar.id === updatedAvatar.id ? updatedAvatar : avatar)))
  }, [])

  // Persist avatars to localStorage
  useEffect(() => {
    localStorage.setItem("avatars", JSON.stringify(avatars))
  }, [avatars])

  // Load avatars from localStorage on initial render
  useEffect(() => {
    const storedAvatars = localStorage.getItem("avatars")
    if (storedAvatars) {
      setAvatars(JSON.parse(storedAvatars))
    }
  }, [])

  return (
    <AgentContext.Provider
      value={{
        avatars,
        setAvatars,
        selectedAgent,
        selectAgent,
        messages,
        addMessage,
        updateAvatar,
      }}
    >
      {children}
    </AgentContext.Provider>
  )
}

export function useAgent() {
  const context = useContext(AgentContext)
  if (context === undefined) {
    throw new Error("useAgent must be used within an AgentProvider")
  }
  return context
}

