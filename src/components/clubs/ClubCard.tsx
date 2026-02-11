import { useNavigate } from "react-router";
import { joinClub } from "@/api/clubs";
import type { Club } from "@/types/clubs";
import note from "@/assets/clubsPage/note.png";
import place from "@/assets/clubsPage/place.png";
import person from "@/assets/clubsPage/person.png";

interface ClubCardProps {
  club: Club;
  onJoinSuccess: () => void;
}

const ClubCard = ({ club, onJoinSuccess }: ClubCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/clubs/${club.id}`);
  };

  const handleDetailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/clubs/${club.id}`);
  };

  const handleJoinClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다. 로그인 후 다시 시도해주세요.");
      return;
    }

    try {
      const response = await joinClub(String(club.id), token);
      if (response.resultType === "SUCCESS") {
        onJoinSuccess();
      } else {
        alert(response.message || "가입 신청에 실패했습니다.");
      }
    } catch (error) {
      console.error("동호회 가입 신청 실패:", error);
      alert("가입 신청 중 오류가 발생했습니다.");
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className="relative flex h-[456px] w-[468px] cursor-pointer flex-col overflow-hidden rounded-[24px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
    >
      {/* 상단 이미지 영역 */}
      <div className="relative h-[244px] w-[468px] rounded-t-[24px] bg-[#e5e5e5]">
        {typeof club.currentCount === "number" &&
          typeof club.maxCount === "number" &&
          club.currentCount < club.maxCount && (
            <div className="absolute right-4 top-4 inline-flex items-center rounded-full bg-[#00c851] px-3 py-1.5 text-xs font-semibold text-white">
              가입 가능
            </div>
          )}
      </div>

      {/* 하단 정보 영역 */}
      <div className="flex h-[212px] w-[468px] flex-col gap-[10px] rounded-b-[24px] px-[19px] py-[15px]">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-gray-900">{club.name}</h3>
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
            <img src={note} alt="노트" className="h-4 w-4 shrink-0" />
            <span>{club.description || ""}</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={place} alt="모임 장소" className="h-4 w-4 shrink-0" />
            <span>{club.place || ""}</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={person} alt="사람" className="h-4 w-4 shrink-0" />
            <span>
              <span
                className={
                  club.currentCount < club.maxCount ? "text-[#1EC72F]" : ""
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
            onClick={handleDetailClick}
            className="h-[33px] w-[200px] rounded-lg border border-gray-300 bg-white px-[60px] py-[7px] text-sm text-gray-800 transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50"
          >
            상세보기
          </button>
          <button
            type="button"
            onClick={handleJoinClick}
            className="h-[33px] w-[200px] rounded-lg border border-[#3f6fff] bg-[#3f6fff] px-[60px] py-[7px] text-sm text-white transition-colors duration-200 hover:bg-[#2e5fdf]"
          >
            가입하기
          </button>
        </div>
      </div>
    </article>
  );
};

export default ClubCard;
