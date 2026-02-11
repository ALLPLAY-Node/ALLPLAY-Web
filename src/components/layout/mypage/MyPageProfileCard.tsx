const MyPageProfileCard = () => {
  // 프로필 API 연동 전까지 사용하는 기본/임시 프로필 카드
  return (
    <aside className="border border-border rounded-xl px-4 py-6 h-fit lg:row-start-2">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="h-[100px] w-[100px] rounded-full bg-[#A7A7A7]" />
        <div className="text-base">이름</div>
        <div className="text-base">활동지역</div>
        <div className="text-[10px] text-muted-foreground">
          자신을 나타내는 소개 한 줄
        </div>
      </div>
    </aside>
  );
};

export default MyPageProfileCard;
