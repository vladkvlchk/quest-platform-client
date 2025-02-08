import React from "react";
import Image from "next/image";
import img from "../../../../public/questImgPlaceholder.png";
import QuestHistoryCard from "@/components/widgets/QuestHistoryCard";

export default function ProfilePage() {
  return (
    <div className={"flex flex-col p-6 gap-4"}>
      <div className={"flex flex-row gap-6 rounded-[50px] bg-[#D9D9D9]"}>
        <Image className={"w-[400px] h-[400px] rounded-l-[50px]"} src={img} alt={'user profile image'} />
        <div className={"flex flex-col gap-12 pt-7 text-3xl"}>
          <h1>Username</h1>
          <p>Пошта:</p>
          <p>Кількість пройдених квестів:</p>
        </div>
      </div>
      <div className={"justify-self-center px-6 rounded-[50px] bg-[#D9D9D9]"}>
        <h2 className={"justify-self-center text-2xl"}>Історія пройдених квестів</h2>
        <div className={"grid gap-2 py-3 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-clos-1"}>
          {new Array(10).fill(0).map((_, index) => <QuestHistoryCard name={"QuestName"} img={img} score={10} timeWasted={40} key={index}/> )}
        </div>
      </div>
    </div>
  );
}
