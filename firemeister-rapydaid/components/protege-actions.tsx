import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, FileText, Scale, PenTool } from "lucide-react"

const actions = [
  {
    title: "Conduct Legal Research",
    description: "You are tasked with conducting legal research on specific topics, cases, or statutes.",
    icon: BookOpen,
  },
  {
    title: "Summarize Legal Documents",
    description: "Your task is to summarize lengthy legal documents into concise, actionable insights.",
    icon: FileText,
  },
  {
    title: "Provide Case Analysis",
    description: "Analyze legal cases based on user requirements and relevant precedents.",
    icon: Scale,
  },
  {
    title: "Draft Legal Queries",
    description: "Assist in drafting precise and well-structured legal queries.",
    icon: PenTool,
  },
]

export function ProtegeActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {actions.map((action, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <action.icon className="h-5 w-5" />
                    {action.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                  <Button className="w-full mt-4" variant="outline">
                    Start Training
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

