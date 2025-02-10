import { FC } from "react";

import { Button } from "../ui";
import { useLevelsStore } from "@/hooks";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { IAboutLevel, IInputLevel, IQuizLevel, TLevel } from "@/lib/types";

export const FinishButton: FC = () => {
  const { levels } = useLevelsStore();

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: async (levels: TLevel[]) => {
      const formData = new FormData();
      const about = levels[0] as IAboutLevel;
      const tasks = levels.slice(1) as (IInputLevel | IQuizLevel)[];
      const tasksPictures = tasks.map((lvl) => ({
        id: lvl.id,
        pictures: lvl.pictures,
      }));

      const filteredTasks = tasks.map(({ pictures, ...rest }) => rest);

      formData.set("name", about.name);
      formData.set("title", about.title);
      formData.set("description", about.description);
      formData.set("time_limit", String(about.time_limit));
      formData.set("difficulty", about.difficulty);
      if (about.main_picture) {
        formData.set("main_picture", about.main_picture);
      }
      formData.set("levels", JSON.stringify(filteredTasks));

      tasksPictures.forEach((taskId_pictures) => {
        if (taskId_pictures.pictures) {
          taskId_pictures.pictures.forEach((picture, index) => {
            formData.append(taskId_pictures.id, picture);
          });
        }
      });

      return axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/quest`,
        formData
      );
    },
  });

  const onClick = () => {
    if (!levels) return;
    mutateAsync(levels);
  };

  return (
    <Button onClick={onClick} disabled={isPending || isSuccess}>
      {isPending ? "Sending data..." : isSuccess ? "Success" : "Finish"}
    </Button>
  );
};
