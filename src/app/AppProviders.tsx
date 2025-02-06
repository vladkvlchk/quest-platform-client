"use client";

import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";

import queryClient from "@/lib/query-client-provider";
export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children} <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
}
