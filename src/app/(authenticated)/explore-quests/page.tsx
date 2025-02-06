"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const mockItems = [
  {
    id: 1,
    name: "First Quest",
  },
  {
    id: 2,
    name: "Second Quest",
  },
  {
    id: 3,
    name: "Third Quest",
  },
  {
    id: 4,
    name: "Forth Quest",
  },
];

export default function ExploreQuestsPage() {
  const router = useRouter();

  const onClickCard = (id: string | number) => router.push("/quest/" + id);

  return (
    <div>
      <h1>Explore Quests</h1>
      {mockItems.map((item) => (
        <Card
          key={item.id}
          className="w-[350px] cursor-pointer"
          onClick={() => onClickCard(item.id)}
        >
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>#{item.id}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
