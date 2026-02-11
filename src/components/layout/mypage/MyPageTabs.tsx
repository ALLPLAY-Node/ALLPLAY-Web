import { Button } from "@/components/ui/button";

type MyPageTabsProps = {
  active?: "clubs" | "reviews" | "help" | "profile";
  onTabChange?: (tab: "clubs" | "reviews" | "help" | "profile") => void;
};

const MyPageTabs = ({ active = "clubs", onTabChange }: MyPageTabsProps) => {
  const baseClass =
    "h-12 rounded-xl bg-[#E5F1FF] text-[#999999] hover:bg-[#E5F1FF]/90 cursor-pointer";
  const activeClass =
    "h-12 rounded-xl bg-[#006FFF] text-white hover:bg-[#006FFF]/90 cursor-pointer";

  return (
    <div className="flex flex-wrap gap-4 lg:col-start-2 lg:row-start-1">
      <Button
        size="lg"
        variant="secondary"
        className={active === "clubs" ? activeClass : baseClass}
        onClick={() => onTabChange?.("clubs")}
      >
        MY 동호회
      </Button>
      <Button
        size="lg"
        variant="secondary"
        className={active === "reviews" ? activeClass : baseClass}
        onClick={() => onTabChange?.("reviews")}
      >
        작성한 리뷰
      </Button>
      <Button
        size="lg"
        variant="secondary"
        className={active === "help" ? activeClass : baseClass}
        onClick={() => onTabChange?.("help")}
      >
        도움말
      </Button>
      <Button
        size="lg"
        variant="secondary"
        className={active === "profile" ? activeClass : baseClass}
        onClick={() => onTabChange?.("profile")}
      >
        개인정보 수정
      </Button>
    </div>
  );
};

export default MyPageTabs;
