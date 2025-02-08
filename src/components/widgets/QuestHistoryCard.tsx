import Image, {StaticImageData} from "next/image";
import React from "react";

export default function QuestHistoryCard(props: {
  img: StaticImageData,
  name: string,
  score: number,
  timeWasted: number,
}) {
  return (
    <div className={"border-2 w-[180px] h-[280px] bg-pink-200 border-black rounded-[25px]"}>
      <Image className={"w-[180px] h-[180px] rounded-t-[25px] object-cover"} src={props.img} alt={"quest preview image"}/>
      <div className={"p-2 justify-items-center"}>
        <h3>{props.name}</h3>
        <p>рейтинг: {props.score}</p>
        <p>витрачено часу: {props.timeWasted}</p>
      </div>
    </div>
  )
}
