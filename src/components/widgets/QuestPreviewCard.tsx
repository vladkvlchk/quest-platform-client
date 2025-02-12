"use client";

import Image from "next/image";
import { CircleUser, MapPin, ClipboardList, Clock, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";

export default function QuestPreviewCard(props: {
  _id: string;
  name: string;
  title: string;
  description: string;
  players: number;
  avg_rating: number;
  levels: any[];
  time_limit: number;
  location?: string;
  rating?: number;
  main_picture: string;
  difficulty: string;
}) {
  return (
    <Card className="cursor-pointer h-auto">
      <CardHeader>
        <Card className="w-full h-40 flex items-center justify-center relative overflow-hidden bg-slate-100 dark:bg-gray-900">
          <Badge className="absolute top-2 left-2 z-10 ">
            {props.difficulty}
          </Badge>
          <Badge className="absolute top-2 right-2 z-10 gap-1 px-2">
            {props.avg_rating} <Star size={16} />
          </Badge>
          {props.main_picture ? (
            <Image
              className="w-full h-auto object-cover"
              src={props.main_picture}
              alt={props.title}
              fill
              sizes="100vw"
            />
          ) : (
            <CardDescription>no image</CardDescription>
          )}
        </Card>
      </CardHeader>
      <CardContent>
        <CardTitle>{props.title || "[No title]"}</CardTitle>
        <CardDescription className="mt-1 mb-3">
          {props.description || "[No description]"}
        </CardDescription>
        <div className="flex justify-between">
          <div className="flex mt-1 gap-1">
            <MapPin />
            {props.location || "online"}
          </div>
          <div className="flex mt-1 gap-1">
            <Clock />
            {props.time_limit + " min" || "[no-limit]"}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex mt-3 gap-1">
            <ClipboardList />
            {props.levels ? props.levels?.length + " levels" : ""}
          </div>
          <div className="flex mt-3 gap-1">
            <CircleUser />
            {props.players}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
