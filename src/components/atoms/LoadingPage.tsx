"use client";

import { LoaderCircle } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoaderCircle className="w-12 h-12 animate-spin" />
      <p className="mt-4 text-lg opacity-70">Loading...</p>
    </div>
  );
}
