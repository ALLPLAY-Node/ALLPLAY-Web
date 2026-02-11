import { Button } from "@/components/ui/button";

export type MyPageTab = "clubs" | "reviews" | "profile";

type MyPageTabsProps = {
  active?: MyPageTab;
  onTabChange?: (tab: MyPageTab) => void;
};

const MyPageTabs = ({ active = "clubs", onTabChange }: MyPageTabsProps) => {
  const baseClass =
    "h-12 w-[140px] rounded-xl bg-[#E5F1FF] text-[#999999] hover:bg-[#E5F1FF]/90 cursor-pointer text-base font-semibold";
  const activeClass =
    "h-12 w-[140px] rounded-xl bg-[#006FFF] text-white hover:bg-[#006FFF]/90 cursor-pointer text-base font-semibold";

  return (
    <div className="flex w-full max-w-[468px] flex-wrap items-center gap-4 lg:flex-nowrap lg:gap-6">
      <Button
        size="lg"
        variant="secondary"
        className={active === "clubs" ? activeClass : baseClass}
        onClick={() => onTabChange?.("clubs")}
      >
        {"MY \uB3D9\uD638\uD68C"}
      </Button>
      <Button
        size="lg"
        variant="secondary"
        className={active === "reviews" ? activeClass : baseClass}
        onClick={() => onTabChange?.("reviews")}
      >
        {"\uC791\uC131\uD55C \uB9AC\uBDF0"}
      </Button>
      <Button
        size="lg"
        variant="secondary"
        className={active === "profile" ? activeClass : baseClass}
        onClick={() => onTabChange?.("profile")}
      >
        {"\uAC1C\uC778\uC815\uBCF4 \uC218\uC815"}
      </Button>
    </div>
  );
};

export default MyPageTabs;
