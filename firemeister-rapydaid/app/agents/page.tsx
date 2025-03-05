import { DashboardLayout } from "@/components/dashboard-layout"
import { PersonalAISettings } from "@/components/team/personal-ai-settings"

export default function AgentsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-5 w-full p-6">
        <div>
          <h1 className="text-3xl font-bold mb-6">Agents</h1>
          <p className="text-muted-foreground">Manage your AI Agents.</p>
        </div>

        <PersonalAISettings />
      </div>
    </DashboardLayout>
  )
}

