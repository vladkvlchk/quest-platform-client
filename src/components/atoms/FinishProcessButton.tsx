"use client";

import { FC } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui";
import { useProgressStore } from "@/hooks";
import { LoaderIcon } from "lucide-react";

export const FinishProcessButton: FC = () => {
  const { submitProgress } = useProgressStore();
  const { isPending, mutateAsync } = submitProgress;

  const onFinish = () => {
    mutateAsync();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Finish Now</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure that you want finish the quest right now?
          </DialogTitle>
          <DialogDescription>
            Confirm that use want to finish the quest. All ignored levels will
            be considered as failed.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button onClick={onFinish} disabled={isPending}>
            {isPending ? (
              <LoaderIcon className="animate-spin h-6 w-6" />
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
