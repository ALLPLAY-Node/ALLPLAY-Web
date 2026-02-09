import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type LeaveClubBoxProps = {
  isSubmitting?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const LeaveClubBox = ({
  isSubmitting = false,
  onCancel,
  onConfirm
}: LeaveClubBoxProps) => {
  useEffect(() => {
    // 모달이 열려있는 동안 배경 스크롤을 잠근다.
    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      // 모달 종료 시 기존 스크롤 상태를 복원한다.
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="leave-club-title"
        className="w-full max-w-[550px] rounded-3xl bg-white px-6 py-12 shadow-[0_20px_40px_rgba(0,0,0,0.15)] sm:px-[82px] sm:py-[94px]"
      >
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2
              id="leave-club-title"
              className="whitespace-nowrap text-[28px] font-bold leading-tight tracking-tight sm:text-[32px]"
            >
              {
                "\uC815\uB9D0 \uD0C8\uD1F4 \uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?"
              }
            </h2>
            <p className="text-sm font-medium text-[#006FFF] sm:text-xl">
              {
                "*\uD0C8\uD1F4\uC2DC \uC7AC\uAC00\uC785\uC774 \uC5B4\uB824\uC6B8\uC218\uB3C4 \uC788\uC2B5\uB2C8\uB2E4."
              }
            </p>
          </div>

          <div className="flex w-full items-center justify-center gap-4 sm:gap-[106px]">
            <Button
              type="button"
              variant="outline"
              className="h-10 w-[140px] rounded-lg border-[#999999] text-base font-semibold text-black hover:bg-gray-50"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {"\uCDE8\uC18C"}
            </Button>
            {/* 확인 클릭 시 상위 페이지에서 탈퇴 API 호출/상태 갱신을 처리한다. */}
            <Button
              type="button"
              className="h-10 w-[140px] rounded-lg bg-[#006FFF] text-base font-semibold text-white hover:bg-[#0057cc]"
              onClick={onConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "\uCC98\uB9AC\uC911..."
                : "\uD0C8\uD1F4\uD558\uAE30"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveClubBox;
