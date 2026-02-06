interface FormActionsProps {
  isEditMode: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
  onCancel?: () => void;
}

const FormActions = ({
  isEditMode,
  isSubmitting,
  onSubmit,
  onCancel
}: FormActionsProps) => {
  return (
    <section className="flex justify-end gap-3 pt-2">
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="h-10 w-32 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-50"
        >
          취소
        </button>
      )}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="h-10 w-32 rounded-lg bg-[#3f6fff] text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2e5fdf] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting
          ? isEditMode
            ? "수정 중..."
            : "등록 중..."
          : isEditMode
            ? "수정하기"
            : "등록하기"}
      </button>
    </section>
  );
};

export default FormActions;
