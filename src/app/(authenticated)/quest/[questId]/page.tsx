"use client";

import { Quest } from "@/components/widgets/Quest";

export default async function Page({
  params,
}: {
  params: Promise<{ questId: string }>;
}) {
  const { questId } = await params;

  return (
    <div className="space-y-4 p-4">
      <Quest questId={questId} />
    </div>
  );
}
