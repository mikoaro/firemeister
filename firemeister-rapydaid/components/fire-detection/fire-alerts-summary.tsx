"use client"

import { useFireData } from "@/context/fire-data-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Flame, ArrowRight } from "lucide-react"
import Link from "next/link"

export function FireAlertsSummary({ limit = 3 }: { limit?: number }) {
  const { fireAlerts } = useFireData()

  // Sort by timestamp (newest first) and limit
  const recentAlerts = [...fireAlerts].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, limit)

  return (
    <div className="space-y-4">
      {recentAlerts.length === 0 ? (
        <div className="flex h-[100px] items-center justify-center rounded-md border border-dashed">
          <p className="text-sm text-muted-foreground">No recent alerts</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 rounded-lg border p-3
                ${
                  alert.severity === "high"
                    ? "fire-alert-high"
                    : alert.severity === "medium"
                      ? "fire-alert-medium"
                      : alert.severity === "low"
                        ? "fire-alert-low"
                        : "fire-alert-none"
                }`}
            >
              <Flame className="mt-0.5 h-5 w-5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{alert.location}</h4>
                  <span className="text-xs">{alert.timestamp.toLocaleTimeString()}</span>
                </div>
                <p className="text-sm">{alert.description}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="outline" className="bg-background/50">
                    {alert.severity} severity
                  </Badge>
                  {alert.isNew && (
                    <Badge
                      variant="outline"
                      className="bg-blue-500/10 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      New
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {fireAlerts.length > limit && (
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href="/app/fire-detection">
            View all alerts <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  )
}

