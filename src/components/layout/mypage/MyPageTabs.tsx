import { Button } from "@/components/ui/button";

type MyPageTabsProps = {
  active?: "clubs" | "reviews" | "help" | "profile";
};

const MyPageTabs = ({ active = "clubs" }: MyPageTabsProps) => {
  const baseClass =
    "h-12 rounded-xl bg-[#E5F1FF] text-[#999999] hover:bg-[#E5F1FF]/90 cursor-pointer";
  const activeClass =
    "h-12 rounded-xl bg-[#006FFF] text-white hover:bg-[#006FFF]/90 cursor-pointer";

  return (
    <div className="flex flex-wrap gap-4 lg:col-start-2 lg:row-start-1">
      <Button
        size="lg"
        className={active === "clubs" ? activeClass : baseClass}
      >
        MY 동호회
      </Button>
      <Button
        size="lg"
        variant="secondary"
        className={active === "reviews" ? activeClass : baseClass}
      >
        작성한 리뷰
      </Button>
      <Button
        size="lg"
        variant="secondary"
        className={active === "help" ? activeClass : baseClass}
      >
        도움말
      </Button>
      <Button
        size="lg"
        variant="secondary"
        className={active === "profile" ? activeClass : baseClass}
      >
        개인정보 수정
      </Button>
    </div>
  );
};

export default MyPageTabs;
