"use client";
import { useState, useEffect, useCallback, Key } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  FileIcon,
  FileText,
  PenTool,
  PlusIcon,
  CableCar,
  SendHorizonal,
  Upload,
  X,
} from "lucide-react";
import { AgentChat } from "@/components/agent-chat";
import { useAgent } from "@/lib/context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

const actions = [
  {
    title: "Assess Disaster Risks",
    icon: BookOpen,
  },
  {
    title: "Create Emergency Plan",
    icon: FileText,
  },
  {
    title: "Survival Skills Training",
    icon: CableCar,
  },
  {
    title: "Emergency Supply Checklist",
    icon: PenTool,
  },
];
interface FileUpload {
  id: string;
  progress: number | null | undefined;
  name: string;
  size: number;
  type: string;
}

export function MainContent({ avatarId }: { avatarId?: string }) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [input, setInput] = useState("");
  const { avatars, selectedAgent, messages, addMessage, selectAgent } =
    useAgent();
  const router = useRouter();

  useEffect(() => {
    if (avatarId) {
      selectAgent(avatarId);
    }
  }, [avatarId, selectAgent]);

  const currentAvatar = avatars.find(
    (avatar) => avatar.id === (avatarId || selectedAgent)
  );

  const handleSendMessage = async () => {
    if (!input.trim() || !currentAvatar) return;

    addMessage({
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date().toISOString(),
    });

    /// Start - To Personal

    //   {
    //     "Text": "Identify key aspects of emergency operations",
    //     "Context": "You are an AI Disaster Preparedness and Survival Skills Guide Agent. Your primary role is to assist users in preparing for and surviving various disaster scenarios. You will assess disaster risks, help create customized emergency plans, offer survival skills training, and generate emergency supply checklists. Your guidance should be practical, precise, and adaptable to different environments and needs, ensuring users are well-equipped to handle emergencies with confidence. Your tools include assessing risks via web searches and providing personalized recommendations based on user inputs.",
    //     "DomainName": "mikoarodevelopergmailcom2606",
    //     "UserName": "Miko",
    //     "SessionId": "d5e9f208-937c-4a9c-92bf-5fb90ce68ff6",
    //     "Events": "How to train your AI",
    //     "SourceName": "slack",
    //     "is_draft": true,
    //     "is_stack": true,
    //     "Metadata": {
    //         "key": "value"
    //     }
    // }

    //   {
    //     "Text": "Identify key aspects of emergency operations",
    //     "Context": "Reply in one sentence.",
    //     "DomainName": "mikoarodevelopergmailcom2606",
    //     "UserName": "Miko",
    //     "SessionId": "d5e9f208-937c-4a9c-92bf-5fb90ce68ff6",
    //     "Events": "How to train your AI",
    //     "SourceName": "slack",
    //     "is_draft": true,
    //     "is_stack": true,
    //     "Metadata": {
    //         "key": "value"
    //     }
    // }

    const contextString =
      "You are an AI Disaster Preparedness and Survival Skills Guide Agent. Your primary role is to assist users in preparing for and surviving various disaster scenarios. You will assess disaster risks, help create customized emergency plans, offer survival skills training, and generate emergency supply checklists. Your guidance should be practical, precise, and adaptable to different environments and needs, ensuring users are well-equipped to handle emergencies with confidence. Your tools include assessing risks via web searches and providing personalized recommendations based on user inputs.";

    // Create FormData
    // const formData = new FormData();
    // formData.append(
    //   "message_request",
    //   JSON.stringify({
    //     Text: "Identify key aspects of emergency operations",
    //     Context: "Reply in one sentence.",
    //     DomainName: "mikoarodevelopergmailcom2606",
    //     UserName: "Miko",
    //     SessionId: "d5e9f208-937c-4a9c-92bf-5fb90ce68ff5",
    //     Events: "How to train your AI",
    //     SourceName: "slack",
    //     is_draft: true,
    //     is_stack: true,
    //     Metadata: {
    //       key: "value",
    //     },
    //     // Text: input,
    //     // Context: contextString,
    //     // DomainName: "mikoarodevelopergmailcom2606",
    //     // UserName: "Miko",
    //     // SessionId: "d5e9f208-937c-4a9c-92bf-5fb90ce68ff6",
    //     // Events: "How to train your AI",
    //     // SourceName: "slack",
    //     // is_draft: true,
    //     // is_stack: true,
    //     // Metadata: {
    //     //   key: "value",
    //     // },
    //   })
    // );

    const messageData = JSON.stringify({
      Text: input,
      Context: contextString,
      DomainName: "mikoarodevelopergmailcom2606",
      UserName: "Miko",
      SessionId: "d5e9f208-937c-4a9c-92bf-5fb90ce68ff5",
      Events: "How to train your AI",
      SourceName: "slack",
      is_draft: true,
      is_stack: true,
      Metadata: {
        key: "value",
      },
    });

    // Make API request
    const response = await fetch("https://api.personal.ai/v1/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "your-api-key-here",
      },
      body: messageData,
    });

    const jsonInput = await response.json();

    /// End - To Personal

    // Simulate AI response

    addMessage({
      id: (Date.now() + 1).toString(),
      // content: `AI response to: ${input}`,
      content: jsonInput.ai_message,
      sender: "agent",
      timestamp: new Date().toISOString(),
    });

    // // Simulate AI response
    // setTimeout(() => {
    //   addMessage({
    //     id: (Date.now() + 1).toString(),
    //     content: `AI response to: ${input}`,
    //     sender: "agent",
    //     timestamp: new Date().toISOString(),
    //   });
    // }, 1000);

    setInput("");
  };
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // Simulate upload progress for each file
    newFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.id === file.id ? { ...f, progress: Math.min(progress, 100) } : f
          )
        );
        if (progress >= 100) {
          clearInterval(interval);
          addMessage({
            id: Math.random().toString(36).substr(2, 9),
            content: `File "${file.name}" has been uploaded successfully. Would you like me to summarize it?`,
            sender: "agent",
            timestamp: new Date().toISOString(),
          });
        }
      }, 500);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
    },
    multiple: true,
  });

  const removeFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {currentAvatar ? (
        <div className="flex flex-col h-full">
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={currentAvatar.imageUrl || "/placeholder.svg"}
                    alt={currentAvatar.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="font-bold text-lg">
                    {currentAvatar.name}
                  </span>
                  <span className="text-sm text-gray-500 block">
                    {currentAvatar.role}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <PlusIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={() => router.push("/agents")}
                >
                  Back
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {actions.map((action) => (
                  <Button
                    key={action.title}
                    variant={
                      selectedAction === action.title ? "default" : "outline"
                    }
                    className="h-20 flex flex-col items-center justify-center text-center"
                    onClick={() => setSelectedAction(action.title)}
                  >
                    <action.icon className="h-6 w-6 mb-2" />
                    <span className="text-xs">{action.title}</span>
                  </Button>
                ))}
              </div>

              {selectedAction === "Create Emergency Plan" && (
                <div className="mb-4">
                  <div
                    {...getRootProps()}
                    className={cn(
                      "border-2 border-dashed rounded-lg p-4 transition-colors",
                      isDragActive
                        ? "border-primary bg-primary/10"
                        : "border-muted",
                      files.length > 0 && "border-solid"
                    )}
                  >
                    <input {...getInputProps()} />
                    {files.length === 0 ? (
                      <div className="text-center py-8">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop your emergency related documents here,
                          or click to select files
                        </p>
                        <Button variant="outline">Select Files</Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {files.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center gap-2 bg-muted/50 rounded-lg p-2"
                          >
                            <FileIcon className="h-4 w-4 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)}
                              </p>
                              <Progress
                                value={file.progress}
                                className="h-1 mt-1"
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeFile(file.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          className="w-full mt-2"
                          {...getRootProps()}
                        >
                          Upload More Files
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-12 w-12 text-gray-500 mb-4"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Talk with {currentAvatar.name}
                </h3>
                <p className="text-gray-400 max-w-md">
                  Start a conversation with the AI agent to help you with{" "}
                  {currentAvatar.role.toLowerCase()} tasks.
                </p>
              </div>
            ) : (
              <AgentChat messages={messages} />
            )}
          </div>

          <div className="p-3">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Ask the agent..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="h-10 w-10"
              >
                <SendHorizonal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-12 w-12 text-gray-500 mb-4"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Select an Agent</h3>
          <p className="text-gray-400 max-w-md">
            Select an agent from the sidebar to start a conversation with AI
            assistance.
          </p>
        </div>
      )}
    </div>
  );
}
