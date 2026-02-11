import { X, Check } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string | React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
}

const SuccessModal = ({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  confirmText = "확인"
}: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-[480px] rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* 성공 아이콘 */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Check size={32} className="text-blue-500" />
          </div>
        </div>

        {/* 제목 */}
        <h2 className="mb-4 text-center text-xl font-bold text-gray-900">
          {title}
        </h2>

        {/* 안내 문구 */}
        <div className="mb-6 rounded-lg bg-blue-50 p-4 text-sm text-gray-700">
          <div className="text-center">{message}</div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-50"
          >
            닫기
          </button>
          {onConfirm && (
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 rounded-lg bg-[#3f6fff] px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2e5fdf]"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
