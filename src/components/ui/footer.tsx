"use client";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { Button } from "@/components";
import { Copyright, Facebook, Instagram } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Footer() {
  const router = useRouter();
  const {data: session} = useSession();
  const onMyProfileClick = (id: string) => { router.push("/profile/"+id) };
  const onExploreQuestsClick = () => { router.push("/explore-quests") };
  const onCreateQuestClick = () => { router.push("/create-quest") };

  return (
    <div className={"flex flex-col text-white justify-between px-8 pb-4 pt-8 h-[200px] bg-[#94A3B8]"}>
      <div className={"flex w-full h-full pb-3 justify-between"}>
        <div className={"flex justify-self-start justify-between flex-col"}>
          <Image src={logo} alt={"MVP logo"}/>
          <p>Privacy policy</p>
          <p>Terms of use</p>
        </div>
        <div className={"flex justify-self-center items-center justify-between flex-col"}>
          <Button onClick={() => onExploreQuestsClick()}  className={"bg-transparent text-[16px] text-white hover:bg-transparent"}>Explore quests</Button>
          <Button onClick={() => onMyProfileClick(session!.user.id)} className={"bg-transparent text-[16px] text-white hover:bg-transparent"}>My profile</Button>
          <Button onClick={() => onCreateQuestClick()} className={"bg-black text-white text-[16px] hover:bg-black"}>Create quest</Button>
        </div>
        <div className={"flex justify-self-end flex-col justify-between"}>
          <div className={"flex gap-2"}>
            <Instagram/><p>instagram</p>
          </div>
          <div className={"flex gap-2"}>
            <Facebook/><p>facebook</p>
          </div>
          <p>info@mpv.com</p>
        </div>
      </div>
      <h2 className={"flex gap-2 justify-center"}><Copyright/> Multiplayer Virtual Pathfinder. All rights protected.</h2>
    </div>
  )
}
