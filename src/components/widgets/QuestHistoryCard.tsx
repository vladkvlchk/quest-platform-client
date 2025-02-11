"use client";
import Image from "next/image";
import React from "react";
import { Clock, Star } from "lucide-react";
import placeHolderImage from "../../../public/landscapePlaceholder.svg";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components";
import { TDifficulty } from "@/lib/types";

export default function QuestHistoryCard(props: {
  quest_name: string;
  quest_difficulty: TDifficulty;
  quest_main_picture: string;
  result: number;
  time_spent: number;
}) {
  return (
    <Card className={"relative rounded-[50px] h-auto pb-4 cursor-pointer"}>
        <Image width={500} height={500} className={"rounded-[50px] p-2 aspect-square object-cover"} src={props.quest_main_picture ? props.quest_main_picture : placeHolderImage} alt={"quest preview image"}/>
        <Badge className={"absolute top-6 left-6"}>
          {props.quest_difficulty}
        </Badge>
      <div className={"p-3 justify-items-start"}>
        <h1 className={"text-[20px]"}>{props.quest_name}</h1>
        <div className={"flex flex-row gap-2"}>
          <Star/>
          {props.result}
        </div>
        <div className={"flex flex-row gap-2"}>
          <Clock/>
          {props.time_spent} min
        </div>
      </div>
    </Card>
  )
}
