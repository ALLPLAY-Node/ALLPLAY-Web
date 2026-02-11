import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSpot } from "@/api/spots/spots";
import { getSpotReview } from "@/api/reviews";
import type { Spot, SpotReview } from "@/types/spots";
import { Badge } from "@/components/ui/badge";
import { formatKRW, normalizeUrl } from "@/utils/spotdetail";
import { Button } from "@/components/ui/button";
import Reviews from "@/components/spots/detail/Reviews";
import WriteReview from "@/components/spots/detail/WriteReview";

const SpotDetailPage = () => {
  const { id } = useParams();
  const spotId = Number(id);

  const [spot, setSpot] = useState<Spot | null>(null);
  const [reviews, setReviews] = useState<SpotReview[]>();
  const [, setIsLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!spotId || Number.isNaN(spotId)) return;

    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [spotRes, reviewRes] = await Promise.all([
          getSpot(spotId),
          getSpotReview(spotId)
        ]);

        setSpot(spotRes.success);
        setReviews(reviewRes.success.data);
      } catch (e) {
        setError("시설 정보를 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [spotId]);

  const handleReserved = () => {
    if (!spot) return;
    console.log(normalizeUrl(spot.homepageUrl));
    window.open(normalizeUrl(spot.homepageUrl));
  };

  useEffect(() => {
    console.log(spot);
  }, [spot]);

  if (!spot) return;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 pt-8">
        {spot?.imageUrl.length ? (
          <img src={spot.imageUrl[0]} alt="시설 이미지" />
        ) : (
          <div className="relative z-20 aspect-video w-full rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col items-center justify-center text-gray-600">
            <span className="text-xs mt-1">NO IMAGE</span>
          </div>
        )}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-[386px] gap-2 rounded-xl border border-[#999999] px-[24px] py-[22px]">
            <Badge className="bg-[#CCE2FF] text-[#006FFF] font-semibold">
              {spot?.sportType}
            </Badge>
            <h2 className="text-[32px] font-bold">{spot.facilityName}</h2>
            <span className="text-[#999999] text-[16px] font-thin">
              {spot.introduction}
            </span>
            <div className="w-full flex justify-between text-[14px]">
              <span>이용요금</span>
              <span>{formatKRW(spot.cost)}원</span>
            </div>
            <Button
              variant="customblue"
              className="text-[14px]"
              onClick={handleReserved}
            >
              예약하기
            </Button>
          </div>
          <div className="w-[386px] flex flex-col gap-2 rounded-xl border border-[#999999] px-[24px] py-[11px]">
            <span className="text-[22px] font-semibold">문의</span>
            <span className="text-[16px]">번호: {spot.contact}</span>
            <span>
              홈페이지:{" "}
              <a
                href={normalizeUrl(spot.homepageUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[16px] hover:text-[#006FFF]"
              >
                {spot.homepageUrl}
              </a>
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-full rounded-xl border border-[#999999] p-6">
          <span className="text-[22px] font-semibold mb-4">시설 소개</span>
        </div>
        <div className="w-full rounded-xl border border-[#999999] p-6">
          <span className="flex flex-col text-[22px] font-semibold mb-4">
            시설 정보
          </span>
          <div className="flex flex-col gap-2">
            <div>주소: {spot.address}</div>
            <div>운영시간: {spot.operatingHours}</div>
          </div>
        </div>
        {spot.usageGuide !== "" && (
          <div className="w-full rounded-xl border border-[#999999] p-6">
            <span className="text-[22px] font-semibold mb-4">이용 안내</span>
            <div>{spot.usageGuide}</div>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-[22px] font-semibold">시설 리뷰</span>
        <div className="flex flex-col gap-2">
          {reviews?.map((r) => (
            <Reviews key={r.id} review={r} />
          ))}
          <WriteReview />
        </div>
      </div>
    </div>
  );
};

export default SpotDetailPage;
