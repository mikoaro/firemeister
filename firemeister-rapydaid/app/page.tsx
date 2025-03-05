import { DashboardLayout } from "@/components/dashboard-layout";
import { Overview } from "@/components/overview";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex w-full p-6">
        <Overview />
      </div>
    </DashboardLayout>
  );
}
