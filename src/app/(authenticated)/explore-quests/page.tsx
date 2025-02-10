"use client";

import { useRouter } from "next/navigation";

import QuestPreviewCard from "@/components/widgets/QuestPreviewCard";
import { useQuests } from "@/hooks";
import { CardDescription, CardHeader, CardTitle } from "@/components";

export default function ExploreQuestsPage() {
  const router = useRouter();

  const { data: quests, isLoading, error } = useQuests();

  const onClickCard = (id: string) => router.push("/quest/" + id);

  if (isLoading) return <p>Loading...</p>;
  if (error || !Array.isArray(quests)) return <p>Error loading quests</p>;
  return (
    <>
      <CardHeader>
        <CardTitle>Explore Quests</CardTitle>
        <CardDescription>Find the quests that you want to join</CardDescription>
      </CardHeader>
      <div className="grid grid-cols-2 gap-4 px-3 md:grid-cols-3 mb-10">
        {quests.reverse().map((item) => (
          <div key={item._id} onClick={() => onClickCard(item._id)}>
            <QuestPreviewCard players={0} {...item} />
          </div>
        ))}
      </div>
    </>
  );
}
