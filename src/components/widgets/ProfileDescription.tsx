import {
  Button,
  Card,
  CardContent,
  Input, Label, Textarea,
} from "@/components";
import placeHolderImage from "../../../public/landscapePlaceholder.svg";
import { Pencil } from "lucide-react";
import Image from "next/image";

export default function ProfileDescription(props: {
    onEditClick: () => void,
    name: string,
    email: string,
    about_me: string,
    isOwner: boolean,
    profile_picture: string | null,
  }) {
  return (
      <div className={"flex"}>
        <div className={"flex w-5/12 mr-6 items-center justify-center"}>
          <Image width={280} height={280} className={"aspect-square object-cover max-w-[280px] rounded-[50%]"} src={props.profile_picture ? props.profile_picture : placeHolderImage} alt={"profile image"}/>
        </div>
        <div className={"w-full"}>
          <Card className={"mr-36 h-auto"}>
            <CardContent className="space-y-4 pt-4">
              <div className={"space-y-2"}>
                <Label className={"text-[16px]"}>Name</Label>
                <Input value={props.name} className={"pointer-events-none"}/>
              </div>
              { props.isOwner && <div className={"space-y-2"}>
                <Label className={"text-[16px]"}>Email</Label>
                <Input value={props.email} className={"pointer-events-none"}/>
              </div>}
            </CardContent>
          </Card>
          <div className={"space-y-2 pt-2"}>
            <Label className={"text-[16px]"}>About me</Label>
            <Textarea value={props.about_me} className={"pointer-events-none resize-none"}/>
          </div>
      </div>
        {props.isOwner && <Button onClick={() => props.onEditClick()} className={"bg-white text-[#7C7878] text-decoration-line: underline hover:bg-black hover:text-white"}>
          Edit<Pencil/>
        </Button>}
    </div>
  )
}
