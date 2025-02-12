"use client";

import { FC, useState } from "react";
import { LoaderIcon, StarIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Textarea,
} from "../ui";
import axiosInstance from "@/lib/axios";

export const FeedbackForm: FC = () => {
  const { questId } = useParams();
  const router = useRouter();

  const [rating, setRating] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: async () =>
      await axiosInstance.patch(`/quest/${questId}/rate`, {
        rating,
        review: text,
      }),
  });

  const onClickShare = () => {
    mutateAsync();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onClickShare();
    }
  };

  if (isSuccess) router.push("/explore-quests");

  return (
    <Card className="w-1/2 mx-auto mt-8">
      <CardHeader className="text-center">
        <CardTitle>Share your feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((item) => (
            <StarIcon
              key={item}
              className="cursor-pointer"
              onClick={() => setRating(item)}
              fill={rating >= item ? "currentColor" : undefined}
            />
          ))}
        </div>
        <Textarea
          className="mt-4"
          placeholder="Do you like the quest?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </CardContent>
      <CardFooter>
        <Button
          className="w-max m-auto"
          onClick={onClickShare}
          disabled={isPending}
        >
          {isPending ? (
            <LoaderIcon className="animate-spin h-6 w-6" />
          ) : (
            "Share"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
