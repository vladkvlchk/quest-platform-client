"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { IProgress } from "@/hooks/mutations/useProgressStore";
import { Card } from "../ui";

const UserProgressListener = () => {
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !userId) return;

    socket.on(
      "progressUpdate",
      (data: { userId: string; progress: IProgress }) => {
        if (data.userId === userId) {
          queryClient.setQueryData(["progress", userId], data.progress);
        }
      }
    );

    return () => {
      socket.off("progressUpdate");
    };
  }, [socket, userId, queryClient]);

  return <Card>progress Listener</Card>;
};

export default UserProgressListener;
