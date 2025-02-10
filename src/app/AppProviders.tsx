"use client";

import * as React from "react";

import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import queryClient from "@/lib/query-client-provider";
export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={false}>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children} <ReactQueryDevtools />
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

// export function ThemeProvider({
//   children,
//   ...props
// }: React.ComponentProps<typeof NextThemesProvider>) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
// }
