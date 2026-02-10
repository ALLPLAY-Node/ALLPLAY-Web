import { useEffect } from "react";

type LeaveClubDoneBoxProps = {
  onClose: () => void;
};

const LeaveClubDoneBox = ({ onClose }: LeaveClubDoneBoxProps) => {
  useEffect(() => {
    // 완료 모달이 보이는 동안 배경 스크롤을 잠근다.
    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      // 모달 종료 시 기존 스크롤 상태를 되돌린다.
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/35 px-4">
      <div className="relative h-[372px] w-full max-w-[550px] rounded-[24px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
        <button
          type="button"
          aria-label="close leave done popup"
          // 닫기(X) 클릭 시 상위 페이지에서 목록 재조회를 연결한다.
          onClick={onClose}
          className="absolute right-2 top-2 flex h-[41px] w-[41px] items-center justify-center rounded-md p-[10px] text-[#999999] transition-colors hover:bg-gray-100"
        >
          <svg
            viewBox="0 0 21 21"
            className="h-[21px] w-[21px]"
            aria-hidden="true"
          >
            <path
              d="M4 4L17 17M17 4L4 17"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="absolute left-1/2 top-[96px] flex h-[180px] w-full max-w-[469px] -translate-x-1/2 flex-col items-center gap-6 px-4 sm:px-0">
          <div className="flex h-[180px] w-[246px] flex-col items-center gap-3">
            <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#E5F1FF] p-[25px]">
              <svg
                viewBox="0 0 50 49"
                className="h-[49px] w-[50px]"
                aria-hidden="true"
              >
                <path
                  d="M13 25L22 34L37 16"
                  fill="none"
                  stroke="#006FFF"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex h-[68px] w-[246px] items-center justify-center p-[10px]">
              <p className="whitespace-nowrap text-center text-[32px] font-bold leading-[40px] text-black sm:text-[40px] sm:leading-[48px]">
                {"\uD0C8\uD1F4 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveClubDoneBox;
