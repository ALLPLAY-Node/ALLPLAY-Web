import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MyPageLayout from "@/components/layout/mypage/MyPageLayout";
import ClubSection from "@/components/layout/mypage/ClubSection";
import LeaveClubBox from "@/components/layout/mypage/LeaveClubBox";
import LeaveClubDoneBox from "@/components/layout/mypage/LeaveClubDoneBox";
import { getManagedClubs, getMyClubs, leaveClub } from "@/api/users";
import type { ClubSummary } from "@/types/club";

// 실제 탈퇴 API 실행 여부 (임시 단계에서는 false 유지)
const ENABLE_LEAVE_CLUB_API = false;

const placeholderClubs: ClubSummary[] = [
  {
    id: "placeholder-1",
    name: "임시 동호회 1",
    sportType: "임시",
    regionCity: "임시",
    joinStatus: "PENDING"
  },
  {
    id: "placeholder-2",
    name: "임시 동호회 2",
    sportType: "임시",
    regionCity: "임시",
    joinStatus: "APPROVED"
  }
];

const managedPlaceholders: ClubSummary[] = [
  {
    id: "managed-placeholder-1",
    name: "직장인 배드민턴 모임",
    sportType: "배드민턴",
    regionCity: "경기",
    summary:
      "배드민턴을 처음 시작하는 분들을 위한 친목 동호회입니다. 기초부터 천천히 배우면서 즐겁게 운동하는 것을 목표로 합니다.",
    level: "초보",
    capacity: 20,
    joinRequirement: "배드민턴 초보자 환영, 매너 필수, 주 2회 참여 가능자",
    contact: "010-1234-5678",
    url: "https://allplay.example.com"
  },
  {
    id: "managed-placeholder-2",
    name: "운영 동호회 B",
    sportType: "임시",
    regionCity: "임시"
  }
];

const MyPage = () => {
  const navigate = useNavigate();
  const [joinedClubs, setJoinedClubs] = useState<ClubSummary[]>([]);
  const [managedClubs, setManagedClubs] = useState<ClubSummary[]>([]);
  const [selectedJoinedClubId, setSelectedJoinedClubId] = useState<
    string | null
  >(null);
  const [selectedManagedClubId, setSelectedManagedClubId] = useState<
    string | null
  >(null);
  const [clubToLeave, setClubToLeave] = useState<ClubSummary | null>(null);
  const [completedLeaveClubId, setCompletedLeaveClubId] = useState<
    string | null
  >(null);
  const [isLeaveDoneOpen, setIsLeaveDoneOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "clubs" | "reviews" | "help" | "profile"
  >("clubs");

  // API: GET /users/me/clubs + GET /users/me/clubs/managed
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

  useEffect(() => {
    void fetchClubs();
  }, []);

  const joinedList = joinedClubs.length === 0 ? placeholderClubs : joinedClubs;
  const managedList =
    managedClubs.length === 0 ? managedPlaceholders : managedClubs;

  // 가입 동호회 상세 토글
  const handleSelectJoinedClub = (club: ClubSummary) => {
    setSelectedJoinedClubId((prev) => (prev === club.id ? null : club.id));
  };

  // 운영 동호회 상세 토글
  const handleSelectManagedClub = (club: ClubSummary) => {
    setSelectedManagedClubId((prev) => (prev === club.id ? null : club.id));
  };

  // 운영 동호회 정보 수정 페이지 이동
  const handleEditManagedClub = (club: ClubSummary) => {
    // TODO: merge 후 최종 라우팅/폼 구현을 이 경로에서 오버라이드.
    navigate(`/clubs/${club.id}/edit`);
  };

  // 탈퇴 확인 팝업 열기
  const handleLeaveClub = (club: ClubSummary) => {
    setClubToLeave(club);
  };

  const handleCancelLeave = () => {
    setClubToLeave(null);
  };

  const handleConfirmLeave = async () => {
    if (!clubToLeave || isLeaving) {
      return;
    }

    try {
      setIsLeaving(true);
      const targetClubId = clubToLeave.id;

      // API: DELETE /clubs/{clubId}/join (요청 시점에 true로 변경해 실제 호출)
      if (ENABLE_LEAVE_CLUB_API) {
        const response = await leaveClub(targetClubId);
        const resultType = response.resultType ?? response.resultTyle;

        if (resultType !== "SUCCESS") {
          throw new Error(response.message ?? "동호회 탈퇴 실패");
        }
      }

      setClubToLeave(null);
      setCompletedLeaveClubId(targetClubId);
      setIsLeaveDoneOpen(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "탈퇴 처리 중 오류가 발생했습니다.";
      alert(message);
    } finally {
      setIsLeaving(false);
    }
  };

  const handleCloseLeaveDone = () => {
    if (completedLeaveClubId) {
      setJoinedClubs((prev) =>
        prev.filter((item) => item.id !== completedLeaveClubId)
      );
      setSelectedJoinedClubId((prev) =>
        prev === completedLeaveClubId ? null : prev
      );
    }

    setCompletedLeaveClubId(null);
    setIsLeaveDoneOpen(false);

    if (ENABLE_LEAVE_CLUB_API) {
      void fetchClubs();
    }
  };

  return (
    <>
      <MyPageLayout activeTab={activeTab} onTabChange={setActiveTab}>
        <ClubSection
          title="가입한 동호회"
          clubs={joinedList}
          variant="joined"
          onSelect={handleSelectJoinedClub}
          onLeaveClub={handleLeaveClub}
          selectedClubId={selectedJoinedClubId}
        />
        <ClubSection
          title="운영중인 동호회"
          clubs={managedList}
          variant="managed"
          onSelect={handleSelectManagedClub}
          onUpdateManagedClub={handleEditManagedClub}
          selectedClubId={selectedManagedClubId}
        />
      </MyPageLayout>

      {clubToLeave ? (
        <LeaveClubBox
          isSubmitting={isLeaving}
          onCancel={handleCancelLeave}
          onConfirm={handleConfirmLeave}
        />
      ) : null}

      {isLeaveDoneOpen ? (
        <LeaveClubDoneBox onClose={handleCloseLeaveDone} />
      ) : null}
    </>
  );
};

export default MyPage;
