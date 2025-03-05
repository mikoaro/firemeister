"use client"

import { useState } from "react"
import { ArrowUpRight, CircleHelp, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AgentCard } from "@/components/agent-card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAgent } from "@/lib/context"
import { useRouter } from "next/navigation"

export function Agents({ selectedAvatarId }: { selectedAvatarId?: string }) {
  const [searchQuery, setSearchQuery] = useState("")
  const { avatars, selectAgent } = useAgent()
  const router = useRouter()

  const filteredAvatars = avatars.filter(
    (avatar) =>
      avatar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      avatar.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      avatar.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelectAgent = (agentId: string) => {
    selectAgent(agentId)
    router.push(`/app/agents/${agentId}`)
  }

  return (
    <div className="w-[280px] border-r overflow-y-auto flex flex-col justify-between">
      <div className="p-2">
        <h2 className="text-lg font-semibold mb-2">My Agents</h2>
        <div className="relative mt-5">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents"
            className="pl-8 border-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="py-5">
          {filteredAvatars.map((avatar) => (
            <AgentCard
              key={avatar.id}
              agent={avatar}
              isActive={avatar.id === selectedAvatarId}
              onSelect={handleSelectAgent}
            />
          ))}
          {filteredAvatars.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">No agents found matching "{searchQuery}"</div>
          )}
        </div>
      </div>

      <div className="p-2 border-t mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch id="playground-mode" />
            <Label htmlFor="playground-mode" className="flex gap-2">
              {" "}
              Playground <CircleHelp className="size-4" />{" "}
            </Label>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-black hover:text-white"
            onClick={() => router.push("/app/agents")}
          >
            Create Agent
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}

