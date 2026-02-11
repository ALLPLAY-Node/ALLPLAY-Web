import { useEffect, useRef } from "react";
import ClubCard from "@/components/layout/mypage/ClubCard";
import ClubDetailPanel from "@/components/layout/mypage/ClubDetailPanel";
import ManagedClubDetailPanel from "@/components/layout/mypage/ManagedClubDetailPanel";
import type { ClubCardVariant } from "@/components/layout/mypage/ClubCard";
import type { ClubSummary } from "@/types/club";

type ClubSectionProps = {
  title: string;
  clubs: ClubSummary[];
  variant: ClubCardVariant;
  onSelect?: (club: ClubSummary) => void;
  onLeaveClub?: (club: ClubSummary) => void;
  onUpdateManagedClub?: (club: ClubSummary) => void;
  selectedClubId?: string | null;
};

const ClubSection = ({
  title,
  clubs,
  variant,
  onSelect,
  onLeaveClub,
  onUpdateManagedClub,
  selectedClubId
}: ClubSectionProps) => {
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const currentIds = new Set(clubs.map((club) => club.id));
    Object.keys(itemRefs.current).forEach((id) => {
      if (!currentIds.has(id)) {
        delete itemRefs.current[id];
      }
    });
  }, [clubs]);

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
          <div className="flex min-h-[312px] items-center justify-center text-muted-foreground">
            {variant === "joined"
              ? "가입한 동호회가 없습니다"
              : "운영 중인 동호회가 없습니다"}
          </div>
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
                <ClubDetailPanel
                  club={club}
                  onClose={() => onSelect?.(club)}
                  onLeaveClub={() => onLeaveClub?.(club)}
                />
              ) : null}
              {variant === "managed" && selectedClubId === club.id ? (
                <ManagedClubDetailPanel
                  club={club}
                  onEditClub={onUpdateManagedClub}
                />
              ) : null}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ClubSection;
