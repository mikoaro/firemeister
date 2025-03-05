"use client"

import { useEffect, useRef } from "react"

type Message = {
  id: string
  content: string
  sender: "user" | "agent"
  timestamp: string
}

interface AgentChatProps {
  messages: Message[]
}

export function AgentChat({ messages }: AgentChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]) // Only run when the messages array changes

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-[75%] rounded-lg p-3 ${
              message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            <p>{message.content}</p>
            <div className="text-xs opacity-70 mt-1 text-right">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

