"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/forms/LoginForm";
import { RegisterForm } from "@/components/forms/RegisterForm";
import Image from "next/image";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const onChangeTab = (value: string) =>
    setActiveTab(value as "login" | "register");

  return (
    <div className="flex min-h-screen">
      {/* Left Image Section - Only on md+ screens */}
      <div className="hidden md:block w-1/2 relative">
        <Image
          src="/authPageCover.jpeg"
          alt="Authentication Image"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center w-full md:w-1/2 p-6">
        <Tabs
          value={activeTab}
          onValueChange={onChangeTab}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
