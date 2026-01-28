import { ReactNode } from "react";
import MyPageProfileCard from "@/components/layout/mypage/MyPageProfileCard";
import MyPageTabs from "@/components/layout/mypage/MyPageTabs";

type MyPageLayoutProps = {
  children: ReactNode;
  activeTab?: "clubs" | "reviews" | "help" | "profile";
};

const MyPageLayout = ({ children, activeTab }: MyPageLayoutProps) => {
  return (
    <div className="py-6">
      <div className="grid gap-6 lg:grid-cols-[140px_1fr] lg:grid-rows-[auto_1fr]">
        <MyPageTabs active={activeTab} />
        <MyPageProfileCard />
        <div className="flex flex-col gap-6 lg:col-start-2 lg:row-start-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MyPageLayout;
