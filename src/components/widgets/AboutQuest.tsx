import { FC } from "react";

import { IAboutLevel } from "@/lib/types";

export const AboutQuest: FC<IAboutLevel> = ({ main_picture, id, name, description }) => {
  return <div>pictures, description and other full info: { main_picture + id + name + description }</div>;
};
