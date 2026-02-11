import type { ReactNode } from "react";
import MyPageProfileCard from "@/components/mypage/MyPageProfileCard";
import MyPageTabs, { type MyPageTab } from "@/components/mypage/MyPageTabs";

type MyPageLayoutProps = {
  children: ReactNode;
  activeTab?: MyPageTab;
  onTabChange?: (tab: MyPageTab) => void;
};

const MyPageLayout = ({
  children,
  activeTab = "clubs",
  onTabChange
}: MyPageLayoutProps) => {
  return (
    <div className="py-6">
      <div className="grid gap-6 lg:grid-cols-[140px_1fr] lg:grid-rows-[auto_1fr]">
        <div className="lg:col-start-2 lg:row-start-1">
          <MyPageTabs active={activeTab} onTabChange={onTabChange} />
        </div>
        {activeTab === "profile" ? (
          <div className="hidden lg:block lg:col-start-1 lg:row-start-2" />
        ) : (
          <MyPageProfileCard />
        )}
        <div className="flex flex-col gap-6 lg:col-start-2 lg:row-start-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MyPageLayout;
