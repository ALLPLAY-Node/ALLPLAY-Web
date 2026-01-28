import { useEffect, useRef } from "react";
import type { ClubSummary } from "@/types/club";
import ClubCard from "@/components/layout/mypage/ClubCard";
import type { ClubCardVariant } from "@/components/layout/mypage/ClubCard";
import ClubDetailPanel from "@/components/layout/mypage/ClubDetailPanel";

type ClubSectionProps = {
  title: string;
  clubs: ClubSummary[];
  variant: ClubCardVariant;
  onSelect?: (club: ClubSummary) => void;
  selectedClubId?: string | null;
};

const ClubSection = ({
  title,
  clubs,
  variant,
  onSelect,
  selectedClubId
}: ClubSectionProps) => {
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!selectedClubId) {
      return;
    }
    const node = itemRefs.current[selectedClubId];
    if (!node) {
      return;
    }

    requestAnimationFrame(() => {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [selectedClubId]);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="flex flex-col gap-4">
        {clubs.length === 0 ? (
          <div className="min-h-[312px]" />
        ) : (
          clubs.map((club) => (
            <div
              key={club.id}
              ref={(el) => {
                itemRefs.current[club.id] = el;
              }}
              className="flex flex-col gap-4"
            >
              <ClubCard club={club} variant={variant} onClick={onSelect} />
              {variant === "joined" && selectedClubId === club.id ? (
                <ClubDetailPanel club={club} />
              ) : null}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ClubSection;
