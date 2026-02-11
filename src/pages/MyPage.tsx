import { useEffect, useState } from "react";
import MyPageLayout from "@/components/layout/mypage/MyPageLayout";
import ClubSection from "@/components/layout/mypage/ClubSection";
import { getManagedClubs, getMyClubs } from "@/api/users";
import type { ClubSummary } from "@/types/club";

const placeholderClubs: ClubSummary[] = [
  {
    id: "placeholder-1",
    name: "임시",
    sportType: "임시",
    regionCity: "임시",
    joinStatus: "PENDING"
  },
  {
    id: "placeholder-2",
    name: "임시",
    sportType: "임시",
    regionCity: "임시",
    joinStatus: "APPROVED"
  }
];

const managedPlaceholders: ClubSummary[] = [
  {
    id: "managed-placeholder-1",
    name: "임시",
    sportType: "임시",
    regionCity: "임시"
  },
  {
    id: "managed-placeholder-2",
    name: "임시",
    sportType: "임시",
    regionCity: "임시"
  }
];

const MyPage = () => {
  const [joinedClubs, setJoinedClubs] = useState<ClubSummary[]>([]);
  const [managedClubs, setManagedClubs] = useState<ClubSummary[]>([]);
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "clubs" | "reviews" | "help" | "profile"
  >("clubs");

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const [joinedRes, managedRes] = await Promise.all([
          getMyClubs(),
          getManagedClubs()
        ]);

        if (joinedRes.resultType !== "SUCCESS") {
          console.error(joinedRes);
        }
        if (managedRes.resultType !== "SUCCESS") {
          console.error(managedRes);
        }

        setJoinedClubs(
          joinedRes.resultType === "SUCCESS"
            ? (joinedRes.success.items ?? [])
            : []
        );
        setManagedClubs(
          managedRes.resultType === "SUCCESS"
            ? (managedRes.success.items ?? [])
            : []
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchClubs();
  }, []);

  const joinedList = joinedClubs.length === 0 ? placeholderClubs : joinedClubs;
  const managedList =
    managedClubs.length === 0 ? managedPlaceholders : managedClubs;

  const handleSelectClub = (club: ClubSummary) => {
    setSelectedClubId((prev) => (prev === club.id ? null : club.id));
  };

  return (
    <MyPageLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <ClubSection
        title="가입한 동호회"
        clubs={joinedList}
        variant="joined"
        onSelect={handleSelectClub}
        selectedClubId={selectedClubId}
      />
      <ClubSection
        title="운영중인 동호회"
        clubs={managedList}
        variant="managed"
      />
    </MyPageLayout>
  );
};

export default MyPage;
