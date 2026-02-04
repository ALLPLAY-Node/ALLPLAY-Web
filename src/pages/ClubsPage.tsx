import { useState } from "react";
import { useNavigate } from "react-router";
import { Check, ChevronDown, Search, X } from "lucide-react";
import 농구공 from "@/assets/clubsPage/농구공.png";
import 야구공 from "@/assets/clubsPage/야구공.png";
import 축구공 from "@/assets/clubsPage/축구공.png";
import 테니스공 from "@/assets/clubsPage/테니스공.png";
import 탁구공 from "@/assets/clubsPage/탁구공.png";
import 배드민턴공 from "@/assets/clubsPage/배드민턴공.png";
import 노트 from "@/assets/clubsPage/노트.png";
import 모임장소 from "@/assets/clubsPage/모임 장소.png";
import 사람 from "@/assets/clubsPage/사람.png";

const sportsCategories = [
  { id: 1, name: "농구", image: 농구공 },
  { id: 2, name: "야구", image: 야구공 },
  { id: 3, name: "축구", image: 축구공 },
  { id: 4, name: "테니스", image: 테니스공 },
  { id: 5, name: "탁구", image: 탁구공 },
  { id: 6, name: "배드민턴", image: 배드민턴공 }
];

const clubs = Array.from({ length: 8 }).map((_, index) => ({
  id: index + 1,
  name: "테니스 동호회",
  description: "동호회 한 줄 소개",
  place: "모임 장소",
  currentCount: 10,
  maxCount: 20,
  tags: ["서울", "취미", "20대", "초보"]
}));

const ClubsPage = () => {
  const navigate = useNavigate();
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [isAgeOpen, setIsAgeOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState<number | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleCardClick = (clubId: number) => {
    navigate(`/clubs/${clubId}`);
  };

  const handleDetailClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    clubId: number
  ) => {
    e.stopPropagation();
    navigate(`/clubs/${clubId}`);
  };

  const handleJoinClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
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
      {/* 상단 카테고리 선택 영역 */}
      <section className="mb-8">
        <h2 className="mb-4 text-[20px] font-bold leading-[100%] tracking-normal text-gray-700">
          종목별로 찾기
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 pt-2">
          {sportsCategories.map((category) => {
            const isSelected = selectedSport === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  setSelectedSport(isSelected ? null : category.id)
                }
                className={`group flex w-[140px] flex-col items-center gap-3 rounded-[20px] border px-4 pb-4 pt-3 shadow-[0_0_4px_rgba(0,0,0,0.08)] transition-all duration-200 ${
                  isSelected
                    ? "border-[#3f6fff] bg-[#f3f6ff]"
                    : "border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50 hover:shadow-[0_0_8px_rgba(0,0,0,0.15)] hover:-translate-y-1"
                }`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-[90px] w-[90px] rounded-full object-cover"
                />
                <span
                  className={`text-base font-medium transition-colors duration-200 ${
                    isSelected ? "text-[#3f6fff]" : "text-gray-800"
                  }`}
                >
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 필터/검색 바 */}
      <section className="mb-6 flex items-center gap-2">
        {/* 구 선택 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsDistrictOpen(!isDistrictOpen);
              setIsAgeOpen(false);
            }}
            className="relative flex h-8 w-[222px] items-center justify-center gap-1.5 rounded-lg bg-[#999999] px-[10px] py-1 text-sm text-white"
          >
            <span>구 선택</span>
            <ChevronDown size={16} className="absolute right-[10px] shrink-0" />
          </button>
          {isDistrictOpen && (
            <div className="absolute left-0 top-full z-10 mt-1 w-[222px] rounded-lg border border-gray-200 bg-white shadow-lg">
              {/* 드롭다운 메뉴 아이템들 - 나중에 실제 데이터로 교체 */}
              <div className="p-2 text-sm text-gray-700">전체</div>
            </div>
          )}
        </div>

        {/* 연령 선택 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsAgeOpen(!isAgeOpen);
              setIsDistrictOpen(false);
            }}
            className="relative flex h-8 w-[222px] items-center justify-center gap-1.5 rounded-lg bg-[#999999] px-[10px] py-1 text-sm text-white"
          >
            <span>연령 선택</span>
            <ChevronDown size={16} className="absolute right-[10px] shrink-0" />
          </button>
          {isAgeOpen && (
            <div className="absolute left-0 top-full z-10 mt-1 w-[222px] rounded-lg border border-gray-200 bg-white shadow-lg">
              {/* 드롭다운 메뉴 아이템들 - 나중에 실제 데이터로 교체 */}
              <div className="p-2 text-sm text-gray-700">전체</div>
            </div>
          )}
        </div>

        {/* 검색어 입력 */}
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search size={16} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="h-8 w-full rounded-full border border-gray-300 bg-gray-100 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-500 focus:border-gray-400 focus:outline-none"
          />
        </div>
      </section>

      {/* 카드 리스트 */}
      <section className="grid gap-6 md:grid-cols-2">
        {clubs.map((club) => (
          <article
            key={club.id}
            onClick={() => handleCardClick(club.id)}
            className="relative flex h-[456px] w-[468px] cursor-pointer flex-col overflow-hidden rounded-[24px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
          >
            {/* 상단 이미지 영역 */}
            <div className="relative h-[244px] w-[468px] rounded-t-[24px] bg-[#e5e5e5]">
              <div className="absolute right-4 top-4 inline-flex items-center rounded-full bg-[#00c851] px-3 py-1.5 text-xs font-semibold text-white">
                가입 가능
              </div>
            </div>

            {/* 하단 정보 영역 */}
            <div className="flex h-[212px] w-[468px] flex-col gap-[10px] rounded-b-[24px] px-[19px] py-[15px]">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold text-gray-900">
                  {club.name}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {club.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[10px] bg-[#f3f6ff] px-2.5 py-1 text-xs text-[#3f6fff]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 text-sm text-gray-700">
                <div className="flex items-center gap-1">
                  <img src={노트} alt="노트" className="h-4 w-4 shrink-0" />
                  <span>동호회 한 줄 소개</span>
                </div>
                <div className="flex items-center gap-1">
                  <img
                    src={모임장소}
                    alt="모임 장소"
                    className="h-4 w-4 shrink-0"
                  />
                  <span>모임 장소</span>
                </div>
                <div className="flex items-center gap-1">
                  <img src={사람} alt="사람" className="h-4 w-4 shrink-0" />
                  <span>
                    <span
                      className={
                        club.currentCount < club.maxCount
                          ? "text-[#1EC72F]"
                          : ""
                      }
                    >
                      {club.currentCount}
                    </span>
                    /{club.maxCount}
                  </span>
                </div>
              </div>

              <div className="mt-auto flex gap-[10px] pt-2">
                <button
                  type="button"
                  onClick={(e) => handleDetailClick(e, club.id)}
                  className="h-[33px] w-[200px] rounded-lg border border-gray-300 bg-white px-[60px] py-[7px] text-sm text-gray-800 transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50"
                >
                  상세보기
                </button>
                <button
                  type="button"
                  onClick={(e) => handleJoinClick(e)}
                  className="h-[33px] w-[200px] rounded-lg border border-[#3f6fff] bg-[#3f6fff] px-[60px] py-[7px] text-sm text-white transition-colors duration-200 hover:bg-[#2e5fdf]"
                >
                  가입하기
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* 가입 신청 완료 모달 */}
      {isJoinModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-[480px] rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            {/* 성공 아이콘 */}
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Check size={32} className="text-blue-500" />
              </div>
            </div>

            {/* 제목 */}
            <h2 className="mb-4 text-center text-xl font-bold text-gray-900">
              가입 신청 완료
            </h2>

            {/* 안내 문구 */}
            <div className="mb-4 space-y-2 text-center text-sm text-gray-700">
              <p>동호회 가입 신청이 정상적으로 접수되었습니다.</p>
              <p>승인까지 1~3일 정도 소요될 수 있어요.</p>
            </div>

            {/* 상태 확인 안내 박스 */}
            <div className="mb-6 rounded-lg bg-blue-50 p-4 text-sm text-gray-700">
              <p className="text-center">
                가입 진행 상태는
                <br />
                마이페이지 &gt; MY 동호회에서 확인할 수 있어요.
              </p>
            </div>

            {/* 버튼 */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-50"
              >
                닫기
              </button>
              <button
                type="button"
                onClick={handleGoToMyClubs}
                className="flex-1 rounded-lg bg-[#3f6fff] px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2e5fdf]"
              >
                MY 동호회로 이동
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ClubsPage;
