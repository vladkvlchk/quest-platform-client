import { FC } from "react";
import Image from "next/image";

import { Card, Dialog, DialogContent, DialogTrigger } from "../ui";

export const DialogImage: FC<{ url: string }> = ({ url }) => {
  return (
    <Card className="w-full h-40 flex items-center justify-center relative overflow-hidden bg-slate-100 dark:bg-gray-900 cursor-pointer">
      <Dialog>
        <DialogTrigger asChild>
          <Image
            className="w-full h-auto object-cover"
            src={url}
            alt={"picture"}
            fill
            sizes="100vw"
          />
        </DialogTrigger>
        <DialogContent className="w-auto max-w-[90vw] h-auto max-h-[90vh] p-0 flex justify-center items-center">
          <div className="relative w-auto h-auto max-w-full max-h-full">
            <Image
              className="w-auto h-auto max-w-full max-h-full object-contain"
              src={url}
              alt={"picture"}
              width={800}
              height={800}
            />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
