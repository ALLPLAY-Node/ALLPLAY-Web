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
import type { Spot } from "@/types/spots";
import { useNavigate } from "react-router";

interface ListingCardProps {
  spot: Spot;
}

export function ListingCard({ spot }: ListingCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="relative w-full aspect-square pt-0">
      {/* <div className="absolute inset-0 z-30 aspect-video bg-black/35" /> */}
      <Badge variant="customblue" className="absolute top-4 left-5 z-100">
        {spot.isPublic ? "공공" : "민간"} SPOT
      </Badge>
      {spot.imageUrl.length ? (
        <img
          src={spot.imageUrl[0]}
          alt="Event cover"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40 rounded-tl-xl rounded-tr-xl"
        />
      ) : (
        <div className="relative z-20 aspect-video w-full rounded-t-xl bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col items-center justify-center text-gray-600">
          {/* <span className="text-lg font-semibold">{spot.facilityName}</span> */}
          <span className="text-xs mt-1">NO IMAGE</span>
        </div>
      )}

      <CardHeader>
        <CardAction>
          <Badge variant="customgreen">
            <FaSquareCheck />
            예약 가능
          </Badge>
        </CardAction>
        <CardTitle>{spot.facilityName}</CardTitle>
        <CardDescription className="flex items-center">
          <LuMapPin size={16} />
          <div className="flex gap-4 text-[#808080]">
            <span className="text-sm pl-1">{spot.address}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto justify-between gap-2">
        <Button
          variant="customwhite"
          className="flex-1 h-8 text-sm bg-white text-black border-1 border-[#999999]"
          onClick={() => navigate(`/spots/${spot.id}`)}
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
