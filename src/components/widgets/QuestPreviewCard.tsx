import Image, { StaticImageData } from 'next/image';
import { CircleUser, MapPin, ClipboardList, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuestPreviewCard(
    props: {
      id: number,
      name: string,
      description: string,
      players: number,
      tasks: number,
      time: number,
      format: string,
      rating: number,
      img: StaticImageData,
      onClickCard: (id: string | number) => void
    }
) {
  return (
      <Card
          className="w-[400px] h-[636px] rounded-[50px] cursor-pointer bg-[#D9D9D9]"
          onClick={() => props.onClickCard(props.id)}
      >
        <CardHeader className="px-[9px] text-shadow py-[12px] h-full relative">
          <div className="relative">
            <Image className="rounded-[50px] w-[381px] h-[334px] mb-[15px]" src={props.img} alt={props.name} />
            <div className="absolute flex items-center h-[27px] top-[12px] left-[20px] bg-[#D9D9D9] rounded-[50px] text-[15px]/[30px] font-normal px-[7px] py-[2px]">
              складність
            </div>
            <div className="absolute flex gap-1 flex-row items-center h-[27px] top-[12px] right-[20px] bg-[#D9D9D9] rounded-[50px] text-[15px]/[30px] px-[7px] py-[3px]">
              {props.rating}
              <Star size={16} />
            </div>
          </div>
          <CardTitle className="text-[24px]/[28px] px-[10px] uppercase font-normal">{props.name}</CardTitle>
          <div className="flex flex-col justify-between px-[6px] h-36">
            <div className="text-[20px]/[23.4px] px-[6px]">{props.description}</div>
            <CardContent className="text-[20px][23.4px] px-[6px] flex flex-row gap-0.5">
              <MapPin color={'black'} size={22} />
              {props.format}
            </CardContent>
          </div>
          <CardFooter className="flex flex-row justify-between pt-[30px] mt-0 pb-0 px-[16px] text-[14px]/[18.72px]">
            {[
              { icon: CircleUser, value: props.players },
              { icon: ClipboardList, value: props.tasks },
              { icon: Clock, value: props.time },
            ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon color="black" size={32} />
                  {item.value}
                </div>
            ))}
          </CardFooter>
        </CardHeader>
      </Card>
  );
}

