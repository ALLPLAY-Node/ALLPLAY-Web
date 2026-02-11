import { useRef, type ChangeEvent } from "react";

type ProfilePhotoFormProps = {
  previewUrl: string;
  onSelectFile: (file: File | null) => void;
  disabled?: boolean;
};

const ProfilePhotoForm = ({
  previewUrl,
  onSelectFile,
  disabled = false
}: ProfilePhotoFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    onSelectFile(file);
    event.currentTarget.value = "";
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="text-[20px] font-bold leading-6 text-black">
        프로필 편집
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChangeFile}
        disabled={disabled}
      />
      <button
        type="button"
        className={`flex h-[213px] w-[222px] flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed border-[#999999] bg-[#E6E6E6] ${
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        }`}
        onClick={() => {
          if (!disabled) {
            inputRef.current?.click();
          }
        }}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="프로필 미리보기"
            className="h-[100px] w-[100px] rounded-full object-cover"
          />
        ) : (
          <div className="h-[100px] w-[100px] rounded-full bg-[#7E7E7E]" />
        )}

        <div className="flex w-full flex-col items-center gap-1">
          <div className="text-base font-normal text-black">사진 업로드</div>
          <div className="text-xs font-bold text-[#A7A7A7]">
            클릭하여 사진을 선택하세요.
          </div>
        </div>
      </button>
    </div>
  );
};

export default ProfilePhotoForm;
