import Link from "next/link";
import { CircleIcon, Ghost, Sun, Moon } from "lucide-react";
import { Input } from "./ui/input";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";

export default function HomeHeader() {
    return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex gap-8">
        <Link href="/" className="flex items-center">
          <CircleIcon className="h-6 w-6 text-orange-500" />
          <span className="ml-2 text-xl font-semibold text-gray-900">ACME</span>
        </Link>
        <Link href="/app">
        <h1 className="mt-1">Try App</h1>
        </Link>
        <Link href="/">
        <h1 className="mt-1">How it works</h1>
        </Link>
        <Link href="/app">
        <h1 className="mt-1">Documentation</h1>
        </Link>
        <Link href="/app">
        <h1 className="mt-1">GitHub</h1>
        </Link>
        </div>
        <div className="relative flex gap-5">
                <Input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full border rounded-lg p-2 text-sm"
                />
                <Button variant={Ghost} className="hover:bg-slate-100 w-5">
                    <Avatar className="h-5 w-5">
                    <AvatarImage src="/github.png" alt="social-icon" />
                    </Avatar>
                </Button>

                <Button variant={Ghost} className="hover:bg-slate-100 w-5">
                    <Avatar className="h-5 w-5">
                    <AvatarImage src="/x-social.png" alt="x-social" />
                    </Avatar>
                </Button>
                
                <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={Ghost} className="hover:bg-slate-100 w-5 shadow-none border-none">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
               
        </div>
      </div>
    </header>
      );    
}
