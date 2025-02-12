"use client";
import Image from "next/image";
import React from "react";
import { CalendarDays, Check, Clock } from "lucide-react";
import placeHolderImage from "../../../public/landscapePlaceholder.svg";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components";
import { TDifficulty } from "@/lib/types";

export default function QuestHistoryCard(props: {
  quest_title: string;
  quest_difficulty: TDifficulty;
  quest_main_picture: string;
  quest_total_levels: number;
  attempted_at: string;
  result: number;
  time_spent: number;
}) {
  const attemptDate = new Date(props.attempted_at).toLocaleString(navigator.language, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).replace(',', '')
  return (
    <Card className={"relative rounded-[50px] h-auto pb-4 cursor-pointer"}>
        <Image width={500} height={500} className={"rounded-[50px] p-2 aspect-square object-cover"} src={props.quest_main_picture ? props.quest_main_picture : placeHolderImage} alt={"quest preview image"}/>
        <Badge className={"absolute top-6 left-6"}>
          {props.quest_difficulty}
        </Badge>
      <div className={"p-3 flex flex-col gap-1.5 justify-items-start"}>
        <h1 className={"text-[20px]"}>{props.quest_title}</h1>
        <div className={"flex flex-row gap-2"}>
          <Check/>
          {props.result}/{props.quest_total_levels}
        </div>
        <div className={"flex flex-row gap-2"}>
          <Clock/>
          {props.time_spent} min
        </div>
        <div className={"flex flex-row gap-2"}>
          <CalendarDays/>
          {attemptDate}
        </div>
      </div>
    </Card>
  )
}
