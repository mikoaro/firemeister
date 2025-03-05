import { InfoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface AgentProps {
  agent: {
    id: string
    name: string
    description: string
    imageUrl: string
    role: string
  }
  isActive: boolean
  onSelect: (agentId: string) => void
}

export function AgentCard({ agent, isActive, onSelect }: AgentProps) {
  return (
    <div
      className={`p-2 rounded-md border cursor-pointer mb-2 transition-colors duration-200 ${
        isActive ? "border border-purple-700" : "hover:border hover:border-purple-700"
      }`}
      onClick={() => onSelect(agent.id)}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="relative w-10 h-10 rounded-full overflow-hidden items-center">
            <Image
              src={agent.imageUrl || "/placeholder.svg"}
              alt={agent.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
        </div>
        <div className="flex-grow min-w-0 ml-1">
          <h3 className="text-sm font-medium truncate">{agent.name}</h3>
          <p className="text-xs text-muted-foreground truncate">{agent.role}</p>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{agent.description}</p>
        </div>
        <Button variant="ghost" size="sm" className="flex-shrink-0 h-6 w-6 p-0 ml-2">
          <InfoIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

