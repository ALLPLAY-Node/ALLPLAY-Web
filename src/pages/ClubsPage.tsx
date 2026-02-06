import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getClubs } from "@/api/clubs";
import type { Club } from "@/types/clubs";
import SportsCategorySelector from "@/components/clubs/SportsCategorySelector";
import ClubFilterBar from "@/components/clubs/ClubFilterBar";
import ClubCard from "@/components/clubs/ClubCard";
import SuccessModal from "@/components/clubs/SuccessModal";

const ClubsPage = () => {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState<number | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>();
  const [selectedRegionId, setSelectedRegionId] = useState<
    string | undefined
  >();
  const [selectedDistrict, setSelectedDistrict] = useState<
    string | undefined
  >();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<
    string | undefined
  >();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cursor, setCursor] = useState<string | undefined>();

  // API 호출 함수
  const fetchClubs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getClubs({
        regionId: selectedRegionId,
        ageGroup: selectedAgeGroup,
        keyword: searchKeyword || undefined,
        sportId: selectedSport || undefined,
        cursor: cursor
      });
      setClubs(response.clubs);
      setCursor(response.cursor);
    } catch (error) {
      console.error("Failed to fetch clubs:", error);
      // 에러 발생 시 빈 배열로 설정
      setClubs([]);
    } finally {
      setIsLoading(false);
    }
  }, [
    selectedSport,
    selectedRegionId,
    selectedAgeGroup,
    searchKeyword,
    cursor
  ]);

  // 필터 변경 시 API 호출
  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  const handleRegionChange = (
    region: string | undefined,
    isAllSelected: boolean
  ) => {
    setSelectedRegion(region);
    setSelectedRegionId(undefined);
    if (isAllSelected || !region) {
      setSelectedDistrict(undefined);
    }
  };

  const handleDistrictChange = (
    district: string | undefined,
    districtId: string | undefined
  ) => {
    setSelectedDistrict(district);
    setSelectedRegionId(districtId);
  };

  const handleAgeChange = (age: string | undefined) => {
    setSelectedAgeGroup(age);
  };

  const handleJoinSuccess = () => {
    setIsJoinModalOpen(true);
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
      <SportsCategorySelector
        selectedSport={selectedSport}
        onSelect={setSelectedSport}
      />

      <ClubFilterBar
        selectedRegion={selectedRegion}
        selectedDistrict={selectedDistrict}
        selectedAgeGroup={selectedAgeGroup}
        searchKeyword={searchKeyword}
        onRegionChange={handleRegionChange}
        onDistrictChange={handleDistrictChange}
        onAgeChange={handleAgeChange}
        onSearchChange={setSearchKeyword}
        selectedRegionId={selectedRegionId}
      />

      {/* 카드 리스트 */}
      <section className="grid gap-6 md:grid-cols-2">
        {isLoading ? (
          <div className="col-span-2 py-10 text-center text-gray-500">
            로딩 중...
          </div>
        ) : clubs.length === 0 ? (
          <div className="col-span-2 py-10 text-center text-gray-500">
            등록된 동호회가 없습니다.
          </div>
        ) : (
          clubs.map((club) => (
            <ClubCard
              key={club.id}
              club={club}
              onJoinSuccess={handleJoinSuccess}
            />
          ))
        )}
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

export default ClubsPage;
