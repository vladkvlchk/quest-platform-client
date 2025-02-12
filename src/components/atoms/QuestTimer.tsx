"use client";

import { useProgressStore } from "@/hooks";
import { FC, useEffect, useState } from "react";

export const QuestTimer: FC = () => {
  const { progress, submitProgress } = useProgressStore();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!progress) return;

    const updateTimer = () => {
      const remaining = progress.ends_at - Date.now();
      setTimeLeft(remaining > 0 ? remaining : 0);

      if (remaining <= 0) {
        alert("time out!");
        submitProgress.mutate();

        clearInterval(timer);
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [progress]);

  if (!progress) return null;

  const minutes = Math.floor(timeLeft / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((timeLeft % 60000) / 1000)
    .toString()
    .padStart(2, "0");

  return (
    <b className="text-lg">
      {minutes}:{seconds}
    </b>
  );
};
