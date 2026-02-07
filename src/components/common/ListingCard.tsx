import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { FaSquareCheck } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { FaRegSmile } from "react-icons/fa";

export function ListingCard() {
  return (
    <Card className="relative w-full aspect-square pt-0">
      {/* <div className="absolute inset-0 z-30 aspect-video bg-black/35" /> */}
      <Badge variant="customblue" className="absolute top-4 left-5 z-100">
        민간 SPOT
      </Badge>
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40 rounded-tl-xl rounded-tr-xl"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="customgreen">
            <FaSquareCheck />
            예약 가능
          </Badge>
        </CardAction>
        <CardTitle>강서 테니스 파크</CardTitle>
        <CardDescription className="flex items-center">
          <LuMapPin size={16} />
          <div className="flex gap-4 text-[#808080]">
            <span className="text-sm pl-1">서울 강서구 염창동</span>
            <span>1.7km</span>
          </div>
        </CardDescription>
        <CardDescription className="flex items-center pt-3">
          <FaRegSmile size={18} className="text-[#006FFF]" />
          <span className="text-[#006FFF] text-base font-bold pl-1">4.5</span>
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto justify-between gap-2">
        <Button
          variant="customwhite"
          className="flex-1 h-8 text-sm bg-white text-black border-1 border-[#999999]"
        >
          상세보기
        </Button>
        <Button variant="customblue" className="flex-1 h-8 text-sm">
          예약
        </Button>
      </CardFooter>
    </Card>
  );
}
