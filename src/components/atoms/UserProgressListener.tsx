"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";

import { useSocket } from "@/hooks/useSocket";
import { IProgress } from "@/hooks/mutations/useProgressStore";
import { Card, CardContent, CardFooter, CardHeader, Progress } from "../ui";

const UserProgressListener = () => {
  const [progress, setProgress] = useState<null | IProgress>(null);
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !userId) return;

    socket.on(
      "userProgressUpdate",
      (data: { status: string; received: IProgress }) => {
        if (data.status !== "success") return null;
        console.log(data.received);
        setProgress(data.received);
        queryClient.setQueryData(["progress", userId], data.received);
      }
    );

    return () => {
      socket.off("userProgressUpdate");
    };
  }, [socket, userId, queryClient]);

  if (!progress) return <></>;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
          Live user progress:
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          quest:
          <Link href={`/quest/${progress?.quest_id}`}>
            <p className="hover:underline">{progress?.title}</p>
          </Link>
        </div>
        <p>
          current level: {progress?.current_level_index} /{" "}
          {progress?.level_amount}
        </p>
        <p>
          time left: {Math.ceil((progress?.ends_at - Date.now()) / 60000)}{" "}
          minutes
        </p>
      </CardContent>
      <CardFooter>
        <Progress
          value={(progress?.current_level_index / progress?.level_amount) * 100}
        />
      </CardFooter>
    </Card>
  );
};

export default UserProgressListener;
