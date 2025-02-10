"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import QuestPreviewCard from "@/components/widgets/QuestPreviewCard";
import { useQuests } from "@/hooks";
import { CardDescription, CardHeader, CardTitle } from "@/components";

export default function MyQuestsPage() {
  const router = useRouter();

  const { data: quests, isLoading, error } = useQuests();
  const { data: session, status } = useSession();

  const onClickCard = (id: string) => router.push("/quest/" + id);

  if (isLoading || status === "loading") return <p>Loading...</p>;
  if (error || !Array.isArray(quests)) return <p>Error loading quests</p>;

  const onlyMyquests = quests
    ?.filter((quest) => quest.created_by === session?.user.id)
    .reverse();

  return (
    <>
      <CardHeader>
        <CardTitle>My Quests</CardTitle>
        <CardDescription>
          These are the quests that were created by the current user
        </CardDescription>
      </CardHeader>
      <div className="grid grid-cols-2 gap-4 px-3 md:grid-cols-3 mb-10">
        {onlyMyquests.map((item) => (
          <div key={item._id} onClick={() => onClickCard(item._id)}>
            <QuestPreviewCard players={0} {...item} />
          </div>
        ))}
      </div>
    </>
  );
}
