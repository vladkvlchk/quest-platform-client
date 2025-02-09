"use client";

import { signOut, useSession } from "next-auth/react";
import {
  ChevronUp,
  CirclePlusIcon,
  CompassIcon,
  LogOutIcon,
  ScrollTextIcon,
  User2,
} from "lucide-react";
import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui";

export function AppSidebar() {
  const { data: session } = useSession();

  const onClickLogOut = () => signOut();

  if (!session) return <>loading...</>;
  return (
    <Sidebar className="flex-1">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>MVP Quests</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/explore-quests"}>
                    <CompassIcon />
                    <span>Explore Quest</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/create-quest"}>
                    <CirclePlusIcon />
                    <span>Create Quest</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="font-semibold text-md">
                  <Avatar className="h-8 w-auto rounded-md">
                    <AvatarImage src={session.user.avatar || undefined} />
                    <AvatarFallback className="border h-8 w-8 rounded-md bg-slate-200">
                      {session.user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>{" "}
                  {session.user.name || "Unknown name"}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuLabel>
                  {session.user.name || "Unknown name"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <User2 /> Profile
                  </DropdownMenuItem>
                </Link>
                <Link href="/my-quests">
                  <DropdownMenuItem className="cursor-pointer">
                    <ScrollTextIcon /> My Quests
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={onClickLogOut}
                >
                  <LogOutIcon /> Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
