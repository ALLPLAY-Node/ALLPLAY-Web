import { useCallback, useEffect, useState } from "react";
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
  const spotId = id ? String(id) : undefined;

  const [spot, setSpot] = useState<Spot | null>(null);
  const [reviews, setReviews] = useState<SpotReview[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSpotData = useCallback(async () => {
    if (!spotId) return;

    try {
      setIsLoading(true);
      setError(null);

      const [spotRes, reviewRes] = await Promise.all([
        getSpot(spotId),
        getSpotReview(spotId)
      ]);

      setSpot(spotRes.success);
      setReviews(reviewRes.success.data);
    } catch {
      setError("Failed to load facility information.");
    } finally {
      setIsLoading(false);
    }
  }, [spotId]);

  useEffect(() => {
    void fetchSpotData();
  }, [fetchSpotData]);

  const handleReserved = () => {
    if (!spot) return;
    window.open(normalizeUrl(spot.homepageUrl));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!spot) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 pt-8">
        {spot.imageUrl.length ? (
          <img src={spot.imageUrl[0]} alt="facility image" />
        ) : (
          <div className="relative z-20 aspect-video w-full rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col items-center justify-center text-gray-600">
            <span className="text-xs mt-1">NO IMAGE</span>
          </div>
        )}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-[386px] gap-2 rounded-xl border border-[#999999] px-[24px] py-[22px]">
            <Badge className="bg-[#CCE2FF] text-[#006FFF] font-semibold">
              {spot.sportType}
            </Badge>
            <h2 className="text-[32px] font-bold">{spot.facilityName}</h2>
            <span className="text-[#999999] text-[16px] font-thin">
              {spot.introduction}
            </span>
            <div className="w-full flex justify-between text-[14px]">
              <span>Usage Fee</span>
              <span>{formatKRW(spot.cost)} KRW</span>
            </div>
            <Button
              variant="customblue"
              className="text-[14px]"
              onClick={handleReserved}
            >
              Reserve
            </Button>
          </div>
          <div className="w-[386px] flex flex-col gap-2 rounded-xl border border-[#999999] px-[24px] py-[11px]">
            <span className="text-[22px] font-semibold">Contact</span>
            <span className="text-[16px]">Phone: {spot.contact}</span>
            <span>
              Website:{" "}
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
          <span className="text-[22px] font-semibold mb-4">Introduction</span>
          <div>{spot.introduction}</div>
        </div>
        <div className="w-full rounded-xl border border-[#999999] p-6">
          <span className="flex flex-col text-[22px] font-semibold mb-4">
            Facility Information
          </span>
          <div className="flex flex-col gap-2">
            <div>Address: {spot.address}</div>
            <div>Operating Hours: {spot.operatingHours}</div>
          </div>
        </div>
        {spot.usageGuide !== "" && (
          <div className="w-full rounded-xl border border-[#999999] p-6">
            <span className="text-[22px] font-semibold mb-4">Usage Guide</span>
            <div>{spot.usageGuide}</div>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-[22px] font-semibold">Facility Reviews</span>
        <div className="flex flex-col gap-2">
          {reviews?.map((review) => (
            <Reviews key={review.id} review={review} />
          ))}
          <WriteReview spotId={spotId} onSuccess={fetchSpotData} />
        </div>
      </div>
    </div>
  );
};

export default SpotDetailPage;
