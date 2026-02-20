import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Check } from "lucide-react";
import { getClubDetail, joinClub } from "@/api/clubs";
import type { ClubDetail } from "@/types/clubs";
import SuccessModal from "@/components/clubs/SuccessModal";
import { getAccessToken } from "@/api/auth";

const ClubDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [clubData, setClubData] = useState<ClubDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API로 동호회 상세 정보 가져오기
  useEffect(() => {
    const fetchClubDetail = async () => {
      if (!id) {
        setError("유효하지 않은 동호회 주소입니다.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await getClubDetail(id);
        if (response.resultType === "SUCCESS" && response.success) {
          setClubData(response.success);
        } else {
          setError(response.message || "동호회 정보를 불러올 수 없습니다.");
        }
      } catch (err) {
        console.error("Failed to fetch club detail:", err);
        setError("동호회 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubDetail();
  }, [id]);

  // 잘못된 경로로 들어와 id가 없는 경우 처리
  if (!id) {
    return (
      <main className="w-full pt-4 pb-10">
        <div className="py-10 text-center">
          <p className="mb-4 text-lg font-semibold text-red-500">
            유효하지 않은 동호회 주소입니다.
          </p>
          <button
            type="button"
            onClick={() => navigate("/clubs")}
            className="rounded-lg bg-[#3f6fff] px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2e5fdf]"
          >
            동호회 찾기로 이동
          </button>
        </div>
      </main>
    );
  }

  // 로딩 중이거나 데이터가 없을 때
  if (isLoading) {
    return (
      <main className="w-full pt-4 pb-10">
        <div className="text-center py-10">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </main>
    );
  }

  if (error || !clubData) {
    return (
      <main className="w-full pt-4 pb-10">
        <div className="text-center py-10">
          <p className="text-red-500">
            {error || "동호회 정보를 찾을 수 없습니다."}
          </p>
        </div>
      </main>
    );
  }

  // API 응답을 기존 구조에 맞게 변환 (임시 하드코딩 값 제거)
  const displayData = {
    name: clubData.facilityName || `${clubData.sportType} 동호회`,
    location: `${clubData.city} ${clubData.district}`,
    currentCount: undefined as number | undefined,
    maxCount: undefined as number | undefined,
    operator: {
      name: undefined as string | undefined,
      intro: clubData.contact || ""
    },
    introduction: clubData.introduction || "",
    activityInfo: {
      area: `${clubData.city} ${clubData.district}`,
      skillLevel: clubData.sportType || "",
      recruitment: undefined as string | undefined
    },
    conditions: clubData.usageGuide
      ? clubData.usageGuide.split("\n").filter((c) => c.trim())
      : [],
    members: [] as Array<{
      name: string;
      area: string;
      joinDate: string;
      intro: string;
    }>,
    imageUrl: clubData.imageUrl,
    information: clubData.information,
    operatingHours: clubData.operatingHours,
    cost: clubData.cost,
    address: clubData.address,
    homepageUrl: clubData.homepageUrl
  };

  const handleJoinClick = async () => {
    if (!id) return;

    const token = getAccessToken();
    if (!token) {
      alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
      return;
    }

    try {
      const response = await joinClub(id, token);
      if (response.resultType === "SUCCESS") {
        setIsJoinModalOpen(true);
      } else {
        alert(response.message || "가입 신청에 실패했습니다.");
      }
    } catch (error) {
      console.error("동호회 가입 신청 실패:", error);
      alert("가입 신청 중 오류가 발생했습니다.");
    }
  };

  const handleCloseModal = () => {
    setIsJoinModalOpen(false);
  };

  const handleGoToMyClubs = () => {
    setIsJoinModalOpen(false);
    navigate("/mypage");
  };

  return (
    <main className="w-full pt-4 pb-10">
      {/* 클럽 개요 섹션 */}
      <section className="mb-6 flex gap-6">
        {/* 왼쪽: 이미지 (3/5) */}
        <div className="h-[400px] w-3/5 rounded-lg bg-gray-200">
          {displayData.imageUrl ? (
            <img
              src={displayData.imageUrl}
              alt={displayData.name}
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              이미지 없음
            </div>
          )}
        </div>

        {/* 오른쪽: 정보 카드들 (2/5) */}
        <div className="flex h-[400px] w-2/5 flex-col gap-4">
          {/* 클럽 정보 카드 */}
          <div className="flex flex-1 flex-col rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
            {/* 가입 가능 태그 */}
            <div className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-[#00c851] px-3 py-1.5 text-xs font-semibold text-white">
              <Check size={12} />
              가입 가능
            </div>

            <h1 className="mb-1 text-2xl font-bold text-gray-900">
              {displayData.name}
            </h1>
            <p className="text-xs text-gray-500">동호회 ID: {id}</p>
            <p className="mb-auto mt-2 text-gray-600">{displayData.location}</p>

            {/* 현재인원 및 가입하기 버튼 */}
            <div className="mt-auto space-y-3">
              {displayData.currentCount !== undefined &&
                displayData.maxCount !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">현재인원</span>
                    <span className="text-sm text-gray-700">
                      <span className="text-[#1EC72F]">
                        {displayData.currentCount}
                      </span>{" "}
                      / {displayData.maxCount} 명
                    </span>
                  </div>
                )}

              <button
                type="button"
                onClick={handleJoinClick}
                className="w-full rounded-lg bg-[#3f6fff] px-4 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-[#2e5fdf]"
              >
                가입하기
              </button>
            </div>
          </div>

          {/* 운영자 정보 카드 */}
          {(displayData.operator.name || displayData.operator.intro) && (
            <div className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                운영자 정보
              </h2>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 rounded-full bg-gray-300" />
                <div>
                  {displayData.operator.name && (
                    <p className="text-sm font-medium text-gray-900">
                      이름: {displayData.operator.name}
                    </p>
                  )}
                  {displayData.operator.intro && (
                    <p className="text-sm text-gray-600">
                      한줄소개: {displayData.operator.intro}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 동호회 소개 섹션 */}
      <section className="mb-6 rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
        <h2 className="mb-4 text-xl font-bold text-gray-900">동호회 소개</h2>
        <p className="text-gray-700">{displayData.introduction}</p>
      </section>

      {/* 활동 정보 & 참여 조건 섹션 */}
      <section className="mb-6 grid grid-cols-2 gap-6">
        {/* 활동 정보 */}
        <div className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
          <h2 className="mb-4 text-xl font-bold text-gray-900">활동 정보</h2>
          <div className="space-y-2 text-gray-700">
            <p>활동지역: {displayData.activityInfo.area}</p>
            {displayData.activityInfo.skillLevel && (
              <p>실력 수준: {displayData.activityInfo.skillLevel}</p>
            )}
            {displayData.activityInfo.recruitment && (
              <p>모집인원: {displayData.activityInfo.recruitment}</p>
            )}
            {displayData.operatingHours && (
              <p>운영시간: {displayData.operatingHours}</p>
            )}
            {displayData.cost && <p>비용: {displayData.cost}</p>}
            {displayData.address && <p>주소: {displayData.address}</p>}
          </div>
        </div>

        {/* 참여 조건 */}
        <div className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
          <h2 className="mb-4 text-xl font-bold text-gray-900">참여 조건</h2>
          <div className="space-y-2">
            {displayData.conditions.length > 0 ? (
              displayData.conditions.map((condition, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <Check size={16} className="shrink-0 text-[#3f6fff]" />
                  <span>{condition}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">조건 정보가 없습니다.</p>
            )}
          </div>
        </div>
      </section>

      {/* 동호회 멤버 현황 */}
      <section className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          동호회 멤버 현황
        </h2>
        <div className="space-y-4">
          {displayData.members.length > 0 ? (
            displayData.members.map((member, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b border-gray-200 pb-4 last:border-0"
              >
                <div className="h-12 w-12 shrink-0 rounded-full bg-gray-300" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    이름: {member.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    활동지역: {member.area}
                  </p>
                  <p className="text-sm text-gray-600">
                    가입일자: {member.joinDate}
                  </p>
                  <p className="text-sm text-gray-600">
                    한줄 소개: {member.intro}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="py-4 text-center text-gray-500">
              등록된 멤버가 없습니다.
            </p>
          )}
        </div>
      </section>

      {/* 가입 신청 완료 모달 */}
      <SuccessModal
        isOpen={isJoinModalOpen}
        onClose={handleCloseModal}
        title="가입 신청 완료"
        message={
          <>
            <p>동호회 가입 신청이 정상적으로 접수되었습니다.</p>
            <p>승인까지 1~3일 정도 소요될 수 있어요.</p>
            <br />
            <p>
              가입 진행 상태는
              <br />
              마이페이지 &gt; MY 동호회에서 확인할 수 있어요.
            </p>
          </>
        }
        onConfirm={handleGoToMyClubs}
        confirmText="MY 동호회로 이동"
      />
    </main>
  );
};

export default ClubDetailPage;
