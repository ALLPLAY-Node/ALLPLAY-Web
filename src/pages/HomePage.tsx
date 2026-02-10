import { Trophy, Star, Users } from "lucide-react";
import { useNavigate } from "react-router";
import SportsCategorySelector from "@/components/clubs/SportsCategorySelector";
import { useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState<number | null>(null);

  return (
    <main className="w-full pt-4 pb-10">
      {/* 히어로 배너 섹션 */}
      <section className="mb-8 rounded-2xl bg-[#006FFF] px-8 py-12 text-white">
        <div className="mb-8 max-w-[520px] text-left">
          <h1 className="mb-4 text-3xl font-bold">
            우리 동네 숨겨진 운동스팟
            <br />
            ALLPLAY에서 찾아보세요
          </h1>
          <p className="mb-6 text-base text-white/90">
            공공시설부터 아파트 단지 내 개방 시설까지,
            <br />
            ALLPLAY에서 한 번에 예약하고 동호회까지 가입하세요.
          </p>
          <button
            type="button"
            onClick={() => navigate("/spots")}
            className="rounded-lg bg-white px-6 py-3 text-base font-medium text-[#006FFF] transition-colors duration-200 hover:bg-gray-100"
          >
            지금 시작하기 &gt;
          </button>
        </div>

        {/* 통계 카드 섹션 (배너 내부) */}
        <div className="flex gap-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Trophy size={20} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-xs text-white/90">등록 시설</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Star size={20} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-xs text-white/90">누적 리뷰</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Users size={20} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-xs text-white/90">동호회</p>
            </div>
          </div>
        </div>
      </section>

      {/* 종목별로 찾기 섹션 */}
      <section className="mb-8">
        <SportsCategorySelector
          selectedSport={selectedSport}
          onSelect={(sportId) => {
            setSelectedSport(sportId);
            // TODO: 시설 API 쿼리 파라미터와 연동 예정
          }}
        />
      </section>

      {/* 시설 리스트 섹션 */}
      <section className="mb-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* 시설 카드 예시 */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
            {/* 이미지 영역 */}
            <div className="relative h-48 bg-gray-200">
              <span className="absolute left-3 top-3 rounded-md bg-[#3f6fff] px-2 py-1 text-xs font-medium text-white">
                민간 SPOT
              </span>
            </div>
            {/* 정보 영역 */}
            <div className="p-4">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  강서 테니스 파크
                </h3>
              </div>
              <div className="mb-3 flex items-center gap-1 text-sm text-gray-600">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 0C5.2 0 3 2.2 3 5C3 8.75 8 16 8 16C8 16 13 8.75 13 5C13 2.2 10.8 0 8 0ZM8 6.5C7.1 6.5 6.5 5.9 6.5 5C6.5 4.1 7.1 3.5 8 3.5C8.9 3.5 9.5 4.1 9.5 5C9.5 5.9 8.9 6.5 8 6.5Z"
                    fill="#6B7280"
                  />
                </svg>
                <span>서울 강서구 염창동</span>
                <span className="text-gray-400">•</span>
                <span>1.7km</span>
              </div>
              <div className="mb-4 flex items-center gap-1 text-sm text-green-600">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 4L6 11.5L2.5 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-medium">예약 가능</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/spots/1")}
                  className="flex-1 rounded-lg border border-[#3f6fff] bg-white px-4 py-2 text-sm font-medium text-[#3f6fff] transition-colors duration-200 hover:bg-blue-50"
                >
                  상세보기
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-lg bg-[#3f6fff] px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2e5fdf]"
                >
                  예약
                </button>
              </div>
            </div>
          </div>

          {/* 두 번째 카드 */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
            <div className="relative h-48 bg-gray-200">
              <span className="absolute left-3 top-3 rounded-md bg-[#3f6fff] px-2 py-1 text-xs font-medium text-white">
                민간 SPOT
              </span>
            </div>
            <div className="p-4">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  문학경기장
                </h3>
              </div>
              <div className="mb-3 flex items-center gap-1 text-sm text-gray-600">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 0C5.2 0 3 2.2 3 5C3 8.75 8 16 8 16C8 16 13 8.75 13 5C13 2.2 10.8 0 8 0ZM8 6.5C7.1 6.5 6.5 5.9 6.5 5C6.5 4.1 7.1 3.5 8 3.5C8.9 3.5 9.5 4.1 9.5 5C9.5 5.9 8.9 6.5 8 6.5Z"
                    fill="#6B7280"
                  />
                </svg>
                <span>서울 강서구 염창동</span>
                <span className="text-gray-400">•</span>
                <span>1.7km</span>
              </div>
              <div className="mb-4 flex items-center gap-1 text-sm text-green-600">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 4L6 11.5L2.5 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-medium">예약 가능</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/spots/2")}
                  className="flex-1 rounded-lg border border-[#3f6fff] bg-white px-4 py-2 text-sm font-medium text-[#3f6fff] transition-colors duration-200 hover:bg-blue-50"
                >
                  상세보기
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-lg bg-[#3f6fff] px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2e5fdf]"
                >
                  예약
                </button>
              </div>
            </div>
          </div>

          {/* 세 번째 카드 */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
            <div className="relative h-48 bg-gray-200">
              <span className="absolute left-3 top-3 rounded-md bg-[#3f6fff] px-2 py-1 text-xs font-medium text-white">
                민간 SPOT
              </span>
            </div>
            <div className="p-4">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  강서 테니스 파크
                </h3>
              </div>
              <div className="mb-3 flex items-center gap-1 text-sm text-gray-600">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 0C5.2 0 3 2.2 3 5C3 8.75 8 16 8 16C8 16 13 8.75 13 5C13 2.2 10.8 0 8 0ZM8 6.5C7.1 6.5 6.5 5.9 6.5 5C6.5 4.1 7.1 3.5 8 3.5C8.9 3.5 9.5 4.1 9.5 5C9.5 5.9 8.9 6.5 8 6.5Z"
                    fill="#6B7280"
                  />
                </svg>
                <span>서울 강서구 염창동</span>
                <span className="text-gray-400">•</span>
                <span>1.7km</span>
              </div>
              <div className="mb-4 flex items-center gap-1 text-sm text-green-600">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 4L6 11.5L2.5 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-medium">예약 가능</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/spots/3")}
                  className="flex-1 rounded-lg border border-[#3f6fff] bg-white px-4 py-2 text-sm font-medium text-[#3f6fff] transition-colors duration-200 hover:bg-blue-50"
                >
                  상세보기
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-lg bg-[#3f6fff] px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2e5fdf]"
                >
                  예약
                </button>
              </div>
            </div>
          </div>

          {/* 네 번째 카드 */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg">
            <div className="relative h-48 bg-gray-200">
              <span className="absolute left-3 top-3 rounded-md bg-[#3f6fff] px-2 py-1 text-xs font-medium text-white">
                민간 SPOT
              </span>
            </div>
            <div className="p-4">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  강서 테니스 파크
                </h3>
              </div>
              <div className="mb-3 flex items-center gap-1 text-sm text-gray-600">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 0C5.2 0 3 2.2 3 5C3 8.75 8 16 8 16C8 16 13 8.75 13 5C13 2.2 10.8 0 8 0ZM8 6.5C7.1 6.5 6.5 5.9 6.5 5C6.5 4.1 7.1 3.5 8 3.5C8.9 3.5 9.5 4.1 9.5 5C9.5 5.9 8.9 6.5 8 6.5Z"
                    fill="#6B7280"
                  />
                </svg>
                <span>서울 강서구 염창동</span>
                <span className="text-gray-400">•</span>
                <span>1.7km</span>
              </div>
              <div className="mb-4 flex items-center gap-1 text-sm text-green-600">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 4L6 11.5L2.5 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-medium">예약 가능</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/spots/4")}
                  className="flex-1 rounded-lg border border-[#3f6fff] bg-white px-4 py-2 text-sm font-medium text-[#3f6fff] transition-colors duration-200 hover:bg-blue-50"
                >
                  상세보기
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-lg bg-[#3f6fff] px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2e5fdf]"
                >
                  예약
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
