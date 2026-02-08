import { ListingCard } from "@/components/common/ListingCard";
import BallButton from "@/components/layout/button/BallButton";
import { Button } from "@/components/ui/button";
import { FaChevronRight } from "react-icons/fa6";
import { AiOutlineTrophy } from "react-icons/ai";
import { GoStar } from "react-icons/go";
import { IoPeopleOutline } from "react-icons/io5";
import GradientComp from "@/components/home/GradientComp";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-10 py-10">
      <div className="flex flex-col gap-3 bg-[#006FFF] w-full max-w-[960px] rounded-lg px-8 py-8 sm:px-10 sm:py-10 min-h-[320px] sm:min-h-[420px]">
        <div className="flex flex-col text-[36px] text-white font-bold">
          <span>우리 동네 숨겨진 운동 스팟</span>
          <span>ALLPLAY에서 찾아보세요</span>
        </div>
        <div className="flex flex-col text-white text-[16px]">
          <span>공공시설부터 아파트 단지 내 개방 시설까지,</span>
          <span>ALLPLAY에서 한 번에 예약하고 동호회까지 가입하세요.</span>
        </div>
        <Button
          variant="customwhite"
          className="w-[222px] h-[48px] border-none text-[20px] text-[#006FFF] font-semibold hover:none shadow-xl"
        >
          지금 시작하기
          <FaChevronRight />
        </Button>
        <div className="w-full h-full flex gap-4 mt-2">
          <GradientComp>
            <AiOutlineTrophy className="size-7" />
            <span className="text-[15px] font-bold">0</span>
            <span>등록 시설</span>
          </GradientComp>
          <GradientComp>
            <GoStar className="size-7" />
            <span className="text-[15px] font-bold">0</span>
            <span>누적 리뷰</span>
          </GradientComp>
          <GradientComp>
            <IoPeopleOutline className="size-7" />
            <span className="text-[15px] font-bold">0</span>
            <span>동호회</span>
          </GradientComp>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        <BallButton ball="BASKETBALL" />
        <BallButton ball="BASEBALL" />
        <BallButton ball="TENNIS" />
        <BallButton ball="PINGPONG" />
        <BallButton ball="SOCCER" />
        <BallButton ball="BADMINTON" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ListingCard />
        <ListingCard />
        <ListingCard />
      </div>
    </div>
  );
};

export default HomePage;
