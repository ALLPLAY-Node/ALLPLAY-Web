import { ReactNode } from "react";
import MyPageProfileCard from "@/components/layout/mypage/MyPageProfileCard";
import MyPageTabs from "@/components/layout/mypage/MyPageTabs";

type MyPageLayoutProps = {
  children: ReactNode;
  activeTab?: "clubs" | "reviews" | "help" | "profile";
  onTabChange?: (tab: "clubs" | "reviews" | "help" | "profile") => void;
};

const MyPageLayout = ({
  children,
  activeTab,
  onTabChange
}: MyPageLayoutProps) => {
  return (
    <div className="py-6">
      {/* 좌측 프로필 + 우측 탭/콘텐츠 2열 레이아웃 */}
      <div className="grid gap-6 lg:grid-cols-[140px_1fr] lg:grid-rows-[auto_1fr]">
        <MyPageTabs active={activeTab} onTabChange={onTabChange} />
        <MyPageProfileCard />
        {/* 가입/운영 동호회 섹션 본문은 children으로 주입 */}
        <div className="flex flex-col gap-6 lg:col-start-2 lg:row-start-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MyPageLayout;
