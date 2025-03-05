import { DashboardLayout } from "@/components/dashboard-layout";
import { SettingsLayout } from "@/components/settings/settings-layout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <SettingsLayout>
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings, personal AI configurations, workspace
          preferences, devices, and gateways.
        </p>
      </SettingsLayout>
    </DashboardLayout>
  );
}
