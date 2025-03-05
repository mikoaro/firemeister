"use client";

import { Agents } from "@/components/agents";
import { MainContent } from "@/components/main-content";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAgent } from "@/lib/context";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function ChatPage() {
  // Add this to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const params = useParams();
  const avatarId = params.id as string;
  const { selectAgent } = useAgent();

  // Set the selected agent based on URL parameter - only run once when component mounts
  useEffect(() => {
    if (avatarId) {
      selectAgent(avatarId);
    }
  }, [avatarId, selectAgent]); // Remove selectAgent from dependencies since it's now stable

  // Only show the UI after mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[95vh] bg-background text-foreground w-full">
        <div className="flex flex-1">
          <Agents selectedAvatarId={avatarId} />
          <MainContent avatarId={avatarId} />
        </div>
      </div>
    </DashboardLayout>
  );
}
