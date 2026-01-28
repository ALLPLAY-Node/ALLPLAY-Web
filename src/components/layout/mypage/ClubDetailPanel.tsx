import type { ClubSummary } from "@/types/club";

const placeholderText = "임시 입니다";

const parseJoinRequirements = (input?: string) => {
  if (!input) {
    return [];
  }
  return input
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
};

type ClubDetailPanelProps = {
  club: ClubSummary | null;
};

const ClubDetailPanel = ({ club }: ClubDetailPanelProps) => {
  const requirements = parseJoinRequirements(club?.joinRequirement);

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-out ${
        club ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div
        className={`flex flex-col gap-4 rounded-xl border border-[#4D9AFF] p-6 ${
          club ? "translate-y-0" : "-translate-y-2"
        } transition-transform duration-300 ease-out`}
      >
        <div className="flex flex-col gap-3">
          <div className="text-lg font-bold">동호회 소개</div>
          <p className="text-base text-foreground">
            {club?.summary ?? placeholderText}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-xl border border-[#4D9AFF] p-5">
            <div className="text-lg font-bold mb-3">활동 정보</div>
            <div className="flex flex-col gap-2 text-sm">
              <div>활동지역: {club?.regionCity ?? placeholderText}</div>
              <div>실력 수준: {club?.level ?? placeholderText}</div>
              <div>
                모집인원:{" "}
                {club?.capacity !== undefined ? club.capacity : placeholderText}
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-[#4D9AFF] p-5">
            <div className="text-lg font-bold mb-3">참여 조건</div>
            <ul className="flex flex-col gap-2 text-sm">
              {requirements.length > 0 ? (
                requirements.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-muted-foreground">{placeholderText}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-[#4D9AFF] p-5">
          <div className="text-lg font-bold mb-3">동호회 커뮤니티</div>
          <div className="flex flex-col gap-2 text-sm">
            <div>연락처: {club?.contact ?? placeholderText}</div>
            <div>홈페이지: {club?.url ?? placeholderText}</div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="h-10 px-6 rounded-lg border border-border text-sm">
            닫기
          </button>
          <button className="h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm">
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubDetailPanel;
