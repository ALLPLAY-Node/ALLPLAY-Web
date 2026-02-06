import { useState } from "react";

const ClubCreatePage = () => {
  const [activeDays, setActiveDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setActiveDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };
  return (
    <main className="w-full pt-4 pb-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">동호회 등록</h1>
      <p className="mb-8 text-sm text-gray-600">
        새로운 동호회를 만들어 함께 운동할 멤버를 모집해보세요.
      </p>

      <div className="space-y-8">
        {/* 기본 정보 */}
        <section className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            기본 정보
          </h2>

          <div className="space-y-4">
            {/* 동호회 이름 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                동호회 이름
              </label>
              <input
                type="text"
                placeholder="예: 초보 테니스 동호회"
                className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
              />
            </div>

            {/* 종목, 활동지역, 연령대 */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  종목 선택
                </label>
                <button
                  type="button"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 px-3 text-sm text-gray-700"
                >
                  <span>종목 선택</span>
                  <span className="text-xs text-gray-500">▼</span>
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  활동지역
                </label>
                <button
                  type="button"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 px-3 text-sm text-gray-700"
                >
                  <span>시/도 선택</span>
                  <span className="text-xs text-gray-500">▼</span>
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">
                  연령대
                </label>
                <button
                  type="button"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 px-3 text-sm text-gray-700"
                >
                  <span>연령 선택</span>
                  <span className="text-xs text-gray-500">▼</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 동호회 사진 */}
        <section className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            동호회 사진
          </h2>
          <p className="mb-3 text-xs text-gray-500">
            동호회를 대표할 사진을 등록해주세요 (최대 5장)
          </p>
          <div className="flex h-[220px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-3xl text-gray-400">
              +
            </div>
            <p className="text-sm font-medium text-gray-700">사진 업로드</p>
            <p className="mt-1 text-xs text-gray-500">
              클릭하여 사진을 선택하세요.
            </p>
          </div>
        </section>

        {/* 활동 정보 */}
        <section className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            활동 정보
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {/* 모집인원 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                모집인원
              </label>
              <input
                type="number"
                placeholder="숫자를 입력해주세요"
                className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
              />
            </div>

            {/* 활동빈도 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                활동빈도
              </label>
              <div className="flex flex-wrap gap-[10px] md:flex-nowrap">
                {["월", "화", "수", "목", "금", "토", "일"].map((day) => {
                  const isActive = activeDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`flex h-[39px] w-[39px] items-center justify-center rounded-[12px] border p-[10px] text-sm font-medium transition-colors duration-150 ${
                        isActive
                          ? "border-[#006FFF] bg-[#006FFF] text-white"
                          : "border-[#DEDEDE] bg-[#DEDEDE] text-gray-700"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 실력수준 */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                실력수준
              </label>
              <button
                type="button"
                className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 px-3 text-sm text-gray-700"
              >
                <span>실력</span>
                <span className="text-xs text-gray-500">▼</span>
              </button>
            </div>
          </div>
        </section>

        {/* 동호회 소개 */}
        <section className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            동호회 소개
          </h2>
          <textarea
            rows={5}
            placeholder="동호회의 목적, 분위기, 활동 내용을 자유롭게 작성해주세요."
            className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
          />
        </section>

        {/* 참여 조건 */}
        <section className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            참여 조건
          </h2>
          <textarea
            rows={4}
            placeholder="동호회 참여 조건을 자유롭게 작성해주세요.&#10;예: 매너필수, 정기 참여 가능자"
            className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
          />
        </section>

        {/* 공지사항 */}
        <section className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">공지사항</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                연락처
              </label>
              <input
                type="text"
                placeholder="연락처를 입력해주세요"
                className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">
                홈페이지 URL
              </label>
              <input
                type="text"
                placeholder="있다면 홈페이지 URL을 입력해주세요"
                className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* 하단 버튼 */}
        <section className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            className="h-10 w-32 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="button"
            className="h-10 w-32 rounded-lg bg-[#3f6fff] text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2e5fdf]"
          >
            등록하기
          </button>
        </section>
      </div>
    </main>
  );
};

export default ClubCreatePage;
