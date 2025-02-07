"use client";
import img from "../../../../public/questImgPlaceholder.png";
import { useRouter } from "next/navigation";
import QuestPreviewCard from "@/components/widgets/QuestPreviewCard";

const mockItems = [
  {
    id: 1,
    name: "First Quest",
    description: "This is the first quest",
    tasks: 5,
    players: 2,
    time: 30,
    img: img,
    rating: 4,
    format: "Онлайн/Місто",
  },
  {
    id: 2,
    name: "Second Quest",
    description: "This is the second quest",
    tasks: 5,
    players: 2,
    time: 30,
    img: img,
    rating: 4,
    format: "Онлайн/Місто",
  },
  {
    id: 3,
    name: "Third Quest",
    description: "This is the third quest",
    tasks: 5,
    players: 2,
    time: 30,
    img: img,
    rating: 4,
    format: "Онлайн/Місто",
  },
  {
    id: 4,
    name: "Forth Quest",
    description: "This is the forth quest",
    tasks: 5,
    players: 2,
    time: 30,
    img: img,
    rating: 4,
    format: "Онлайн/Місто",
  },
];

export default function ExploreQuestsPage() {
  const router = useRouter();

  const onClickCard = (id: string | number) => router.push("/quest/" + id);

  return (
    <div className="grid grid-cols-3 gap-4 px-3">
      {mockItems.map((item) => (
        <QuestPreviewCard key={item.id} onClickCard={onClickCard} {...item}/>
      ))}
    </div>
  );
}
