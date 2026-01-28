import type { ClubSummary } from "@/types/club";

export type ClubCardVariant = "joined" | "managed";

type ClubCardProps = {
  club: ClubSummary;
  variant: ClubCardVariant;
  onClick?: (club: ClubSummary) => void;
};

const getJoinedActionLabel = (club: ClubSummary) => {
  if (club.joinStatus === "PENDING") {
    return "가입 신청 중";
  }

  return "동호회 페이지";
};

const ClubCard = ({ club, variant, onClick }: ClubCardProps) => {
  const actionLabel =
    variant === "managed" ? "동호회 관리하기" : getJoinedActionLabel(club);
  const isClickable = variant === "joined" && typeof onClick === "function";

  return (
    <div
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? () => onClick?.(club) : undefined}
      onKeyDown={(event) => {
        if (!isClickable) {
          return;
        }
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.(club);
        }
      }}
      className={`flex flex-col gap-4 rounded-xl border border-border p-6 sm:flex-row sm:items-center ${
        isClickable ? "cursor-pointer transition-shadow hover:shadow-sm" : ""
      }`}
    >
      <div className="flex flex-1 items-center gap-6">
        {club.logoUrl ? (
          <img
            src={club.logoUrl}
            alt={`${club.name} 로고`}
            className="h-[100px] w-[100px] rounded-xl object-cover"
          />
        ) : (
          <div className="h-[100px] w-[100px] rounded-xl bg-[#D9D9D9]" />
        )}
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">{club.name}</div>
          <div className="flex gap-4 text-base">
            <span>{club.sportType}</span>
            <span>{club.regionCity}</span>
          </div>
        </div>
      </div>
      <div className="text-primary font-semibold text-base sm:ml-auto">
        {actionLabel}
      </div>
    </div>
  );
};

export default ClubCard;
