import { DashboardLayout } from "@/components/dashboard-layout"
import { FireDetectionDashboard } from "@/components/fire-detection/fire-detection-dashboard"

export default function FireDetectionPage() {
  return (
    <DashboardLayout>
      <FireDetectionDashboard />
    </DashboardLayout>
  )
}

