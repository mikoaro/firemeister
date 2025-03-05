"use client";

import type React from "react";

import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusCircle,
  Trash2,
  Grid,
  List,
  Upload,
  BotIcon,
  FileText,
  AlertCircle,
  X,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAgent } from "@/lib/context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ScrollArea } from "../ui/scroll-area";

export function PersonalAISettings() {
  const { avatars, setAvatars, selectedAgent, selectAgent, updateAvatar } =
    useAgent();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "documents">(
    "profile"
  );
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleAddAvatar = () => {
    const newAvatar = {
      id: Date.now().toString(),
      name: "New AI Avatar",
      role: "Unspecified",
      description: "Description of the new AI avatar",
      imageUrl: "/placeholder.svg?height=100&width=100",
      documents: [],
    };
    setAvatars([...avatars, newAvatar]);
    selectAgent(newAvatar.id);
  };

  const handleDeleteAvatar = (id: string) => {
    setAvatars(avatars.filter((avatar) => avatar.id !== id));
    if (selectedAgent === id && avatars.length > 1) {
      selectAgent(avatars.find((avatar) => avatar.id !== id)?.id || "");
    }
  };

  const handleUpdateAvatar = (
    id: string,
    field: keyof (typeof avatars)[0],
    value: string
  ) => {
    const avatarToUpdate = avatars.find((avatar) => avatar.id === id);
    if (avatarToUpdate) {
      const updatedAvatar = { ...avatarToUpdate, [field]: value };
      updateAvatar(updatedAvatar);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please upload an image file",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Image size should be less than 5MB",
      });
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    if (currentAvatar) {
      handleUpdateAvatar(currentAvatar.id, "imageUrl", imageUrl);
      toast.success("Image uploaded", {
        description: "Avatar image has been updated successfully",
      });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);

    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);

      // Check for duplicate file names in the current avatar
      const currentAvatar = avatars.find(
        (avatar) => avatar.id === selectedAgent
      );
      if (currentAvatar) {
        const existingFileNames = currentAvatar.documents.map(
          (doc) => doc.name
        );
        const duplicates = filesArray.filter((file) =>
          existingFileNames.includes(file.name)
        );

        if (duplicates.length > 0) {
          setUploadError(
            `Duplicate file(s) detected: ${duplicates
              .map((f) => f.name)
              .join(", ")}`
          );
          return;
        }
      }

      setSelectedFiles(filesArray as File[]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadFiles = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + Math.random() * 20;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 500);

    /// Start - To Personal

    // Create FormData
    const formData = new FormData();
    formData.append("file", selectedFiles[0]);
    formData.append(
      "message_request",
      JSON.stringify({
        DomainName: "mikoarodevelopergmailcom2606",
        Title: title,
      })
    );

    // Make API request
    const response = await fetch("https://api.personal.ai/v1/upload-file", {
      method: "POST",
      headers: {
        "x-api-key": "your-api-key-here",
      },
      body: formData,
    });

    /// End - To Personal

    // In a real app, you would upload the files to a server here
    // For this demo, we'll simulate a delay and then add the files to the avatar
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);

      const newDocuments: CustomDocument[] = selectedFiles.map((file) => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: formatFileSize(file.size),
        sizeInBytes: file.size,
        type: file.type || getFileType(file.name),
        uploadDate: new Date(),
        file: file,
      }));

      setAvatars(
        avatars.map((avatar) =>
          avatar.id === selectedAgent
            ? { ...avatar, documents: [...avatar.documents, ...newDocuments] }
            : avatar
        )
      );

      setSelectedFiles([]);
      setIsUploading(false);
    }, 2000);
  };

  const handleCancelUpload = () => {
    setSelectedFiles([]);
    setUploadProgress(0);
    setIsUploading(false);
    setUploadError(null);
  };

  const handleDeleteDocument = (avatarId: string, documentId: string) => {
    setAvatars(
      avatars.map((avatar) =>
        avatar.id === avatarId
          ? {
              ...avatar,
              documents: avatar.documents.filter(
                (doc) => doc.id !== documentId
              ),
            }
          : avatar
      )
    );
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const getFileType = (filename: string): string => {
    const extension = filename.split(".").pop()?.toLowerCase() || "";

    switch (extension) {
      case "pdf":
        return "application/pdf";
      case "doc":
        return "application/msword";
      case "docx":
        return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      case "xls":
        return "application/vnd.ms-excel";
      case "xlsx":
        return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      case "ppt":
        return "application/vnd.ms-powerpoint";
      case "pptx":
        return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      case "txt":
        return "text/plain";
      case "csv":
        return "text/csv";
      default:
        return "application/octet-stream";
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return "📄";
    if (fileType.includes("word") || fileType.includes("msword")) return "📝";
    if (fileType.includes("excel") || fileType.includes("spreadsheet"))
      return "📊";
    if (fileType.includes("presentation") || fileType.includes("powerpoint"))
      return "📑";
    if (fileType.includes("text")) return "📃";
    return "📁";
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const currentAvatar = avatars.find((avatar) => avatar.id === selectedAgent);

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">All Digital Avatars</h3>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {avatars.map((avatar) => (
            <Card
              key={avatar.id}
              className={`cursor-pointer transition-colors ${
                selectedAgent === avatar.id
                  ? "border-primary"
                  : "hover:bg-accent"
              }`}
              onClick={() => selectAgent(avatar.id)}
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="relative w-16 h-16 mb-2 rounded-full overflow-hidden border">
                  <Image
                    src={avatar.imageUrl || "/placeholder.svg"}
                    alt={avatar.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <h4 className="font-semibold">{avatar.name}</h4>
                <p className="text-sm text-muted-foreground">{avatar.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              className={`flex items-center space-x-4 p-2 rounded-md cursor-pointer transition-colors ${
                selectedAgent === avatar.id ? "bg-accent" : "hover:bg-accent/50"
              }`}
              onClick={() => selectAgent(avatar.id)}
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden border">
                <Image
                  src={avatar.imageUrl || "/placeholder.svg"}
                  alt={avatar.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold">{avatar.name}</h4>
                <p className="text-sm text-muted-foreground">{avatar.role}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Agents Settings</CardTitle>
          <CardDescription>
            Configure your Agent avatars and digital assistants.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <Select value={selectedAgent || ""} onValueChange={selectAgent}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select AI Avatar" />
              </SelectTrigger>
              <SelectContent>
                {avatars.map((avatar) => (
                  <SelectItem key={avatar.id} value={avatar.id}>
                    {avatar.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => router.push(`/agents/${selectedAgent}`)}
                disabled={!selectedAgent}
              >
                <BotIcon className="h-5 w-5 mr-2" />
                Chat with Agent
              </Button>
              <Button variant="outline" onClick={handleAddAvatar}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Avatar
              </Button>
            </div>
          </div>
          {currentAvatar && (
            <div className="space-y-4">
              <Tabs
                value={activeTab}
                onValueChange={(value) =>
                  setActiveTab(value as "profile" | "documents")
                }
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="documents">
                    Documents ({currentAvatar.documents.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <div className="flex items-center space-x-4 space-y-5">
                    <div className="relative w-24 h-24 border rounded-full overflow-hidden">
                      <Image
                        src={currentAvatar.imageUrl || "/placeholder.svg"}
                        alt={currentAvatar.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button variant="outline" onClick={triggerFileInput}>
                        <Upload className="mr-2 h-4 w-4" /> Upload Image
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2 mt-5">
                    <Label htmlFor="avatar-name">Avatar Name</Label>
                    <Input
                      id="avatar-name"
                      value={currentAvatar.name}
                      onChange={(e) =>
                        handleUpdateAvatar(
                          currentAvatar.id,
                          "name",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2 mt-5">
                    <Label htmlFor="avatar-role">Role</Label>
                    <Input
                      id="avatar-role"
                      value={currentAvatar.role}
                      onChange={(e) =>
                        handleUpdateAvatar(
                          currentAvatar.id,
                          "role",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2 mt-5">
                    <Label htmlFor="avatar-description">Description</Label>
                    <Textarea
                      id="avatar-description"
                      value={currentAvatar.description}
                      onChange={(e) =>
                        handleUpdateAvatar(
                          currentAvatar.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteAvatar(currentAvatar.id)}
                    disabled={avatars.length <= 1}
                    className="mt-5"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Avatar
                  </Button>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        multiple
                        accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx,.ppt,.pptx"
                      />

                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={handleBrowseClick}
                          variant="outline"
                          className="flex-1"
                        >
                          <FileText className="mr-2 h-4 w-4" /> Browse Files
                        </Button>
                        {selectedFiles.length > 0 && (
                          <>
                            <Button
                              onClick={handleUploadFiles}
                              disabled={isUploading}
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              {isUploading
                                ? "Uploading..."
                                : `Upload ${selectedFiles.length} File${
                                    selectedFiles.length !== 1 ? "s" : ""
                                  }`}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleCancelUpload}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>

                      {selectedFiles.length > 0 && (
                        <div className="space-y-2 mt-2">
                          <div className="text-sm">
                            Selected {selectedFiles.length} file
                            {selectedFiles.length !== 1 ? "s" : ""}:
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            {selectedFiles.map((file, index) => (
                              <div key={index} className="flex items-center">
                                <span className="mr-2">
                                  {getFileIcon(
                                    file.type || getFileType(file.name)
                                  )}
                                </span>
                                <span className="truncate">{file.name}</span>
                                <span className="ml-2 text-xs">
                                  ({formatFileSize(file.size)})
                                </span>
                              </div>
                            ))}
                          </div>

                          {isUploading && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Uploading...</span>
                                <span>{Math.round(uploadProgress)}%</span>
                              </div>
                              <Progress
                                value={uploadProgress}
                                className="h-2"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {uploadError && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{uploadError}</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Upload documents specific to this AI avatar. These
                      documents will be used to train and inform this
                      avatar&apos;s responses.
                    </div>
                  </div>

                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-md">
                        Documents for {currentAvatar.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[300px]">
                        {currentAvatar.documents.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                            <FileText className="h-12 w-12 mb-2 opacity-20" />
                            <p>No documents uploaded yet</p>
                            <p className="text-sm">
                              Upload documents to enhance this AI avatar&apos;s
                              knowledge
                            </p>
                          </div>
                        ) : (
                          <div className="divide-y">
                            {currentAvatar.documents.map((doc) => (
                              <div
                                key={doc.id}
                                className="flex items-center justify-between p-4 hover:bg-muted/50"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="text-2xl">
                                    {getFileIcon(doc.type)}
                                  </div>
                                  <div>
                                    <p className="font-medium">{doc.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {doc.size} • Uploaded on{" "}
                                      {formatDate(doc.uploadDate)}
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handleDeleteDocument(
                                      currentAvatar.id,
                                      doc.id
                                    )
                                  }
                                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={() =>
              toast.success("Changes saved", {
                description: "Your AI avatar settings have been updated",
              })
            }
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
