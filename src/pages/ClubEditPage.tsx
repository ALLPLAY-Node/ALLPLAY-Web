import { useNavigate, useParams } from "react-router";

const ClubEditPage = () => {
  const navigate = useNavigate();
  const { clubId } = useParams<{ clubId: string }>();

  return (
    <main className="w-full py-6">
      <h1 className="mb-3 text-2xl font-bold">동호회 정보 수정</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        동호회 ID: {clubId ?? "없음"}
      </p>
      {/* 팀원 작업 병합 후 이 페이지에서 수정 폼을 계승/오버라이드하여 updateClubInfo API를 연결한다. */}
      <button
        type="button"
        className="rounded-lg border px-4 py-2 text-sm"
        onClick={() => navigate("/mypage")}
      >
        마이페이지로 돌아가기
      </button>
    </main>
  );
};

export default ClubEditPage;
