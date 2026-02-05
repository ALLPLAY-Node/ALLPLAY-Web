import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Check, X } from "lucide-react";

const ClubDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // 임시 데이터 (나중에 API로 교체)
  const clubData = {
    name: "테니스 동호회",
    location: "서울 테니스",
    currentCount: 10,
    maxCount: 20,
    operator: {
      name: "홍길동",
      intro: "--"
    },
    introduction:
      "테니스를 처음 시작하는 분들을 위한 친목 동호회 입니다. 기초부터 천천히 배우면서 즐겁게 운동하는것을 목표로 합니다.",
    activityInfo: {
      area: "서울",
      skillLevel: "초보",
      recruitment: "20명 이내"
    },
    conditions: ["테니스 초보자 환영", "매너 필수", "주 2회 참여 가능자"],
    members: [
      {
        name: "사용자 1",
        area: "경기",
        joinDate: "2026.01.10",
        intro: "안녕하세요 잘부탁드립니다."
      },
      {
        name: "사용자 2",
        area: "서울",
        joinDate: "2026.01.09",
        intro: "테니스 즐겁게 배우고 싶어요."
      },
      {
        name: "사용자 3",
        area: "인천",
        joinDate: "2026.01.08",
        intro: "초보지만 열심히 하겠습니다."
      },
      {
        name: "사용자 4",
        area: "경기",
        joinDate: "2026.01.07",
        intro: "함께 운동하고 싶어요."
      }
    ]
  };

  const handleJoinClick = () => {
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
      {/* 클럽 개요 섹션 */}
      <section className="mb-6 flex gap-6">
        {/* 왼쪽: 이미지 (3/5) */}
        <div className="h-[400px] w-3/5 rounded-lg bg-gray-200">
          {/* API로 이미지 불러올 예정 */}
          <img
            src=""
            alt={clubData.name}
            className="h-full w-full rounded-lg object-cover"
          />
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
              {clubData.name}
            </h1>
            <p className="text-xs text-gray-500">동호회 ID: {id}</p>
            <p className="mb-auto mt-2 text-gray-600">{clubData.location}</p>

            {/* 현재인원 및 가입하기 버튼 */}
            <div className="mt-auto space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">현재인원</span>
                <span className="text-sm text-gray-700">
                  <span className="text-[#1EC72F]">
                    {clubData.currentCount}
                  </span>{" "}
                  / {clubData.maxCount} 명
                </span>
              </div>

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
          <div className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              운영자 정보
            </h2>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 rounded-full bg-gray-300" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  이름: {clubData.operator.name}
                </p>
                <p className="text-sm text-gray-600">
                  한줄소개: {clubData.operator.intro}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 동호회 소개 섹션 */}
      <section className="mb-6 rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
        <h2 className="mb-4 text-xl font-bold text-gray-900">동호회 소개</h2>
        <p className="text-gray-700">{clubData.introduction}</p>
      </section>

      {/* 활동 정보 & 참여 조건 섹션 */}
      <section className="mb-6 grid grid-cols-2 gap-6">
        {/* 활동 정보 */}
        <div className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
          <h2 className="mb-4 text-xl font-bold text-gray-900">활동 정보</h2>
          <div className="space-y-2 text-gray-700">
            <p>활동지역: {clubData.activityInfo.area}</p>
            <p>실력 수준: {clubData.activityInfo.skillLevel}</p>
            <p>모집인원: {clubData.activityInfo.recruitment}</p>
          </div>
        </div>

        {/* 참여 조건 */}
        <div className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
          <h2 className="mb-4 text-xl font-bold text-gray-900">참여 조건</h2>
          <div className="space-y-2">
            {clubData.conditions.map((condition, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-700"
              >
                <Check size={16} className="shrink-0 text-[#3f6fff]" />
                <span>{condition}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 동호회 멤버 현황 */}
      <section className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          동호회 멤버 현황
        </h2>
        <div className="space-y-4">
          {clubData.members.map((member, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-b border-gray-200 pb-4 last:border-0"
            >
              <div className="h-12 w-12 shrink-0 rounded-full bg-gray-300" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  이름: {member.name}
                </p>
                <p className="text-sm text-gray-600">활동지역: {member.area}</p>
                <p className="text-sm text-gray-600">
                  가입일자: {member.joinDate}
                </p>
                <p className="text-sm text-gray-600">
                  한줄 소개: {member.intro}
                </p>
              </div>
            </div>
          ))}
        </div>
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

export default ClubDetailPage;
