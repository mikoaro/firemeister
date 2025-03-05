"use client";
import { AlignJustify } from "lucide-react";
import { Button } from "./ui/button";
import AIChatButton from "@/components/AIChatButton";

export default function ConsoleHeader() {
    return (
        <header className="border-b border-gray-200 mt-12 h-13 fixed z-10 top-0 right-0 left-0 bg-white">
          <div className=" mx-auto px-0 sm:px-6 lg:px-4 flex justify-between items-center py-2">
            <AlignJustify className="" />
              <div className="flex items-center space-x-5">
                <Button className="rounded-full h-7">
                + Add widget
                </Button>
                <AIChatButton />
              </div>
          </div>
        </header>
      );    
}
