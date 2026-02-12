import UserAvatar from "@/components/common/UserAvatar";
import type { SpotReview } from "@/types/spots";
// import { useState } from "react";
import Basic from "@/assets/basic.png";

interface ReviewsProps {
  review: SpotReview;
}

const Review = ({ review }: ReviewsProps) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  if (!review) return;

  return (
    <div className="rounded-xl bg-[#E5F1FF] px-4 py-5">
      <div className="flex">
        <div className="w-[120px] flex flex-col justify-center items-center">
          <UserAvatar image={Basic} />
          <div>{review.userId}</div>
        </div>
        <div className="w-full flex items-center rounded-xl border border-[#80B7FF] p-4">
          <div>
            <div className="font-semibold">리뷰</div>
            <div>{review.text}</div>
          </div>
          <div className="">{review.created_at}</div>
        </div>
      </div>
    </div>
  );
};

export default Review;
