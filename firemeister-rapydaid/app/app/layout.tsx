import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { AvatarProvider } from "@/context/avatar-context"; // Add this import
import { FireDataProvider } from "@/context/fire-data-context";
import { UserProvider } from "@/context/user-context";
import { ThemeProvider } from "next-themes";
import { WorkspaceProvider } from "@/context/workspace-context";
import { Toaster } from "sonner";
import { AgentProvider } from "@/lib/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FireMeister Resiliency System",
  description: "AI-powered fire detection and hospital response system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <UserProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {" "}
          {/* Add UserProvider here */}
          <WorkspaceProvider>
            <AvatarProvider>
              <FireDataProvider>
                <div className="flex w-full">
                <AgentProvider>{children}</AgentProvider>

                  <Toaster />
                </div>
              </FireDataProvider>
            </AvatarProvider>
          </WorkspaceProvider>
        </ThemeProvider>
      </UserProvider>
    </div>
  );
}
