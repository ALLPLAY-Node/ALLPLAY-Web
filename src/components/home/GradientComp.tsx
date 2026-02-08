import type { PropsWithChildren } from "react";

const GradientComp = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="
        inline-flex shrink-0 flex-col items-center justify-center gap-1
        rounded-md text-sm font-medium transition-all
        bg-[linear-gradient(135deg,rgba(132,0,255,0.25)_0%,rgba(255,255,255,0.25)_100%)]
        shadow-[0_4px_4px_rgba(0,0,0,0.25)]
        text-white text-[10px] font-normal
        aspect-[139/128] min-w-[110px]
      "
    >
      {children}
    </div>
  );
};

export default GradientComp;
