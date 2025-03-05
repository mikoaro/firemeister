import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/utils/constants";
import { UserProvider } from "@/context/user-context";
import { ThemeProvider } from "next-themes";
import { WorkspaceProvider } from "@/context/workspace-context";
import { AvatarProvider } from "@/context/avatar-context";
import { FireDataProvider } from "@/context/fire-data-context";
import { AgentProvider } from "@/lib/context";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
