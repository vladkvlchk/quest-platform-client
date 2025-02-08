import { FC } from "react";

import { IAboutLevel } from "@/lib/types";

export const AboutQuest: FC<IAboutLevel> = ({ imageUrls, id, name, description }) => {
  return <div>pictures, description and other full info: { imageUrls + id + name + description }</div>;
};
