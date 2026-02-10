import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  getClubJoinRequests,
  processClubJoinRequest,
  type ClubJoinRequestItem,
  type ClubJoinRequestStatus
} from "@/api/clubs";
import { getApiResultType, getResponseMessage } from "@/api/common";
import type { ClubSummary } from "@/types/club";

type ManagedClubDetailPanelProps = {
  club: ClubSummary | null;
  onEditClub?: (club: ClubSummary) => void;
};

type LocalJoinRequest = {
  id: string;
  userId: string;
  name: string;
  regionCity: string;
  intro: string;
  applicationDate: string;
};

type ClubMember = {
  id: string;
  name: string;
  regionCity: string;
  intro: string;
  joinedAt: string;
};

const placeholderText = "정보 없음";

// 실제 가입 신청 조회/승인 API 실행 여부 (임시 구현 단계에서는 false 유지)
const ENABLE_JOIN_REQUEST_API = false;
const MOCK_TARGET_CLUB_ID = "managed-placeholder-1";

const mockJoinRequests: LocalJoinRequest[] = [
  {
    id: "req-temp-1",
    userId: "1",
    name: "임시회원 1",
    regionCity: "경기",
    intro: "안녕하세요. 꾸준히 활동하고 싶습니다.",
    applicationDate: "2026-01-17T15:03:12+09:00"
  }
];

const mockMembers: ClubMember[] = [
  {
    id: "member-temp-2",
    name: "임시회원 2",
    regionCity: "경기",
    intro: "활동 열심히 하겠습니다.",
    joinedAt: "2026-01-10T10:00:00+09:00"
  }
];

const parseJoinRequirements = (input?: string) => {
  if (!input) {
    return [];
  }

  return input
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const toLocalJoinRequest = (item: ClubJoinRequestItem): LocalJoinRequest => {
  const userId = String(item.user_id);

  return {
    id: String(item.id),
    userId,
    name: `임시회원 ${userId}`,
    regionCity: "미정",
    intro: "프로필 정보 연동 전 임시 데이터입니다.",
    applicationDate: item.applicationDate
  };
};

const ManagedClubDetailPanel = ({
  club,
  onEditClub
}: ManagedClubDetailPanelProps) => {
  const clubId = club?.id;
  const [joinRequests, setJoinRequests] = useState<LocalJoinRequest[]>([]);
  const [members, setMembers] = useState<ClubMember[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [processingRequestId, setProcessingRequestId] = useState<string | null>(
    null
  );

  const requirements = useMemo(
    () => parseJoinRequirements(club?.joinRequirement),
    [club?.joinRequirement]
  );

  const sortedJoinRequests = useMemo(() => {
    return [...joinRequests].sort(
      (a, b) =>
        new Date(a.applicationDate).getTime() -
        new Date(b.applicationDate).getTime()
    );
  }, [joinRequests]);

  const sortedMembers = useMemo(() => {
    return [...members].sort(
      (a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
    );
  }, [members]);

  useEffect(() => {
    if (!clubId) {
      setJoinRequests([]);
      setMembers([]);
      return;
    }

    const isMockTarget = clubId === MOCK_TARGET_CLUB_ID;
    setMembers(isMockTarget ? mockMembers : []);

    if (!ENABLE_JOIN_REQUEST_API) {
      setJoinRequests(isMockTarget ? mockJoinRequests : []);
      return;
    }

    const fetchJoinRequests = async () => {
      setIsLoadingRequests(true);
      try {
        const response = await getClubJoinRequests(clubId);
        // 백엔드 응답 오탈자(resultTyle) 호환을 위해 공통 판별 함수를 사용한다.
        const resultType = getApiResultType(response);

        if (resultType === "SUCCESS") {
          setJoinRequests(
            (response.success?.items ?? []).map(toLocalJoinRequest)
          );
        } else {
          setJoinRequests(isMockTarget ? mockJoinRequests : []);
        }
      } catch (error) {
        console.error(error);
        setJoinRequests(isMockTarget ? mockJoinRequests : []);
      } finally {
        setIsLoadingRequests(false);
      }
    };

    void fetchJoinRequests();
  }, [clubId]);

  const handleRequestDecision = async (
    request: LocalJoinRequest,
    status: ClubJoinRequestStatus
  ) => {
    if (!club || processingRequestId) {
      return;
    }

    setProcessingRequestId(request.id);

    try {
      if (ENABLE_JOIN_REQUEST_API) {
        const response = await processClubJoinRequest(
          club.id,
          request.id,
          status
        );
        // 백엔드 응답 오탈자(resultTyle) 호환을 위해 공통 판별 함수를 사용한다.
        const resultType = getApiResultType(response);

        if (resultType !== "SUCCESS") {
          throw new Error(getResponseMessage(response, "가입 신청 처리 실패"));
        }
      }

      setJoinRequests((prev) => prev.filter((item) => item.id !== request.id));

      if (status === "APPROVED") {
        setMembers((prev) => [
          ...prev,
          {
            id: request.userId,
            name: request.name,
            regionCity: request.regionCity,
            intro: request.intro,
            joinedAt: new Date().toISOString()
          }
        ]);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "가입 신청 처리 중 오류가 발생했습니다.";
      alert(message);
    } finally {
      setProcessingRequestId(null);
    }
  };

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-out ${
        club ? "max-h-[2200px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div
        className={`flex flex-col gap-4 rounded-xl border-2 border-[#4D9AFF] p-6 ${
          club ? "translate-y-0" : "-translate-y-2"
        } transition-transform duration-300 ease-out`}
      >
        <div className="rounded-xl border-2 border-[#4D9AFF] p-5">
          <div className="mb-3 text-lg font-bold">동호회 소개</div>
          <p className="text-sm">{club?.summary ?? placeholderText}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-xl border-2 border-[#4D9AFF] p-5">
            <div className="mb-3 text-lg font-bold">활동 정보</div>
            <div className="flex flex-col gap-2 text-sm">
              <div>활동지역: {club?.regionCity ?? placeholderText}</div>
              <div>실력 수준: {club?.level ?? placeholderText}</div>
              <div>
                모집인원:{" "}
                {club?.capacity !== undefined
                  ? `${club.capacity}명`
                  : placeholderText}
              </div>
            </div>
          </div>

          <div className="rounded-xl border-2 border-[#4D9AFF] p-5">
            <div className="mb-3 text-lg font-bold">참여 조건</div>
            {requirements.length > 0 ? (
              <ul className="flex flex-col gap-2 text-sm">
                {requirements.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="flex items-center gap-2"
                  >
                    <span className="text-primary">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">{placeholderText}</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border-2 border-[#4D9AFF] p-5">
          <div className="mb-3 text-lg font-bold">동호회 커뮤니티</div>
          <div className="flex flex-col gap-2 text-sm">
            <div>번호: {club?.contact ?? placeholderText}</div>
            <div>홈페이지: {club?.url ?? placeholderText}</div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            className="h-10 rounded-lg bg-[#006FFF] text-white hover:bg-[#0057cc]"
            onClick={() => {
              if (!club) {
                return;
              }
              // TODO: merge 후 이 지점에서 수정 페이지 연결 로직을 오버라이드!
              onEditClub?.(club);
            }}
          >
            정보 수정하기
          </Button>
        </div>

        <div className="rounded-xl border border-[#999999] p-6">
          <h3 className="mb-4 text-lg font-bold">동호회 가입 신청 현황</h3>
          {isLoadingRequests ? (
            <p className="text-sm text-muted-foreground">
              가입 신청을 불러오는 중입니다.
            </p>
          ) : sortedJoinRequests.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              현재 대기중인 가입 신청이 없습니다.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {sortedJoinRequests.map((request) => {
                const isProcessing = processingRequestId === request.id;
                return (
                  <div
                    key={request.id}
                    className="flex flex-col gap-4 rounded-xl border border-[#4D9AFF] bg-[#E5F1FF] p-4 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div className="flex flex-1 items-center gap-4">
                      <div className="h-[72px] w-[72px] rounded-full bg-[#B3B3B3]" />
                      <div className="text-sm">
                        <div className="font-semibold">프로필</div>
                        <div>이름: {request.name}</div>
                        <div>활동지역: {request.regionCity}</div>
                        <div>
                          가입일자: {request.applicationDate.slice(0, 10)}
                        </div>
                        <div>한줄 소개: {request.intro}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 self-end lg:flex-col lg:self-auto">
                      <button
                        type="button"
                        className="h-11 min-w-[95px] rounded-lg bg-[#006FFF] px-4 text-sm font-semibold text-white hover:bg-[#0057cc] disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isProcessing}
                        onClick={() => {
                          // 가입 승인 버튼: 신청자를 멤버로 전환하고 신청 목록에서 제거한다.
                          void handleRequestDecision(request, "APPROVED");
                        }}
                      >
                        가입 승인
                      </button>
                      <button
                        type="button"
                        className="h-11 min-w-[95px] rounded-lg border border-[#999999] bg-white px-4 text-sm font-semibold text-black hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isProcessing}
                        onClick={() => {
                          // 가입 거절 버튼: 신청 건을 목록에서 제거하고 거절 상태로 처리한다.
                          void handleRequestDecision(request, "REJECTED");
                        }}
                      >
                        가입 거절
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-[#999999] p-6">
          <h3 className="mb-4 text-lg font-bold">동호회 멤버 현황</h3>
          {sortedMembers.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              등록된 멤버가 없습니다.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {sortedMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col gap-4 rounded-xl border border-[#4D9AFF] bg-[#E5F1FF] p-4 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="flex flex-1 items-center gap-4">
                    <div className="h-[72px] w-[72px] rounded-full bg-[#B3B3B3]" />
                    <div className="text-sm">
                      <div className="font-semibold">프로필</div>
                      <div>이름: {member.name}</div>
                      <div>활동지역: {member.regionCity}</div>
                      <div>가입일자: {member.joinedAt.slice(0, 10)}</div>
                      <div>한줄 소개: {member.intro}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="h-11 min-w-[95px] self-end rounded-lg bg-[#006FFF] px-4 text-sm font-semibold text-white hover:bg-[#0057cc] lg:self-auto"
                    onClick={() => {
                      // TODO: 멤버 강제 탈퇴 API 연동 전 임시 버튼입니다.
                    }}
                  >
                    탈퇴 요청
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagedClubDetailPanel;
